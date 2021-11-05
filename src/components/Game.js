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
import smile from "../images/emoji-smile.png";
import laugh from "../images/emoji-laugh.png";
import cry from "../images/emoji-cry.png";
import mad from "../images/emoji-mad.png";
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
  const [gameFull, setGameFull] = useState(false);
  const [left, setLeft] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const emojiTimeout = 2000;

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
      socket.emit("leaveGame");
    };

    socket.on("resetGame", () => {
      console.log("reset game");
      backToLobby();
    });

    socket.on("startRound", () => {
      setLeft(false);
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

    socket.on("setScores", (players) => {
      if (players.length === 1) {
        setScore(0);
        setOpponentScore(0);
        return;
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

    socket.on("gameFull", () => {
      setGameFull(true);
    });

    socket.on("opponentLeft", () => {
      console.log("opponent left");
      setLeft(true);
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

    socket.on("gameOver", () => {
      console.log("game over");
      setGameOver(true);
      console.log("game over state set");
      setTimeout(() => {
        backToLobby();
      }, 5000);
    });

    socket.on("receiveEmoji", (emoji) => {
      console.log(emoji);
      displayEmoji(emoji);
    });
  }, [role]);

  const startNewRound = () => {
    setNewGameButtonDisplay(false);
    socket.emit("startNewRound");
  };

  const sendEmoji = (emoji) => {
    socket.emit("emoji", emoji);
  };

  const backToLobby = () => {
    let url = window.location.toString();
    window.location = url.replace("/game", "/");
  };

  let emojiDisplay = null;
  let timeout;
  const displayEmoji = (e) => {
    clearTimeout(timeout);
    setEmoji(e);
    timeout = setTimeout(() => {
      setEmoji(null);
    }, emojiTimeout);
  };
  if (emoji)
    emojiDisplay = (
      <div
        className='emoji'
        style={{
          backgroundImage: `url(${
            emoji === "smile"
              ? smile
              : emoji === "laugh"
              ? laugh
              : emoji === "cry"
              ? cry
              : mad
          }`,
          backgroundSize: "cover",
        }}
      />
    );

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
      <i
        className='back fas fa-arrow-circle-left'
        onClick={() => window.history.back()}
      />
      <i
        className='surrender fas fa-flag'
        onClick={() => socket.emit("surrender")}
      />
      <i className='smile far fa-smile' onClick={() => sendEmoji("smile")} />
      <i
        className='laugh far fa-laugh-squint'
        onClick={() => sendEmoji("laugh")}
      />
      <i className='cry far fa-sad-cry' onClick={() => sendEmoji("cry")} />
      <i className='mad far fa-angry' onClick={() => sendEmoji("angry")} />
      {emojiDisplay}
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
        {gameOver ? (
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
            <h2 className='notification'>GAME OVER</h2>
            <h2 className='notification'>
              {score > opponentScore ? "YOU WIN!" : "YOU LOSE!"}
            </h2>
            <h2 className='waiting-message'>
              You will be redirected to the lobby in 5 seconds.
            </h2>
          </div>
        ) : gameFull ? (
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
            <h2 className='waiting-message'>
              Game is full, please come back later...
            </h2>
          </div>
        ) : !gameRunning && !newGameButtonDisplay ? (
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
        ) : left ? (
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
            <h2 className='waiting-message'>Opponent disconnected...</h2>
          </div>
        ) : gameRunning ? (
          <Grid gridArray={gridArray} theme={theme} />
        ) : !gameRunning && newGameButtonDisplay ? (
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
