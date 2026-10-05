// Chapter 1 milestones — locked list, see _PROJECT_LOCK.md #5

export const CHAPTER_1_MILESTONES = [
  { id: 'm1', title: 'Emergency Wake', completed: false },
  { id: 'm2', title: 'Restore Power', completed: false },
  { id: 'm3', title: 'Repair Scanner', completed: false },
  { id: 'm4', title: 'Charge the Warp', completed: false },
  { id: 'm5', title: 'Unknown Signal', completed: false },
]

export function createChapterProgress() {
  return {
    chapter: 1,
    milestones: CHAPTER_1_MILESTONES.map((m) => ({ ...m })),
    currentMilestoneIndex: 0,
    unlockedGalaxyNodeIds: [],
  }
}
