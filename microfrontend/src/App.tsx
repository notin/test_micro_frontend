// @ts-ignore
import React, {Fragment, Suspense, useState} from "react";
// @ts-ignore
import ReactDOM from "react-dom";
// @ts-ignore
import Header from "mf_component/Header";
// @ts-ignore
import Footer from "mf_component/Footer";

import "./index.css";


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
        let fragment = <Suspense fallback={<Fragment/>}>
            <div className="container">
                {header}
                <div>Home Page Content</div>
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
