'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import {loginSchema} from "@/components/login/loginValidation";
import {useGetUsersQuery} from "@/lib/reducers/userApi";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {tokenGenerator} from "@/utils/tokenGenerator";
import {signatureGenerator} from "@/utils/signatureGenerator";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const LoginForm = () =>{

    const router = useRouter()

    const {
        data
    } = useGetUsersQuery()

    const {setUserInfo, dark} = useContext(Context)

    const handleLogin = (values) =>{
        try {
            const {username, password} = values
            const user = data.find(u => u.username === username && u.password === password)
            if(user){
                const token = tokenGenerator()
                const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
                const signature = signatureGenerator(token)
                sessionStorage.setItem("isLoggedIn", token)
                sessionStorage.setItem("expirationTime", expirationTime.getTime())
                sessionStorage.setItem("signature", signature);
                sessionStorage.setItem("userId", user.id);
                setUserInfo(user)
                toast.success("با موفقیت وارد شدید", {position:"bottom-left"})
                router.push("/")
            }else {
                toast.error("این نام کاربری موجود نیست", {position:"bottom-left"})
            }
        }catch (err){
            console.error(err)
            toast.error("مشکلی از سمت سرور بوجود آمده!", {position:"bottom-left"})
        }
    }

    return(
        <Formik initialValues={{username:'', password:''}} validationSchema={loginSchema} onSubmit={handleLogin}>
        <Form>
            <div className="flex flex-col mb-6">
                <label htmlFor="username"
                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام کاربری:</label>
                <div className="relative">
                    <Field name="username" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full" placeholder="نام کاربری"
                    />
                    <ErrorMessage name="username" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="password" className={`mb-1 text-xs sm:text-sm tracking-wide 
                ${dark ? 'text-gray-300' : 'text-gray-600'}`}>رمزعبور:</label>
                <div className="relative">
                    <Field
                        name="password" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="رمزعبور"
                    />
                    <ErrorMessage name="password" render={msg => <div className="text-red-700">{msg}</div>}/>
                </div>
            </div>

            <div className="flex w-full">
                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                    ورود
                    <span>
            </span>
                </button>
            </div>
        </Form>
        </Formik>
    )
}

export default LoginForm