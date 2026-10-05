// Purely presentational — renders Ship system status already computed by the caller.
// No state, no logic: Power/Scanner status comes in as booleans from GameStateContext.
export default function ShipHologram({ powerOperational, scannerOperational }) {
  return (
    // Outer wrap fills the viewport and is the positioning context for the tags, so their
    // placement stays anchored to the viewport (stable) rather than to the ship's own box
    // (which changes size) — keeps the labels from ever being clipped by a bigger ship.
    <div className="ship-holo-wrap" aria-hidden="true">
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
          <circle
            className={'ship-holo__marker' + (scannerOperational ? ' is-good' : ' is-bad')}
            cx="100"
            cy="24"
            r="6"
          />
          <circle
            className={'ship-holo__marker' + (powerOperational ? ' is-good' : ' is-bad')}
            cx="100"
            cy="88"
            r="7"
          />
        </svg>
      </div>
      <span className="ship-holo__tag ship-holo__tag--scanner">SCANNER</span>
      <span className="ship-holo__tag ship-holo__tag--power">POWER</span>
    </div>
  )
}
