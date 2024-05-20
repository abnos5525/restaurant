'use client'

import dynamic from "next/dynamic";
import {useGetFoodsQuery} from "@/lib/reducers/foodApi";
import {memo, Suspense, useContext, useEffect, useState} from "react";
import FoodsList from "@/components/home/FoodsList";
import {Context} from "@/context/ContextApp";

const Home = () => {

    const Spinner = dynamic(() => import("@/components/Spinner"))

    const [foods, setFoods] = useState([])
    const [foodsCat, setFoodsCat] = useState("1")
    const {dark} = useContext(Context)

    const {
        data,
        isLoading
    } = useGetFoodsQuery()

    useEffect(() => {
        if(data) {
            setFoods(data)
        }
    }, [data]);

  return (
    <div className={`${dark ? 'bg-gray-800' : 'bg-white'} w-full h-auto pb-10`}>
      <h1 className={`text-center text-3xl font-bold pt-10 pb-10 ${dark ? 'text-white' : 'text-black'}`}>
          به رستوران من خوش آمدید
      </h1>

        <div className="text-center flex justify-center justify-items-center gap-4">
            <button className={`px-3 py-2 border-emerald-600 border 
            hover:bg-emerald-600 hover:text-white ${dark ? 'text-white' : 'text-black'}
             transition-colors duration-300 ${foodsCat === "1" ? 'bg-emerald-600 text-white' : ''} `} onClick={()=> setFoodsCat("1")}>
                خونگی
            </button>

            <button className={`px-3 py-2 border-emerald-600 border hover:bg-emerald-600 
            hover:text-white ${dark ? 'text-white' : 'text-black'}
             transition-colors duration-300 ${foodsCat === "2" ? 'bg-emerald-600 text-white' : ''} `} onClick={()=> setFoodsCat("2")}>
                فست فود
            </button>

            <button className={`px-3 py-2 border-emerald-600 border
             hover:bg-emerald-600 ${dark ? 'text-white' : 'text-black'}
            hover:text-white transition-colors duration-300 ${foodsCat === "3" ? 'bg-emerald-600 text-white' : ''} `} onClick={()=> setFoodsCat("3")}>
                سالاد
            </button>
        </div>

            {
                 isLoading ? <Spinner/> :
                     <Suspense fallback={<Spinner/>}>
                         <FoodsList foods={foods} foodsCat={foodsCat}/>
                     </Suspense>
            }
    </div>
  );
}

export default Home
