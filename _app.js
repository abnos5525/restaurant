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
    }, []);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        // console.log('Service Worker registered with scope:', registration.scope);
                        registration.onupdatefound = () => {
                            const installingWorker = registration.installing;
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === 'installed') {
                                    if (navigator.serviceWorker.controller) {
                                        console.log('New content is available; please refresh.');
                                    } else {
                                        console.log('Content is cached for offline use.');
                                    }
                                }
                            };
                        };
                    })
                    .catch(err => {
                        console.error('Service Worker registration failed:', err);
                    });
                const wb = new Workbox('/sw.js');
                wb.addEventListener("waiting", event => {
                    wb.messageSW();
                });
                wb.register();
            });
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