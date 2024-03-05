import { useState } from "react";
import { useSignup } from "../hooks/useSignup";


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        await signup(email, password)
    }

    return(
        
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl flex justify-center font-bold leading-tight tracking-tight text-gray-500 md:text-2xl">
                  Sign up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 "> Email</label>
                      <input type="email" 
                       className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                       placeholder="name@company.com"
                       
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       />
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" 
                      className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      />
                  </div>
                  
                  <button disabled={isLoading} type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center">Sign up</button>
                  {error && <div className="w-full border-2 border-red-500 rounded-md bg-red-400 flex justify-center">{error}</div>}

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    
    )
}

export default Signup