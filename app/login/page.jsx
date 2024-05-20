'use client'

import LoginForm from "@/components/login/LoginForm";
import Link from "next/link";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const Login = () =>{
    const {dark} = useContext(Context)

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className={`flex flex-col ${dark ? 'bg-gray-800' : 'bg-white'} shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md`}>
                <h4 className={`text-3xl ${dark ? 'text-white' : ''}`}>
                    ورود
                </h4>
                <div className="mt-10">
                    <LoginForm/>
                </div>
                <Link href="/register" className={`py-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                    اکانت ندارید؟
                </Link>
            </div>
        </div>
    )
}

export default Login