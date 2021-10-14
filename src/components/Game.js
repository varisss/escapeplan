import React, { useState, useEffect } from "react";
import "../App.css";
import { Grid } from "./Grid";
import { Chatbox } from "./Chatbox";
import {Howl} from 'howler';

export const Game = ({ socket, theme }) => {
  
  const [gridArray, setGridArray] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  //check which song to play based on the theme
  const backgroundPath = 'soundEffects/mixkit-drumming-jungle-music-2426.wav';

  const sfx = {
    move: new Howl({
      // src: ['soundEffects/mixkit-game-ball-tap-2073.wav']
      src: ['soundEffects/mixkit-player-jumping-in-a-video-game-2043.wav'], volumne:0.1
    }),
    win: new Howl({
      src: ['soundEffects/mixkit-game-bonus-reached-2065.wav'], volumne:0.1
    }),
    lose: new Howl({
      src: ['soundEffects/mixkit-retro-arcade-lose-2027.wav'], volumne:0.1
    }),
    background: new Howl({
      src: backgroundPath, volume: 0.2,
      loop: true
    })
  }

  const [nickname, setNickname] = useState("");
  const [score, setScore] = useState(0);
  const [opponentName, setOpponentName] = useState("");
  const [opponentScore, setOpponentScore] = useState(0);
  const [role, setRole] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on('startRound', ()=>{
      sfx.background.play();
      console.log(nickname)
    })

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

  let roleDisplay = null;
  if (role) {
    roleDisplay = <h1>Role: {role}</h1>;
  }

  return (
    <div className='App'>
      <button onClick={()=> sfx.background.stop()}>mute</button>
      <button onClick={()=> sfx.background.play()}>music on</button>
      {roleDisplay}
      {notification ? <h2>{notification}</h2> : null}
      {nickname? <h2>{nickname}</h2> : null}
      <h3>Score: {score}</h3>
      {opponentName ? <h2>{opponentName}</h2> : null}
      <h4>Opponent Score: {opponentScore}</h4>
      <Grid gridArray={gridArray} theme={theme} />
      <Chatbox socket={socket} nickname={nickname}/>
    </div>
  );
};