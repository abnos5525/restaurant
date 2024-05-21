'use client'

import {useGetUsersQuery} from "@/lib/reducers/userApi";
import Spinner from "@/components/Spinner";
import {BiPencil} from "react-icons/bi";
import EditUserManager from "@/components/dashboard/users/EditUserManager";
import {useContext, useEffect, useState} from "react";
import Pagination from "@/components/Pagination";
import {Context} from "@/context/ContextApp";

const UserManager = () =>{
    const {data, isLoading} = useGetUsersQuery()

    const {dark} = useContext(Context)

    const [modal, setModal] = useState(false)

    const [userId, setUserId] = useState(0)

    const [searchTerm, setSearchTerm] = useState("")

    const [filteredData, setFilteredData] = useState([])

    const editUserModal = (id) =>{
        setUserId(id)
        setModal(true)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [currentItems, setCurrentItems] = useState([])
    const itemsPerPage = 5
    const totalItems = data?.length || 0

    useEffect(() => {
        if (data) {
            const filtered = data.filter(user =>
                user.name.includes(searchTerm)
            );
            const sorted = filtered.sort((a, b) => (a.role === "admin" ? -1 : 1))
            setFilteredData(sorted)
        }
    }, [data, searchTerm])

    useEffect(() => {
        if (filteredData) {
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage
            setCurrentItems(filteredData.slice(indexOfFirstItem, indexOfLastItem))
        }
    }, [filteredData, currentPage])

    return(
        <div className={`w-full divide-y ${dark ? 'divide-gray-200' : 'divide-gray-500'} `}>

            <div className="py-4 text-center">
                <input
                    type="text"
                    placeholder="جستجوی کاربر..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-4/5 p-2 border border-gray-300 rounded mb-4 text-black"
                />
            </div>

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
                currentItems.map((user)=>(
                <div key={user.id} className="flex items-center py-4">
                    <div className="w-1/3 ml-4">
                        <div className="text-sm text-center">{user.name}</div>
                    </div>
                    <div className="w-1/3 text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 rounded-full text-white
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

            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />

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