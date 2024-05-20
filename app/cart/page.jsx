'use client'

import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart, getTotals, removeFromCart, selectAll } from "@/lib/reducers/cartSlice";
import {useContext, useEffect} from "react";
import QtyInput from "@/components/cart/QtyInput";
import CustomNumeralNumericFormat from "@/components/price";
import {Context} from "@/context/ContextApp";
import Link from "next/link";

const Cart = () => {
    const cart = useSelector(selectAll);
    const { cartTotalAmount } = useSelector((state) => state.cart);

    const {userInfo, dark} = useContext(Context)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleRemoveCart = (product) => {
        dispatch(removeFromCart(product));
    };

    return (
        <>
        {
            userInfo === null || userInfo === undefined || userInfo.length <= 0 ?
                <div className={` ${dark ? 'bg-gray-800 text-white' : 'bg-white'} text-center`}>
                    <h2 className="text-xl py-5">
                        برای دسترسی به سبد خرید ابتدا وارد حساب شوید
                    </h2>
                    <Link href="/login" className={`${dark ? 'bg-blue-600' : 'bg-gray-800'} rounded-lg text-white text-lg px-4 py-2`}>
                        ورود
                    </Link>
                </div>
            :
            <div className={`${dark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                {cart.length === 0 ? (
                    <div className="text-center text-2xl py-20">
                        سبد خرید شما خالی است
                    </div>
                ) : (
                    <>
                        <div className="min-h-80 max-w-2xl pt-10 w-full mx-auto">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-4 md:col-span-3">
                                    <div className="flex items-center border-b border-gray-200 py-4">
                                        <div className="flex-1 flex justify-between items-center px-4">
                                            <p className="font-medium">محصول</p>
                                            <p className="font-medium">تعداد</p>
                                            <p className="font-medium">قیمت</p>
                                            <p className="font-medium">حذف</p>
                                        </div>
                                    </div>
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-16 h-16 object-cover rounded"
                                                    src={`${process.env.SERVER_URL}/images/foods/${item.image}`}
                                                    alt="عکس"
                                                />
                                                <p className="font-medium text-center">{item.name}</p>
                                            </div>
                                            <div className="flex-1 flex justify-between items-center px-4">
                                                <div>
                                                    <QtyInput
                                                        qty={item.cartQty}
                                                        decrementQty={() => handleDecreaseCart(item)}
                                                        incrementQty={() => handleAddToCart(item)}
                                                    />
                                                </div>
                                                <p className="text-base">
                                                    <CustomNumeralNumericFormat
                                                        value={item.price * item.cartQty}
                                                        thousandSeparator=","
                                                        suffix={`هزار تومان `}
                                                    />
                                                </p>
                                                <button
                                                    className="py-2 px-4 bg-red-500 rounded-lg text-white mt-3"
                                                    onClick={() => handleRemoveCart(item)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {cartTotalAmount !== 0 && (
                                    <div className="col-span-4 md:col-span-1 text-center md:text-left">
                                        <p className="font-medium">قیمت کل:</p>
                                        <p className="text-lg">
                                            <CustomNumeralNumericFormat
                                                value={cartTotalAmount}
                                                thousandSeparator=","
                                                suffix={`هزار تومان `}
                                            />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mx-auto px-2">
                            <button className="bg-green-800 rounded-lg px-2 py-3 text-white m-3">
                                تایید نهایی
                            </button>
                        </div>
                    </>
                )}
            </div>
        }
        </>
    );
};

export default Cart;
