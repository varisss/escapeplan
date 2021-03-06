import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import jungle from "../images/jungle.jpg";
import snow from "../images/snow.jpg";
import howtoplay from "../images/howtoplay.png";
import { Modal } from "react-bootstrap";

export const Lobby = ({ socket, theme, setTheme }) => {
  const [show, setShow] = useState(false);
  const [nickName, setNickname] = useState("");
  const [rounds, setRounds] = useState(5);
  const [roundsAlreadySet, setRoundsAlreadySet] = useState(false);

  const joinGame = (nickName, rounds) => {
    console.log("join game clicked");
    socket.emit("joinGame", nickName, rounds);
  };

  useEffect(() => {
    setInterval(() => {
      socket.emit("joinLobby");
    }, 1000);
    socket.on("roundsSet", (rounds) => {
      setRounds(rounds);
      setRoundsAlreadySet(true);
    });
    socket.on("roundsNotSet", () => {
      setRoundsAlreadySet(false);
    });
  }, [socket]);

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
          <select
            name='rounds'
            id='rounds-select'
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            disabled={roundsAlreadySet}
          >
            <option value='3'>3 rounds</option>
            <option value='5'>5 rounds</option>
            <option value='7'>7 rounds</option>
            <option value='9'>9 rounds</option>
          </select>
          <Link className='button-link' to='/game'>
            <Button
              variant='dark'
              style={{ marginBottom: 10 }}
              className='lobby-button'
              onClick={() => joinGame(nickName, rounds)}
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
              <img
                src={howtoplay}
                style={{ width: "100%" }}
                alt='how to play'
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};
