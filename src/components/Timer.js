import React from "react";

export const Timer = ({ theme, timer }) => {
  return (
    <div
      className={`timer ${
        theme === "default" ? "default" : theme === "jungle" ? "jungle" : "snow"
      } ${timer === 3 || timer === 2 || timer === 1 ? "lowtime" : ""}`}
    >
      {timer === 0 ? "10" : timer}
    </div>
  );
};
