/* eslint-disable react/prop-types */
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";

const Column = ({ cards, onDrop, onDragOver }) => (
  <div className="column" onDrop={onDrop} onDragOver={onDragOver}>
    <CardPlaceholder>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          style={{
            top: `${index * 10}px`,
            zIndex: card.hidden ? index : 1000,
            margin: "0",
          }}
          draggable={!card.hidden}
          onDragStart={(e) => e.dataTransfer.setData("cardIndex", index)}
        />
      ))}
    </CardPlaceholder>
  </div>
);

export default Column;
