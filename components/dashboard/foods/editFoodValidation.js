import * as yup from 'yup';

export const updateFoodSchema = yup.object().shape({
    name: yup.string().trim().required("نام را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    price: yup.number().required("قیمت را وارد کنید"),
    category: yup.mixed().required("دسته بندی را انتخاب کنید").oneOf(["1","2","3"], "دسته بندی را انتخاب کنید"),
    // image: yup.mixed().test("fileType", "فرمت فایل باید jpg یا png باشد", value => {
    //         return value && ['image/jpeg', 'image/png'].includes(value.type);
    //     }).test("fileSize", "حجم فایل نباید بیشتر از 2 مگابایت باشد", value => {
    //         return value && value.size <= 2000000; // 2MB
    //     })
});
