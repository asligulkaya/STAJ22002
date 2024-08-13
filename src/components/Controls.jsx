/* eslint-disable react/prop-types */
import { useState } from "react";

const Controls = ({
  onColorChange,
  onSpeedChange,
  onToggleSound,
  onTogglePlay,
}) => {
  const [color, setColor] = useState("#ff0000");
  const [speed, setSpeed] = useState(0.02);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="controls">
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            onColorChange(e.target.value);
          }}
        />
      </label>
      <label>
        Speed:
        <input
          type="range"
          min="0.01"
          max="0.1"
          step="0.01"
          value={speed}
          onChange={(e) => {
            setSpeed(parseFloat(e.target.value));
            onSpeedChange(parseFloat(e.target.value));
          }}
        />
      </label>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
          onTogglePlay();
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          onToggleSound();
        }}
      >
        {soundEnabled ? "Sound Off" : "Sound On"}
      </button>
    </div>
  );
};

export default Controls;
