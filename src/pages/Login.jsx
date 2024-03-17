import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
       
        await login(email, password)
    }

    return(
        <section className="bg-[#FCF5ED]">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] lg:py-0">
      
      <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-[#1F1717]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl flex justify-center font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-white "> Email</label>
                      <input type="email" 
                       className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                       placeholder="name@email.com"
                       
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       />
                  </div>
                  <div className="mb-5">
                      <label  className="block mb-2 text-sm font-medium text-white ">Password</label>
                      <input type="password" 
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      />
                  </div>
                  
                  <div>

                  <button disabled={isLoading} type="submit" className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center">Log in</button>
                  {error && <div className="w-full border-2 border-red-500 rounded-md bg-red-400 flex justify-center">{error}</div>}
                  </div>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account yet? <Link to="/signup" className="font-medium text-white">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    )
}

export default Login