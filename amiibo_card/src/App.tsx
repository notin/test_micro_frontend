// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import AmiiboCardsContainer from "./AmiiboCardsContainer"

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: amiibo_card</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
    <AmiiboCardsContainer/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
