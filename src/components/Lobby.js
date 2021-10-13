import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Lobby = ({ theme, setTheme }) => {
  console.log(theme);
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
        />
        <Link className='button-link' to='/game'>
          <Button
            variant='outline-success'
            className='start-button'
            onClick={() => console.log("Start clicked")}
          >
            Start Game
          </Button>
        </Link>
      </div>
    </div>
  );
};
