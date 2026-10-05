// Purely presentational hologram — no state, no logic of its own.
export default function AiCore() {
  return (
    <div className="ai-core" aria-hidden="true">
      <svg className="ai-core__svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="aiCoreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#33f0ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle className="ai-core__ring ai-core__ring--outer" cx="60" cy="60" r="50" />
        <circle className="ai-core__ring ai-core__ring--inner" cx="60" cy="60" r="37" />
        <polygon className="ai-core__geo" points="60,26 90,60 60,94 30,60" />
        <circle className="ai-core__center" cx="60" cy="60" r="9" />
      </svg>
      <span className="ai-core__particle ai-core__particle--1" />
      <span className="ai-core__particle ai-core__particle--2" />
      <span className="ai-core__particle ai-core__particle--3" />
    </div>
  )
}
