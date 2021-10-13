import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Lobby = ({ socket, theme, setTheme }) => {
  const [nickName, setNickname] = useState("");
  
  const joinGame = (nickName) => {
    console.log("join game clicked");
    socket.emit("joinGame", nickName);
  };
  return (
    <div className='lobby'>
      <h1 className='game-title'>Escape Plan</h1>
      <div className='lobby-container'>
        {/* <label for='theme-select'>Theme: </label> */}
        <select
          name='theme'
          id='theme-select'
          onChange={(e) => console.log(e.target.value)}
        >
          <option value='default'>Select Theme (Default)</option>
          <option value='jungle'>Jungle</option>
          <option value='snow'>Snow</option>
        </select>
        <input
          type='text'
          name='name'
          id='name-input'
          placeholder='Player name'
          onChange={(e) => setNickname(e.target.value)}
        />
        <Link className='button-link' to='/game'>
          <Button
            variant='outline-success'
            className='start-button'
            onClick={() => joinGame(nickName)}
          >
            Start Game
          </Button>
        </Link>
      </div>
    </div>
  );
};

