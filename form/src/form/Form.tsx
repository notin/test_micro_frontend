// @ts-ignore
import React, {useState, useEffect, useContext} from "react";


import "./Form.scss";
import "./IForm"




let Form = ( index : number) => {

    // @ts-ignore
    const [url, setUrl] = useState<string>(" https://pokeapi.co/api/v2/pokemon-form/"+ index.index);
    const [form, setForm] = useState<IForm>();

    useEffect(()=> {fetchAbilities().then(r =>
        console.log("got getting form"));
    ;},[url])
    let fetchAbilities= async () => {
        if(!form) {
            try{
                console.log("setting form")
                let data = await fetch(url);
                let f = await data.json();
                setForm(f);
            }
            catch (e) {
                console.log(e.message)
            }


        }
        else {
            console.log("form already exists")
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

    const getForm : any = () =>{
        let f = <React.Fragment/>

            if(form){
            f = <div className="base">
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

            </div>;
            }
        return f
    }

    return getForm();
}
export default Form;