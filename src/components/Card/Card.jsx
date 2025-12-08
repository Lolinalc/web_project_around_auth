import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import trashIcon from "../../images/trashIcon.png";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, likes, owner } = card;
  const isOwn = owner === currentUser._id;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = likes?.some((user) =>
      typeof user === "string"
        ? user === currentUser._id
        : user._id === currentUser._id
    );
    setIsLiked(liked);
  }, [likes, currentUser._id]);

  const cardLikeButtonClassName = `places__like ${
    isLiked ? "places__like_active" : ""
  }`;

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    const cardWithLikeStatus = {
      ...card,
      isLiked: !isLiked,
    };

    onCardLike(cardWithLikeStatus);
  };

  return (
    <li className="places__cards">
      <img
        src={trashIcon}
        alt="trash icon"
        onClick={() => onCardDelete(card)}
        className={`places__trash ${isOwn ? "" : "places__trash_hidden"}`}
      />

      <img
        src={link}
        className="places__image"
        alt={name}
        onClick={() => onImageClick(card)}
      />
      <div className="places__info">
        <p className="places__description">{name}</p>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="like"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
