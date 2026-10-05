import { useEscapeToClose } from '../hooks/useEscapeToClose.js'

export default function MemoryLogModal({ log, onClose }) {
  useEscapeToClose(onClose)
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal memory-log-modal">
        <p className="reward-modal__eyebrow">Memory Log</p>
        <h2 className="reward-modal__title">{log.title}</h2>
        <p className="memory-log-modal__content">{log.content}</p>
        <button type="button" className="btn btn--primary" onClick={onClose}>
          ปิด
        </button>
      </div>
    </div>
  )
}
