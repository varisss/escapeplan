import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "react-bootstrap";
import { Grid } from "./Grid";
import { Chatbox } from "./Chatbox";
import { Howl } from "howler";
import { Scoreboard } from "./Scoreboard";
import { Timer } from "./Timer";
import jungle from "../images/jungle.jpg";
import snow from "../images/snow.jpg";
import { ToggleSound } from "./ToggleSound";

export const Game = ({ socket, theme }) => {
  console.log(theme);

  const [gridArray, setGridArray] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [score, setScore] = useState(0);
  const [opponentName, setOpponentName] = useState("");
  const [opponentScore, setOpponentScore] = useState(0);
  const [role, setRole] = useState("");
  const [notification, setNotification] = useState("");
  const [gameRunning, setGameRunning] = useState(null);
  const [newGameButtonDisplay, setNewGameButtonDisplay] = useState(false);

  // check which song to play based on the theme
  const backgroundPath = "soundEffects/mixkit-drumming-jungle-music-2426.wav";

  const sfx = {
    move: new Howl({
      // src: ["soundEffects/mixkit-game-ball-tap-2073.wav"],
      src: ["soundEffects/mixkit-player-jumping-in-a-video-game-2043.wav"],
      volume: 0.1,
    }),
    win: new Howl({
      src: ["soundEffects/mixkit-game-bonus-reached-2065.wav"],
      volume: 0.1,
    }),
    lose: new Howl({
      src: ["soundEffects/mixkit-retro-arcade-lose-2027.wav"],
      volumne: 0.1,
    }),
  };

  useEffect(() => {
    window.onpopstate = (e) => {
      console.log("back clicked");
      socket.emit("leaveGame");
    };

    socket.on("startRound", () => {
      console.log(nickname);
      setGameRunning(true);
      setNewGameButtonDisplay(true);
    });

    socket.on("newGrid", (newGridArray) => {
      setGridArray(newGridArray);
      console.log("new grid");
      console.log(role);
      sfx.move.play();
    });

    socket.on("initializeRole", (players) => {
      for (const player of players) {
        if (socket.id === player.id) {
          setRole(player.role);
          setNickname(player.name);
          setId(player.id);
        } else {
          setOpponentName(player.name);
        }
      }
    });

    socket.on("warderWins", (players) => {
      setGameRunning(false);
      if (role === "warder") {
        setNotification("You WIN");
        sfx.win.play();
        console.log(role);
      } else {
        setNotification("You LOSE");
        console.log(role);
        sfx.lose.play();
      }
      for (const player of players) {
        if (socket.id === player.id) {
          setScore(player.score);
        } else {
          setOpponentScore(player.score);
        }
      }
    });

    socket.on("prisonerWins", (players) => {
      setGameRunning(false);
      if (role === "prisoner") {
        setNotification("You WIN");
        sfx.win.play();
      } else {
        setNotification("You LOSE");
        sfx.lose.play();
      }
      for (const player of players) {
        if (socket.id === player.id) {
          setScore(player.score);
        } else {
          setOpponentScore(player.score);
        }
      }
    });

    socket.on("disconnection", (message) => {
      setNotification(message);
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          //move left
          socket.emit("move", "left");
          console.log("move left");
          break;
        case "ArrowUp":
          //move up
          socket.emit("move", "up");
          console.log("move up");
          break;
        case "ArrowRight":
          //move right
          socket.emit("move", "right");
          console.log("move right");
          break;
        case "ArrowDown":
          //move down
          socket.emit("move", "down");
          console.log("move down");
          break;
      }
    });
  }, [role]);

  const startNewRound = () => {
    setNewGameButtonDisplay(false);
    socket.emit("startNewRound");
  };

  let roleDisplay = null;
  if (role) {
    roleDisplay = (
      <h1 className='role-display'>
        {nickname ? nickname : "You are"}{" "}
        {role === "warder" ? "Warder" : "Prisoner"}
      </h1>
    );
  }

  return (
    <div
      className='game'
      style={{
        backgroundImage: `url(${
          theme === "default" ? "" : theme === "jungle" ? jungle : snow
        }`,
      }}
    >
      <div className='game-header'>
        {roleDisplay}
        <Timer theme={theme} />
        <Scoreboard
          nickname={nickname}
          score={score}
          opponentName={opponentName}
          opponentScore={opponentScore}
          theme={theme}
          role={role}
        />
        <ToggleSound backgroundPath={backgroundPath} />
      </div>

      <div className='game-container'>
        {!gameRunning && !newGameButtonDisplay && (
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
            <h2 className='waiting-message'>Waiting for the other player...</h2>
          </div>
        )}
        {gameRunning && <Grid gridArray={gridArray} theme={theme} />}
        {!gameRunning && newGameButtonDisplay ? (
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
            {notification ? (
              <h2 className='notification'>{notification}</h2>
            ) : null}
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
              }}
              className='restart-button'
              onClick={() => startNewRound()}
            >
              Start New Round
            </Button>
          </div>
        ) : null}
        <Chatbox socket={socket} nickname={nickname} playerId={id} />
      </div>
    </div>
  );
};
