import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function NewCard() {
  const { handleAddCard } = useContext(CurrentUserContext);
  const [titleNewCard, setTitleNewCard] = useState("");
  const [linkNewCard, setLinkNewCard] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const title = titleNewCard.trim();
    const link = linkNewCard.trim();

    if (title && link) {
      handleAddCard({
        name: title,
        link: link,
      });
      setTitleNewCard();
      setLinkNewCard();
    }
  }

  return (
    <form className="popup__form form" name="add-form" onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          type="text"
          className="popup__input"
          id="title"
          name="title"
          required
          placeholder="Título"
          minLength="2"
          maxLength="30"
          value={titleNewCard}
          onChange={(e) => setTitleNewCard(e.target.value)}
        />
        <span className="popup__input-error" id="title-error">
          Por favor, rellena este campo.
        </span>
      </div>

      <div className="popup__input-container">
        <input
          type="url"
          value={linkNewCard}
          onChange={(e) => setLinkNewCard(e.target.value)}
          className="popup__input"
          id="link"
          name="link"
          required
          placeholder="Enlace de la imagen"
        />
        <span className="popup__input-error" id="link-error">
          Por favor, introduce una dirección web.
        </span>
      </div>

      <button type="submit" className="popup__submit-button">
        Crear
      </button>
    </form>
  );
}
