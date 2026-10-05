// Warp Energy meter used to Jump on the Galaxy Map (see _PROJECT_LOCK.md #2, #5)

export function createWarpEnergy() {
  return {
    current: 0,
    max: 100,
  }
}

export function applyWarpGain(warpEnergy, amount = 0) {
  const current = Math.min(warpEnergy.max, Math.max(0, warpEnergy.current + amount))
  return { ...warpEnergy, current }
}
