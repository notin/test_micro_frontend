// @ts-ignore
import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
import {Link, Route, useLocation} from "react-router-dom";
// import Ability from "../abilities/Ability";
// @ts-ignore
import Form from "form/Form";
import pk from "./contexts/pk";
// import Move from "../move/Move";
import ActionSideBar from '../src/ActionsSideBar/ActionSideBar'
import {faArrowDown, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const PokemonContext = createContext(pk);

let Pokemon = (name ?: any) => {

    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=200")
    const [pokemon, setPokemon] = useState([false]);
    const [actionsVisible, setActionsVisible] = useState(url);
    const [titleClass, setTitleClass] = useState(actionsVisible);
    const [nameArrow, setNameArrow] = useState(faArrowRight)
    useEffect(() => {
        fetchItems().then(r =>
            console.log("got pokemon details"))
        ;
    }, [url])
    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        pk.pokeFormUrl = items.forms[0].url
        for (let i = 0; i < items.abilities.length; i++) {
            let a = items.abilities[i];

            let items1 = {name: a.ability.name, url: a.ability.url};
            pk.pokeAbilityUrls.push(items1);
        }
        for (let i = 0; i < items.moves.length; i++) {
            let m = items.moves[i];
            let items1 = {name: m.move.name, url: m.move.url, level_at: m.version_group_details[0].level_learned_at};
            pk.pokeMoveUrls.push(items1);
        }
        setPokemon(items);
        // @ts-ignore
        setActionsVisible(true)
        setTitleClass("pokeTitleLarge");
    }

    let toggleActions=()=> {
        // @ts-ignore
        setActionsVisible(!actionsVisible);
        let titleClazz = titleClass == "pokeTitleLarge" ? "pokeTitleMinimized":"pokeTitleLarge";
        setTitleClass(titleClazz);
        const faArrow = nameArrow == faArrowDown ? faArrowRight : faArrowDown;
        setNameArrow(faArrow);
    }

    // @ts-ignore
    let p = <>{name}</>;
    // @ts-ignore
    pk.pokeName = name;

    function getForm() {
        return <React.Fragment><Form></Form></React.Fragment>;
    }

    let getMove = () => {
        let moves: any [] = [];
        for (let i: number = 0; i < pk.pokeMoveUrls.length; i++) {
            // moves.push(<Move index= {i}></Move>)
        }
        return <div className="pokeBase">
            <div>Moves</div>
            {moves}</div>;
    }


    function getAbility() {
        let abilities: any [] = [];
        for (let i: number = 0; i < pk.pokeAbilityUrls.length; i++) {
            // abilities.push(<Ability index={i}/>)
        }
        return <div className="pokeBase">
            <div>Abiliteis</div>
            {abilities}</div>;
    }

    function getPokemonTitle() {
        const div1 = <div className={titleClass}>
            {name.name}
        </div>;
        return div1;
    }

    function getPokemon() {
        const provider = <PokemonContext.Provider value={pk}>
            <div className="pokeItem ">
                <div id="list">
                    <p>
                        <ul>
                            <div className="pokeBase hbox collapse">
                                <FontAwesomeIcon onClick={toggleActions} className="actionOptionArrow" icon={nameArrow} style = {{paddingRight: "15px"}}></FontAwesomeIcon>
                                {getPokemonTitle()}


                                {/*<div hidden={actionsVisible}><ActionSideBar></ActionSideBar></div>*/}
                                {/*</div>*/}

                                {getForm()}
                                {/*{getAbility()}*/}
                                {/*{getMove()}*/}
                            </div>
                        </ul>
                    </p>
                </div>
            </div>
        </PokemonContext.Provider>;
        return provider;
    }

    let div = getPokemon();
    // const div = <div>"I am a pokemon"</div>
    return div
};
export default Pokemon;