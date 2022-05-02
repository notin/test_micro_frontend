// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore

import Joke from "./Joke"

const IcndbContainer = (): JSX.Element => {

    const [jokes, setJokes] = useState<Joke[]>();

    // @ts-ignore
    const fetchJokes = async () => {

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Accept', 'application/json');

        let promise = await fetch("https://api.icndb.com/jokes", {
            // mode: "no-cors",
            method: 'GET',
            headers: requestHeaders,
        });
        console.log(promise);
        let json = await promise.json();
        setJokes(json.value);
    }

    useEffect(() => {
        fetchJokes().then();
        console.log("fetch attempted");
    }, [])


    const getJokes: any = () => {
        return (jokes) ? formatJokes(jokes) : <React.Fragment></React.Fragment>;
    }

    const formatJokes = (puns: Joke[]) => {
        let li = [];
        for (let i = 0; i < 10; i++) {
            li.push(<li>{puns[i].joke}</li>);
        }
        return li;
    }

    return getJokes()
}

export default IcndbContainer