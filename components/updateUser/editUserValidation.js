import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name: yup.string().trim().required("نام را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    username: yup.string().trim().required("نام کاربری را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    password: yup.string().trim().required("رمزعبور را وارد کنید").min(4, "حداقل 4 کاراکتر باشد"),
    confirmPassword: yup.string().trim().required("تایید رمزعبور را وارد کنید").min(4, "حداقل 4 کاراکتر باشد")
        .oneOf([yup.ref("password"), null], "تایید رمزعبور را درست وارد کنید")
})