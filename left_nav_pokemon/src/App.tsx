// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import LeftHandNav from "./LeftNav";
import LeftNav from "./LeftNav";

const App = () => (
  <div className="container">
    <BrowserRouter>
      <LeftNav></LeftNav>
    </BrowserRouter>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
