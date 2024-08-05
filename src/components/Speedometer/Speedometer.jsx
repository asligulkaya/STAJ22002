/* eslint-disable react/prop-types */
import './Speedometer.css';

const Speedometer = ({ speed }) => {
  const angle = (speed / 100) * 180; // Convert speed to angle

  return (
    <div className="speedometer-container">
      <svg
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="90" fill="lightgray" />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="10"
          stroke="black"
          strokeWidth="5"
          transform={`rotate(${angle} 100 100)`}
        />
      </svg>
      <div className="speed-text">Speed: {speed} km/h</div>
    </div>
  );
};

export default Speedometer;
