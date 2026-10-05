// Purely presentational — lightweight CSS/SVG glyphs for cargo resources and item types.
// No props beyond which shape/tone to draw; carries no game data.
const SHAPES = {
  scrapMetal: <path d="M5 16 L9 4 L19 6 L20 15 L13 21 L6 20 Z" />,
  techFragments: (
    <g>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <line x1="7" y1="11" x2="3" y2="11" />
      <line x1="7" y1="15" x2="3" y2="15" />
      <line x1="17" y1="11" x2="21" y2="11" />
      <line x1="17" y1="15" x2="21" y2="15" />
      <line x1="11" y1="7" x2="11" y2="3" />
      <line x1="15" y1="7" x2="15" y2="3" />
    </g>
  ),
  dataCores: <path d="M12 2 L21 12 L12 22 L3 12 Z" />,
  loot: <path d="M5 16 L9 4 L19 6 L20 15 L13 21 L6 20 Z" />,
  data: <path d="M12 2 L21 12 L12 22 L3 12 Z" />,
  artifact: <path d="M12 2 L20 8 L17 20 L7 20 L4 8 Z" />,
}

export default function CargoIcon({ variant }) {
  return (
    <svg className={'cargo-icon cargo-icon--' + variant} viewBox="0 0 24 24" aria-hidden="true">
      {SHAPES[variant] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  )
}
