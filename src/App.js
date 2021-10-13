import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Game } from "./components/Game";
import { Lobby } from "./components/Lobby";

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
            component={() => <Lobby theme={theme} setTheme={setTheme} />}
          ></Route>
          <Route
            exact
            path='/game'
            component={() => <Game theme={theme} />}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
