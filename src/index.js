import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useDarkMode } from "./components/hooks/useDarkMode";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";
import Edd from "./components/edd";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode(false);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then((res) => setCoinData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Route exact path="/">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Charts coinData={coinData} darkMode={darkMode} />
      </Route>
      <Route exact path="/edd">
        <Edd />
      </Route>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
