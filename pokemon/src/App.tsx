import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Pokemon from "./Pokemon";

const App = () => (
    <div className="container">
        <div>Name: pokemon</div>
        <div>Framework: react</div>
        <div>Language: TypeScript</div>
        <div>CSS: Empty CSS</div>
        <Pokemon></Pokemon>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
