import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import jungle from "../images/jungle.jpg";
import snow from "../images/snow.jpg";

export const Lobby = ({ socket, theme, setTheme }) => {
  const [nickName, setNickname] = useState("");

  const joinGame = (nickName) => {
    console.log("join game clicked");
    socket.emit("joinGame", nickName);
  };
  return (
    <div
      className='lobby'
      style={{
        backgroundImage: `url(${
          theme === "default" ? "" : theme === "jungle" ? jungle : snow
        }`,
      }}
    >
      <div className='lobby-container'>
        <h1 className='game-title'>Escape Plan</h1>
        <div className='lobby-form'>
          <select
            name='theme'
            id='theme-select'
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
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
          {/* <p>Mute </p>
          <input
            type='checkbox'
            name='mute-checkbox'
            id='mute-checkbox'
            onChange={(e) => {
              console.log(e.target.checked);
            }}
          /> */}
          <Link className='button-link' to='/game'>
            <Button
              style={{ backgroundColor: "black", border: "none" }}
              className='start-button'
              id='start-button'
              onClick={() => joinGame(nickName)}
            >
              Start Game
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
