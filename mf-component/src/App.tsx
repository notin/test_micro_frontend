// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./Header";
import Footer from "./Footer";

const App = () => (
    <div className="container">
        <Header/>
        <div>Home Page Content</div>
        <Footer/>
    </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
