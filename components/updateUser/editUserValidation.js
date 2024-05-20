import * as yup from 'yup';

export const updateUserSchema = yup.object().shape({
    name: yup.string().trim().required("نام را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    username: yup.string().trim().required("نام کاربری را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    address: yup.string().trim().required("آدرس را وارد کنید").min(3, "حداقل 3 کاراکتر باشد").max(255,"حداکثر 255 کاراکتر باشد"),
    phone: yup.string().matches(/^09\d{9}$/, 'شماره نادرست است').trim().required("شماره موبایل را وارد کنید"),
    oldPassword: yup.string().min(4, "حداقل 4 کاراکتر باشد").trim(),
    newPassword: yup.string().min(4, "حداقل 4 کاراکتر باشد").trim(),
    confirmPassword: yup.string().min(4, "حداقل 4 کاراکتر باشد").trim().test(
        'passwords-match',
        'رمزعبور را وارد کنید',
        function(value) {
            const { newPassword, oldPassword } = this.parent;
            if((newPassword && !oldPassword) || (oldPassword && !newPassword)) {
                return false;
            }
            return true;
        }
    ).oneOf([yup.ref("newPassword"), null], "تایید رمزعبور را درست وارد کنید")
});
