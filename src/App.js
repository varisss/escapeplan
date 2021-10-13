import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Game } from "./components/Game";
import { Lobby } from "./components/Lobby";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {
  const [theme, setTheme] = useState("jungle");
  console.log(theme);
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={() => (
              <Lobby socket={socket} theme={theme} setTheme={setTheme} />
            )}
          ></Route>
          <Route
            exact
            path='/game'
            component={() => <Game socket={socket} theme={theme} />}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;