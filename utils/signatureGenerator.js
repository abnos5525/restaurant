export const generateSignature = (token) => {
    const secretKey = process.env.SIGNITURE
    const signature = crypto.createHmac('sha256', secretKey).update(token).digest('hex')
    return signature;
}
