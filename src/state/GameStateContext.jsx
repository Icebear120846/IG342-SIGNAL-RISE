import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { createInitialGameState } from '../data/gameState.js'
import { gameStateReducer } from './gameStateReducer.js'
import { loadGameState, saveGameState } from './storage.js'
import { recomputeChapterProgress } from '../logic/chapterProgress.js'
import { deduplicateMissions } from '../logic/missions.js'

const GameStateContext = createContext(null)

function init() {
  const loaded = loadGameState(createInitialGameState())
  // One-time-safe cleanup of historical duplicate template missions (idempotent — a no-op
  // once data is already clean), then re-derive Chapter Progress from the result so it's
  // always consistent with Missions/Ship/Warp — self-heals a fresh or older-shaped save too.
  const deduped = { ...loaded, missions: deduplicateMissions(loaded) }
  return { ...deduped, chapterProgress: recomputeChapterProgress(deduped) }
}

export function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(gameStateReducer, undefined, init)

  useEffect(() => {
    saveGameState(state)
  }, [state])

  const actions = useMemo(
    () => ({
      acceptMission: (templateId) => dispatch({ type: 'ACCEPT_MISSION', templateId }),
      addCustomMission: (payload) => dispatch({ type: 'ADD_CUSTOM_MISSION', payload }),
      completeMission: (missionId) => dispatch({ type: 'COMPLETE_MISSION', missionId }),
      startMission: (missionId) => dispatch({ type: 'START_MISSION', missionId }),
      removeMission: (missionId) => dispatch({ type: 'REMOVE_MISSION', missionId }),
      repairShipSystem: (systemKey) => dispatch({ type: 'REPAIR_SHIP_SYSTEM', systemKey }),
      jumpToNode: (nodeId) => dispatch({ type: 'JUMP_TO_NODE', nodeId }),
      resolveEvent: (choiceId) => dispatch({ type: 'RESOLVE_EVENT', choiceId }),
      toggleAutoAssign: () => dispatch({ type: 'TOGGLE_AUTO_ASSIGN' }),
    }),
    [],
  )

  const value = useMemo(() => ({ state, actions }), [state, actions])

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>
}

export function useGameState() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}
