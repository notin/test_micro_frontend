// @ts-ignore
import React, {useEffect, useState} from "react";

// @ts-ignore
import Times from "mf_component/Times";
const Multiple = () : JSX.Element =>
{
    const [answer, setAnswer] = useState();
    const [one, setOne] = useState();
    const [two, setTwo] = useState();

    useEffect(()=> {
        if(one && two){
            timesInput()
        }
    },[])
    const timesInput= () => {
        const a = Times(one, two);
        setAnswer(a)
    }

    const getAmount = (e: React.ChangeEvent<HTMLInputElement>, inpt : any ) => {
        const value = e.target.value;
        const number = parseInt(value);
        if(isNaN(number)) {
            inpt(number)
        }

    }

    const fragment1 = <React.Fragment>
        <div>Home Page Content</div>
        <input onChange={e => getAmount(e, setOne)}/>
        <div> X </div>
        <input onChange={e => getAmount(e, setTwo)}/>
        <textarea>{answer}</textarea>
    </React.Fragment>;
    return fragment1;

}

export default Multiple;