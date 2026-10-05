// Chapter 1 ending state: Warp Jump -> Event -> Memory Log -> Chapter Complete
// (see _PROJECT_LOCK.md #5, _APP_BLUEPRINT.md #5 Milestone 5)

export function createStory() {
  return {
    currentLocationId: 'home', // 'home' | a galaxy node id after Jump
    hasJumped: false,
    event: {
      status: 'pending', // 'pending' | 'resolved'
      resolvedChoiceId: null,
    },
    flags: {}, // story flags set by Event choices, e.g. { investigatedSignal: true }
    memoryLogUnlocked: false,
    chapterComplete: false,
  }
}
