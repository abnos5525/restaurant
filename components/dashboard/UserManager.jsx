'use client'

import {useGetUsersQuery} from "@/lib/reducers/userApi";
import Spinner from "@/components/Spinner";
import {BiPencil} from "react-icons/bi";
import EditUserManager from "@/components/dashboard/EditUserManager";
import {useState} from "react";

const UserManager = () =>{
    const {data, isLoading} = useGetUsersQuery()

    const [modal, setModal] = useState(false)

    const [userId, setUserId] = useState(0)

    const editUserModal = (id) =>{
        setUserId(id)
        setModal(true)
    }

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

            {isLoading ? <Spinner/> :
                data.map((user)=>(
                <div key={user.id} className="flex items-center py-4">
                    <div className="w-1/3 ml-4">
                        <div className="text-sm text-center">{user.name}</div>
                    </div>
                    <div className="w-1/3 text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                         bg-green-100 ${user.role === "admin" ? 'bg-yellow-600' : "bg-green-600"}`}>
                            {user.role}
                        </span>
                    </div>
                    <div className="w-1/3 text-center">
                        <button onClick={()=> editUserModal(user.id)} className="hover:text-indigo-600 focus:outline-none focus:shadow-outline-indigo">
                            <BiPencil/>
                        </button>
                    </div>
                </div>
            ))}
            {
                modal ?
                    <EditUserManager userId={userId} setModal={setModal}/>
                    :
                    null
            }
        </div>
    )
}

export default UserManager