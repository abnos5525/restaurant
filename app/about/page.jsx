'use client'

import Workers from "@/components/about/Workers";
import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const AboutMe = () =>{

    const {dark} = useContext(Context)

    return(
        <div className={`${dark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <h1 className="text-3xl text-center font-bold py-20">
                درباره کافه رستوران
            </h1>
            <p className={`text-center text-lg lg:w-3/4 md:w-3/4 
            sm:w-full m-auto ${dark ? 'text-white' : 'text-gray-700'} `}>
                در رستوران من، سفری به دنیایی از طعم‌ها و تجارب خوشمزه شروع می‌شود. با ورود به فضایی آرام و دلنشین، مهمانان ما به دنیایی از غذاهای لذیذ و منوهای متنوع خوش‌آمد می‌گویند. از دکوراسیون شیک و مدرن تا نورپردازی دلپذیر، همه چیز در رستوران ما برای ایجاد یک تجربهٔ خاطره‌انگیز طراحی شده است. با مواد اولیه از بهترین کیفیت و تهیه غذاهای دست‌ساز با احترام به هنر و ذوق، ما به مشتریانمان تضمین می‌کنیم که هر لحظه را در میان طعم‌های لذیذ و لحظات شادی سپری کنند.
            </p>

            <Workers/>

            <div className="parallax"></div>

            <div className="py-10 lg:pr-10 flex lg:flex-row md:flex-col sm:flex-col xs:flex-col justify-center items-center sm:items-center">
                <img className="rounded-lg lg:mr-5 mb-5 md:mb-0" src="about.jpg" alt="عکس" />

                <div className="lg:mr-20 md:mr-0 w-9/12">
                    <h3 className={`text-2xl ${dark ? 'text-blue-400' : 'text-blue-800'} `}>
                        تاریخچه رستوران
                    </h3>
                    <p className={` text-lg ${dark ? 'text-white' : 'text-gray-700'} `}>
                        یک رستوران که تاریخچه‌ای زیبا و پرماجرا دارد! این رستوران از ریشه‌های ساده‌ای آغاز کرده و به یک نقطهٔ شناخته شده و محبوب در شهر تبدیل شده است. اولین گام‌ها با یک آرزوی کوچک و ایده‌ای بزرگ زده شد، یک آرزو برای ایجاد یک مکانی منحصر به فرد و خاص برای لذت بردن از غذاهای خوشمزه و لحظات خوب با عزیزان. این رستوران با طعم‌های متنوع و منحصر به فرد خود، سریعاً تبدیل به یک مقصد محبوب برای مردم شهر شد.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutMe