'use client'

import {ToastContainer} from "react-toastify";
import {ReduxProvider} from "@/app/ReduxProvider";
import {ContextApp} from "@/context/ContextApp";
import {useEffect} from "react";
import {CheckLogin} from "@/utils/checkLogin";
import {useRouter} from "next/navigation";
import {Workbox} from "workbox-window";

const MyApp = ({children}) =>{

    const router = useRouter()

    useEffect(() => {
        CheckLogin(router)
    }, [router]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(() => {
                        console.log(`Service Worker registered`);
                    })
                    .catch(err => {
                        console.log(`failed: ${err}`);
                    });
            });

            const wb = new Workbox('/sw.js');
            wb.addEventListener("waiting", event => {
                wb.messageSW({ type: "SKIP_WAITING" });
            });
            wb.register();
        }
    }, []);

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