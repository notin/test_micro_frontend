// @ts-ignore
import React, {Fragment, Suspense, useEffect, useState} from "react";
// @ts-ignore
import ReactDOM from "react-dom";
// @ts-ignore
import Header from "mf_component/Header";

// @ts-ignore
import Times from "mf_component/Times";
// @ts-ignore
import Footer from "mf_component/Footer";

import "./index.css";

import Footer2 from "./Multiple";
import Multiple from "./Multiple";


const App = () => {

    const [s, setS] = useState(false);

    const getHeader = () => {
        if (s) {
            const header = <Header/>;
            return header;
        }

    }

    const getDiv = () => {
        const header = getHeader();
        const multiple1 = () =>{

            const multiple2 = <Multiple/>;
            return multiple2
        }
        const multiple = multiple1;
        let fragment = <Suspense fallback={<Fragment/>}>
            <div className="container">
                {header}
                {multiple}
                <Footer/>
                <button onClick={() => {
                    setS(!s)
                }}/>
            </div>
        </Suspense>;

        return fragment;
    }
    return getDiv()
};
ReactDOM.render(<App/>, document.getElementById("app"));
