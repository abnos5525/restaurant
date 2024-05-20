import {useContext} from "react";
import {Context} from "@/context/ContextApp";

const QtyInput = ({ incrementQty, qty, decrementQty }) => {

    return (
        <div className="flex flex-row w-full md:w-50 h-10 relative mx-auto md:mx-5">

            <button
                className="p-2 bg-amber-400 rounded-r-lg w-1/3 md:w-1/4"
                onClick={incrementQty}
            >
                +
            </button>
            <input
                type="text"
                value={qty ? qty : 0}
                className="text-center w-1/5 bg-white text-gray-600"
                disabled
            />
            <button
                className="p-2 bg-amber-400 rounded-l-lg text-center w-1/3 md:w-1/4"
                onClick={decrementQty}
            >
                -
            </button>
        </div>
    );
};

export default QtyInput;
