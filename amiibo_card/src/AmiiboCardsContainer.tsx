// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
const AmiiboCardsContainer = (): JSX.Element => {

    // @ts-ignore
    const fetchCards = async () => {

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Accept', 'application/json');

        let response = await fetch("http://192.168.7.69:8080/api/amiiboCards", {
            mode: "no-cors",
            method: 'GET',
            headers: requestHeaders,
        });
        let promise = await response.json();
    }

    useEffect(() => {
        fetchCards().then();
        console.log("fetch attempted");
    }, [])
    return <div>something</div>
}

export default AmiiboCardsContainer