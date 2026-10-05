import { useState } from 'react'
import { MISSION_CATEGORIES, MISSION_DIFFICULTIES, MISSION_PRIORITIES } from '../data/missions.js'
import { applyExpGain } from '../data/captain.js'
import { useGameState } from '../state/GameStateContext.jsx'
import { getSuggestedMissions } from '../logic/aiCompanion.js'
import { getRewardChips } from '../utils/formatReward.js'
import RewardModal from '../components/RewardModal.jsx'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'
import AiCore from '../components/AiCore.jsx'

const TABS = [
  { id: 'suggested', label: 'Suggested' },
  { id: 'my', label: 'My Missions' },
  { id: 'completed', label: 'Completed' },
]

const EMPTY_FORM = {
  title: '',
  category: MISSION_CATEGORIES[0],
  difficulty: MISSION_DIFFICULTIES[0],
  priority: MISSION_PRIORITIES[1],
  deadline: '',
}

function formatDeadline(deadline) {
  if (!deadline) return null
  const date = new Date(deadline)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleString()
}

export default function MissionsPage() {
  const { state, actions } = useGameState()
  const [activeTab, setActiveTab] = useState('suggested')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [rewardModal, setRewardModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const { templates, active, completed } = state.missions
  const addedTemplateIds = new Set(active.map((m) => m.templateId).filter(Boolean))

  // Same rule-based logic as Command Room — just asking it for the single top pick here.
  const recommended = getSuggestedMissions(state, 1)[0] ?? null
  const recommendedIsAdded = recommended
    ? recommended.status !== 'suggested' || addedTemplateIds.has(recommended.id)
    : false

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleCompleteMission(mission) {
    const predictedCaptain = applyExpGain(state.captain, mission.rewards.exp)
    setRewardModal({
      missionTitle: mission.title,
      rewards: mission.rewards,
      leveledUp: predictedCaptain.level > state.captain.level,
      newLevel: predictedCaptain.level,
    })
    actions.completeMission(mission.id)
  }

  function handleDeleteMission(mission) {
    if (mission.status === 'active') {
      setDeleteConfirm(mission)
    } else {
      actions.removeMission(mission.id)
    }
  }

  function handleConfirmDelete() {
    actions.removeMission(deleteConfirm.id)
    setDeleteConfirm(null)
  }

  function handleSubmitCustomMission(event) {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) {
      setFormError('กรุณาใส่ชื่อ Mission')
      return
    }
    actions.addCustomMission({
      title,
      category: form.category,
      difficulty: form.difficulty,
      priority: form.priority,
      deadline: form.deadline || null,
    })
    setForm(EMPTY_FORM)
    setFormError('')
    setIsFormOpen(false)
    setActiveTab('my')
  }

  return (
    <section className="page missions-terminal">
      <header className="missions-terminal__header">
        <div>
          <h1>TACTICAL MISSION TERMINAL</h1>
          <p className="missions-terminal__subtitle">ศูนย์จัดการภารกิจของ Captain</p>
        </div>
        <button type="button" className="ghost-link" onClick={() => setIsFormOpen(true)}>
          + สร้างภารกิจเอง
        </button>
      </header>

      {isFormOpen && (
        <form className="command-block mission-form" onSubmit={handleSubmitCustomMission}>
          <div className="command-block__head">
            <h2>CUSTOM MISSION</h2>
          </div>

          <label className="field">
            <span className="field__label">ชื่อ Mission</span>
            <input
              type="text"
              className="field__input"
              value={form.title}
              onChange={(event) => handleFormChange('title', event.target.value)}
              placeholder="เช่น เดิน 5000 ก้าว"
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span className="field__label">Category</span>
              <select
                className="field__input"
                value={form.category}
                onChange={(event) => handleFormChange('category', event.target.value)}
              >
                {MISSION_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Difficulty</span>
              <select
                className="field__input"
                value={form.difficulty}
                onChange={(event) => handleFormChange('difficulty', event.target.value)}
              >
                {MISSION_DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span className="field__label">Priority</span>
              <select
                className="field__input"
                value={form.priority}
                onChange={(event) => handleFormChange('priority', event.target.value)}
              >
                {MISSION_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Deadline (ถ้ามี)</span>
              <input
                type="datetime-local"
                className="field__input"
                value={form.deadline}
                onChange={(event) => handleFormChange('deadline', event.target.value)}
              />
            </label>
          </div>

          {formError && <p className="field-error">{formError}</p>}

          <div className="quick-actions">
            <button type="submit" className="btn btn--primary">
              บันทึก Mission
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setIsFormOpen(false)
                setForm(EMPTY_FORM)
                setFormError('')
              }}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      )}

      <div className="command-block missions-terminal__ai">
        <div className="command-block__head">
          <h2>AI COMPANION</h2>
          <span className="missions-terminal__ai-tag">RECOMMENDED</span>
        </div>

        {recommended ? (
          <div className="ai-companion missions-terminal__ai-body">
            <AiCore />
            <div className="ai-companion__speech">
              <p className="ai-companion__line">"Captain, ภารกิจนี้ควรทำก่อนครับ"</p>
              <p className="ai-companion__mission">{recommended.title}</p>
              <p className="mcard__meta">
                {recommended.category.toUpperCase()} · {recommended.difficulty.toUpperCase()} · PRIORITY{' '}
                {recommended.priority.toUpperCase()}
              </p>
              <div className="mcard__chips">
                {getRewardChips(recommended.rewards).map((chip) => (
                  <span key={chip} className="reward-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="ai-companion__action">
              <button
                type="button"
                className="btn btn--primary"
                disabled={recommendedIsAdded}
                onClick={() => actions.acceptMission(recommended.id)}
              >
                {recommendedIsAdded ? '✓ เพิ่มแล้ว' : 'เพิ่มภารกิจ'}
              </button>
            </div>
          </div>
        ) : (
          <p className="ai-companion__hint">ยังไม่มีภารกิจให้แนะนำตอนนี้ครับ</p>
        )}
      </div>

      <div className="tabs tabs--tactical" role="tablist">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={'tabs__item' + (activeTab === tab.id ? ' is-active' : '')}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tabs__index">{String(index + 1).padStart(2, '0')}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'suggested' && (
        <div>
          <p className="missions-terminal__section-label">MISSION DATABASE</p>
          {templates.length === 0 ? (
            <p className="empty-state">ยังไม่มี Mission แนะนำ</p>
          ) : (
            <div className="mission-grid">
              {templates.map((mission, index) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  index={index}
                  variant="suggested"
                  isAdded={addedTemplateIds.has(mission.id)}
                  onAccept={() => actions.acceptMission(mission.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'my' && (
        <div>
          <p className="missions-terminal__section-label">ACTIVE ROSTER</p>
          {active.length === 0 ? (
            <p className="empty-state">ยังไม่มี Mission ที่กำลังทำ — ไปที่แท็บ Suggested หรือสร้าง Custom Mission</p>
          ) : (
            <div className="mission-grid">
              {active.map((mission, index) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  index={index}
                  variant="my"
                  onStart={() => actions.startMission(mission.id)}
                  onComplete={() => handleCompleteMission(mission)}
                  onDelete={() => handleDeleteMission(mission)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'completed' && (
        <div>
          <p className="missions-terminal__section-label">MISSION ARCHIVE</p>
          {completed.length === 0 ? (
            <p className="empty-state">ยังไม่มี Mission ที่สำเร็จ</p>
          ) : (
            <div className="mission-grid">
              {[...completed].reverse().map((mission, index) => (
                <MissionCard key={mission.id} mission={mission} index={index} variant="completed" />
              ))}
            </div>
          )}
        </div>
      )}

      {rewardModal && <RewardModal {...rewardModal} onClose={() => setRewardModal(null)} />}

      {deleteConfirm && (
        <ConfirmDeleteModal
          missionTitle={deleteConfirm.title}
          onCancel={() => setDeleteConfirm(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  )
}

function MissionCard({ mission, index, variant, isAdded, onAccept, onStart, onComplete, onDelete }) {
  const deadlineLabel = formatDeadline(mission.deadline)
  const isArchive = variant === 'completed'

  return (
    <div className={'command-block mcard' + (isArchive ? ' mcard--archive' : '')}>
      <div className="mcard__head">
        <span className="mcard__index">{String(index + 1).padStart(2, '0')}</span>
        {variant === 'my' && (
          <span className={'mstatus ' + (mission.status === 'not_started' ? 'mstatus--standby' : 'mstatus--active')}>
            {mission.status === 'not_started' ? 'STANDBY' : 'ACTIVE'}
          </span>
        )}
        {isArchive && <span className="mstatus mstatus--completed">COMPLETED</span>}
      </div>

      <p className="mcard__title">{mission.title}</p>
      <p className="mcard__meta">
        {mission.category.toUpperCase()} · {mission.difficulty.toUpperCase()} · PRIORITY{' '}
        {mission.priority.toUpperCase()}
        {deadlineLabel ? ` · ${deadlineLabel}` : ''}
        {mission.isCustom ? ' · CUSTOM' : ''}
      </p>

      <div className="mcard__chips">
        {getRewardChips(mission.rewards).map((chip) => (
          <span key={chip} className="reward-chip">
            {chip}
          </span>
        ))}
      </div>

      {variant === 'suggested' && (
        <div className="mcard__actions">
          <button type="button" className="btn btn--sm" disabled={isAdded} onClick={onAccept}>
            {isAdded ? '✓ เพิ่มแล้ว' : '+ เพิ่มภารกิจ'}
          </button>
        </div>
      )}

      {variant === 'my' && (
        <div className="mcard__actions">
          {mission.status === 'not_started' ? (
            <button type="button" className="btn btn--sm" onClick={onStart}>
              เริ่มภารกิจ
            </button>
          ) : (
            <button type="button" className="btn btn--sm btn--primary" onClick={onComplete}>
              Complete
            </button>
          )}
          <button type="button" className="btn btn--sm btn--delete" onClick={onDelete}>
            🗑 ลบภารกิจ
          </button>
        </div>
      )}
    </div>
  )
}
