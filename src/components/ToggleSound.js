import React, { useState } from "react";
import ReactHowler from "react-howler";

export const ToggleSound = ({ backgroundPath }) => {
  const [backgroundOn, setBackgroundOn] = useState(true);

  return (
    <div className='backgroundToggle'>
      <ReactHowler src={backgroundPath} playing={backgroundOn} />
      <button
        className='backgroundBtn'
        onClick={() => setBackgroundOn(!backgroundOn)}
      >
        <i
          className={backgroundOn ? "fas fa-volume-up" : "fas fa-volume-mute"}
          style={{ fontSize: "40px" }}
        />
      </button>
    </div>
  );
};
