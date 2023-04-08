/*part 1 Context */

import { createContext, useState } from "react";


export let CounterContext = createContext();

export default function CounterContextProvider(props){

    const [counter, setCounter] = useState(0);
    const [userName, setuserName] = useState("ahmed");
    function changeCounter(){
        setCounter(Math.random())
    }

    return <CounterContext.Provider value={{counter,userName,changeCounter}}>
        {props.children}
    </CounterContext.Provider>
}