import * as yup from 'yup';

export const updateFoodSchema = yup.object().shape({
    name: yup.string().trim().required("نام را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    price: yup.number().required("قیمت را وارد کنید"),
    category: yup.mixed().required("دسته بندی را انتخاب کنید").oneOf(["1","2","3"], "دسته بندی را انتخاب کنید"),
});
