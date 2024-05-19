'use client'

import {usePathname, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectAll} from "@/lib/reducers/cartSlice";
import {BiBasket, BiUser} from "react-icons/bi";
import Link from "next/link";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";
import {logOut} from "@/utils/logOut";

const Header = () => {

    const router = usePathname()
    const {push} = useRouter()

    const cart = useSelector(selectAll)
    const {userInfo,setUserInfo} = useContext(Context)

    const loggingOut = () =>{
        setUserInfo([])
        logOut()
        push("/login")
    }

    return (
        <div className="relative">
            <img
                src="header.jpg"
                alt="Header Image"
                className="w-full h-96 object-cover filter brightness-50"
            />
            <nav className="absolute bottom-10 font-bold text-lg flex justify-between mr-5">
                <ul className="text-white">
                    <li className='float-end mx-5'>
                        <Link className={router === "/" ? 'underline text-blue-500' : ''} href='/'>صفحه اصلی</Link>
                    </li>
                    <li className="float-end mx-5">
                        <Link className={router === "/about" ? 'underline text-blue-500' : ''} href="#">درباره ما</Link>
                    </li>
                    <li className="float-end mx-5">
                        <Link className={router === "/contact" ? 'underline text-blue-500' : ''} href="#">تماس با ما</Link>
                    </li>
                </ul>
            </nav>

            {
                router !== '/login' && router !== '/register' && router !== '/editUser' ?
                    (
                    (userInfo === null || userInfo === undefined || userInfo.length <= 0) ?
                        <Link href="/login">
                            <BiUser className="float-left mx-5 absolute left-0 bottom-20" color="white" size="40"/>
                        </Link>
                        :
                        <>
                            <Link href="/cart" className="absolute left-5 bottom-32">
                                <div className="bg-amber-400 rounded-full absolute -right-1 w-fit px-1">
                                    {cart.length}
                                </div>
                                <BiBasket color="white" size="40"/>
                            </Link>
                            <div className="float-left text-white m-auto font-bold lg:text-xl sm:text-lg
                            absolute left-20 bottom-32">
                                <button className="ml-12 text-red-400" onClick={loggingOut}>خروج</button>
                                <Link href="/editUser" className="ml-12 text-yellow-400">ویرایش</Link>

                                {userInfo.name} خوش آمدید
                            </div>
                        </>
                    )
                    : null
            }
        </div>
    );
};

export default Header
