/* eslint-disable react/prop-types */
import "./Battery.css";

const Battery = ({ level }) => {
  const getBatteryColor = () => {
    if (level > 50) return "green";
    if (level > 25) return "yellow";
    return "red";
  };

  const rectangles = Array.from({ length: 4 }, (_, i) => {
    const fillLevel = Math.max(0, Math.min(level - i * 25, 25)); // Ensure fillLevel is non-negative
    return (
      <rect
        key={i}
        x={i * 25 + 10}
        y={100 - (fillLevel / 25) * 90}
        width="20"
        height={(fillLevel / 25) * 90}
        fill={getBatteryColor()}
      />
    );
  });

  return (
    <div className={`battery-container ${level < 20 ? "blink" : ""}`}>
      <svg
        width="120"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 100"
      >
        {rectangles}
      </svg>
    </div>
  );
};

export default Battery;
