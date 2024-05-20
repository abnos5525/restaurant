'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="text-center bg-white">
            <h2 className="text-3xl text-center pt-10 mb-10">مشکلی در سرور پیش آمده!</h2>
            <button onClick={reset} className="w-fit bg-amber-900 text-white p-2 rounded-lg text-center">
                بارگذاری مجدد
            </button>
        </div>
    )
}