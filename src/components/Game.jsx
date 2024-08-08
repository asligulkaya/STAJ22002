/* eslint-disable react/prop-types */
import "../styles/Game.css";
import { useState, useEffect } from "react";
import initializeGame from "../utils/gameSetup";
import PauseMenu from "./PauseMenu";
import Column from "./Column";

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
      <div style={{ display: "flex" }}>
        <button className="pause-button" onClick={pauseGame}>
          Pause
        </button>
      </div>
      {isPaused && (
        <PauseMenu continueGame={continueGame} exitGame={exitGame} />
      )}
      <div style={{ display: "flex" }}>
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
