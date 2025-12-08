export default function ImagePopup({ onClose, card }) {
  if (!card) return null;
  return (
    <div className="popup popup_type_image popup_opened">
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          X
        </button>

        <img src={card.link} className="popup__image" alt={card.name} />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}
