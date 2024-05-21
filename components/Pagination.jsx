import {BiArrowFromLeft, BiArrowFromRight} from "react-icons/bi";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
        <div className="flex justify-center py-10" style={{direction:"ltr"}}>
            <button
                className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-700' : 'bg-indigo-600'} text-white`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <BiArrowFromRight/>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-indigo-600' : 'bg-gray-600'} text-white`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-700' : 'bg-indigo-600'} text-white`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <BiArrowFromLeft/>
            </button>
        </div>
    );
};

export default Pagination;