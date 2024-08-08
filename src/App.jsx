import { useState } from "react";
import Home from "./components/Home";
import Game from "./components/Game";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => setGameStarted(true);
  const exitGame = () => setGameStarted(false);

  return (
    <div className="App">
      {gameStarted ? (
        <Game exitGame={exitGame} />
      ) : (
        <Home startGame={startGame} />
      )}
    </div>
  );
};

export default App;
