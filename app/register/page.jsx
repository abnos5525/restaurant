'use client'

import Link from "next/link";
import RegisterForm from "@/components/register/RegisterForm";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const Register = () =>{
    const {dark} = useContext(Context)

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className={`flex flex-col ${dark ? 'bg-gray-800' : 'bg-white'} shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md  my-5`}>
                <h4 className={`text-3xl ${dark ? 'text-white' : ''}`}>
                    ثبت نام
                </h4>
                <div className="mt-10">
                    <RegisterForm/>
                </div>
                <Link href="/login" className={`py-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                    اکانت دارید؟ وارد شوید
                </Link>
            </div>
        </div>
    )
}

export default Register