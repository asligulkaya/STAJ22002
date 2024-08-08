/* eslint-disable react/prop-types */
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";

const Column = ({ cards, onCardClick }) => (
  <div className="column">
    <CardPlaceholder>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onClick={() => onCardClick(index)}
          style={{
            top: `${index * 10}px`,
            zIndex: card.hidden ? index : 1000,
            margin: "0"
          }}
        />
      ))}
    </CardPlaceholder>
  </div>
);

export default Column;
