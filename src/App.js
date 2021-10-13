import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';
import  { Grid } from "./components/Grid";

const socket = io.connect('http://localhost:4000')

function App() {
  const [gridArray, setGridArray] = useState([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  let gameRunning = false;
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState('');
  const [initialEntry, setInitialEntry] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(()=> {
    socket.on('newGrid', (newGridArray)=> {
      setGridArray(newGridArray);
    })

    socket.on('initializeRole', (players)=> {
      console.log(socket.id);
      // setRole(newRole);
      for (const player of players){
        console.log(player.id);
        if (socket.id === player.id){
          setRole(player.role);
          setNickname(player.nickname);
        }
      }

    })

    socket.on('disconnection', (message)=>{
      setNotification(message);
    })
  })

  const joinGame = ()=> {
    console.log("join gameclicked")
    socket.emit('joinGame');
    setInitialEntry(false);
    gameRunning = true;
  }

  // const startGame = ()=> {
  //   console.log("join gameclicked")
  //   socket.emit('startGame');
  //   gameRunning = true;
  // }

  window.addEventListener('keydown', (e)=> {
      switch(e.keyCode){
        case 37:
          //move left
          socket.emit("move", "left")
          console.log('move left');
          
          break;
        case 38:
          //move up
          socket.emit("move", "up")
          console.log('move up');

          break;
        case 39:
          //move right
          socket.emit("move", "right");
          console.log('move right');

          break;
        case 40: 
          //move down
          socket.emit("move", "down");
          console.log('move down');
          break;
      }
  });

  let roleDisplay=null;
  if(role){
    roleDisplay = (
      <h1>Role: {role}</h1>
    )
  }
  
  return (
    <div className="App">
      {roleDisplay}
      {notification? <h2>{notification}</h2>: null}
      <h1 className="game-title">Escape Plan</h1>
      {initialEntry? <button onClick={joinGame}>Join Game</button>: null}
      <Grid grid={gridArray}/>
    </div>
  );
}

export default App;
