import React, { useState } from "react";
import ReactHowler from "react-howler"

export const ToggleSound = ({backgroundPath}) => {
    const [backgroundOn, setBackgroundOn] = useState(true);

    return(
        <div className="backgroundToggle">
            <ReactHowler
            src={backgroundPath}
            playing={backgroundOn}
            />
            <button onClick={() => setBackgroundOn(!backgroundOn)}>Toggle music</button>
        </div>
    )
}

