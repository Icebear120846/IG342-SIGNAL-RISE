// Aggregate initial game state — combines all Day 1 data models.
// No persistence/logic yet: Local Storage wiring is Day 2 (_APP_BLUEPRINT.md #10).

import { createCaptain } from './captain.js'
import { createStats } from './stats.js'
import { createMissionsState } from './missions.js'
import { createResources } from './resources.js'
import { createWarpEnergy } from './warpEnergy.js'
import { createShipSystems } from './shipSystems.js'
import { createChapterProgress } from './chapterProgress.js'
import { createInventory } from './inventory.js'
import { createGameMode } from './gameMode.js'
import { createGalaxyState } from './galaxy.js'
import { createStory } from './story.js'

export function createInitialGameState() {
  return {
    captain: createCaptain(),
    stats: createStats(),
    missions: createMissionsState(),
    resources: createResources(),
    warpEnergy: createWarpEnergy(),
    shipSystems: createShipSystems(),
    chapterProgress: createChapterProgress(),
    inventory: createInventory(),
    gameMode: createGameMode(),
    galaxy: createGalaxyState(),
    story: createStory(),
  }
}
