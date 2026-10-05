// Mission data model (see _APP_BLUEPRINT.md #4 Missions)
// category: one of the 4 Stats — 'knowledge' | 'physical' | 'command' | 'vital'
// difficulty: 'easy' | 'normal' | 'hard'
// priority: 'low' | 'medium' | 'high'
// status: 'suggested' | 'not_started' | 'active' | 'completed'
// templateId: id of the Suggested template this instance came from, or null for Custom Missions —
// used only to prevent adding the same template concurrently (see MISSION_MANAGEMENT_UX_FIX).

export const MISSION_CATEGORIES = ['knowledge', 'physical', 'command', 'vital']
export const MISSION_DIFFICULTIES = ['easy', 'normal', 'hard']
export const MISSION_PRIORITIES = ['low', 'medium', 'high']

export function createMission({
  id,
  title,
  category = 'general',
  difficulty = 'easy',
  priority = 'medium',
  deadline = null,
  status = 'suggested',
  isCustom = false,
  templateId = null,
  rewards = createMissionRewards(),
} = {}) {
  return { id, title, category, difficulty, priority, deadline, status, isCustom, templateId, rewards }
}

export function createMissionRewards() {
  return {
    exp: 0,
    resources: { scrapMetal: 0, techFragments: 0, dataCores: 0 },
    warpEnergy: 0,
    statBoosts: { knowledge: 0, physical: 0, command: 0, vital: 0 },
  }
}

// Reward scaling by Difficulty (see _PROJECT_LOCK.md #6: Mission Reward = EXP + Stat + Resource by Difficulty)
// Applying these to Stats/Resources/EXP happens Day 3 — Day 2 only attaches the reward data to missions.
export const DIFFICULTY_REWARD_TABLE = {
  easy: { exp: 10, statBoost: 1, resourceAmount: 5, warpEnergy: 5 },
  normal: { exp: 20, statBoost: 2, resourceAmount: 10, warpEnergy: 10 },
  hard: { exp: 35, statBoost: 3, resourceAmount: 20, warpEnergy: 15 },
}

const CATEGORY_RESOURCE_MAP = {
  knowledge: 'techFragments',
  physical: 'scrapMetal',
  command: 'techFragments',
  vital: 'dataCores',
}

export function computeMissionRewards(category, difficulty) {
  const table = DIFFICULTY_REWARD_TABLE[difficulty] ?? DIFFICULTY_REWARD_TABLE.easy
  const rewards = createMissionRewards()
  rewards.exp = table.exp
  rewards.warpEnergy = table.warpEnergy
  if (category in rewards.statBoosts) {
    rewards.statBoosts[category] = table.statBoost
  }
  const resourceKey = CATEGORY_RESOURCE_MAP[category] ?? 'scrapMetal'
  rewards.resources[resourceKey] = table.resourceAmount
  return rewards
}

// Seed templates tied to Chapter 1 milestones — not yet wired to gameplay logic (Day 2+)
export const MISSION_TEMPLATES = [
  createMission({
    id: 'tpl-wake-01',
    title: 'ลุกจากเตียงภายใน 10 นาทีหลังตื่น',
    category: 'physical',
    difficulty: 'easy',
    priority: 'high',
    rewards: {
      exp: 10,
      resources: { scrapMetal: 5, techFragments: 0, dataCores: 0 },
      warpEnergy: 5,
      statBoosts: { knowledge: 0, physical: 1, command: 0, vital: 1 },
    },
  }),
  createMission({
    id: 'tpl-power-01',
    title: 'ทำงาน/อ่านหนังสือแบบโฟกัส 25 นาที',
    category: 'knowledge',
    difficulty: 'normal',
    priority: 'medium',
    rewards: {
      exp: 20,
      resources: { scrapMetal: 10, techFragments: 5, dataCores: 0 },
      warpEnergy: 10,
      statBoosts: { knowledge: 2, physical: 0, command: 0, vital: 0 },
    },
  }),
  createMission({
    id: 'tpl-scanner-01',
    title: 'จัดลำดับงานของวันนี้',
    category: 'command',
    difficulty: 'easy',
    priority: 'medium',
    rewards: {
      exp: 15,
      resources: { scrapMetal: 0, techFragments: 10, dataCores: 0 },
      warpEnergy: 5,
      statBoosts: { knowledge: 0, physical: 0, command: 2, vital: 0 },
    },
  }),
  createMission({
    id: 'tpl-vital-01',
    title: 'ดื่มน้ำและพักสายตา 5 นาที',
    category: 'vital',
    difficulty: 'easy',
    priority: 'low',
    rewards: {
      exp: 10,
      resources: { scrapMetal: 0, techFragments: 0, dataCores: 5 },
      warpEnergy: 5,
      statBoosts: { knowledge: 0, physical: 0, command: 0, vital: 1 },
    },
  }),
]

export function createMissionsState() {
  return {
    templates: MISSION_TEMPLATES,
    active: [],
    completed: [],
    custom: [],
  }
}
