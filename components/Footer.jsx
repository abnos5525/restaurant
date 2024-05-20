'use client'

import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const Footer = () =>{

    const {dark} = useContext(Context)

    return(
        <div className={`text-center ${dark ? 'bg-gray-800' : 'bg-white'} py-10 w-full float-right`}>
            <p className={`text-lg ${dark ? 'text-white' : 'text-zinc-600'} `}>
                Copyright © 2024 Abnos | Design: Hossein
            </p>
        </div>
    )
}

export default Footer