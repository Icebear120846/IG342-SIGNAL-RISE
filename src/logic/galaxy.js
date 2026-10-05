// Warp Jump guard conditions (see _PROJECT_LOCK.md #2 step 6, Day 5 spec)
// A Node unlocks only once Chapter Progress reaches the "Unknown Signal" Milestone.

export const FINAL_MILESTONE_INDEX = 4

export function isNodeUnlocked(state) {
  return state.chapterProgress.currentMilestoneIndex >= FINAL_MILESTONE_INDEX
}

// Returns null when the Jump is allowed, otherwise a short reason to show the user.
export function getJumpBlockedReason(node, state) {
  if (state.story.hasJumped) return 'Warp Jump ไปแล้ว รอผลลัพธ์ Event อยู่'
  if (!isNodeUnlocked(state)) return 'ต้องถึง Milestone: Unknown Signal ก่อน'
  if (state.warpEnergy.current < node.warpCost) return 'Warp Energy ไม่พอ'
  return null
}

export function canJump(node, state) {
  return getJumpBlockedReason(node, state) === null
}
