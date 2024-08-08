/* eslint-disable react/prop-types */
import "../styles/Home.css";
const Home = ({ startGame }) => (
  <div className="home">
    <h1>Welcome to Spider Solitaire</h1>
    <button onClick={startGame}>Start Game</button>
  </div>
);

export default Home;
