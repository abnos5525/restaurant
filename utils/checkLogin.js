import {signatureGenerator} from "@/utils/signatureGenerator";
import {logOut} from "@/utils/logOut";

export function CheckLogin(router){
    const token = sessionStorage.getItem("isLoggedIn")
    const expirationTime = sessionStorage.getItem('expirationTime');
    const signature = sessionStorage.getItem('signature');
    const userId = sessionStorage.getItem('userId');
    const isLoggedIn = [token && expirationTime && signature && userId].every(Boolean)

    if (isLoggedIn) {
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
            logOut()
            router.push("/login")
        } else {
            const generatedSignature = signatureGenerator(token)
            if (generatedSignature == signature) {
                logOut()
            }
        }
    }
}

