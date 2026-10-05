// Basic resources used to repair/upgrade the ship (see _APP_BLUEPRINT.md #4 Ship, #7)

export function createResources() {
  return {
    scrapMetal: 0,
    techFragments: 0,
    dataCores: 0,
  }
}

export function applyResourceGain(resources, gained = {}) {
  const next = { ...resources }
  for (const key of Object.keys(next)) {
    if (gained[key]) next[key] = Math.max(0, next[key] + gained[key])
  }
  return next
}
