import React from "react";

export const Scoreboard = ({
  nickname,
  opponentName,
  score,
  opponentScore,
}) => {
  return (
    <div className='scoreboard'>
      <div className='own-score'>
        <h3>{nickname ? nickname : "You"}</h3>
        <h2>{score}</h2>
      </div>
      <div className='opponent-score'>
        <h3>{opponentName ? opponentName : "Opponent"}</h3>
        <h2>{opponentScore}</h2>
      </div>
    </div>
  );
};
