import { useState } from 'react'
import { useGameState } from '../state/GameStateContext.jsx'
import { isNodeUnlocked, getJumpBlockedReason } from '../logic/galaxy.js'
import { UNKNOWN_SIGNAL_EVENT } from '../data/event.js'
import { MEMORY_LOG_01 } from '../data/memoryLog.js'
import { getPostEventCompanionMessage } from '../logic/story.js'
import ProgressBar from '../components/ProgressBar.jsx'
import EventModal from '../components/EventModal.jsx'
import MemoryLogModal from '../components/MemoryLogModal.jsx'

export default function GalaxyPage() {
  const { state, actions } = useGameState()
  const { chapterProgress, galaxy, warpEnergy, story } = state
  const [showMemoryLog, setShowMemoryLog] = useState(false)
  const [justJumped, setJustJumped] = useState(false)

  const destinationNode = galaxy.nodes[0]
  const unlocked = isNodeUnlocked(state)
  const blockedReason = getJumpBlockedReason(destinationNode, state)
  const isEventOpen = story.hasJumped && story.event.status === 'pending'
  const currentMilestone = chapterProgress.milestones[chapterProgress.currentMilestoneIndex]
  const lastNodeIndex = chapterProgress.milestones.length - 1

  function handleJump() {
    actions.jumpToNode(destinationNode.id)
    setJustJumped(true)
    setTimeout(() => setJustJumped(false), 900)
  }

  return (
    <section className="page navigation-room">
      <header className="navigation-room__header">
        <h1>NAVIGATION ROOM</h1>
        <p className="navigation-room__subtitle">ระบบนำทางและแผนที่กาแล็กซี</p>
      </header>

      <div className="navigation-grid">
        <div className="command-viewport starmap">
          <div className="command-viewport__stars" aria-hidden="true" />
          <div className="starmap__grid-lines" aria-hidden="true" />
          <div className="starmap__radar" aria-hidden="true">
            <span className="starmap__ring starmap__ring--a" />
            <span className="starmap__ring starmap__ring--b" />
            <span className="starmap__ring starmap__ring--c" />
          </div>
          <span className="starmap__sweep" aria-hidden="true" />

          <div className="starmap__content">
            <div className="starmap__route">
              {chapterProgress.milestones.map((milestone, index) => {
                const isUnlocked = chapterProgress.unlockedGalaxyNodeIds.includes(milestone.id)
                const isCurrent = index === chapterProgress.currentMilestoneIndex
                const isAnomaly = index === lastNodeIndex
                return (
                  <div
                    key={milestone.id}
                    className={'starmap__node-slot' + (isUnlocked ? ' is-traveled' : '')}
                  >
                    <div
                      className={
                        'starmap__node' +
                        (isUnlocked ? ' is-unlocked' : '') +
                        (isCurrent ? ' is-current' : '') +
                        (isAnomaly ? ' starmap__node--anomaly' : '')
                      }
                      title={milestone.title}
                    >
                      <span className="starmap__node-dot" />
                      <span className="starmap__node-index">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="starmap__caption">
              CURRENT POSITION · {currentMilestone ? currentMilestone.title.toUpperCase() : '—'}
            </p>
          </div>

          <div className="command-viewport__bezel" aria-hidden="true" />
        </div>

        <aside className={'command-block navigation-room__destination' + (justJumped ? ' card--flash' : '')}>
          <div className="command-block__head">
            <h2>DESTINATION</h2>
            <span className={'status-chip ' + (unlocked ? 'status-chip--good' : 'status-chip--locked')}>
              {unlocked ? 'AVAILABLE' : 'LOCKED'}
            </span>
          </div>

          <p className="destination__name destination__name--anomaly">{destinationNode.name.toUpperCase()}</p>
          <p className="destination__source">UNKNOWN SOURCE</p>
          <p className="mcard__meta">{destinationNode.summary}</p>

          <div className="destination__stats">
            <div className="destination__stat">
              <span className="destination__stat-label">
                WARP ENERGY · {warpEnergy.current} / {warpEnergy.max}
              </span>
              <ProgressBar value={warpEnergy.current} max={warpEnergy.max} tone="warp" label="Warp Energy" />
            </div>
            <div className="destination__stat-row">
              <div className="destination__stat">
                <span className="destination__stat-label">WARP COST</span>
                <span className="destination__stat-value">{destinationNode.warpCost}</span>
              </div>
              <div className="destination__stat">
                <span className="destination__stat-label">THREAT</span>
                <span className="destination__stat-value">{destinationNode.threat.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {story.hasJumped ? (
            <p className="destination__status-note">
              {story.event.status === 'resolved'
                ? 'Warp Jump สำเร็จ — Event คลี่คลายแล้ว'
                : 'Warp Jump สำเร็จ — Event ยังไม่คลี่คลาย'}
            </p>
          ) : (
            blockedReason && (
              <div className="destination__lock-reason">
                <p className="destination__lock-label">LOCK REQUIREMENT</p>
                <p className="destination__lock-text">{blockedReason}</p>
              </div>
            )
          )}

          <button type="button" className="objective__cta" disabled={!!blockedReason} onClick={handleJump}>
            WARP JUMP
          </button>
        </aside>
      </div>

      <div className="command-block navigation-room__route">
        <div className="command-block__head">
          <h2>CHAPTER ROUTE</h2>
        </div>
        <ul className="route-list">
          {chapterProgress.milestones.map((milestone, index) => {
            const isUnlocked = chapterProgress.unlockedGalaxyNodeIds.includes(milestone.id)
            const isCurrent = index === chapterProgress.currentMilestoneIndex
            return (
              <li
                key={milestone.id}
                className={'route-list__item' + (isUnlocked ? ' is-unlocked' : '')}
              >
                <span className="route-list__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="route-list__dot" />
                <span className="route-list__label">{milestone.title}</span>
                {isCurrent && <span className="mstatus mstatus--active">CURRENT</span>}
                {milestone.completed && <span className="mstatus mstatus--completed">DONE</span>}
              </li>
            )
          })}
        </ul>
      </div>

      {story.event.status === 'resolved' && (
        <div className="command-block">
          <div className="command-block__head">
            <h2>EVENT RESULT</h2>
          </div>
          <p className="mission-item__meta">{getPostEventCompanionMessage(story)}</p>
        </div>
      )}

      {story.memoryLogUnlocked && (
        <div className="command-block">
          <div className="command-block__head">
            <h2>MEMORY LOG #01</h2>
          </div>
          <p className="mission-item__meta">ปลดล็อกแล้ว — พร้อมอ่าน</p>
          <button type="button" className="ghost-link" onClick={() => setShowMemoryLog(true)}>
            อ่าน
          </button>
        </div>
      )}

      {story.chapterComplete && (
        <div className="command-block">
          <div className="command-block__head">
            <h2>CHAPTER 1 COMPLETE</h2>
          </div>
          <p className="hero-line">Next: Further route unavailable in Demo</p>
        </div>
      )}

      {isEventOpen && (
        <EventModal event={UNKNOWN_SIGNAL_EVENT} onChoose={(choiceId) => actions.resolveEvent(choiceId)} />
      )}

      {showMemoryLog && (
        <MemoryLogModal log={MEMORY_LOG_01} onClose={() => setShowMemoryLog(false)} />
      )}
    </section>
  )
}
