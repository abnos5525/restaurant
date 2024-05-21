import {ErrorMessage, Field, Form, Formik} from "formik";
import Spinner from "@/components/Spinner";
import {useContext, useEffect, useState} from "react";
import {Context} from "@/context/ContextApp";
import {toast} from "react-toastify";
import {useGetFoodQuery, useUpdateFoodMutation} from "@/lib/reducers/foodApi";
import {updateFoodSchema} from "@/components/dashboard/foods/editFoodValidation";

const EditFoodManager = ({foodId,setModal}) =>{

    const {data, isLoading} = useGetFoodQuery(foodId)
    const {dark} = useContext(Context)

    const [updateFood] = useUpdateFoodMutation()

    const [category, setCategory] = useState("1")
    const [image, setImage] = useState("1")

    useEffect(() => {
        if (!isLoading) {
            setCategory(data.category);
            setImage(data.image);
        }
    }, [data]);

    const onCategoryChange = e =>{
        const { value } = e.target;
        setCategory(value);
    }

    const onImageChange = e =>{
        const { value } = e.target;
        setImage(value);
    }

    const handleUpdate = async (values) =>{
        try {
            const {name,price} = values

            const isNameChanged = name !== data.name;
            const isPriceChanged = price !== data.price;
            const isCategoryChanged = category !== data.category;

            if (!isNameChanged && !isPriceChanged && !isCategoryChanged) {
                setModal(false)
                return;
            }

            if (isNameChanged || isPriceChanged || isCategoryChanged) {
                await updateFood({
                    ...data,
                    name,
                    price,
                    category
                }).unwrap();
                toast.success("با موفقیت ویرایش شد", {position:"bottom-left"})
            }
            setModal(false)
        }catch (err){
            console.error(err)
            toast.error("مشکلی از سمت سرور بوجود آمده!", {position:"bottom-left"})
        }
    }

    return(
        <div className="w-4/5 fixed bg-gray-500 left-0 right-0 top-20 m-auto p-5 rounded-lg">
            <button onClick={()=> setModal(false)}
                    className="w-fit px-3 py-1 rounded-full border-indigo-800 border-2 absolute left-4 hover:bg-indigo-800">
                X
            </button>
            {
                isLoading ? <Spinner/>
                    :
                    <Formik initialValues={{
                        name:data.name,
                        price:data.price,
                        category: data.category,
                        image: data.image
                    }} validationSchema={updateFoodSchema} onSubmit={handleUpdate}>
                        <Form className="mt-10">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="name"
                                       className={`mb-1 text-xs sm:text-sm 
                                   tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام غذا:</label>
                                <div className="relative">
                                    <Field name="name" type="text" className='text-sm placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black'
                                           placeholder="نام غذا"
                                    />
                                    <ErrorMessage name="name" render={msg => <div className="text-red-700">{msg}</div>}/>
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="price"
                                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>قیمت:</label>
                                <div className="relative">
                                    <Field name="price" type="number" className="text-sm sm:text-base
                                    placeholder-gray-500 pl-10 pr-4
                             rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black"
                                           placeholder="قیمت"
                                    />
                                    <ErrorMessage name="price" render={msg => <div className="text-red-700">{msg}</div>}/>
                                </div>
                            </div>

                            <div className="flex flex-col mb-6">
                                <label htmlFor="category"
                                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>دسته بندی:</label>
                                <Field as="select" name="category" value={category} onChange={onCategoryChange}
                                       className="text-sm sm:text-base pl-10 pr-4
                                            rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black">
                                    <option value="1">خانگی</option>
                                    <option value="2">فست فود</option>
                                    <option value="3">سالاد</option>
                                </Field>
                                <ErrorMessage name="category" render={msg => <div className="text-red-700">{msg}</div>} />
                            </div>

                            <div className="flex flex-col mb-6">
                                <label htmlFor="image"
                                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>عکس:</label>
                                <div>
                                    {/*<input type="file" name="image" accept="image/*"*/}
                                    {/*       className="text-sm sm:text-base pl-10 pr-4 w-fit*/}
                                    {/*            rounded-lg border border-gray-600 py-2 text-black float-right"*/}
                                    {/*       onChange={onImageChange}*/}
                                    {/*/>*/}
                                    {data.image && (
                                        <img src={`${process.env.SERVER_URL}/images/foods/${image}`}
                                             alt="Food Image" className="w-32 h-32 object-cover float-left rounded-lg" />
                                    )}
                                    <ErrorMessage name="image" render={msg => <div className="text-red-700">{msg}</div>} />
                                </div>
                            </div>

                            <div className="flex w-full">
                                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                    ویرایش
                                </button>
                            </div>
                        </Form>
                    </Formik>
            }
        </div>
    )
}

export default EditFoodManager