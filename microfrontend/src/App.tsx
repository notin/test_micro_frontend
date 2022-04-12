// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
// @ts-ignore
import Header from "mf_component/Header";
// @ts-ignore
import Footer from "mf_component/Footer";

import "./index.css";

const App = () => (


  <div className="container">
      <Header/>
    <div>Home Page Content</div>
      <Footer/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
