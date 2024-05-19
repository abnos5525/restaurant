'use client'

import {signatureGenerator} from "@/utils/signatureGenerator";
import {logOut} from "@/utils/logOut";
import {NextResponse} from "next/server";

export function checkLogin(req){

    const token = localStorage.getItem("isLoggedIn")
    const expirationTime = localStorage.getItem('expirationTime');
    const signature = localStorage.getItem('signature');
    const isLoggedIn = [token && expirationTime && signature].every(Boolean)

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/'), req.url)
    }else{
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
            logOut()
            return NextResponse.redirect(new URL('/'), req.url)
        } else {
            const generatedSignature = signatureGenerator(token)
            if (generatedSignature!== signature) {
                logOut()
                return NextResponse.redirect(new URL('/'), req.url)
            }
        }
    }
}

