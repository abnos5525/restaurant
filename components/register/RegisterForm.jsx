'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import {registerSchema} from "@/components/register/registerValidation";
import {useCreateUserMutation, useGetUsersQuery} from "@/lib/reducers/userApi";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {tokenGenerator} from "@/utils/tokenGenerator";
import {signatureGenerator} from "@/utils/signatureGenerator";
import {useContext, useState} from "react";
import {Context} from "@/context/ContextApp";
import {nanoid} from "@reduxjs/toolkit";

const RegisterForm = ()=>{

    const router = useRouter()

    const {data} = useGetUsersQuery()
    const [createNewUser] = useCreateUserMutation()
    const {setUserInfo, dark} = useContext(Context)

    const [existingUserError, setExistingUserError] = useState("")

    const handleRegister = async (values) =>{
        try {
            const {name,username,phone,password} = values
            const existingUser = data.find(user => user.username === username)
            if (existingUser) {
                setExistingUserError("کاربری با این نام کاربری وجود دارد")
                return
            }
            const id = nanoid()
            const saveInfo = {
                id,
                name,
                username,
                phone,
                password,
                role: 'user',
                foods:[],
                address:""
            }
            await createNewUser(saveInfo).unwrap()
                const token = tokenGenerator()
                const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
                const signature = signatureGenerator(token)
                sessionStorage.setItem("isLoggedIn", token)
                sessionStorage.setItem("expirationTime", expirationTime.getTime())
                sessionStorage.setItem("signature", signature);
                sessionStorage.setItem("userId", id);
                setUserInfo(saveInfo)
                toast.success("با موفقیت ثبت نام شدید", {position:"bottom-left"})
                setExistingUserError("")
                router.push("/")

        }catch (err){
            console.error(err)
            toast.error("مشکلی از سمت سرور بوجود آمده!", {position:"bottom-left"})
        }
    }

    return(
        <Formik initialValues={{
            name:'',
            username:'',
            phone:'',
            password:''
        }}
        validationSchema={registerSchema} onSubmit={handleRegister}>
        <Form>
            <div className="flex flex-col mb-6">
                <label htmlFor="name"
                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام:</label>
                <div className="relative">
                    <Field name="name" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full"
                           placeholder="نام"
                    />
                    <ErrorMessage name="name" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="username"
                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام کاربری:</label>
                <div className="relative">
                    <Field name="username" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full"
                           placeholder="نام کاربری"
                    />
                    {
                        existingUserError !== "" ?
                            <div className="text-red-700">{existingUserError}</div> : null
                    }
                    <ErrorMessage name="username" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="phone"
                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>موبایل:</label>
                <div className="relative">
                    <Field name="phone" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full"
                           placeholder="موبایل"
                    />
                    <ErrorMessage name="phone" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="password" className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>رمزعبور:</label>
                <div className="relative">
                    <Field
                        name="password" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="رمزعبور"
                    />
                    <ErrorMessage name="password" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="confirmpassword" className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>تایید رمزعبور:</label>
                <div className="relative">
                    <Field
                        name="confirmPassword" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="تایید رمزعبور"
                    />
                    <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>

            <div className="flex w-full">
                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                    ثبت نام
                </button>
            </div>
        </Form>
        </Formik>
    )
}

export default RegisterForm