/* eslint-disable react/prop-types */
import "../styles/Card.css";
import { useDrag } from "react-dnd";

const Card = ({
  card,
  columnIndex,
  cardIndex,
  onClick,
  style,
  draggable,
  onDragStart,
  columns,
  suits,
}) => {
  const [, drag] = useDrag({
    type: "CARD",
    item: { columnIndex, cardIndex },
    canDrag: () => draggable && isCorrectlyStacked(),
  });

  const isCorrectlyStacked = () => {
    let currentCard = columns[columnIndex][cardIndex];
    for (let i = cardIndex + 1; i < columns[columnIndex].length; i++) {
      const nextCard = columns[columnIndex][i];
      if (
        parseInt(currentCard.value, 10) !== parseInt(nextCard.value, 10) + 1 ||
        (suits > 1 && currentCard.suit !== nextCard.suit)
      ) {
        return false;
      }
      currentCard = nextCard;
    }
    return true;
  };

  const cardImage = card.hidden
    ? "/icons/card-backgrounds/classic_blue.png"
    : `/icons/${card.suit}/${card.value}.png`;

  return (
    <div ref={drag} className="cardDiv">
      <img
        src={cardImage}
        alt={`${card.value} of ${card.suit}`}
        className={`card ${card.hidden ? "hidden-card" : "visible-card"}`}
        style={style}
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
      />
    </div>
  );
};

export default Card;
