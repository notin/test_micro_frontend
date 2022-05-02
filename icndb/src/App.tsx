// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import IcndbContainer from "./IcndbContainer"

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: amiibo_card</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
    <IcndbContainer/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
