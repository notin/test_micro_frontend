
// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";

import "./index.css";
import Move from "./move/Move";


const App = () => (
  <div className="container">
    <Move mv = {"mega-punch"}/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
