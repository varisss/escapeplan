import React from "react";

const GridPlaceholder = ({ theme, message }) => {
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
      <h2 className='waiting-message'>{message}</h2>
    </div>
  );
};

export default GridPlaceholder;
