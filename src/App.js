import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Game } from "./components/Game";
import { Lobby } from "./components/Lobby";
import io from "socket.io-client";

require('dotenv').config();

const socket = io.connect(process.env.REACT_APP_SERVER);

function App() {
  const [theme, setTheme] = useState("default");
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
