export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup popup_opened" onClick={handleOverlayClick}>
      <div className="popup_content popup_content_tooltip">
        <button className="popup__close-button" type="button" onClick={onClose}>
          X
        </button>
        <div className="tooltip">
          <div
            className={`tooltip__icon ${
              isSuccess ? "tooltip__icon_success" : "tooltip__icon_error"
            }`}
          ></div>
          <p className="tooltip__message">{message}</p>
        </div>
      </div>
    </div>
  );
}
