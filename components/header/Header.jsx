'use client'

import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {selectAll} from "@/lib/reducers/cartSlice";
import {BiMoon, BiSun, BiUser} from "react-icons/bi";
import Link from "next/link";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";
import {logOut} from "@/utils/logOut";
import Nav from "@/components/header/Nav";
import Profile from "@/components/header/Profile";

const Header = () => {

    const router = usePathname()

    const cart = useSelector(selectAll)
    const {userInfo,setUserInfo,setDark,dark} = useContext(Context)

    const loggingOut = () =>{
        setUserInfo([])
        logOut()
    }

    return (
        <div className="relative">

            <div className="header_parallax w-full h-96 object-cover filter brightness-50"></div>

            {
                dark ?
                    <BiSun onClick={()=> setDark(!dark)} className="absolute right-0 mx-5 bottom-52 text-5xl text-yellow-400 cursor-pointer hover:text-yellow-600"/>
                    :
                    <BiMoon onClick={()=> setDark(!dark)} className="absolute right-0 mx-5 bottom-52 text-5xl text-yellow-400 cursor-pointer hover:text-yellow-600"/>
            }

            <Nav/>

            {
                router !== '/login' && router !== '/register' && router !== '/editUser' ?
                    (
                    (userInfo === null || userInfo === undefined || userInfo.length <= 0) ?
                        <Link href="/login">
                            <BiUser className="float-left mx-5 absolute left-0 bottom-20" color="white" size="40"/>
                        </Link>
                        :
                        <Profile userInfo={userInfo} cart={cart} loggingOut={loggingOut}/>
                    )
                    : null
            }
        </div>
    );
};

export default Header
