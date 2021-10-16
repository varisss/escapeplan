import React, { useState, useEffect } from "react";
import "../App.css";
import { Grid } from "./Grid";
import { Chatbox } from "./Chatbox";
import { Howl } from "howler";
import { Scoreboard } from "./Scoreboard";
import { Timer } from "./Timer";
import jungle from "../images/jungle.jpg";
import snow from "../images/snow.jpg";

export const Game = ({ socket, theme }) => {
  console.log(theme);

  const [gridArray, setGridArray] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const [nickname, setNickname] = useState("");
  const [score, setScore] = useState(0);
  const [opponentName, setOpponentName] = useState("");
  const [opponentScore, setOpponentScore] = useState(0);
  const [role, setRole] = useState("");
  const [notification, setNotification] = useState("");

  //check which song to play based on the theme
  const backgroundPath = "soundEffects/mixkit-drumming-jungle-music-2426.wav";

  const sfx = {
    move: new Howl({
      // src: ['soundEffects/mixkit-game-ball-tap-2073.wav']
      src: ["soundEffects/mixkit-player-jumping-in-a-video-game-2043.wav"],
      volumne: 0.1,
    }),
    win: new Howl({
      src: ["soundEffects/mixkit-game-bonus-reached-2065.wav"],
      volumne: 0.1,
    }),
    lose: new Howl({
      src: ["soundEffects/mixkit-retro-arcade-lose-2027.wav"],
      volumne: 0.1,
    }),
    background: new Howl({
      src: backgroundPath,
      volume: 0.1,
      loop: true,
    }),
  };

  useEffect(() => {
    socket.on("startRound", () => {
      // sfx.background.play();
      console.log(nickname);
      setGameRunning(true);
      setNewGameButtonDisplay(true);
    });

    socket.on("newGrid", (newGridArray) => {
      setGridArray(newGridArray);
      sfx.move.play();
    });

    socket.on("initializeRole", (players) => {
      for (const player of players) {
        if (socket.id === player.id) {
          setRole(player.role);
          setNickname(player.name);
        }
      }
    });

    socket.on("warderWins", (players) => {
      setGameRunning(false);
      if (role === "warder") {
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
  });

  window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 37:
        //move left
        socket.emit("move", "left");
        console.log("move left");

        break;
      case 38:
        //move up
        socket.emit("move", "up");
        console.log("move up");

        break;
      case 39:
        //move right
        socket.emit("move", "right");
        console.log("move right");

        break;
      case 40:
        //move down
        socket.emit("move", "down");
        console.log("move down");
        break;
    }
  });

  const startNewRound = () => {
    setNewGameButtonDisplay(false);
    socket.emit("startNewRound");
  };

  let roleDisplay = null;
  if (role) {
    roleDisplay = <h1>You are {role === "warder" ? "Warder" : "Prisoner"}</h1>;
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
        {/* <button onClick={() => console.log("mute clicked")}>mute</button> */}
        {notification ? <h2>{notification}</h2> : null}
        {nickname ? <h2>{nickname}</h2> : null}
      </div>
      <div>
        {gameRunning === false && newGameButtonDisplay ? (
          <button onClick={startNewRound}>start new round</button>
        ) : null}
      </div>
      <div className='game-container'>
        <Grid gridArray={gridArray} theme={theme} />
        <Chatbox socket={socket} nickname={nickname} />
      </div>
    </div>
  );
};
