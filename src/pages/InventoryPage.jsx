import { useState } from 'react'
import { useGameState } from '../state/GameStateContext.jsx'
import { getResourceLabel, getItemTypeLabel } from '../utils/formatReward.js'
import CargoIcon from '../components/CargoIcon.jsx'

export default function InventoryPage() {
  const { state } = useGameState()
  const { resources, inventory } = state
  const [selection, setSelection] = useState(null)

  const selectedResourceKey = selection?.kind === 'resource' ? selection.key : null
  const selectedItem =
    selection?.kind === 'item' ? inventory.items.find((item) => item.id === selection.key) ?? null : null

  return (
    <section className="page cargo-bay">
      <header className="cargo-bay__header">
        <h1>CARGO BAY</h1>
        <p className="cargo-bay__subtitle">ศูนย์จัดเก็บทรัพยากรและข้อมูลบนยาน</p>
      </header>

      <div className="cargo-grid">
        <div className="command-block cargo-resources cargo-grid__resources">
          <div className="cargo-resources__scanlines" aria-hidden="true" />
          <div className="command-block__head">
            <h2>CARGO RESOURCES</h2>
          </div>
          <ul className="cargo-modules">
            {Object.entries(resources).map(([key, value]) => (
              <li key={key}>
                <button
                  type="button"
                  className={'cargo-module' + (selectedResourceKey === key ? ' is-selected' : '')}
                  onClick={() => setSelection({ kind: 'resource', key })}
                >
                  <CargoIcon variant={key} />
                  <span className="cargo-module__label">{getResourceLabel(key)}</span>
                  <span className="cargo-module__qty">×{value}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="command-block cargo-grid__items">
          <div className="command-block__head">
            <h2>STORED ITEMS</h2>
          </div>

          {inventory.items.length === 0 ? (
            <div className="cargo-empty">
              <p className="cargo-empty__title">CARGO STORAGE EMPTY</p>
              <p className="cargo-empty__text">ยังไม่มี Item ถูกจัดเก็บใน Cargo Bay</p>
            </div>
          ) : (
            <div className="cargo-items-grid">
              {inventory.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={'cargo-item-card' + (selectedItem?.id === item.id ? ' is-selected' : '')}
                  onClick={() => setSelection({ kind: 'item', key: item.id })}
                >
                  <CargoIcon variant={item.type} />
                  <span className="cargo-item-card__name">{item.name}</span>
                  <span className="cargo-item-card__type">{getItemTypeLabel(item.type)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="command-block cargo-grid__detail">
          <div className="command-block__head">
            <h2>ITEM DATA</h2>
          </div>

          {!selection && <p className="cargo-hint">เลือกข้อมูลหรือทรัพยากรเพื่อดูรายละเอียด</p>}

          {selectedResourceKey && (
            <div className="item-data">
              <CargoIcon variant={selectedResourceKey} />
              <p className="item-data__name">{getResourceLabel(selectedResourceKey)}</p>
              <p className="item-data__row">
                <span className="item-data__row-label">TYPE</span>
                <span>RESOURCE</span>
              </p>
              <p className="item-data__row">
                <span className="item-data__row-label">QUANTITY</span>
                <span>×{resources[selectedResourceKey]}</span>
              </p>
              <span className="status-chip status-chip--good">STORED</span>
            </div>
          )}

          {selectedItem && (
            <div className="item-data">
              <CargoIcon variant={selectedItem.type} />
              <p className="item-data__name">{selectedItem.name}</p>
              <p className="item-data__row">
                <span className="item-data__row-label">TYPE</span>
                <span>{getItemTypeLabel(selectedItem.type)}</span>
              </p>
              <span className="status-chip status-chip--good">STORED</span>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
