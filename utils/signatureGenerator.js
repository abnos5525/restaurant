import {createHmac } from "crypto"

export const signatureGenerator = (token) => {
    const secretKey = process.env.SIGNITURE
    return createHmac('sha256', secretKey).update(token).digest('hex') ;
}
