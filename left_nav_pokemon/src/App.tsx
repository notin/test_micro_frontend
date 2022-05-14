// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";

import "./index.css";
import LeftHandNav from "./LeftNav";
import LeftNav from "./LeftNav";

const App = () => (
  <div className="container">
      {/*<div>Name: left_nav_pokemon</div>*/}
      {/*<div>Framework: react</div>*/}
      {/*<div>Language: TypeScript</div>*/}
      {/*<div>CSS: Empty CSS</div>*/}
      <LeftNav></LeftNav>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
