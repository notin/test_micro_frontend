// @ts-ignore
import React, {useState, useEffect, useContext} from "react";


import "./Form.scss";
import "./IForm"




let Form = ( index : any ) => {

    // @ts-ignore
    const [url, setUrl] = useState<string>(" https://pokeapi.co/api/v2/pokemon-form/"+ index.index);
    const [form, setForm] = useState<IForm>();

    useEffect(()=> {fetchForm().then(r =>
        console.log("got getting form"));
    ;},[url, index.index])
    let fetchForm= async () => {
        console.log("setting form")
        let data = await fetch(url);
        let f = await data.json();
        setForm(f);

    }

    function getType(type1: { slot: number; type: { name: string; url: string } }) {
        let type: string = type1 !== undefined ? type1.type.name as string : "";
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

    function getTypes() {
        const col = [];
        for(let i = 0; i < form.types.length; i++){
            col.push(getType(form.types[i]))
        }
        return <div>{col}</div>;
    }

    const getForm : any = () =>{
        let f = <React.Fragment/>

            if(form){
            f = <div className="base">
                <div className="hbox">
                    <div>
                        <div id = {index.index}>
                            Form
                        </div>
                        <div id="formOrder">{getOrder()}</div>
                        {getTypes()}
                    </div>
                    <div className="stretch">{getSrc()}</div>
                </div>

            </div>;
            }
        return f
    }

    return getForm();
}
export default Form;