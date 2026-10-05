// Chapter 1 Milestone progression (see _PROJECT_LOCK.md #5, _APP_BLUEPRINT.md #5)
// Progress is DERIVED from live game state every time it's recomputed — there is no
// manual "set milestone" action, so a Milestone can never be skipped without its condition.

export const WARP_MILESTONE_THRESHOLD = 50

// condition[i] = what must be true to clear Milestone i (index) and move to i+1
const MILESTONE_CONDITIONS = [
  (state) => state.missions.completed.length >= 1, // Emergency Wake -> Restore Power
  (state) => state.shipSystems.power.status === 'operational', // Restore Power -> Repair Scanner
  (state) => state.shipSystems.scanner.status === 'operational', // Repair Scanner -> Charge the Warp
  (state) => state.warpEnergy.current >= WARP_MILESTONE_THRESHOLD, // Charge the Warp -> Unknown Signal
]

export function recomputeChapterProgress(state) {
  let derivedIndex = 0
  for (const condition of MILESTONE_CONDITIONS) {
    if (!condition(state)) break
    derivedIndex += 1
  }

  // Progress is monotonic: once a Milestone is reached it never regresses, even if a
  // later action spends the same resource that unlocked it (e.g. Warp Energy on Jump).
  const currentMilestoneIndex = Math.max(state.chapterProgress.currentMilestoneIndex, derivedIndex)

  const milestones = state.chapterProgress.milestones.map((milestone, index) => ({
    ...milestone,
    completed: index < currentMilestoneIndex,
  }))

  // Nodes up to and including the current Milestone are visible/unlocked on the Galaxy Map.
  const unlockedGalaxyNodeIds = milestones
    .filter((_, index) => index <= currentMilestoneIndex)
    .map((milestone) => milestone.id)

  return { ...state.chapterProgress, milestones, currentMilestoneIndex, unlockedGalaxyNodeIds }
}

const MILESTONE_OBJECTIVES = [
  'ทำ Mission แรกให้สำเร็จ เพื่อปลุกระบบยานขึ้นมา',
  'ซ่อม Power ให้กลับมาออนไลน์ (ใช้ Resource ที่หน้า Ship)',
  'ซ่อม Scanner เพื่อตรวจจับสัญญาณ',
  `สะสม Warp Energy ให้ถึง ${WARP_MILESTONE_THRESHOLD}`,
  'เตรียมพร้อม Jump เข้าหา Unknown Signal',
]

export function getMilestoneObjective(chapterProgress) {
  return MILESTONE_OBJECTIVES[chapterProgress.currentMilestoneIndex] ?? ''
}

const MILESTONE_COMPANION_MESSAGES = [
  'Captain ตื่นแล้วเหรอครับ ยานเสียหายหนักอยู่ เริ่มจาก Mission แรกกันก่อนนะครับ',
  'Power ยังไม่กลับมาเลยครับ Captain ลองซ่อมที่หน้า Ship ดูก่อนไหม',
  'Power กลับมาออนไลน์แล้วครับ ทีนี้เหลือ Scanner ให้จัดการ',
  'Scanner พร้อมแล้วครับ ตอนนี้เหลือแค่สะสม Warp Energy ให้พอ',
  'Warp พร้อมแล้วครับ Captain มีสัญญาณปริศนาโผล่มา น่าสนใจทีเดียวครับ',
]

export function getMilestoneCompanionMessage(chapterProgress) {
  return MILESTONE_COMPANION_MESSAGES[chapterProgress.currentMilestoneIndex] ?? ''
}
