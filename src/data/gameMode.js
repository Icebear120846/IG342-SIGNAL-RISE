// App mode: Casual / Challenge, plus Streak/Recovery (see _PROJECT_LOCK.md #6, #7)

export function createGameMode() {
  return {
    mode: 'casual', // 'casual' | 'challenge'
    autoAssign: false, // AI Companion auto-picks the top suggested Mission (see _PROJECT_LOCK.md #5)
    streak: {
      current: 0,
      longest: 0,
      recoveryCharges: 0,
    },
  }
}
