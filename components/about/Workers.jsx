import {BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube} from "react-icons/bi";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const Workers = () =>{
    const {dark} = useContext(Context)

    return(
        <div className="justify-center justify-items-center gap-5 mt-10 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
            <div>
                <img className="rounded-lg text-center m-auto float-right"
                     src={`${process.env.SERVER_URL}/images/workers/about-01.jpg`} alt="عکس"/>
                <div className="float-left pr-5">
                    <h4 className={`text-2xl ${dark ? 'text-blue-400' : 'text-blue-800'} `}>
                        سحر رضایی
                    </h4>
                    <h4 className="text-l text-red-500 mt-3">
                        سئوکار
                    </h4>
                    <div className="text-white bg-gray-700 rounded-full w-fit scale-125 mt-5 hover:bg-gray-600 cursor-pointer">
                        <BiLogoFacebook/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoTwitter/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoInstagram/>
                    </div>
                </div>
            </div>

            <div>
                <img className="rounded-lg text-center m-auto float-right"
                     src={`${process.env.SERVER_URL}/images/workers/about-02.jpg`} alt="عکس"/>
                <div className="float-left pr-5">
                    <h4 className={`text-2xl ${dark ? 'text-blue-400' : 'text-blue-800'} `}>
                        رقیه احمدی
                    </h4>
                    <h4 className="text-l text-red-500 mt-3">
                        سرآشپز
                    </h4>
                    <div className="text-white bg-gray-700 rounded-full w-fit scale-125 mt-5 hover:bg-gray-600 cursor-pointer">
                        <BiLogoFacebook/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoTwitter/>
                    </div>
                </div>
            </div>

            <div>
                <img className="rounded-lg text-center m-auto float-right"
                     src={`${process.env.SERVER_URL}/images/workers/about-03.jpg`} alt="عکس"/>
                <div className="float-left pr-5">
                    <h4 className={`text-2xl ${dark ? 'text-blue-400' : 'text-blue-800'} `}>
                        فاطمه بهرامی
                    </h4>
                    <h4 className="text-l text-red-500 mt-3">
                        مدیر آشپزخانه
                    </h4>
                    <div className="text-white bg-gray-700 rounded-full w-fit scale-125 mt-5 hover:bg-gray-600 cursor-pointer">
                        <BiLogoFacebook/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoInstagram/>
                    </div>
                </div>
            </div>

            <div>
                <img className="rounded-lg text-center m-auto float-right"
                     src={`${process.env.SERVER_URL}/images/workers/about-04.jpg`} alt="عکس"/>
                <div className="float-left pr-5">
                    <h4 className={`text-2xl ${dark ? 'text-blue-400' : 'text-blue-800'} `}>
                        سمانه خانی
                    </h4>
                    <h4 className="text-l text-red-500 mt-3">
                        سرپرست
                    </h4>
                    <div className="text-white bg-gray-700 rounded-full w-fit scale-125 mt-5 hover:bg-gray-600 cursor-pointer">
                        <BiLogoFacebook/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoTwitter/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoInstagram/>
                    </div>
                    <div className="text-gray-700 rounded-full w-fit scale-150 mt-5 hover:text-gray-600 cursor-pointer">
                        <BiLogoYoutube/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workers