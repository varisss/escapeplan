import React from "react";
import { Button } from "react-bootstrap";

const RoundOver = ({ theme, notification, startNewRound }) => {
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
      {notification ? <h2 className='notification'>{notification}</h2> : null}
      <Button
        style={{
          backgroundColor: "white",
          color: "black",
          border: "none",
        }}
        className='restart-button'
        onClick={() => startNewRound()}
      >
        Start New Round
      </Button>
    </div>
  );
};

export default RoundOver;
