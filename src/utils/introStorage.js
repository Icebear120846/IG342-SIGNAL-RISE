// Presentation-only flag for the Splash/Intro — completely separate from the game save
// (see state/storage.js's 'ig342.gameState.v1'). Never read/written by GameStateContext.
const INTRO_SEEN_KEY = 'signalRise.introSeen'

export function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === 'true'
  } catch {
    return false
  }
}

export function markIntroSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, 'true')
  } catch {
    // Non-critical — worst case the intro replays next launch.
  }
}
