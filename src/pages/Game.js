import React, { useState, useEffect } from "react";
import "../App.css";
import { Grid } from "../components/Grid";
import { Chatbox } from "../components/Chatbox";
import { Howl } from "howler";
import { Scoreboard } from "../components/Scoreboard";
import { Timer } from "../components/Timer";
import jungle from "../images/jungle.jpg";
import snow from "../images/snow.jpg";
import { ToggleSound } from "../components/ToggleSound";
import GridPlaceholder from "../components/GridPlaceholder";
import GameOver from "../components/GameOver";
import RoundOver from "../components/RoundOver";

export const Game = ({ socket, theme }) => {
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
  const [warderTurn, setWarderTurn] = useState();
  const [timer, setTimer] = useState();
  const [welcomeMsg, setWelcomeMsg] = useState("Welcome!");
  const [firstGame, setfirstGame] = useState(true);

  const emojiTimeout = 2000;

  // check which song to play based on the theme
  const backgroundSongs = {
    default: "soundEffects/the-epic-2-by-rafael-krux.mp3",
    jungle: "soundEffects/Monkeys-Spinning-Monkeys.mp3",
    snow: "soundEffects/TRG_Banks_-_07_-_Christmas_Day.mp3",
  };
  const backgroundPath = backgroundSongs[theme];

  const sfx = {
    move: new Howl({
      src: ["soundEffects/mixkit-player-jumping-in-a-video-game-2043.wav"],
      volume: 0.15,
    }),
    win: new Howl({
      src: ["soundEffects/mixkit-game-bonus-reached-2065.wav"],
      volume: 0.1,
    }),
    lose: new Howl({
      src: ["soundEffects/mixkit-retro-arcade-lose-2027.wav"],
      volume: 0.1,
    }),
    alarm: new Howl({
      src: ["soundEffects/mixkit-extra-bonus-in-a-video-game-2045.wav"],
      volume: 0.1,
    }),
  };

  let timeout;
  const displayEmoji = (e) => {
    clearTimeout(timeout);
    setEmoji(e);
    timeout = setTimeout(() => {
      setEmoji(null);
    }, emojiTimeout);
  };

  useEffect(() => {
    window.onpopstate = (e) => {
      socket.emit("leaveGame");
    };

    socket.on("resetGame", () => {
      //reset game
      backToLobby();
    });

    socket.on("startRound", () => {
      setLeft(false);
      setGameRunning(true);
      setNewGameButtonDisplay(true);
    });

    socket.on("newGrid", (newGridArray, isWarderTurn) => {
      setGridArray(newGridArray);
      setWarderTurn(isWarderTurn);
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

    socket.on("timer", (t) => {
      setTimer(t);
      if (t >= 0 && t <= 3) {
        sfx.alarm.play();
      }
    });

    socket.on("clearTimer", () => {
      setTimer(null);
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
      setLeft(true);
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          //move left
          setWelcomeMsg(null);
          socket.emit("move", "left");
          break;
        case "ArrowUp":
          //move up
          setWelcomeMsg(null);
          socket.emit("move", "up");
          break;
        case "ArrowRight":
          //move right
          setWelcomeMsg(null);
          socket.emit("move", "right");
          break;
        case "ArrowDown":
          //move down
          setWelcomeMsg(null);
          socket.emit("move", "down");
          break;
        default:
          return;
      }
    });

    socket.on("gameOver", () => {
      setGameOver(true);
      setTimeout(() => {
        backToLobby();
      }, 5000);
    });

    socket.on("receiveEmoji", (emoji) => {
      displayEmoji(emoji);
    });
  }, [role, welcomeMsg]);

  const startNewRound = () => {
    setNewGameButtonDisplay(false);
    setfirstGame(false);
    socket.emit("startNewRound");
  };

  const sendEmoji = (emoji) => {
    socket.emit("emoji", emoji);
  };

  const backToLobby = () => {
    let url = window.location.toString();
    window.location = url.replace("/game", "/");
  };

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
      {firstGame ? <h2>{welcomeMsg}</h2> : null}
      <div className='game-header'>
        <Timer theme={theme} timer={timer} />
        <Scoreboard
          nickname={nickname}
          score={score}
          opponentName={opponentName}
          opponentScore={opponentScore}
          theme={theme}
          role={role}
          warderTurn={warderTurn}
          gameRunning={gameRunning}
        />
        <ToggleSound backgroundPath={backgroundPath} />
      </div>

      <div className='game-container'>
        {gameOver ? (
          <GameOver theme={theme} score={score} opponentScore={opponentScore} />
        ) : gameFull ? (
          <GridPlaceholder
            theme={theme}
            message='Game is full, please come back later...'
          />
        ) : !gameRunning && !newGameButtonDisplay ? (
          <GridPlaceholder
            theme={theme}
            message='Waiting for the other player...'
          />
        ) : left ? (
          <GridPlaceholder theme={theme} message='Opponent disconnected...' />
        ) : gameRunning ? (
          <Grid gridArray={gridArray} theme={theme} />
        ) : !gameRunning && newGameButtonDisplay ? (
          <RoundOver
            theme={theme}
            notification={notification}
            startNewRound={startNewRound}
          />
        ) : null}
        <Chatbox
          socket={socket}
          nickname={nickname}
          playerId={id}
          sendEmoji={sendEmoji}
          emoji={emoji}
        />
      </div>
    </div>
  );
};
