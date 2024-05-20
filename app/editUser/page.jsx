'use client'

import EditUserForm from "@/components/updateUser/EditUserForm";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const EditUser = () =>{
    const {dark} = useContext(Context)

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 py-10">
            <div className={`flex flex-col ${dark ? 'bg-gray-800' : 'bg-white'}
             shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md`}>
                <h4 className={`text-3xl ${dark ? 'text-white' : ''}`}>
                    ویرایش
                </h4>
                <div className="mt-10">
                    <EditUserForm/>
                </div>
            </div>
        </div>
    )
}

export default EditUser