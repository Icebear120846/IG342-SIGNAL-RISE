import { useEscapeToClose } from '../hooks/useEscapeToClose.js'
import { getResourceLabel, getStatLabel } from '../utils/formatReward.js'

export default function RewardModal({ missionTitle, rewards, leveledUp, newLevel, onClose }) {
  useEscapeToClose(onClose)
  const statEntries = Object.entries(rewards.statBoosts ?? {}).filter(([, value]) => value)
  const resourceEntries = Object.entries(rewards.resources ?? {}).filter(([, value]) => value)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal reward-modal">
        <p className="reward-modal__eyebrow">Mission Complete</p>
        <h2 className="reward-modal__title">{missionTitle}</h2>

        {leveledUp && <p className="reward-modal__levelup">Level Up! → Level {newLevel}</p>}

        <ul className="reward-modal__list">
          {rewards.exp > 0 && <li>+{rewards.exp} EXP</li>}
          {rewards.warpEnergy > 0 && <li>+{rewards.warpEnergy} Warp Energy</li>}
          {statEntries.map(([stat, value]) => (
            <li key={stat}>
              +{value} {getStatLabel(stat)}
            </li>
          ))}
          {resourceEntries.map(([resource, value]) => (
            <li key={resource}>
              +{value} {getResourceLabel(resource)}
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--primary" onClick={onClose}>
          รับทราบ
        </button>
      </div>
    </div>
  )
}
