// Ship systems shown as cards on the Ship page (see _APP_BLUEPRINT.md #4 Ship)
// status: 'damaged' | 'operational'

export function createShipSystems() {
  return {
    power: { name: 'Power', level: 1, status: 'damaged', repairCost: { scrapMetal: 10 } },
    scanner: { name: 'Scanner', level: 1, status: 'damaged', repairCost: { techFragments: 10 } },
    navigation: { name: 'Navigation', level: 1, status: 'damaged', repairCost: { techFragments: 10 } },
    hull: { name: 'Hull', level: 1, status: 'damaged', repairCost: { scrapMetal: 10 } },
  }
}
