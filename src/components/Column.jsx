/* eslint-disable react/prop-types */
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";
import { useDrop } from "react-dnd";

const Column = ({ cards, columnIndex, onDrop, onDragOver }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      console.log("Item dropped:", item);
      onDrop(item, columnIndex);
    },
  });

  return (
    <div ref={drop} className="column" onDrop={onDrop} onDragOver={onDragOver}>
      <CardPlaceholder>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            columnIndex={columnIndex}
            cardIndex={index}
            style={{
              top: `${index * 10}px`,
              zIndex: card.hidden ? index : 1000,
              margin: "0",
            }}
            draggable={!card.hidden}
            onDragStart={(e) => {
              e.dataTransfer.setData("cardIndex", index);
              e.dataTransfer.setData("sourceColumnIndex", columnIndex);
            }}
          />
        ))}
      </CardPlaceholder>
    </div>
  );
};

export default Column;