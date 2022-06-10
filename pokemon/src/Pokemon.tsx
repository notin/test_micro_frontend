// @ts-ignore
import React, {useState, useEffect, createContext} from "react";
import "./Pokemon.scss"
// @ts-ignore
import Ability from "ability/Ability";
// @ts-ignore
import Form from "form/Form";
import pk from "./contexts/pk";
// @ts-ignore
import Move from "move/Move";

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
    const [moves, setMoves] = useState([])
    useEffect(() => {
        fetchItems().then(r =>
            console.log("got pokemon details"))
        ;
    }, [url])
    let fetchItems = async () => {
        let data = await fetch(url);
        let items = await data.json();
        pk.pokeFormUrl = items.forms[0].url
        const abilityNames =[]
        items.abilities.forEach(x=> abilityNames.push({name : x.ability.name }) );
        setAbilities( abilityNames);
        const moveNames =[]
        items.moves.forEach(x=> moveNames.push({name : x.move.name }) );
        setMoves( moveNames);
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

    const getMove = () => {

        let fragment: any = <React.Fragment></React.Fragment>;
        if (nameArrow != faArrowRight) {
            let col: any [] = [];
            for (let i: number = 0; i < moves.length; i++) {
                col.push(<Move index={moves[i]}/>)
            }
            fragment = <div className="pokeBase">
                <div>Move</div>
                {col}</div>;
        }
        return fragment;

    }


    const getAbility = () => {
        let fragment: any = <React.Fragment></React.Fragment>;
        if (nameArrow != faArrowRight) {
            let col: any [] = [];
            for (let i: number = 0; i < abilities.length; i++) {
                col.push(<Ability index={abilities[i]}/>)
            }
            fragment = <div className="pokeBase">
                <div>Abilities</div>
                {col}</div>;
        }
        return fragment;
    }

    const getPokemonTitle = () => {
        const div1 = <div className={titleClass}>
            {name.name}
        </div>;
        return div1;
    }

    const getPokemon = () => {
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
                                        {getMove()}
                                    </div>
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
    return div
};
export default Pokemon;