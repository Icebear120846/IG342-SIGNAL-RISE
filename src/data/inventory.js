// Basic Inventory: Bonus Loot / Data / Artifact placeholders (see _APP_BLUEPRINT.md #4 Inventory)
// item.type: 'loot' | 'data' | 'artifact'

export function createInventory() {
  return {
    items: [],
  }
}

export function createInventoryItem({ id, type = 'data', name }) {
  return { id, type, name }
}
