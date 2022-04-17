import React from "react";
import ReactDOM from "react-dom";
import amiibo_cards_container from "./amiibo_cards_container"

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: amiibo_card</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
    <amiibo_cards_container/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
