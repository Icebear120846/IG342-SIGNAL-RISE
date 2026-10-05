export default function EventModal({ event, onChoose }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal event-modal">
        <p className="reward-modal__eyebrow">Random Event</p>
        <h2 className="reward-modal__title">{event.title}</h2>
        <p className="event-modal__description">{event.description}</p>

        <div className="event-modal__choices">
          {event.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="btn event-modal__choice"
              onClick={() => onChoose(choice.id)}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
