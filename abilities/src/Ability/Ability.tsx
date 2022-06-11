// @ts-ignore
import React, {useState, useEffect, useContext} from "react";


import "./Abilities.scss";
import AbilityType from "./AbilityType";
import AbilityDetails from "./AbilityDetails";


interface IAbility {
    name: string;
}

let Ability = (ability: IAbility ) => {

// @ts-ignore
    let [url, setURL] = useState('https://pokeapi.co/api/v2/ability/' + ability.index.name);
    let [abilities, setAbilities] = useState<AbilityType>();

    useEffect(()=> {
        console.log("getting abilties");
        fetchAbilities().then(() =>
        console.log("got getting ability"));
    ;},[url])
    let fetchAbilities= async () => {
        if(url) {
            console.log("getting ability")
            let data = await fetch(url);
            let items = await data.json();

            let denormalized = new AbilityType(items.name, items.effect_entries)
            setAbilities(denormalized);
        }

    }

    let getAbilitInfo =(a: AbilityType)=> {
        let col = [];
        if(a != undefined ) {
            let abilities1 = a.abilities;
            if(abilities1 != undefined ) {
                let effectEntries : AbilityDetails = abilities1 as unknown as AbilityDetails;
                let items = <React.Fragment><div id={a.name}>
                    <div>{a.name}:</div>
                    <div className="hbox">
                        {effectEntries.effect}
                    </div>
                </div></React.Fragment>;
                col.push(items);
            }

        }
        let div1 = <div>
            <div>
                {col}
            </div>
        </div>;
        return div1
    }

    const getAbility = () => {
        let able = <React.Fragment/>
            if(ability){
            able = <div key={"key"}>
                {getAbilitInfo(abilities as AbilityType)}
            </div>
        };
        return able;
    }

    let able = getAbility();
    return able;
}
export default Ability;