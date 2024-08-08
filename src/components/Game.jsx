/* eslint-disable react/prop-types */
import "../styles/Game.css";
import { useState, useEffect } from "react";
import initializeGame from "../utils/gameSetup";
import PauseMenu from "./PauseMenu";
import Column from "./Column";
import CardPlaceholder from "./CardPlaceholder";
import Card from "./Card";

const Game = ({ level, exitGame }) => {
  const [columns, setColumns] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const { columns, stock } = initializeGame(level);
    setColumns(columns);
    setStock(stock);
  }, [level]);

  const [isPaused, setIsPaused] = useState(false);

  const pauseGame = () => setIsPaused(true);
  const continueGame = () => setIsPaused(false);

  const handleCardClick = (columnIndex, cardIndex) => {
    console.log(`Clicked card at column ${columnIndex}, card ${cardIndex}`);
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
              }}
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
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
