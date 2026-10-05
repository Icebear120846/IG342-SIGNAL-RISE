// 4 core Stats (see _PROJECT_LOCK.md #4): Knowledge / Physical / Command / Vital

export function createStats() {
  return {
    knowledge: 0,
    physical: 0,
    command: 0,
    vital: 0,
  }
}

// Applies Stat gains — only the keys present in statBoosts are touched (no new Stats).
export function applyStatBoosts(stats, statBoosts = {}) {
  const next = { ...stats }
  for (const key of Object.keys(next)) {
    if (statBoosts[key]) next[key] += statBoosts[key]
  }
  return next
}
