/* eslint-disable react/prop-types */
import "../styles/Game.css";
import { useState, useEffect } from "react";
import initializeGame from "../utils/gameSetup";
import PauseMenu from "./PauseMenu";
import Column from "./Column";
import CardPlaceholder from "./CardPlaceholder";
import Card from "./Card";

const Game = ({ level, exitGame }) => {
  const { columns: initialColumns, stock: initialStock } = initializeGame();
  const [columns, setColumns] = useState(initialColumns);
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    const { columns, stock } = initializeGame(level);
    setColumns(columns);
    setStock(stock);
  }, [level]);

  const [isPaused, setIsPaused] = useState(false);

  const pauseGame = () => setIsPaused(true);
  const continueGame = () => setIsPaused(false);

  const handleCardClick = (columnIndex) => {
    if (stock.length > 0) {
      const newColumns = [...columns];
      const card = stock.pop();
      card.hidden = false;
      newColumns[columnIndex].push(card);
      setColumns(newColumns);
      setStock([...stock]);
    }
  };

  const handleDrop = (e, targetColumnIndex) => {
    const cardIndex = e.dataTransfer.getData("cardIndex");
    const sourceColumnIndex = parseInt(
      e.dataTransfer.getData("sourceColumnIndex")
    );

    if (sourceColumnIndex !== targetColumnIndex) {
      const newColumns = [...columns];
      const cardToMove = newColumns[sourceColumnIndex].splice(cardIndex, 1)[0];
      newColumns[targetColumnIndex].push(cardToMove);
      setColumns(newColumns);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleStockClick = () => {
    const newColumns = [...columns];
    const newStock = [...stock];

    if (newStock.length >= 10) {
      newColumns.forEach((column) => {
        const card = newStock.pop();
        card.hidden = false;
        column.push(card);
      });
    } else {
      console.log("Stock is empty!");
    }

    setColumns(newColumns);
    setStock(newStock);
  };

  return (
    <div className="game">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="pause-button" onClick={pauseGame}>
          Pause
        </button>
      </div>
      {isPaused && (
        <div className="pause-menu-overlay">
          <PauseMenu continueGame={continueGame} exitGame={exitGame} />
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CardPlaceholder>
          {stock.map((card, index) => (
            <Card
              key={index}
              card={card}
              style={{
                margin: "0",
                cursor: "pointer",
              }}
              onClick={handleStockClick}
            />
          ))}
        </CardPlaceholder>
        <div className="cards-container">
          {Array.from({ length: 8 }, (_, index) => (
            <CardPlaceholder key={index} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", height: "50vh" }}>
        {columns.map((cards, columnIndex) => (
          <Column
            key={columnIndex}
            cards={cards}
            onCardClick={(cardIndex) => handleCardClick(columnIndex, cardIndex)}
            onDrop={(e) => handleDrop(e, columnIndex)}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
