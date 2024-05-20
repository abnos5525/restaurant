import Link from "next/link";
import {BiBasket} from "react-icons/bi";
import {memo} from "react";
import {confirmAlert} from "react-confirm-alert";
const Profile = ({cart, userInfo,loggingOut}) =>{

    const confirmLoggingOut = () =>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="bg-gray-700 p-5 rounded-lg">
                        <h3 className="text-white text-xl mb-3">آیا میخواهید خارج شوید؟</h3>
                        <button className="bg-yellow-500 text-black px-3 py-1 mr-3 rounded-lg" onClick={onClose}>خیر</button>
                        <button className="bg-red-500 text-black px-3 py-1 mr-10 rounded-lg"
                            onClick={() => {
                                loggingOut()
                                onClose();
                            }}
                        >
                            بله
                        </button>
                    </div>
                );
            }
        });
    }

    return(
        <>
            <Link href="/cart" className="absolute left-5 bottom-32">
                <div className="bg-amber-400 rounded-full absolute -right-1 w-fit px-1">
                    {cart.length}
                </div>
                <BiBasket color="white" size="40"/>
            </Link>
            <div className="float-left text-white m-auto font-bold lg:text-xl sm:text-lg
                            absolute left-20 bottom-32 grid grid-cols-3 gap-5 xs:mt-10" style={{width:"84%"}}>
                <button className="text-red-400 flex justify-center justify-items-center" onClick={confirmLoggingOut}>خروج</button>
                <Link href="/editUser" className="text-yellow-400 flex justify-center justify-items-center">ویرایش</Link>
                <div className="text-left flex justify-center justify-items-center">
                    {userInfo.name} خوش آمدید
                </div>
            </div>
        </>
    )
}

export default memo(Profile)