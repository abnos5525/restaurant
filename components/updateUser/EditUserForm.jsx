'use client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import {useUpdateUserMutation} from "@/lib/reducers/userApi";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useContext, useState} from "react";
import {Context} from "@/context/ContextApp";
import Link from "next/link";
import {updateUserSchema} from "@/components/updateUser/editUserValidation";

const EditUserForm = ()=>{

    const router = useRouter()

    const [updateUser] = useUpdateUserMutation()
    const {setUserInfo,userInfo, dark} = useContext(Context)

    const [passwordError, setPasswordError] = useState("")

    const handleUpdate = async (values) =>{
        try {
            const {name,address,oldPassword,newPassword} = values

            // بررسی تغییرات name و address
            const isNameChanged = name !== userInfo.name;
            const isAddressChanged = address !== userInfo.address;

            // بررسی اینکه آیا فیلدهای رمز عبور پر شده‌اند یا نه
            const isPasswordProvided = oldPassword !== "" || newPassword !== "";

            // اگر هیچ تغییری در name و address نبوده و فیلدهای رمز عبور هم خالی هستند
            if (!isNameChanged && !isAddressChanged && !isPasswordProvided) {
                router.push("/");
                return;
            }

            // اگر تغییرات در name یا address وجود داشته باشد یا رمز عبور‌ها پر شده باشند
            if (isNameChanged || isAddressChanged || (oldPassword !== "" && newPassword !== "")) {
                    if (oldPassword !== "" && userInfo.password !== oldPassword) {
                        setPasswordError("رمزعبور قبلی اشتباه است");
                        return;
                    } else if (oldPassword === userInfo.password) {
                        setPasswordError("رمزعبور جدید تکراری است");
                        return;
                    }

                    await updateUser({
                        ...userInfo,
                        name,
                        address,
                        ...(newPassword && { password: newPassword }), // اضافه کردن رمز عبور جدید در صورت وجود
                    }).unwrap();
                    setUserInfo({
                        ...userInfo,
                        name,
                        address,
                        ...(newPassword && { password: newPassword }) // به‌روزرسانی رمز عبور جدید در صورت وجود
                    });
                toast.success("با موفقیت ویرایش شدید", {position:"bottom-left"})
            }
                router.push("/")
        }catch (err){
            console.error(err)
            toast.error("مشکلی از سمت سرور بوجود آمده!", {position:"bottom-left"})
        }
    }

    return(
        <>
        {
            (userInfo === null || userInfo === undefined || userInfo.length <= 0) ?
            <div className={`${dark ? 'bg-gray-800 text-white' : 'bg-white'} text-center`}>
                <h2 className="text-xl py-5">
                    برای دسترسی به این بخش ابتدا وارد حساب شوید
                </h2>
                <Link href="/login" className={` ${dark ? 'bg-blue-600' : 'bg-gray-800'} 
                rounded-lg text-white text-lg px-4 py-2`}>
                    ورود
                </Link>
            </div>
            :
                <>
                <Formik initialValues={{
                    name:userInfo.name,
                    username:userInfo.username,
                    phone: userInfo.phone,
                    oldPassword:'',
                    newPassword:'',
                    address: userInfo.address
                }} validationSchema={updateUserSchema} onSubmit={handleUpdate} >
                    <Form>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="name"
                                   className={`mb-1 text-xs sm:text-sm 
                                   tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام:</label>
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
                                       placeholder="نام کاربری" disabled
                                />
                                <ErrorMessage name="username" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="phone"
                                   className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>موبایل:</label>
                            <div className="relative">
                                <Field name="phone" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full"
                                       placeholder="موبایل" disabled
                                />
                                <ErrorMessage name="phone" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className={`mb-1 text-xs sm:text-sm 
                            tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>رمزعبور قبلی:</label>
                            <div className="relative">
                                <Field
                                    name="oldPassword" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="رمزعبور قبلی"
                                />
                                {
                                    passwordError !== "" ?
                                        <div className="text-red-700">{passwordError}</div> : null
                                }
                                <ErrorMessage name="oldPassword" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="newPassword" className={`mb-1 text-xs sm:text-sm 
                            tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}> رمزعبور جدید:</label>
                            <div className="relative">
                                <Field
                                    name="newPassword" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="رمزعبور جدید"
                                />
                                <ErrorMessage name="newPassword" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="confirmpassword" className={`mb-1 text-xs 
                            sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>تایید رمزعبور جدید:</label>
                            <div className="relative">
                                <Field
                                    name="confirmPassword" type="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="تایید رمزعبور جدید"
                                />
                                <ErrorMessage name="confirmPassword" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="address" className={`mb-1 text-xs 
                            sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>آدرس:</label>
                            <div className="relative">
                                <Field
                                    name="address" type="text"
                                    className=" text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="آدرس"
                                />
                                <ErrorMessage name="address" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                ویرایش
                            </button>
                        </div>
                    </Form>
                </Formik>
                </>
        }
        </>
    )
}

export default EditUserForm