import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const avatarValue = avatarRef.current.value.trim();
    if (avatarValue) {
      handleUpdateAvatar({ avatar: avatarValue });
    }
  }

  return (
    <form
      className="popup__form form"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="url"
          className="popup__input"
          id="avatar"
          name="avatar"
          ref={avatarRef}
          defaultValue=""
          required
          placeholder="Enlace de la imagen"
        />
        <span className="popup__input-error" id="avatar-error"></span>
      </div>

      <button type="submit" className="popup__submit-button">
        Guardar
      </button>
    </form>
  );
}
