import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Game } from "./components/Game";

function App() {
  const [theme, setTheme] = useState("jungle");
  return (
    <>
      <Router>
        <Switch>
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
