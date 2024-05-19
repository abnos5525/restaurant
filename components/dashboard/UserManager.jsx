'use client'

import {useGetUsersQuery} from "@/lib/reducers/userApi";
import {useEffect} from "react";

const UserManager = () =>{
    const {data} = useGetUsersQuery()

    useEffect(() => {
        console.log(data)
    }, []);

    return(
        <div className="w-full divide-y divide-gray-200">
            <div className="flex items-center py-4">

                <div className="w-1/3">

                    <div className="text-sm font-bold text-center">نام</div>

                </div>

                <div className="w-1/3">

                    <div className="text-sm font-bold text-center">نقش کاربری</div>

                </div>

                <div className="w-1/3">

                    <div className="text-sm font-bold text-center">ویرایش</div>

                </div>

            </div>

            {data.map((user) => (

                <div key={user.name} className="flex items-center py-4">

                    <div className="w-1/3 ml-4">

                        <div className="text-sm text-gray-900">{user.name}</div>

                    </div>

                    <div className="w-1/3">

            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">

              {user.role}

            </span>

                    </div>

                    <div className="w-1/3">

                        <button

                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:shadow-outline-indigo"

                            aria-label="Edit"

                        >

                            <svg

                                className="h-5 w-5"

                                viewBox="0 0 20 20"

                                fill="currentColor"

                            >

                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />

                            </svg>

                        </button>

                    </div>

                </div>

            ))}

        </div>
    )
}

export default UserManager