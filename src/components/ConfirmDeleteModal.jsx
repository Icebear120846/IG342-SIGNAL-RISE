import { useEscapeToClose } from '../hooks/useEscapeToClose.js'

// Shown only when deleting an ACTIVE mission — NOT_STARTED missions delete immediately
// with no modal (MISSION_MANAGEMENT_UX_FIX #4).
export default function ConfirmDeleteModal({ missionTitle, onCancel, onConfirm }) {
  useEscapeToClose(onCancel)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal confirm-modal">
        <p className="reward-modal__eyebrow">Confirm Delete</p>
        <h2 className="reward-modal__title">ยกเลิกภารกิจนี้หรือไม่?</h2>
        <p className="confirm-modal__mission">{missionTitle}</p>
        <p className="confirm-modal__desc">
          คุณเริ่มภารกิจนี้แล้ว หากลบตอนนี้ ความคืบหน้าของภารกิจนี้จะหายไป
        </p>

        <div className="confirm-modal__section">
          <p className="confirm-modal__label confirm-modal__label--lose">สิ่งที่จะเสีย</p>
          <ul>
            <li>สถานะและความคืบหน้าของภารกิจนี้</li>
            <li>ภารกิจจะถูกนำออกจาก My Missions</li>
          </ul>
        </div>

        <div className="confirm-modal__section">
          <p className="confirm-modal__label confirm-modal__label--keep">สิ่งที่จะไม่เสีย</p>
          <ul>
            <li>EXP ที่ได้รับจากภารกิจอื่น</li>
            <li>Warp Energy เดิม</li>
            <li>Resource เดิม</li>
            <li>Progress ของภารกิจอื่น</li>
          </ul>
        </div>

        <div className="quick-actions">
          <button type="button" className="btn" onClick={onCancel}>
            กลับไปทำต่อ
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            ยืนยันลบ
          </button>
        </div>
      </div>
    </div>
  )
}
