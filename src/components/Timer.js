import React from "react";

export const Timer = ({ theme }) => {
  return (
    <div
      className={`timer ${
        theme === "default" ? "default" : theme === "jungle" ? "jungle" : "snow"
      }`}
    >
      Timer
    </div>
  );
};
