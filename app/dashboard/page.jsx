'use client'

import {useContext} from "react";
import {Context} from "@/context/ContextApp";
import UserManager from "@/components/dashboard/users/UserManager";
import FoodManager from "@/components/dashboard/foods/FoodManager";
import Link from "next/link";

const Dashboard = () =>{

    const {dark,setDashLink, dashLink, userInfo} = useContext(Context)

    return(
        <>
            {
                userInfo === null || userInfo === undefined || userInfo.length <= 0 ?
                    <div className={` ${dark ? 'bg-gray-800 text-white' : 'bg-white'} text-center`}>
                        <h2 className="text-xl py-5">
                            برای دسترسی به این صفحه ابتدا وارد حساب شوید
                        </h2>
                        <Link href="/login" className={`${dark ? 'bg-blue-600' : 'bg-gray-800'} rounded-lg text-white text-lg px-4 py-2`}>
                            ورود
                        </Link>
                    </div>
                    :
                    userInfo.role !== "admin" ?
                        <div className={` ${dark ? 'bg-gray-800 text-white' : 'bg-white'} text-center`}>
                            <h2 className="text-xl py-5">
                                دسترسی به این صفحه ندارید
                            </h2>
                            <Link href="/" className={`${dark ? 'bg-blue-600' : 'bg-gray-800'} rounded-lg text-white text-lg px-4 py-2`}>
                                صفحه اصلی
                            </Link>
                        </div>
                    :
                    <div className={`${dark ? 'bg-gray-800 text-white' : 'bg-white'} w-full float-right`}>
                        <div className="w-4/5 float-right">
                            {
                                dashLink === 1 ?
                                    <UserManager/>
                                    :
                                    dashLink === 2 ?
                                        <FoodManager/>
                                        :
                                        null
                            }
                        </div>
                        <div className="w-1/5 float-left flex justify-between border-r">
                            <ul className="w-full text-l">
                                <li onClick={() =>setDashLink(1)}
                                    className={`float-end w-full text-center py-5 cursor-pointer 
                        ${dashLink === 1 ? 'bg-gray-600 text-white' : ''}`}>
                                    کاربران
                                </li>
                                <li onClick={() => setDashLink(2)}
                                    className={`float-end w-full text-center py-5 cursor-pointer
                        ${dashLink === 2 ? 'bg-gray-600 text-white' : ''}`}>
                                    محصولات غذایی
                                </li>
                            </ul>
                        </div>
                    </div>
            }
        </>
    )
}

export default Dashboard