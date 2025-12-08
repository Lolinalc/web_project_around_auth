export default function Popup({ onClose, title, children, isOpen }) {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="popup popup_opened" onClick={handleOverlayClick}>
      {" "}
      <div className="popup_content">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          {" "}
          x{" "}
        </button>

        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
