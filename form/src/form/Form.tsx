// @ts-ignore
import React, {useState, useEffect, useContext} from "react";


import "./Form.scss";
import "./IForm"




let Form = ( index : number, f ?: IForm) => {

    // @ts-ignore
    const [url, setUrl] = useState<string>(" https://pokeapi.co/api/v2/pokemon-form/"+ index);
    const [form, setForm] = useState<IForm>(f? f: null);

    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting form"));
    ;},[url])
    let fetchAbilities= async () => {
        if(!form){
            let data = await fetch(url);
            let items = await data.json();
            let formUlr = items.forms[0].url;
            let formJson = await fetch(formUlr)
            let f = await formJson.json();
            setForm(f);
        }

    }

    function getType() {
        let type: string = form == undefined ? form[0].type.name as string : "";
        return  "type order is " + type;
    }
    function getOrder() {
        let order = form.order;
        return  "form order is " + order;
    }

    function getSrc() {
        // @ts-ignore
        let src: string = form['sprites']? form['sprites']['front_default'] as string : "";
        let img = <img src={src}></img>;
        return img;
    }

    return <div className="base">
        <div className="hbox">
            <div>
                <div>
                    <p>Form</p>
                </div>
                <div>{getOrder()}</div>
                <p></p>
                <div>{getType()}</div>
            </div>
            <div className="stretch">{getSrc()}</div>
        </div>

    </div>
}
export default Form;