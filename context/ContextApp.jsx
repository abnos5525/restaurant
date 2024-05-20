'use client'

import {createContext, useEffect, useState} from "react";

export const Context = createContext()

export const ContextApp = ({children})=>{

    const [userInfo, setUserInfo] = useState([])
    const [dark, setDark] = useState(false)
    const [dashLink, setDashLink] = useState(1)

    useEffect(() => {
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDark(darkQuery.matches);
    }, []);

    return(
       <Context.Provider value={{
           userInfo,
           setUserInfo,

           dark,
           setDark,

           dashLink,
           setDashLink
       }}>
           {children}
       </Context.Provider>
    )
}