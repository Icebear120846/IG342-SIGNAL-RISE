import { createMission, computeMissionRewards } from '../data/missions.js'
import { applyExpGain } from '../data/captain.js'
import { applyStatBoosts } from '../data/stats.js'
import { applyResourceGain } from '../data/resources.js'
import { applyWarpGain } from '../data/warpEnergy.js'
import { createInventoryItem } from '../data/inventory.js'
import { UNKNOWN_SIGNAL_EVENT } from '../data/event.js'
import { createUniqueId } from '../utils/id.js'
import { recomputeChapterProgress } from '../logic/chapterProgress.js'
import { canJump } from '../logic/galaxy.js'

// Ship systems with real Day 4 repair logic — Navigation/Hull stay display-only.
const REPAIRABLE_SYSTEMS = ['power', 'scanner']

export function gameStateReducer(state, action) {
  switch (action.type) {
    // A template can only have one concurrent instance in My Missions — prevents the
    // "+ Add" button from being spammed into duplicates (MISSION_MANAGEMENT_UX_FIX).
    case 'ACCEPT_MISSION': {
      const template = state.missions.templates.find((t) => t.id === action.templateId)
      if (!template) return state
      const alreadyAdded = state.missions.active.some((m) => m.templateId === template.id)
      if (alreadyAdded) return state

      const activeMission = {
        ...template,
        id: createUniqueId('mission'),
        status: 'not_started',
        templateId: template.id,
      }
      return {
        ...state,
        missions: {
          ...state.missions,
          active: [...state.missions.active, activeMission],
        },
      }
    }

    case 'ADD_CUSTOM_MISSION': {
      const { title, category, difficulty, priority, deadline } = action.payload
      const mission = createMission({
        id: createUniqueId('custom'),
        title,
        category,
        difficulty,
        priority,
        deadline: deadline || null,
        status: 'not_started',
        isCustom: true,
        rewards: computeMissionRewards(category, difficulty),
      })
      return {
        ...state,
        missions: {
          ...state.missions,
          custom: [...state.missions.custom, mission],
          active: [...state.missions.active, mission],
        },
      }
    }

    // Start Mission: NOT_STARTED -> ACTIVE only. No reward is granted here — rewards are
    // still granted exclusively on COMPLETE_MISSION (MISSION_MANAGEMENT_UX_FIX #3/#5).
    case 'START_MISSION': {
      const mission = state.missions.active.find((m) => m.id === action.missionId)
      if (!mission || mission.status !== 'not_started') return state
      const startedMission = { ...mission, status: 'active' }
      return {
        ...state,
        missions: {
          ...state.missions,
          active: state.missions.active.map((m) => (m.id === action.missionId ? startedMission : m)),
          custom: mission.isCustom
            ? state.missions.custom.map((m) => (m.id === action.missionId ? startedMission : m))
            : state.missions.custom,
        },
      }
    }

    // Remove Mission: deletes a NOT_STARTED or ACTIVE mission from My Missions. Never
    // touches EXP/Stats/Resources/Warp — those are only ever granted on completion, so an
    // unfinished mission has no earned reward to claw back (MISSION_MANAGEMENT_UX_FIX #4/#5).
    // Completed history is untouched — this only ever looks at the active[] list.
    case 'REMOVE_MISSION': {
      const mission = state.missions.active.find((m) => m.id === action.missionId)
      if (!mission) return state
      return {
        ...state,
        missions: {
          ...state.missions,
          active: state.missions.active.filter((m) => m.id !== action.missionId),
          custom: mission.isCustom
            ? state.missions.custom.filter((m) => m.id !== action.missionId)
            : state.missions.custom,
        },
      }
    }

    // Complete Mission = Core Loop step 2-3: mark done + apply EXP/Stat/Resource/Warp reward
    // (see _PROJECT_LOCK.md #2, #6).
    case 'COMPLETE_MISSION': {
      const mission = state.missions.active.find((m) => m.id === action.missionId)
      if (!mission || mission.status !== 'active') return state
      const completedMission = {
        ...mission,
        status: 'completed',
        completedAt: new Date().toISOString(),
      }
      const rewards = mission.rewards
      const nextState = {
        ...state,
        captain: applyExpGain(state.captain, rewards.exp),
        stats: applyStatBoosts(state.stats, rewards.statBoosts),
        resources: applyResourceGain(state.resources, rewards.resources),
        warpEnergy: applyWarpGain(state.warpEnergy, rewards.warpEnergy),
        missions: {
          ...state.missions,
          active: state.missions.active.filter((m) => m.id !== action.missionId),
          completed: [...state.missions.completed, completedMission],
          custom: state.missions.custom.map((m) => (m.id === mission.id ? completedMission : m)),
        },
      }
      return { ...nextState, chapterProgress: recomputeChapterProgress(nextState) }
    }

    // Ship Repair = Core Loop step 4: spend Resource to fix a system (see _PROJECT_LOCK.md #2).
    // Only Power/Scanner have real repair logic in Day 4; Scanner requires Power first.
    case 'REPAIR_SHIP_SYSTEM': {
      const { systemKey } = action
      if (!REPAIRABLE_SYSTEMS.includes(systemKey)) return state

      const system = state.shipSystems[systemKey]
      if (!system || system.status !== 'damaged') return state
      if (systemKey === 'scanner' && state.shipSystems.power.status !== 'operational') return state

      const canAfford = Object.entries(system.repairCost).every(
        ([resource, amount]) => (state.resources[resource] ?? 0) >= amount,
      )
      if (!canAfford) return state

      const nextResources = { ...state.resources }
      for (const [resource, amount] of Object.entries(system.repairCost)) {
        nextResources[resource] -= amount
      }

      const nextState = {
        ...state,
        resources: nextResources,
        shipSystems: {
          ...state.shipSystems,
          [systemKey]: { ...system, status: 'operational' },
        },
      }
      return { ...nextState, chapterProgress: recomputeChapterProgress(nextState) }
    }

    // Warp Jump = Core Loop step 6 (see _PROJECT_LOCK.md #2). Re-validates every guard
    // condition server-side too, so a stray dispatch can never bypass the UI's checks.
    case 'JUMP_TO_NODE': {
      const node = state.galaxy.nodes.find((n) => n.id === action.nodeId)
      if (!node || !canJump(node, state)) return state

      return {
        ...state,
        warpEnergy: applyWarpGain(state.warpEnergy, -node.warpCost),
        story: { ...state.story, hasJumped: true, currentLocationId: node.id },
      }
    }

    // Random Event resolution = Core Loop step 7. Fixed, hand-authored choices only —
    // no generator/randomness. Can only resolve once (event.status guards re-entry).
    case 'RESOLVE_EVENT': {
      if (!state.story.hasJumped || state.story.event.status !== 'pending') return state
      const choice = UNKNOWN_SIGNAL_EVENT.choices.find((c) => c.id === action.choiceId)
      if (!choice) return state
      const effects = choice.effects ?? {}

      const nextResources = effects.resources
        ? applyResourceGain(state.resources, effects.resources)
        : state.resources
      const nextWarpEnergy = effects.warpEnergy
        ? applyWarpGain(state.warpEnergy, effects.warpEnergy)
        : state.warpEnergy
      const nextInventory = effects.inventoryItem
        ? {
            ...state.inventory,
            items: [
              ...state.inventory.items,
              createInventoryItem({ id: createUniqueId('item'), ...effects.inventoryItem }),
            ],
          }
        : state.inventory

      const nextStory = {
        ...state.story,
        event: { status: 'resolved', resolvedChoiceId: choice.id },
        flags: { ...state.story.flags, ...(effects.flags ?? {}) },
        memoryLogUnlocked: true,
      }
      nextStory.chapterComplete = Boolean(
        nextStory.hasJumped && nextStory.event.status === 'resolved' && nextStory.memoryLogUnlocked,
      )

      return {
        ...state,
        resources: nextResources,
        warpEnergy: nextWarpEnergy,
        inventory: nextInventory,
        story: nextStory,
      }
    }

    case 'TOGGLE_AUTO_ASSIGN': {
      return {
        ...state,
        gameMode: { ...state.gameMode, autoAssign: !state.gameMode.autoAssign },
      }
    }

    default:
      return state
  }
}
