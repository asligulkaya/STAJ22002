/* eslint-disable react/prop-types */
import "./Plane.css";
import planeSVG from "../../assets/svgs/plane.svg"

export default function Plane({ angle }) {
  return (
    <div
      className="plane-container"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <img src={planeSVG} alt=""/>
    </div>
  );
}
