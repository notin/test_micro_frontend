import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
import { Link, Route, useLocation} from "react-router-dom";
// import Ability from "../abilities/Ability";
// import Form from "../form/Form";
import pk from "./contexts/pk";
// import Move from "../move/Move";
// import ActionSideBar from "../ActionsSideBar/ActionSideBar";
// import {faArrowDown, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PokemonContext  =  createContext(pk);

let Pokemon = () => {
    let props = useLocation();
    // @ts-ignore
    let url = props.state.item.url;
    let [pokemon, setPokemon] = useState([]);
    let [actionsVisible, setActionsVisible] = useState(url);
    let [titleClass, setTitleClass] = useState(actionsVisible);
    useEffect(()=> {fetchItems().then(r =>
        console.log("got pokemon details"))
    ;},[url])
    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        pk.pokeFormUrl = items.forms[0].url
        for(let i = 0 ; i< items.abilities.length; i++)
        {
            let a = items.abilities[i];

            let items1 = { name: a.ability.name, url:a.ability.url};
            pk.pokeAbilityUrls.push(items1);
        }
        for(let i = 0 ; i< items.moves.length; i++)
        {
            let m = items.moves[i];
            let items1 = { name: m.move.name, url:m.move.url, level_at :m.version_group_details[0].level_learned_at};
            pk.pokeMoveUrls.push(items1);
        }
        setPokemon(items);
        setActionsVisible(true)
        setTitleClass("pokeTitleLarge");
    }

    let toggleActions=()=> {
        setActionsVisible(!actionsVisible);
        let titleClazz = titleClass == "pokeTitleLarge" ? "pokeTitleMinimized":"pokeTitleLarge";
        setTitleClass(titleClazz);
    }

    // @ts-ignore
    let p = <>{props.state.item.name}</>;
    // @ts-ignore
    pk.pokeName = props.state.item.name;
    function getForm() {
        return <Form/>;
    }

    let getMove = () =>{
        let moves : any [] = [];
        for(let i:number = 0; i< pk.pokeMoveUrls.length; i++){
            moves.push(<Move index= {i}></Move>)
        }
        return <div className="pokeBase"><div>Moves</div>{moves}</div>;
    }

    function getAbility() {
        let abilities: any [] = [];
        for(let i:number = 0; i< pk.pokeAbilityUrls.length; i++){
            abilities.push(<Ability index={i}/>)
        }
        return <div className="pokeBase"><div>Abiliteis</div>{abilities}</div>;
    }

    let div = <PokemonContext.Provider value={pk}>
        <div className="pokeItem ">
            <div id="list">
                <p>
                    <ul>
                        <div className="pokeBase hbox collapse" >
                            <div className={titleClass}>
                                <p>{p}</p>
                            </div>

                            <FontAwesomeIcon onClick={toggleActions} className="actionOptionArrow" icon={faArrowLeft}></FontAwesomeIcon>
                            <div hidden={actionsVisible}><ActionSideBar></ActionSideBar></div>
                        </div>
                        {getForm()}
                        {getAbility()}
                        {getMove()}
                    </ul>
                </p>
            </div>
        </div>
    </PokemonContext.Provider>;
    return div
};
export default Pokemon;