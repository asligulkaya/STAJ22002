/* eslint-disable react/prop-types */
import "../styles/Home.css";
import { useState } from "react";
const Home = ({ startGame }) => {
  const [suits, setSuits] = useState(1);
  const handleSuitChange = (e) => {
    setSuits(parseInt(e.target.value));
  };
  const startGameWithDecks = () => {
    startGame(suits);
  };
  return (
    <div className="home">
      <h1>Welcome to Spider Solitaire</h1>
      <div>
        <label htmlFor="suits">Choose number of decks:</label>
        <select id="suits" value={suits} onChange={handleSuitChange}>
          <option value={1}>1 Suit</option>
          <option value={2}>2 Suits</option>
          <option value={4}>4 Suits</option>
        </select>
      </div>
      <button onClick={startGameWithDecks} style={{ marginTop: "5rem" }}>
        Start Game
      </button>
    </div>
  );
};

export default Home;
