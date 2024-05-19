const Login = () =>{
    return(
        <form action="#">
            <div className="flex flex-col mb-6">
                <label htmlFor="email"
                       className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">نام کاربری:</label>
                <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>

                    <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="ایمیل" />
                </div>
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">رمزعبور:</label>
                <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
                    </div>

                    <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="رمزعبور" />
                </div>
            </div>

            {/*<div className="flex items-center mb-6 -mt-4">*/}
            {/*    <div className="flex ml-auto">*/}
            {/*        <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="flex w-full">
                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                    ورود
                    <span>
            </span>
                </button>
            </div>
        </form>
    )
}

export default Login