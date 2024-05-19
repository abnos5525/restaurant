'use client'

import LoginForm from "@/components/login/LoginForm";
import {useGetUserQuery} from "@/lib/reducers/userApi";
import {useContext, useEffect} from "react";
import {Context} from "@/context/ContextApp";

const Login = () =>{

    const userId = sessionStorage.getItem('userId')
    const {data} = useGetUserQuery(userId)
    const {userInfo,setUserInfo} = useContext(Context)

    useEffect(() => {
        setUserInfo(data)
    }, [userInfo]);

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <h4 className="text-3xl">
                    ورود
                </h4>
                <div className="mt-10">
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}

export default Login