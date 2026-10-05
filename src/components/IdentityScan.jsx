// Purely presentational — decorative holographic ID silhouette for the Captain Quarters.
// No props, no game data: a generic bust outline, scan line, biometric rings and corner
// brackets built with CSS/SVG only (no real photo, no face recognition).
export default function IdentityScan() {
  return (
    <div className="identity-scan-wrap" aria-hidden="true">
      <span className="identity-scan__corner identity-scan__corner--tl" />
      <span className="identity-scan__corner identity-scan__corner--tr" />
      <span className="identity-scan__corner identity-scan__corner--bl" />
      <span className="identity-scan__corner identity-scan__corner--br" />

      <div className="identity-scan">
        <div className="identity-scan__rings">
          <span className="identity-scan__ring identity-scan__ring--a" />
          <span className="identity-scan__ring identity-scan__ring--b" />
        </div>
        <span className="identity-scan__scan" />
        <svg className="identity-scan__svg" viewBox="0 0 160 200">
          <path
            className="identity-scan__shoulders"
            d="M22 196 C22 142 48 116 80 116 C112 116 138 142 138 196"
          />
          <circle className="identity-scan__head" cx="80" cy="62" r="36" />
          <line className="identity-scan__crosshair" x1="80" y1="10" x2="80" y2="30" />
          <line className="identity-scan__crosshair" x1="80" y1="94" x2="80" y2="114" />
        </svg>
      </div>

      <span className="identity-scan__caption">PERSONNEL SCAN</span>
    </div>
  )
}
