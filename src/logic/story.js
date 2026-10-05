import { UNKNOWN_SIGNAL_EVENT } from '../data/event.js'

// AI Companion's line after the Event resolves — reuses the chosen choice's own
// flavor text so the message always matches what actually happened.
export function getPostEventCompanionMessage(story) {
  const choice = UNKNOWN_SIGNAL_EVENT.choices.find((c) => c.id === story.event.resolvedChoiceId)
  return choice?.resultText ?? 'Chapter นี้จบลงแล้วครับ Captain'
}
