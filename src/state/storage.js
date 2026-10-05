// Local Storage persistence for the full game state
// (see _APP_BLUEPRINT.md #7: Captain, Stats, Missions, Resources, Warp Energy,
//  Ship Systems, Chapter Progress, Inventory, Game Mode)

const STORAGE_KEY = 'ig342.gameState.v1'

export function loadGameState(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return mergeWithFallback(fallback, parsed)
  } catch (error) {
    console.warn('Failed to load game state from Local Storage, using defaults.', error)
    return fallback
  }
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save game state to Local Storage.', error)
  }
}

// Shallow-merge per top-level slice so a saved state missing a slice
// (e.g. from an older version) falls back to that slice's default instead of crashing.
function mergeWithFallback(fallback, parsed) {
  if (!parsed || typeof parsed !== 'object') return fallback
  const merged = { ...fallback }
  for (const key of Object.keys(fallback)) {
    if (parsed[key] !== undefined) {
      merged[key] = parsed[key]
    }
  }
  return merged
}
