// @ts-ignore
import React, {useEffect, useState}  from "react";
const amiibo_cards_container = () => {

    // @ts-ignore
    const fetchCards = async () => {
        let response = await fetch("http://localhost:8080/api/amiiboCards");
        let promise = await response.json();

    }

    useEffect( () => {
        fetchCards().then();
    }, [])

}

export default amiibo_cards_container