import { getStatLabel } from '../utils/formatReward.js'

// AI Companion — Rule-based mission recommendation (see _APP_BLUEPRINT.md #6)
// No AI API. Pure, deterministic scoring only.
//
// Factors considered: Priority, Deadline urgency, lowest Stat, and pending (active) Missions.
// "เวลาว่าง" (free time) is intentionally skipped — there is no free-time data source in
// the locked data model, and the spec only requires it "ถ้ามีข้อมูล" (if data is available).

const PRIORITY_WEIGHT = { high: 30, medium: 20, low: 10 }
const PENDING_BONUS = 20
const STAT_NEED_BONUS = 15
const DEADLINE_OVERDUE_BONUS = 40
const DEADLINE_URGENT_BONUS = 25
const DEADLINE_SOON_BONUS = 10

function getDeadlineBonus(deadline, now) {
  if (!deadline) return 0
  const deadlineTime = new Date(deadline).getTime()
  if (Number.isNaN(deadlineTime)) return 0
  const hoursLeft = (deadlineTime - now) / (1000 * 60 * 60)
  if (hoursLeft < 0) return DEADLINE_OVERDUE_BONUS
  if (hoursLeft <= 24) return DEADLINE_URGENT_BONUS
  if (hoursLeft <= 72) return DEADLINE_SOON_BONUS
  return 0
}

function getLowestStatKey(stats) {
  return Object.entries(stats).reduce((lowestKey, [key, value]) =>
    value < stats[lowestKey] ? key : lowestKey,
    Object.keys(stats)[0],
  )
}

export function scoreMission(mission, stats, now = Date.now()) {
  let score = PRIORITY_WEIGHT[mission.priority] ?? 15
  score += getDeadlineBonus(mission.deadline, now)
  if (mission.category === getLowestStatKey(stats)) score += STAT_NEED_BONUS
  if (mission.status === 'active') score += PENDING_BONUS
  return score
}

// Candidates = pending (active) Missions + Suggested templates, ranked by the same rule.
export function getSuggestedMissions(state, limit = 3) {
  const now = Date.now()
  const candidates = [
    ...state.missions.active.map((mission) => ({ ...mission, source: 'active' })),
    ...state.missions.templates.map((mission) => ({ ...mission, source: 'template' })),
  ]
  return candidates
    .map((mission) => ({ mission, score: scoreMission(mission, state.stats, now) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.mission)
}

export function getCompanionMessage(mission, stats, now = Date.now()) {
  const deadlineBonus = getDeadlineBonus(mission.deadline, now)
  if (deadlineBonus === DEADLINE_OVERDUE_BONUS) return 'ภารกิจนี้เลยกำหนดแล้วครับ Captain'
  if (deadlineBonus === DEADLINE_URGENT_BONUS) return 'Captain ภารกิจนี้ใกล้หมดเวลาแล้ว'
  if (mission.category === getLowestStatKey(stats)) {
    return `ช่วยเสริม ${getStatLabel(mission.category)} ที่กำลังอ่อนอยู่ครับ`
  }
  if (mission.status === 'active') return 'ภารกิจนี้ยังค้างอยู่ ไปต่อให้จบกันเถอะครับ'
  return 'แนะนำให้ลองทำภารกิจนี้ครับ Captain'
}
