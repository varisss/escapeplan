import React from "react";

const GameOver = ({ theme, score, opponentScore }) => {
  return (
    <div
      className={`grid-placeholder
              ${
                theme === "default"
                  ? "default"
                  : theme === "jungle"
                  ? "jungle"
                  : "snow"
              }`}
    >
      <h2 className='notification'>GAME OVER</h2>
      <h2 className='notification'>
        {score > opponentScore ? "YOU WIN!" : "YOU LOSE!"}
      </h2>
      <h2 className='waiting-message'>
        You will be redirected to the lobby soon
      </h2>
    </div>
  );
};

export default GameOver;
