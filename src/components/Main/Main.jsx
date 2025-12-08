import editButton from "../../images/edit-icon.svg";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import { useState, useContext } from "react";
import Card from "../Card/Card";
import api from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfile from "./components/form/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/form/EditAvatar/EditAvatar.jsx";
import NewCard from "./components/form/NewCard/NewCard.jsx";
import Popup from "./components/Popup/Popup.jsx";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onSetCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  function handleCloseImagePopup() {
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        onSetCard((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    try {
      if (!window.confirm("¿Borrar esta tarjeta?")) return;

      setDeletingId(card._id);
      await api.deleteCard(card._id);
      onSetCard((currentCards) =>
        currentCards.filter((currentCards) => currentCards._id !== card._id)
      );
    } catch (error) {
      console.error("Error al borrar la tarjeta:", error);
    }
  }

  const renderPopup = () => {
    switch (popup) {
      case "editProfile":
        return (
          <Popup onClose={onClosePopup} isOpen={true} title="Editar Perfil">
            <EditProfile />
          </Popup>
        );
      case "editAvatar":
        return (
          <Popup
            onClose={onClosePopup}
            isOpen={true}
            title="Editar Foto de Perfil"
          >
            <EditAvatar />
          </Popup>
        );
      case "newCard":
        return (
          <Popup onClose={onClosePopup} isOpen={true} title="Nuevo lugar">
            <NewCard />
          </Popup>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={() => onOpenPopup("editAvatar")}
        >
          <img
            src={currentUser?.avatar}
            className="profile__image"
            alt="profile image"
            onClick={() => onOpenPopup("editAvatar")}
          />
          <div className="profile__avatar-overlay">
            <button
              className="profile__avatar-button"
              type="button"
              onClick={() => onOpenPopup("editAvatar")}
            ></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__open-line">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <img
              src={editButton}
              className="profile__edit-button"
              alt="edit button"
              onClick={() => onOpenPopup("editProfile")}
            />
          </div>
          <p className="profile__description">{currentUser?.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup("newCard")}
        >
          +
        </button>
      </section>

      <section className="places">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isDeleting={deletingId === card._id}
            />
          ))}
        </ul>
      </section>

      {/*   {
        <Popup onClick={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      } */}
      {renderPopup()}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={handleCloseImagePopup} />
      )}
    </main>
  );
}
