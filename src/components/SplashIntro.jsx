import { useEffect, useState } from 'react'
import AiCore from './AiCore.jsx'

// Presentation-only intro sequence — no game state, no logic. Purely a staged reveal
// driven by timers; `onFinish` is the only way it talks to the rest of the app.
const STAGES = ['bg', 'core', 'wake', 'message', 'exit']
const STAGE_DELAYS = [700, 1500, 2300, 3400] // ms from mount, one per stage after 'bg'
const FINISH_DELAY = 3800

export default function SplashIntro({ onFinish }) {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const timers = STAGE_DELAYS.map((delay, i) => setTimeout(() => setStageIndex(i + 1), delay))
    const finishTimer = setTimeout(onFinish, FINISH_DELAY)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  const stage = STAGES[stageIndex]
  const showWake = stage === 'wake' || stage === 'message' || stage === 'exit'
  const showMessage = stage === 'message' || stage === 'exit'

  return (
    <div className={'splash-intro splash-intro--' + stage}>
      <div className="splash-intro__bg" aria-hidden="true">
        <span className="splash-intro__grid" />
        <span className="splash-intro__vignette" />
      </div>

      <button type="button" className="splash-intro__skip ghost-link" onClick={onFinish}>
        Skip
      </button>

      <div className="splash-intro__content">
        <div className="splash-intro__brand page-fade-in">
          <h1 className="splash-intro__logo">
            SIGNAL<span className="splash-intro__logo-slash">//</span>RISE
          </h1>
          <p className="splash-intro__tagline">Awaken. Repair. Rise.</p>
        </div>

        <div className="splash-intro__core">
          <AiCore />
        </div>

        <div className="splash-intro__status">
          {showWake && <p className="splash-intro__wake page-fade-in">EMERGENCY WAKE</p>}
          {showMessage && (
            <p className="splash-intro__message page-fade-in">
              &ldquo;Captain, ระบบหลักของยานยังไม่เสถียร&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
