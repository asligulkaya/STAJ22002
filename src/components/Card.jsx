/* eslint-disable react/prop-types */
import "../styles/Card.css";
const Card = ({ card, onClick, style }) => {
  const cardImage = card.hidden
    ? "/icons/card-backgrounds/classic_blue.png"
    : `/icons/${card.suit}/${card.value}.png`;

  return (
    <div className="cardDiv">
      <img
        src={cardImage}
        alt={`${card.value} of ${card.suit}`}
        className={`card ${card.hidden ? "hidden-card" : "visible-card"}`}
        style={style}
        onClick={onClick}
      />
    </div>
  );
};

export default Card;
