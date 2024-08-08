/* eslint-disable react/prop-types */

const PauseMenu = ({ continueGame, exitGame }) => (
  <div className="pause-menu">
    <h2>Game Paused</h2>
    <button onClick={continueGame}>Continue Game</button>
    <button onClick={exitGame}>Exit Game</button>
  </div>
);

export default PauseMenu;
