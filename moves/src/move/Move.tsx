// @ts-ignore
import React, {useState, useEffect, useContext} from "react";

import MoveType from "./MoveType";
import "./Move.scss"

let Move = ( mv: any ) => {

    // @ts-ignore
    let [url, setURL] = useState('https://pokeapi.co/api/v2/move/' + mv.index.name);
    let [move, setMoves] = useState<MoveType>();

    useEffect(()=> {fetchMove().then(() =>
        console.log("got getting ability"));
    ;},[url])
    let fetchMove = async () => {
        let data = await fetch(url);
        let items = await data.json();
        setMoves(items);
    }

     let getMove = () => {
        let element = null;
        // @ts-ignore
        if(move != undefined && move.name != undefined){
            element = <div id = {move.name}>
                    <div>
                        <div>type : {mv.index.name}</div>
                        <div>type : {move.type.name}</div>
                        <div>accuracy : {move.accuracy}</div>
                    </div>
            </div>;
        }
        return element;
    }

    return <div>
        {getMove()}
    </div>
}
export default Move;