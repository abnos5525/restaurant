import Link from "next/link";
import {usePathname} from "next/navigation";
import {memo, useContext} from "react";
import {Context} from "@/context/ContextApp";

const Nav = () =>{

    const router = usePathname()
    const {userInfo} = useContext(Context)

    return(
        <nav className="absolute bottom-10 font-bold text-lg flex justify-between mr-5">
            <ul className="text-white">
                <li className='float-end mx-5'>
                    <Link className={router === "/" ? 'underline text-blue-500' : ''} href='/'>صفحه اصلی</Link>
                </li>
                <li className="float-end mx-5">
                    <Link className={router === "/about" ? 'underline text-blue-500' : ''} href="/about">درباره ما</Link>
                </li>
                {
                    userInfo.role == "admin" ?
                        <li className="float-end mx-5">
                            <Link className={router === "/dashboard" ? 'underline text-blue-500' : ''} href="/dashboard">داشبورد</Link>
                        </li>
                        :
                        null
                }
            </ul>
        </nav>
    )
}
export default memo(Nav)