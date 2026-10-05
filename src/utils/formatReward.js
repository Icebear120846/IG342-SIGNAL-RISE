export function formatRewardSummary(rewards) {
  if (!rewards) return '—'
  const parts = []
  if (rewards.exp) parts.push(`+${rewards.exp} EXP`)
  if (rewards.warpEnergy) parts.push(`+${rewards.warpEnergy} Warp`)
  for (const [stat, value] of Object.entries(rewards.statBoosts ?? {})) {
    if (value) parts.push(`+${value} ${stat}`)
  }
  for (const [resource, value] of Object.entries(rewards.resources ?? {})) {
    if (value) parts.push(`+${value} ${resource}`)
  }
  return parts.length > 0 ? parts.join(' · ') : '—'
}

// Display-only label map — internal keys (e.g. "scrapMetal") never appear in the UI.
// Purely presentational: does not touch the underlying reward objects or reward logic.
const RESOURCE_DISPLAY_LABELS = {
  scrapMetal: 'SCRAP METAL',
  techFragments: 'TECH FRAGMENT',
  dataCores: 'DATA CORE',
}

const STAT_DISPLAY_LABELS = {
  knowledge: 'KNOWLEDGE',
  physical: 'PHYSICAL',
  command: 'COMMAND',
  vital: 'VITAL',
}

export function getResourceLabel(resourceKey) {
  return RESOURCE_DISPLAY_LABELS[resourceKey] ?? resourceKey.toUpperCase()
}

export function getStatLabel(statKey) {
  return STAT_DISPLAY_LABELS[statKey] ?? statKey.toUpperCase()
}

// item.type values: 'loot' | 'data' | 'artifact' (see data/inventory.js)
const ITEM_TYPE_DISPLAY_LABELS = {
  loot: 'LOOT',
  data: 'DATA ITEM',
  artifact: 'ARTIFACT',
}

export function getItemTypeLabel(itemType) {
  return ITEM_TYPE_DISPLAY_LABELS[itemType] ?? itemType.toUpperCase()
}

export function getRewardChips(rewards) {
  if (!rewards) return []
  const chips = []
  if (rewards.exp) chips.push(`+${rewards.exp} EXP`)
  if (rewards.warpEnergy) chips.push(`+${rewards.warpEnergy} WARP`)
  for (const [stat, value] of Object.entries(rewards.statBoosts ?? {})) {
    if (value) chips.push(`${STAT_DISPLAY_LABELS[stat] ?? stat.toUpperCase()} +${value}`)
  }
  for (const [resource, value] of Object.entries(rewards.resources ?? {})) {
    if (value) chips.push(`${RESOURCE_DISPLAY_LABELS[resource] ?? resource.toUpperCase()} +${value}`)
  }
  return chips
}
