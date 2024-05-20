import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    username: yup.string().required("نام کاربری را وارد کنید").min(3, "حداقل 3 کاراکتر باشد"),
    password: yup.string().required("رمزعبور را وارد کنید").min(4, "حداقل 4 کاراکتر باشد")
})