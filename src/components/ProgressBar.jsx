export default function ProgressBar({ value, max, tone = 'accent', label }) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div
        className={'progress-bar__fill progress-bar__fill--' + tone}
        style={{ width: percent + '%' }}
      />
    </div>
  )
}
