// Captain profile data model (see _APP_BLUEPRINT.md #4 Captain, #7 Local Storage)

// Level formula — simple and fixed (no Skill Tree): each level N needs N*100 EXP to clear.
export function getExpToNextLevel(level) {
  return level * 100
}

// Rank is a display-only, simple progression derived from Level — not a separate system.
const RANK_TITLES = [
  { minLevel: 1, title: 'Cadet' },
  { minLevel: 3, title: 'Ensign' },
  { minLevel: 5, title: 'Officer' },
  { minLevel: 7, title: 'Commander' },
  { minLevel: 10, title: 'Captain' },
]

export function getRankForLevel(level) {
  let rank = RANK_TITLES[0].title
  for (const entry of RANK_TITLES) {
    if (level >= entry.minLevel) rank = entry.title
  }
  return rank
}

export function createCaptain() {
  return {
    name: 'Unnamed Captain',
    rank: getRankForLevel(1),
    level: 1,
    exp: 0,
    expToNextLevel: getExpToNextLevel(1),
  }
}

// Applies an EXP gain and resolves any level-ups (handles multiple level-ups in one gain).
export function applyExpGain(captain, expGain) {
  if (!expGain) return captain
  let { level, exp } = captain
  exp += expGain
  let expToNextLevel = getExpToNextLevel(level)
  while (exp >= expToNextLevel) {
    exp -= expToNextLevel
    level += 1
    expToNextLevel = getExpToNextLevel(level)
  }
  return { ...captain, level, exp, expToNextLevel, rank: getRankForLevel(level) }
}
