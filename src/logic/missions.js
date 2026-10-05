import { MISSION_TEMPLATES } from '../data/missions.js'

// Safe, idempotent cleanup for My Missions — runs on every load (MISSION_MANAGEMENT_UX_FIX #7).
//
// Historical saves (from before templateId lineage existed) can contain multiple active
// instances of the same template, created back when "+ Add" had no duplicate guard. This
// matches old non-custom active/not_started entries against the 4 known templates by
// title+category+difficulty, keeps the first instance per template, drops the rest, and
// backfills templateId onto the survivor so the new duplicate-guard recognizes it going
// forward.
//
// Never touches: isCustom missions (matched or not), completed[] history, or any mission
// that doesn't match a known template.
export function deduplicateMissions(state) {
  const seenTemplateIds = new Set()
  const nextActive = []

  for (const mission of state.missions.active) {
    if (mission.isCustom) {
      nextActive.push(mission)
      continue
    }

    const template = MISSION_TEMPLATES.find(
      (t) =>
        t.title === mission.title &&
        t.category === mission.category &&
        t.difficulty === mission.difficulty,
    )

    if (!template) {
      nextActive.push(mission)
      continue
    }

    if (seenTemplateIds.has(template.id)) {
      continue // duplicate instance of a template already kept — drop it
    }

    seenTemplateIds.add(template.id)
    nextActive.push(mission.templateId ? mission : { ...mission, templateId: template.id })
  }

  return { ...state.missions, active: nextActive }
}
