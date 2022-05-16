// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";

import "./index.css";
import Pokemon from "./Pokemon";

const App = () => (
    <div className="container">
        <Pokemon></Pokemon>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
