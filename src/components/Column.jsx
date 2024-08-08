/* eslint-disable react/prop-types */
import Card from "./Card";

const Column = ({ cards, onCardClick }) => (
  <div className="column">
    {cards.map((card, index) => (
      <Card
        key={index}
        card={card}
        onClick={() => onCardClick(index)}
        style={{
          top: `${index * 2}px`,
          zIndex: card.hidden ? index : 1000,
        }}
      />
    ))}
  </div>
);

export default Column;
