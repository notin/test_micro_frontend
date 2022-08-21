// @ts-ignore
import React, { useState, useEffect, createContext } from "react";
import "./Pokemon.scss";
// @ts-ignore
import Ability from "ability/Ability";
// @ts-ignore
import Form from "form/Form";
import pk from "./contexts/pk";
// @ts-ignore
import Move from "move/Move";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import IName from "./IName";

import SockJsClient from 'react-stomp';

export const PokemonContext = createContext(pk);

let Pokemon = (name: IName) => {
  const [n, setName] = useState(name.name);
  const [url, setUrl] = useState(
    "http://localhost:1212/pokemon/pokemon-request?name=" + name.name
  );
  const [pokemon, setPokemon] = useState([false]);
  const [actionsVisible, setActionsVisible] = useState(url);
  const [titleClass, setTitleClass] = useState(actionsVisible);
  const [nameArrow, setNameArrow] = useState(faArrowRight);
  const [abilities, setAbilities] = useState([]);
  const [form, setForm] = useState<string>();
  const [moves, setMoves] = useState([]);
  const [movesLimit, setMovesLimit] = useState(10);
  const [visibleMoves, setVisibleMoves] = useState([]);
  const [reactive, setReactive] = useState(true)
  const location = window.location.pathname;

  const SOCKET_URL = 'http://localhost:1212/pokemon/';

  async function reactiveSetup() {
    let data = await fetch(url);
    let items = await data.json();
  }

  useEffect(() => {
    if (location) {
    setUrl("http://localhost:1212/pokemon/pokemon-request?name=" + location.split("/")[2]);
  }
    if(reactive == false){
      fetchItems().then((r) => console.log("got pokemon details"));
    }
    else{
      reactiveSetup();
    }


  }, [window.location.pathname, n, nameArrow, name.name]);
  let fetchItems = async () => {
    console.log("start calls");
    let data = await fetch(url);
    let items = await data.json();

    setPokemon(name.name)
    const f = items.forms[0].url.split("/pokemon-form/")[1].split("/")[0];
    console.log("setting form from pokemon ");
    setForm(name.name);
    const abilityNames = [];
    items.abilities.forEach((x) => abilityNames.push({ name: x.ability.name }));
    console.log("setting ability from pokemon ");
    setAbilities(abilityNames);
    const moveNames = [];
    items.moves.forEach((x) => moveNames.push({ name: x.move.name }));
    console.log("setting move from pokemon ");
    setMoves(moveNames);
    setPokemon(items);
    // @ts-ignore
    setActionsVisible(true);
    setTitleClass("pokeTitleLarge");
    return () => {
      setAbilities([]);
      setMoves([]);
      setForm("1");
    };
  };

  let handleScroll = async (e: any) => {
    let b =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (b) {
      console.log("scrolling");
      let movesLimit1 = movesLimit + 5;
      setMovesLimit( movesLimit1 )
    }
  };

  let toggleActions = () => {
   if(!reactive){
     // @ts-ignore
     setActionsVisible(!actionsVisible);
     let titleClazz =
         titleClass == "pokeTitleLarge" ? "pokeTitleMinimized" : "pokeTitleLarge";
     setTitleClass(titleClazz);
     const faArrow = nameArrow == faArrowDown ? faArrowRight : faArrowDown;
     setNameArrow(faArrow);
   }
  };

  function getForm() {
    let fragment = <React.Fragment></React.Fragment>;
    if (nameArrow != faArrowRight && form) {
      fragment = <Form index={form}></Form>;
    }
    return fragment;
  }

  const getMoves = () => {
    let fragment: any = <React.Fragment></React.Fragment>;
    if (nameArrow != faArrowRight) {
      let col: any[] = [];
      let ml = movesLimit < moves.length ? movesLimit : moves.length;
      for (let i: number = 0; i < movesLimit; i++) {
        col.push(<li><Move index={moves[i]} /></li>);
      }
      fragment = (
        <div className="pokeBase">
          <div>Move</div>
          <ul onScroll={handleScroll}>
            {col}
          </ul>

        </div>
      );
    }
    return fragment;
  };

  const getAbilities = () => {
    let fragment: any = <React.Fragment></React.Fragment>;
    if (nameArrow != faArrowRight) {
      let col: any[] = [];
      for (let i: number = 0; i < abilities.length; i++) {
        col.push(<Ability index={abilities[i]} />);
      }
      fragment = (
        <div className="pokeBase">
          <div>Abilities</div>
          {col}
        </div>
      );
    }
    return fragment;
  };

  const getPokemonTitle = () => {
    const div1 = <div className={titleClass}>{name.name}</div>;
    return div1;
  };

  const getStandardAPICall = () => {
    let div1 = <React.Fragment/>
    if(!reactive){
      div1 = <div>
        {getForm()}
        {getAbilities()}
        {getMoves()}
      </div>;
    }
    return div1;
  }

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setPokemon(msg);
  }

  function getSockJsClient() {
    return <SockJsClient
        url={SOCKET_URL}
        topics={['/pokemon-delivery/delivered']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
    />;
  }

  const getPokemon = () => {
    const provider = (
      <PokemonContext.Provider value={pk}>
        <div className="pokeItem ">
          <div id="list">
            <div>
              <ul>
                <div>
                  <div>
                    <div className="pokeBase hbox">
                      <FontAwesomeIcon
                          onClick={toggleActions}
                          className="actionOptionArrow"
                          icon={nameArrow}
                          style={{paddingRight: "15px"}}
                      ></FontAwesomeIcon>

                      {getPokemonTitle()}
                    </div>

                    {getStandardAPICall()}

                    {/*{getSockJsClient()}*/}
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </PokemonContext.Provider>
    );
    return provider;
  };

  let div = getPokemon();
  return div;
};
export default Pokemon;
