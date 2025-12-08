import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAbout(currentUser.about || "");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name: name.trim(), about: about.trim() });
  };

  return (
    <form className="popup__form form" name="edit-form" onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="popup__input"
          id="name"
          name="name"
          required
          placeholder="Tu nombre"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error" id="name-error"></span>
      </div>

      <div className="popup__input-container">
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="popup__input"
          id="about"
          name="about"
          required
          placeholder="Descripción"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error" id="descripcion-error"></span>
      </div>

      <button type="submit" className="popup__submit-button">
        Guardar
      </button>
    </form>
  );
}
