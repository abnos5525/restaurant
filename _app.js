'use client'

import {ToastContainer} from "react-toastify";
import {ReduxProvider} from "@/app/ReduxProvider";
import {ContextApp} from "@/context/ContextApp";
import {useEffect} from "react";
import {CheckLogin} from "@/utils/checkLogin";
import {useRouter} from "next/navigation";

const MyApp = ({children}) =>{

    const router = useRouter()

    useEffect(() => {
        CheckLogin(router)
    }, [router]);

    return(
            <ReduxProvider>
                <ContextApp>
                        {children}
                        <ToastContainer/>
                </ContextApp>
            </ReduxProvider>
    )
}

export default MyApp