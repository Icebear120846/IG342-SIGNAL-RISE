// Purely presentational — adapts the Command Room ship hologram visual language
// (rings/scan/hull/echo) for the Engineering Bay, adding 4 clickable system markers.
// Selection is UI-only and is reported to the caller via onSelect; no game state here.
const MARKERS = {
  scanner: { cx: 100, cy: 24, r: 6 },
  power: { cx: 100, cy: 88, r: 7 },
  navigation: { cx: 50, cy: 84, r: 6 },
  hull: { cx: 150, cy: 84, r: 6 },
}

const DEMO_LOCKED_KEYS = ['navigation', 'hull']

export default function EngineeringHologram({ systems, selectedKey, onSelect }) {
  return (
    <div className="ship-holo-wrap" aria-hidden="false">
      <div className="ship-holo">
        <div className="ship-holo__rings">
          <span className="ship-holo__ring ship-holo__ring--a" />
          <span className="ship-holo__ring ship-holo__ring--b" />
        </div>
        <span className="ship-holo__scan" />
        <svg className="ship-holo__svg" viewBox="0 0 200 140">
          <path
            className="ship-holo__hull ship-holo__hull--echo"
            d="M100 8 L128 58 L118 118 L100 104 L82 118 L72 58 Z"
          />
          <path className="ship-holo__hull" d="M100 8 L128 58 L118 118 L100 104 L82 118 L72 58 Z" />
          <path className="ship-holo__hull ship-holo__hull--wing" d="M72 58 L34 88 L60 94 L82 74 Z" />
          <path className="ship-holo__hull ship-holo__hull--wing" d="M128 58 L166 88 L140 94 L118 74 Z" />
          <line className="ship-holo__detail" x1="100" y1="20" x2="100" y2="100" />
          <line className="ship-holo__detail" x1="86" y1="60" x2="114" y2="60" />

          {Object.entries(MARKERS).map(([key, marker]) => {
            const system = systems[key]
            const isDemoLocked = DEMO_LOCKED_KEYS.includes(key)
            const isOperational = system.status === 'operational'
            const stateClass = isDemoLocked
              ? 'engineering-marker--locked'
              : isOperational
                ? 'engineering-marker--good'
                : 'engineering-marker--bad'

            return (
              <circle
                key={key}
                className={
                  'engineering-marker ' + stateClass + (selectedKey === key ? ' engineering-marker--selected' : '')
                }
                cx={marker.cx}
                cy={marker.cy}
                r={selectedKey === key ? marker.r + 2 : marker.r}
                onClick={() => onSelect(key)}
              />
            )
          })}
        </svg>
      </div>

      {Object.keys(MARKERS).map((key) => (
        <button
          key={key}
          type="button"
          className={'engineering-tag engineering-tag--' + key + (selectedKey === key ? ' is-active' : '')}
          onClick={() => onSelect(key)}
        >
          {key.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
