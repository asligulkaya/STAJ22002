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
}) => {
  const [, drag] = useDrag({
    type: "CARD",
    item: { columnIndex, cardIndex },
    canDrag: () => draggable,
  });

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
