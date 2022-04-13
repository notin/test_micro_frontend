// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
// @ts-ignore
import Test from "microfrontend/Test"

const App = () => (
    <div className="container">
        <Header/>
        <Test/>
        <div>Home Page Content</div>
        <Footer/>
    </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
