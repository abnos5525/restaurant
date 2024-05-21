'use client'

import Spinner from "@/components/Spinner";
import {BiPencil} from "react-icons/bi";
import {useContext, useEffect, useState} from "react";
import Pagination from "@/components/Pagination";
import {Context} from "@/context/ContextApp";
import {useGetFoodsQuery} from "@/lib/reducers/foodApi";
import EditFoodManager from "@/components/dashboard/foods/EditFoodManager";
import CustomNumeralNumericFormat from "@/components/price";

const FoodManager = () =>{
    const {data, isLoading} = useGetFoodsQuery()

    const {dark} = useContext(Context)

    const [modal, setModal] = useState(false)

    const [foodId, setFoodId] = useState(0)

    const [searchTerm, setSearchTerm] = useState("")

    const [filteredData, setFilteredData] = useState([])

    const editFoodModal = (id) =>{
        setFoodId(id)
        setModal(true)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [currentItems, setCurrentItems] = useState([])
    const itemsPerPage = 5
    const totalItems = data?.length || 0

    useEffect(() => {
        if (data) {
            const filtered = data.filter(food =>
                food.name.includes(searchTerm)
            )
            setFilteredData(filtered)
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
                    placeholder="جستجوی غذا..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-4/5 p-2 border ${dark ? 'border-gray-300' : 'border-gray-600'} rounded mb-4 text-black`}
                />
            </div>

            <div className="flex items-center py-4">
                <div className="w-1/3">
                    <div className="text-sm font-bold text-center">نام غذا</div>
                </div>
                <div className="w-1/3">
                    <div className="text-sm font-bold text-center">قیمت</div>
                </div>
                <div className="w-1/3">
                    <div className="text-sm font-bold text-center">ویرایش</div>
                </div>
            </div>

            {isLoading ? <Spinner/> :
                currentItems.map((food)=>(
                <div key={food.id} className="flex items-center py-4">
                    <div className="w-1/3 ml-4">
                        <div className="text-sm text-center">{food.name}</div>
                    </div>
                    <div className="w-1/3 text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 rounded-full text-white
                         bg-green-600`}>
                            <CustomNumeralNumericFormat
                                value={food.price}
                                thousandSeparator=","
                                suffix={`هزار تومان `}
                            />
                        </span>
                    </div>
                    <div className="w-1/3 text-center">
                        <button onClick={()=> editFoodModal(food.id)} className="hover:text-indigo-600 focus:outline-none focus:shadow-outline-indigo">
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
                    <EditFoodManager foodId={foodId} setModal={setModal}/>
                    :
                    null
            }
        </div>
    )
}

export default FoodManager