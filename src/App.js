import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./components/Grid";
import jungle from "./images/jungle.jpeg";
import { Timer } from "./components/Timer";

function App() {
  return (
    <div className='App' style={{ backgroundImage: `url(${jungle})` }}>
      <h1 className='game-title'>Escape Plan</h1>
      <div className='menu'>
        <Timer />
        <div className='mute' />
      </div>
      <Grid />
    </div>
  );
}

export default App;
