import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import jungle from "../images/jungle.jpg";
import snow from "../images/snow.jpg";
import howtoplay from "../images/howtoplay.png";
import { Modal } from "react-bootstrap";

export const Lobby = ({ socket, theme, setTheme }) => {
  const [show, setShow] = useState(false);
  const [nickName, setNickname] = useState("");

  // const reloadCount = sessionStorage.getItem("reloadCount") || 0;
  // useEffect(() => {
  //   if (reloadCount < 2) {
  //     sessionStorage.setItem("reloadCount", String(reloadCount + 1));
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem("reloadCount");
  //     // maybe socket.emit(inLobby)
  //   }
  // }, []);

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
        <h1 className='game-title'>ESCAPE PLAN</h1>
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
            value={muted}
            onChange={(e) => {
              setMuted(e.target.checked);
              console.log(e.target.checked);
            }}
          /> */}
          <Link className='button-link' to='/game'>
            <Button
              variant='dark'
              style={{ marginBottom: 10 }}
              className='lobby-button'
              onClick={() => joinGame(nickName)}
            >
              Start Game
            </Button>
          </Link>
          <Button
            variant='secondary'
            className='lobby-button'
            onClick={() => setShow(!show)}
          >
            How to play
          </Button>
          <Modal
            size={"lg"}
            show={show}
            onHide={() => setShow(!show)}
            animation={true}
            centered
          >
            <Modal.Body>
              <img src={howtoplay} style={{ width: "100%" }} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};
