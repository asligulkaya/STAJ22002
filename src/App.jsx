import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./components/Home";
import Game from "./components/Game";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => setGameStarted(true);
  const exitGame = () => setGameStarted(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {gameStarted ? (
          <Game exitGame={exitGame} />
        ) : (
          <Home startGame={startGame} />
        )}
      </div>
    </DndProvider>
  );
};

export default App;