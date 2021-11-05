import React from "react";

export const Scoreboard = ({
  nickname,
  score,
  opponentName,
  opponentScore,
  theme,
  role,
  warderTurn,
}) => {
  return (
    <div className='scoreboard'>
      <div
        className={`own-score ${role === "warder" ? "warder" : "prisoner"}${
          theme === "default" ? "" : theme === "jungle" ? "-jungle" : "-snow"
        }${
          (role === "warder" && warderTurn) ||
          (role === "prisoner" && !warderTurn)
            ? "-turn"
            : ""
        }`}
      >
        <h3 className='name'>{nickname ? nickname : "You"}</h3>
        <h2 className='score'>{score}</h2>
      </div>
      <div
        className={`opponent-score ${
          role === "warder" ? "prisoner" : "warder"
        }${
          theme === "default" ? "" : theme === "jungle" ? "-jungle" : "-snow"
        }${
          (role === "warder" && !warderTurn) ||
          (role === "prisoner" && warderTurn)
            ? "-turn"
            : ""
        }`}
      >
        <h3 className='name'>{opponentName ? opponentName : "Opponent"}</h3>
        <h2 className='score'>{opponentScore}</h2>
      </div>
    </div>
  );
};
