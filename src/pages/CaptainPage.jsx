import { useGameState } from '../state/GameStateContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import IdentityScan from '../components/IdentityScan.jsx'
import { getStatLabel } from '../utils/formatReward.js'

// Presentational-only badge tier, derived from the existing rank string — does not
// touch getRankForLevel or its thresholds in data/captain.js.
const RANK_TIER = { Cadet: 1, Ensign: 2, Officer: 3, Commander: 4, Captain: 5 }

// Purely a visual scale for the capability meters (stats have no defined max in the
// data model) — the real number is always shown as text alongside the bar.
const STAT_METER_MAX = 20

export default function CaptainPage() {
  const { state } = useGameState()
  const { captain, stats, gameMode, chapterProgress, story } = state

  const levelLabel = String(captain.level).padStart(2, '0')
  const chapterLabel = String(chapterProgress.chapter).padStart(2, '0')
  const currentMilestone = chapterProgress.milestones[chapterProgress.currentMilestoneIndex]
  const rankTier = RANK_TIER[captain.rank] ?? 1

  return (
    <section className="page captain-quarters">
      <header className="captain-quarters__header">
        <h1>CAPTAIN QUARTERS</h1>
        <p className="captain-quarters__subtitle">แฟ้มข้อมูลและสถานะของ Captain</p>
      </header>

      <div className="captain-grid">
        <div className="command-block captain-grid__scan">
          <IdentityScan />
        </div>

        <aside className="command-block captain-grid__file">
          <div className="command-block__head">
            <h2>PERSONNEL FILE</h2>
            <span className="rank-badge">
              {Array.from({ length: rankTier }).map((_, i) => (
                <span key={i} className="rank-badge__pip" />
              ))}
              <span className="rank-badge__label">{captain.rank.toUpperCase()}</span>
            </span>
          </div>

          <p className="file-row file-row--name">{captain.name}</p>

          <div className="file-row">
            <span className="file-row__label">LEVEL</span>
            <span className="file-row__value">{levelLabel}</span>
          </div>

          <div className="file-stat">
            <span className="file-row__label">EXP {captain.exp} / {captain.expToNextLevel}</span>
            <ProgressBar value={captain.exp} max={captain.expToNextLevel} tone="accent" label="EXP progress" />
          </div>

          <div className="file-row">
            <span className="file-row__label">CHAPTER</span>
            <span className="file-row__value">{chapterLabel}</span>
          </div>
        </aside>

        <div className="command-block captain-grid__capability">
          <div className="command-block__head">
            <h2>CAPTAIN CAPABILITY</h2>
          </div>
          <ul className="capability-list">
            {Object.entries(stats).map(([key, value]) => (
              <li key={key} className="capability-list__row">
                <span className="capability-list__label">{getStatLabel(key)}</span>
                <ProgressBar value={value} max={STAT_METER_MAX} tone="stat" label={getStatLabel(key)} />
                <span className="capability-list__value">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="command-block captain-grid__service">
          <div className="command-block__head">
            <h2>SERVICE RECORD</h2>
            {story.chapterComplete && <span className="status-chip status-chip--good">COMPLETE</span>}
          </div>

          <div className="file-row">
            <span className="file-row__label">CHAPTER</span>
            <span className="file-row__value">{chapterLabel}</span>
          </div>
          <div className="file-row">
            <span className="file-row__label">CURRENT STATUS</span>
            <span className="file-row__value">
              {story.chapterComplete ? 'Chapter 1 Complete' : currentMilestone ? currentMilestone.title : '—'}
            </span>
          </div>
          <div className="file-row">
            <span className="file-row__label">STREAK</span>
            <span className="file-row__value">
              {gameMode.streak.current} (BEST {gameMode.streak.longest})
            </span>
          </div>
          <div className="file-row">
            <span className="file-row__label">RECOVERY CHARGES</span>
            <span className="file-row__value">{gameMode.streak.recoveryCharges}</span>
          </div>
          <div className="file-row">
            <span className="file-row__label">MODE</span>
            <span className="file-row__value">{gameMode.mode === 'casual' ? 'CASUAL' : 'CHALLENGE'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
