import { useEffect, useState } from 'react'
import { useGameState } from '../state/GameStateContext.jsx'
import { getResourceLabel } from '../utils/formatReward.js'
import EngineeringHologram from '../components/EngineeringHologram.jsx'

const REPAIRABLE_SYSTEMS = ['power', 'scanner']
const SYSTEM_ORDER = ['power', 'scanner', 'navigation', 'hull']

function getDefaultSelectedKey(shipSystems) {
  if (shipSystems.power.status !== 'operational') return 'power'
  if (shipSystems.scanner.status !== 'operational') return 'scanner'
  return 'power'
}

export default function ShipPage() {
  const { state, actions } = useGameState()
  const { shipSystems, resources } = state
  const [feedback, setFeedback] = useState(null)
  const [selectedKey, setSelectedKey] = useState(() => getDefaultSelectedKey(shipSystems))

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(null), 2500)
    return () => clearTimeout(timer)
  }, [feedback])

  function canAfford(cost) {
    return Object.entries(cost).every(([resource, amount]) => (resources[resource] ?? 0) >= amount)
  }

  function handleRepair(key, system) {
    if (key === 'scanner' && shipSystems.power.status !== 'operational') {
      setFeedback({ tone: 'error', text: 'ต้องซ่อม Power ให้เสร็จก่อนถึงจะซ่อม Scanner ได้' })
      return
    }
    if (!canAfford(system.repairCost)) {
      setFeedback({ tone: 'error', text: `Resource ไม่พอสำหรับซ่อม ${system.name}` })
      return
    }
    actions.repairShipSystem(key)
    setFeedback({ tone: 'success', text: `ซ่อม ${system.name} สำเร็จ!` })
  }

  const selectedSystem = shipSystems[selectedKey]
  const isRepairable = REPAIRABLE_SYSTEMS.includes(selectedKey)
  const isOperational = selectedSystem.status === 'operational'
  const isLocked = selectedKey === 'scanner' && shipSystems.power.status !== 'operational'
  const affordable = isRepairable && canAfford(selectedSystem.repairCost)

  return (
    <section className="page engineering-bay">
      <header className="engineering-bay__header">
        <h1>ENGINEERING BAY</h1>
        <p className="engineering-bay__subtitle">ศูนย์ตรวจสอบและซ่อมระบบยาน</p>
      </header>

      <div className="engineering-grid">
        <div className="command-viewport engineering-viewport">
          <div className="command-viewport__stars" aria-hidden="true" />
          <EngineeringHologram systems={shipSystems} selectedKey={selectedKey} onSelect={setSelectedKey} />
          <div className="command-viewport__bezel" aria-hidden="true" />
        </div>

        <aside className="command-block engineering-bay__console">
          <div className="command-block__head">
            <h2>REPAIR CONSOLE</h2>
            <span
              className={
                'status-chip ' +
                (!isRepairable ? 'status-chip--locked' : isOperational ? 'status-chip--good' : 'status-chip--bad')
              }
            >
              {!isRepairable ? 'DEMO LOCK' : isOperational ? 'OPERATIONAL' : 'DAMAGED'}
            </span>
          </div>

          <p className="console__system-name">{selectedSystem.name.toUpperCase()}</p>
          <p className="mcard__meta">LEVEL {selectedSystem.level}</p>

          {!isRepairable && (
            <p className="console__note">ยังไม่เปิดใช้งานระบบซ่อมใน Demo นี้</p>
          )}

          {isRepairable && isOperational && <p className="console__note console__note--good">SYSTEM OPERATIONAL</p>}

          {isRepairable && !isOperational && (
            <div className="console__requirement">
              <p className="console__requirement-label">REQUIRED</p>
              <div className="mcard__chips">
                {Object.entries(selectedSystem.repairCost).map(([resource, amount]) => {
                  const available = resources[resource] ?? 0
                  const insufficient = available < amount
                  return (
                    <span
                      key={resource}
                      className={'resource-chip' + (insufficient ? ' resource-chip--insufficient' : '')}
                    >
                      {getResourceLabel(resource)} ×{amount}
                    </span>
                  )
                })}
              </div>
              <p className="console__requirement-label console__requirement-label--available">AVAILABLE</p>
              <div className="mcard__chips">
                {Object.keys(selectedSystem.repairCost).map((resource) => (
                  <span key={resource} className="resource-chip resource-chip--available">
                    {getResourceLabel(resource)} ×{resources[resource] ?? 0}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isRepairable && !isOperational && isLocked && (
            <div className="destination__lock-reason">
              <p className="destination__lock-label">DEPENDENCY</p>
              <p className="destination__lock-text">ต้องซ่อม Power ก่อน</p>
            </div>
          )}

          {isRepairable && !isOperational && !isLocked && !affordable && (
            <p className="console__note console__note--warn">Resource ไม่พอสำหรับซ่อมระบบนี้</p>
          )}

          {isRepairable && !isOperational && (
            <button
              type="button"
              className="objective__cta"
              disabled={isLocked || !affordable}
              onClick={() => handleRepair(selectedKey, selectedSystem)}
            >
              ซ่อมระบบ
            </button>
          )}
        </aside>
      </div>

      <div className="command-block engineering-bay__overview">
        <div className="command-block__head">
          <h2>SHIP SYSTEMS</h2>
        </div>
        <ul className="sys-overview">
          {SYSTEM_ORDER.map((key, index) => {
            const system = shipSystems[key]
            const repairable = REPAIRABLE_SYSTEMS.includes(key)
            const operational = system.status === 'operational'
            return (
              <li key={key} className={'sys-overview__item' + (selectedKey === key ? ' is-selected' : '')}>
                <button type="button" className="sys-overview__button" onClick={() => setSelectedKey(key)}>
                  <span className="route-list__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="route-list__label">{system.name.toUpperCase()}</span>
                  <span
                    className={
                      'status-chip ' +
                      (!repairable ? 'status-chip--locked' : operational ? 'status-chip--good' : 'status-chip--bad')
                    }
                  >
                    {!repairable ? 'DEMO LOCK' : operational ? 'OPERATIONAL' : 'DAMAGED'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {feedback && (
        <p className={'ship-feedback ship-feedback--' + feedback.tone}>{feedback.text}</p>
      )}
    </section>
  )
}
