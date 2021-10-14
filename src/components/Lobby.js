import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
          value={nickName}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Link className='button-link' to='/game'>
          <Button
            variant='outline-success'
            className='start-button'
            id='start-button'
            onClick={() => joinGame(nickName)}
          >
            Start Game
          </Button>
        </Link>
      </div>
    </div>
  );
};

