import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {addToCart, removeFromCart, selectAll} from "@/lib/reducers/cartSlice";
import {Context} from "@/context/ContextApp";
import {toast} from "react-toastify";
import CustomNumeralNumericFormat from "@/components/price";

const FoodsList = ({foods,foodsCat}) =>{

    const [qty, setQty] = useState(1)
    const [cartItems, setCartItems] = useState({});

    const {userInfo, dark} = useContext(Context)

    const dispatch = useDispatch()
    const navigate = useRouter()

    const cart = useSelector(selectAll);

    useEffect(() => {
        const cartData = localStorage.getItem("cartItems");
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, [cart]);

    const handleAddToCart = (item) =>{
        if(userInfo.length <= 0 || userInfo === null || userInfo === undefined){
            toast.info("ابتدا وارد حساب کاربری شوید", {position: "bottom-right"})
            navigate.push("/login")
        }else {
            dispatch(addToCart(item))
        }
    }

    const handleRemoveCart = (product) => {
        dispatch(removeFromCart(product));
    };

    return(
        <div className="justify-center justify-items-center gap-5 my-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {
                foods.filter(food => food.category === foodsCat).map(food =>(
                    <div key={food.id} className={`rounded-lg border
                     border-blue-400 m-auto text-center ${dark ? 'bg-gray-500' : ''} `}>

                        <img className="rounded-t-lg text-center m-auto"
                             style={{width:"250px",height:"250px"}}
                             src={`${process.env.SERVER_URL}/images/foods/${food.image}`} alt="عکس"/>

                        {
                            (cartItems[food.id]?.cartQty > 0 && userInfo.length !== 0) ?
                                (
                                    <button className='bg-amber-500 text-white rounded-lg py-2 px-3 mt-5'
                                            onClick={()=> handleRemoveCart(food)}>
                                        حذف از سبد خرید
                                    </button>
                                ):
                                (
                                    <button className='bg-green-800 text-white rounded-lg py-2 px-3 mt-5'
                                            onClick={()=> handleAddToCart({...food, cartQty: qty})}>
                                        اضافه به سبد خرید
                                    </button>
                                )
                        }

                        <h5 className={`text-center text-xl my-5 font-bold ${dark ? 'text-white' : ''} `}>{food.name}</h5>
                        <h5 className={`text-center text-lg my-5 ${dark ? 'text-white' : ''} `}>
                            <CustomNumeralNumericFormat
                                value={food.price}
                                thousandSeparator=","
                                prefix={`قیمت: `}
                                suffix={`هزار تومان `}
                            />
                        </h5>
                    </div>
                ))
            }
        </div>
    )
}

export default FoodsList