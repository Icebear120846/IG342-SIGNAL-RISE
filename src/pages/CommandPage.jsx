import { useNavigate } from 'react-router-dom'
import { useGameState } from '../state/GameStateContext.jsx'
import { getSuggestedMissions, getCompanionMessage } from '../logic/aiCompanion.js'
import { getMilestoneObjective, getMilestoneCompanionMessage } from '../logic/chapterProgress.js'
import { getPostEventCompanionMessage } from '../logic/story.js'
import { getResourceLabel } from '../utils/formatReward.js'
import ProgressBar from '../components/ProgressBar.jsx'
import ShipHologram from '../components/ShipHologram.jsx'
import AiCore from '../components/AiCore.jsx'

const SHIP_ROWS = [
  { key: 'power', label: 'POWER' },
  { key: 'scanner', label: 'SCANNER' },
  { key: 'navigation', label: 'NAVIGATION' },
  { key: 'hull', label: 'HULL' },
]

export default function CommandPage() {
  const navigate = useNavigate()
  const { state, actions } = useGameState()
  const { captain, stats, warpEnergy, shipSystems, chapterProgress, gameMode, story, resources } = state
  const currentMilestone = chapterProgress.milestones[chapterProgress.currentMilestoneIndex]

  const suggestions = getSuggestedMissions(state, 3)
  const nextMission = suggestions[0] ?? null
  const otherSuggestions = suggestions.slice(1)
  const chapterLabel = String(chapterProgress.chapter).padStart(2, '0')

  return (
    <section className="page command-room">
      <header className="command-room__header">
        <h1>COMMAND ROOM</h1>
        <p className="command-room__subtitle">
          {captain.rank} {captain.name} · CHAPTER {chapterLabel}
        </p>
      </header>

      <div className="command-grid">
        <div className="command-block command-block--ai">
          <div className="command-block__head">
            <h2>AI COMPANION</h2>
            <label className="holo-toggle">
              <input
                type="checkbox"
                checked={gameMode.autoAssign}
                onChange={actions.toggleAutoAssign}
              />
              <span>AUTO ASSIGN</span>
            </label>
          </div>

          <div className="ai-companion">
            <AiCore />
            <div className="ai-companion__speech">
              <p className="ai-companion__line">"Captain, ผมพบภารกิจที่ควรทำก่อนครับ"</p>
              {nextMission ? (
                <>
                  <p className="ai-companion__mission">
                    {nextMission.title}
                    {gameMode.autoAssign && (
                      <span className="badge badge--accent">AUTO-ASSIGNED</span>
                    )}
                  </p>
                  <p className="ai-companion__hint">{getCompanionMessage(nextMission, stats)}</p>
                </>
              ) : (
                <p className="ai-companion__hint">ยังไม่มีภารกิจให้แนะนำตอนนี้ครับ</p>
              )}
            </div>
          </div>

          {otherSuggestions.length > 0 && (
            <ul className="ai-companion__list">
              {otherSuggestions.map((mission) => (
                <li key={mission.id}>{mission.title}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="command-block command-block--objective">
          <div className="command-block__head">
            <h2>CURRENT OBJECTIVE</h2>
            {story.chapterComplete && <span className="status-chip status-chip--good">COMPLETE</span>}
          </div>

          {story.chapterComplete ? (
            <>
              <p className="objective__title">Chapter 1 Complete</p>
              <p className="objective__desc">{getPostEventCompanionMessage(story)}</p>
              <p className="objective__note">Next: Further route unavailable in Demo</p>
            </>
          ) : (
            <>
              <p className="objective__title">{currentMilestone ? currentMilestone.title : '—'}</p>
              <p className="objective__desc">{getMilestoneObjective(chapterProgress)}</p>
              <p className="objective__hint">{getMilestoneCompanionMessage(chapterProgress)}</p>
            </>
          )}

          <button type="button" className="objective__cta" onClick={() => navigate('/missions')}>
            เริ่มภารกิจ
          </button>

          <div className="objective__links">
            <button type="button" className="ghost-link" onClick={() => navigate('/ship')}>
              เปิดระบบยาน
            </button>
            <button type="button" className="ghost-link" onClick={() => navigate('/galaxy')}>
              แผนที่กาแล็กซี
            </button>
          </div>
        </div>

        <div className="command-viewport">
          <div className="command-viewport__stars" aria-hidden="true" />
          <ShipHologram
            powerOperational={shipSystems.power.status === 'operational'}
            scannerOperational={shipSystems.scanner.status === 'operational'}
          />
          <div className="command-viewport__bezel" aria-hidden="true" />
        </div>

        <aside className="command-block command-block--status">
          <h2>SHIP STATUS</h2>
          <ul className="ship-status">
            {SHIP_ROWS.map((row) => {
              const isOnline = shipSystems[row.key].status === 'operational'
              return (
                <li key={row.key} className="ship-status__row">
                  <span className={'ship-status__dot ' + (isOnline ? 'is-good' : 'is-bad')} />
                  <span className="ship-status__label">{row.label}</span>
                  <span className="ship-status__value">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="command-bottom">
          <div className="command-bottom__stat">
            <span className="command-bottom__label">
              LEVEL {captain.level} · EXP {captain.exp}/{captain.expToNextLevel}
            </span>
            <ProgressBar
              value={captain.exp}
              max={captain.expToNextLevel}
              tone="accent"
              label="EXP progress"
            />
          </div>
          <div className="command-bottom__stat">
            <span className="command-bottom__label">
              WARP ENERGY {warpEnergy.current}/{warpEnergy.max}
            </span>
            <ProgressBar
              value={warpEnergy.current}
              max={warpEnergy.max}
              tone="warp"
              label="Warp Energy"
            />
          </div>
          <div className="command-bottom__resources">
            <span>{getResourceLabel('scrapMetal')} {resources.scrapMetal}</span>
            <span>{getResourceLabel('techFragments')} {resources.techFragments}</span>
            <span>{getResourceLabel('dataCores')} {resources.dataCores}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
