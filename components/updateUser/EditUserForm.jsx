'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import {registerSchema} from "@/components/register/registerValidation";
import {useGetUserQuery, useUpdateUserMutation} from "@/lib/reducers/userApi";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {tokenGenerator} from "@/utils/tokenGenerator";
import {signatureGenerator} from "@/utils/signatureGenerator";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";
import Link from "next/link";

const EditUserForm = ()=>{

    const router = useRouter()

    const [updateUser] = useUpdateUserMutation()
    const {setUserInfo,userInfo} = useContext(Context)

    const {data} = useGetUserQuery(userInfo.id)

    const handleRegister = async (values) =>{
        try {
            const {id,name,username,password} = values
            await updateUser({
                id,
                name,
                username,
                password,
                role: 'user',
                foods:[]
            }).unwrap()
                const token = tokenGenerator()
                const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
                const signature = signatureGenerator(token)
                sessionStorage.setItem("isLoggedIn", token)
                sessionStorage.setItem("expirationTime", expirationTime.getTime())
                sessionStorage.setItem("signature", signature);
                sessionStorage.setItem("userId", id);
                setUserInfo(values)
                toast.success("با موفقیت ثبت نام شدید", {position:"bottom-left"})
                router.push("/")

        }catch (err){
            console.error(err)
            toast.error("مشکلی از سمت سرور بوجود آمده!", {position:"bottom-left"})
        }
    }

    return(
        <>
        {
            (userInfo === null || userInfo === undefined || userInfo === [] || data === undefined) ?
            <div className="bg-white text-center">
                <h2 className="text-xl py-5">
                    برای دسترسی به این بخش ابتدا وارد حساب شوید
                </h2>
                <Link href="/login" className="bg-gray-800 rounded-lg text-white text-lg px-4 py-2">
                    ورود
                </Link>
            </div>
            :
                <Formik initialValues={{
                    id: data.id,
                    name:data.name,
                    username:data.username,
                    password:'',
                    confirmPassword:'',
                }}
                        validationSchema={registerSchema} onSubmit={handleRegister}>
                    <Form>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="name"
                                   className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">نام:</label>
                            <div className="relative">
                                <Field name="name" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full"
                                       placeholder="نام"
                                />
                                <ErrorMessage name="name" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">رمزعبور قبلی:</label>
                            <div className="relative">
                                <Field
                                    name="password" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="رمزعبور"
                                />
                                <ErrorMessage name="password" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="confirmpassword" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"> رمزعبور جدید:</label>
                            <div className="relative">
                                <Field
                                    name="confirmPassword" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="تایید رمزعبور"
                                />
                                <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="confirmpassword" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">تایید رمزعبور جدید:</label>
                            <div className="relative">
                                <Field
                                    name="confirmPassword" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="تایید رمزعبور"
                                />
                                <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                ویرایش
                                <span>
            </span>
                            </button>
                        </div>
                    </Form>
                </Formik>
        }
        </>
    )
}

export default EditUserForm