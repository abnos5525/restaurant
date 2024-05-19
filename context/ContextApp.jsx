'use client'

import {createContext, useState} from "react";

const Context = createContext({
    useState:
})


export const ContextApp = ({children})=>{
    return(
       <Context.Provider value={{
       }}>
           {children}
       </Context.Provider>
    )
}