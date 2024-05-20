import {updateUserSchema} from "@/components/dashboard/editUserValidation";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useGetUserQuery, useUpdateUserMutation} from "@/lib/reducers/userApi";
import Spinner from "@/components/Spinner";
import {useContext, useState} from "react";
import {Context} from "@/context/ContextApp";
import {toast} from "react-toastify";

const EditUserManager = ({userId,setModal}) =>{

    const {data, isLoading} = useGetUserQuery(userId)
    const {dark} = useContext(Context)

    const [updateUser] = useUpdateUserMutation()

    const [role, setRole] = useState('user')

    const onRoleChange = e =>{
        const { value } = e.target;
        setRole(value);
        console.log(value)
    }

    const handleUpdate = async (values) =>{
        try {
            const {name,phone,address} = values

            // بررسی تغییرات name و address
            const isNameChanged = name !== data.name;
            const isAddressChanged = address !== data.address;
            const isRoleChanged = role !== data.role;

            // اگر هیچ تغییری در name و address نبوده و فیلدهای رمز عبور هم خالی هستند
            if (!isNameChanged && !isAddressChanged && !isRoleChanged) {
                setModal(false)
                return;
            }

            // اگر تغییرات در name یا address وجود داشته باشد یا رمز عبور‌ها پر شده باشند
            if (isNameChanged || isAddressChanged || isRoleChanged) {
                await updateUser({
                    ...data,
                    name,
                    address,
                    phone,
                    role
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
        <div className="w-4/5 fixed bg-gray-500 left-0 right-0 top-24 m-auto p-5 rounded-lg">
            <button onClick={()=> setModal(false)}
                    className="w-fit px-3 py-1 rounded-full border-indigo-800 border-2 absolute left-4 hover:bg-indigo-800">
                X
            </button>
            {
                isLoading ? <Spinner/>
                    :
                    <Formik initialValues={{
                        name:data.name,
                        username:data.username,
                        phone: data.phone,
                        address: data.address,
                        role: data.role
                    }} validationSchema={updateUserSchema} onSubmit={handleUpdate}>
                        <Form className="mt-10">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="name"
                                       className={`mb-1 text-xs sm:text-sm 
                                   tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام:</label>
                                <div className="relative">
                                    <Field name="name" type="text" className='text-sm placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black'
                                           placeholder="نام"
                                    />
                                    <ErrorMessage name="name" render={msg => <div className="text-red-700">{msg}</div>}/>
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="username"
                                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نام کاربری:</label>
                                <div className="relative">
                                    <Field name="username" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                             rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black"
                                           placeholder="نام کاربری" disabled
                                    />
                                    <ErrorMessage name="username" render={msg => <div className="text-red-700">{msg}</div>}/>
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="phone"
                                       className={`mb-1 text-xs sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>موبایل:</label>
                                <div className="relative">
                                    <Field name="phone" type="text" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black"
                                           placeholder="موبایل" disabled
                                    />
                                    <ErrorMessage name="phone" render={msg => <div className="text-red-700">{msg}</div>}/>
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="role"
                                       className={`mb-1 text-xs sm:text-sm tracking-wide 
                                       ${dark ? 'text-gray-300' : 'text-gray-600'}`}>نقش کاربر:</label>
                                <select onChange={onRoleChange} name="role" defaultValue={data.role}
                                        className="text-sm sm:text-base pl-10 pr-4
                         rounded-lg border border-gray-600 py-2 focus:outline-none focus:border-blue-400 w-full text-black">
                                    <option value="admin">
                                        ادمین
                                    </option>
                                    <option value="user">
                                        کاربر
                                    </option>
                                </select>
                                <ErrorMessage name="role" render={msg => <div className="text-red-700">{msg}</div>}/>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="address" className={`mb-1 text-xs 
                            sm:text-sm tracking-wide ${dark ? 'text-gray-300' : 'text-gray-600'}`}>آدرس:</label>
                                <div className="relative">
                                    <Field
                                        name="address" type="text"
                                        className=" text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-600 w-full py-2 focus:outline-none focus:border-blue-400 text-black" placeholder="آدرس"
                                    />
                                    <ErrorMessage name="address" render={msg => <div className="text-red-700">{msg}</div>}/>
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

export default EditUserManager