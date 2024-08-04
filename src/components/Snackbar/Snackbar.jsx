/* eslint-disable react/prop-types */
import "./Snackbar.css";

export default function Snackbar({ message, isVisible }) {
  return (
    <div id="snackbar" className={isVisible ? "show" : ""}>
      {message}
    </div>
  );
}
