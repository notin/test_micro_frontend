// @ts-ignore
import React, {useState, useEffect, useContext} from "react";


import "./Abilities.scss";
import AbilityType from "./AbilityType";
import AbilityDetails from "./AbilityDetails";


interface IAbility {
    index: number;
    name: string;
}

let Ability = (ability: IAbility ) => {

// @ts-ignore
    let [url, setURL] = useState('https://pokeapi.co/api/v2/ability/' + ability.name);
    let [abilities, setAbilities] = useState<AbilityType>();

    useEffect(()=> {fetchAbilities().then(() =>
        console.log("got getting ability"));
    ;},[url])
    let fetchAbilities= async () => {
        if(url) {
            let data = await fetch(url);
            let items = await data.json();
            // @ts-ignore
            let find = items.pokemon.find(x=>x.pokemon.name == context.pokeName);
            if(find) {
                let denormalized = new AbilityType(items.name, items.effect_entries)
                setAbilities(denormalized);

            }
            else {
                let message = "ability not associated with pokemon : " + items.name;
                console.log(message);
                let elementById = document.getElementById(items.name);
                if(elementById) {
                    message = "ability move not associated with pokemon : " + items.name;
                    console.log(message);
                    elementById.remove();
                }
            }
        }

    }

    let getAbilitInfo =(a: AbilityType)=> {
        let col = [];
        if(a != undefined ) {
            let abilities1 = a.abilities;
            if(abilities1 != undefined ) {
                let effectEntries : AbilityDetails = abilities1 as unknown as AbilityDetails;
                let items = <div id={a.name}>
                    <div className="hbox">
                        {effectEntries.effect}
                    </div>
                </div>;
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