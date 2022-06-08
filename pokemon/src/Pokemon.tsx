// @ts-ignore
import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
import {Link, Route, useLocation} from "react-router-dom";
// import Ability from "../abilities/Ability";
// @ts-ignore
import Ability from "ability/Ability";
// @ts-ignore
import Form from "form/Form";
import pk from "./contexts/pk";
// import Move from "../move/Move";
import ActionSideBar from '../src/ActionsSideBar/ActionSideBar'
import {faArrowDown, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// @ts-ignore
import IName from "./IName";

export const PokemonContext = createContext(pk);

let Pokemon = (name : IName) => {

    const [n, setName] = useState(name.name)
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/'+name.name)
    const [pokemon, setPokemon] = useState([false]);
    const [actionsVisible, setActionsVisible] = useState(url);
    const [titleClass, setTitleClass] = useState(actionsVisible);
    const [nameArrow, setNameArrow] = useState(faArrowRight)
    const [abilities, setAbilities] = useState([])
    useEffect(() => {
        fetchItems().then(r =>
            console.log("got pokemon details"))
        ;
    }, [url])
    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        pk.pokeFormUrl = items.forms[0].url
        pk.pokeAbility = items.abilities.map(x=> {name : x.ability.name } )
        pk.pokeMoveUrls = items.moves[0].url
        setPokemon(items);
        // @ts-ignore
        setActionsVisible(true)
        setTitleClass("pokeTitleLarge");
    }

    let toggleActions = () => {
        // @ts-ignore
        setActionsVisible(!actionsVisible);
        let titleClazz = titleClass == "pokeTitleLarge" ? "pokeTitleMinimized" : "pokeTitleLarge";
        setTitleClass(titleClazz);
        const faArrow = nameArrow == faArrowDown ? faArrowRight : faArrowDown;
        setNameArrow(faArrow);
    }

    // @ts-ignore
    let p = <>{name}</>;
    // @ts-ignore
    pk.pokeName = name;

    function getForm() {
        let fragment: any = <React.Fragment></React.Fragment>;
        if (nameArrow != faArrowRight) {
            const pokeFormUrl = pk.pokeFormUrl;
            const i = pokeFormUrl.split('/pokemon-form/')[1].split("/")[0];
            fragment = <Form index = {i}></Form>
        }

        return fragment;
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
        let col: any [] = [];
        for (let i: number = 0; i < abilities.length; i++) {
            col.push(<Ability index={abilities[i]}/>)
        }
        return <div className="pokeBase">
            <div>Abilities</div>
            {col}</div>;
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
                    <div>
                        <ul>
                            <div>
                                <div >
                                    <div className="pokeBase hbox"><FontAwesomeIcon onClick={toggleActions} className="actionOptionArrow" icon={nameArrow} style={{paddingRight: "15px"}}></FontAwesomeIcon>

                                        {getPokemonTitle()}</div>

                                    <div>
                                        {getForm()}
                                        {getAbility()}
                                    </div>

                                    {/*<div hidden={actionsVisible}><ActionSideBar></ActionSideBar></div>*/}
                                    {/*</div>*/}



                                    {/*{getMove()}*/}
                                </div>
                            </div>

                        </ul>
                    </div>
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