// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
const AmiiboCardsContainer = (): JSX.Element => {

    // @ts-ignore
    const fetchCards = async () => {
        let options =
            {
                mode: "no-cors",
                headers: {"Content-Type": "application/json"}
            };
        let response = await fetch("http://localhost:8080/api/amiiboCards", options);
        let promise = await response.json();
    }

    useEffect(() => {
        fetchCards().then();
        console.log("fetch attempted");
    }, [])
    return <div>something</div>
}

export default AmiiboCardsContainer