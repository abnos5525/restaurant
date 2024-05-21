import * as yup from 'yup';

export const updateUserSchema = yup.object().shape({
    name: yup.string().trim().required("نام را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    username: yup.string().trim().required("نام کاربری را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    address: yup.string().trim().min(3, "حداقل 3 کاراکتر باشد").max(255,"حداکثر 255 کاراکتر باشد"),
    phone: yup.string().matches(/^09\d{9}$/, 'شماره نادرست است').trim().required("شماره موبایل را وارد کنید"),
    role: yup.mixed().oneOf(["admin","user","banned"], "ادمین یا کاربر را انتخاب کنید"),
});
