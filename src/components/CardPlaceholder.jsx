/* eslint-disable react/prop-types */
export default function CardPlaceholder({ children }) {
  return (
    <div
      style={{
        border: "2px solid #434343",
        borderRadius: "5px",
        width: "100px",
        height: "140px",
        margin: "0 0.5em",
      }}
    >
      {children}
    </div>
  );
}
