import { useState } from "react";
import BouncingBall from "./components/BouncingBall";
import Controls from "./components/Controls";
import "./App.css";

const App = () => {
  const [color, setColor] = useState("#ff0000");
  const [speed, setSpeed] = useState(0.02);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="App">
      <Controls
        onColorChange={setColor}
        onSpeedChange={setSpeed}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
      />
      <BouncingBall
        color={color}
        speed={speed}
        soundEnabled={soundEnabled}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default App;
