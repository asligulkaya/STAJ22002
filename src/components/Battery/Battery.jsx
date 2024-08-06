/* eslint-disable react/prop-types */
import "./Battery.css";

const Battery = ({ level }) => {
  const getBatteryColor = () => {
    if (level > 50) return "green";
    if (level > 25) return "yellow";
    return "red";
  };

  const rectangles = Array.from({ length: 4 }, (_, i) => {
    const fillLevel = Math.max(0, Math.min(level - i * 25, 25));
    const height = (fillLevel / 25) * 80; // Height decreases with battery level
    const y = 365 - i * 105 + (80 - height); // Adjust y position based on height

    return (
      <rect
        key={i}
        x="150"
        y={y}
        width="175"
        height={height}
        fill={getBatteryColor()}
        rx="10"
        ry="10"
      />
    );
  });

  return (
    <div className={`battery-container ${level < 20 ? "blink" : ""}`}>
      <svg
        className="battery-svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 471.829 471.829"
        xmlSpace="preserve"
      >
        <path
          fill="white"
          d="M319.089,27.221h-36.475V0h-95.27v27.221h-34.607c-22.517,0-40.829,18.317-40.829,40.832v362.946 c0,22.51,18.317,40.83,40.829,40.83h166.352c22.524,0,40.832-18.32,40.832-40.83V68.052 C359.921,45.538,341.613,27.221,319.089,27.221z M332.705,431.002c0,7.501-6.108,13.607-13.616,13.607H152.737 c-7.501,0-13.608-6.095-13.608-13.607V68.052c0-7.501,6.107-13.611,13.608-13.611h166.352c7.508,0,13.616,6.109,13.616,13.611"
        />
        {rectangles}
      </svg>
    </div>
  );
};

export default Battery;
