'use client'

import {useContext} from "react";
import {Context} from "@/context/ContextApp";
import UserManager from "@/components/dashboard/users/UserManager";
import FoodManager from "@/components/dashboard/foods/FoodManager";

const Dashboard = () =>{

    const {dark,setDashLink, dashLink} = useContext(Context)

    return(
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
                        ${dashLink === 1 ? 'bg-gray-600' : ''}`}>
                            کاربران
                    </li>
                    <li onClick={() => setDashLink(2)}
                        className={`float-end w-full text-center py-5 cursor-pointer
                        ${dashLink === 2 ? 'bg-gray-600' : ''}`}>
                            محصولات غذایی
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard