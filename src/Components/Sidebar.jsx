// Sidebar.js

import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


const Sidebar = ({ isOpen, toggle, close }) => {

  const { user } = useAuthContext()
  const { logout } = useLogout()

  const navigate = useNavigate()

  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if(!menuRef.current.contains(e.target)){
        close()
      }
    }
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }

  })
  

  const handleClick = () => {
    logout()
    navigate('/')
    
  }
   
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
      <div  className="absolute inset-y-0 left-0 w-64 lg:w-80 bg-gray-900 " ref={menuRef}>
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-white ">Menu</h1>
          <button onClick={toggle} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </button>
        </div>
        <div className='flex flex-col justify-between  h-4/5'>
            <ul className="py-4 " onClick={toggle}>
                <Link to="/">
                    <div className='flex  items-center px-4 hover:bg-gray-700 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        <li className="px-4 py-3 text-white ">Home</li>
                    </div>
                </Link>

                <Link to="/search">
                    <div className='flex  items-center px-4 hover:bg-gray-700 cursor-pointer'>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className=' w-6 h-6' class="w-6 h-6">
                            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clip-rule="evenodd" />
                        </svg>

                        <li className="px-4 py-3 text-white  ">Search</li>
                    </div>
                </Link>

                <Link to="/mywatchlist">
                    <div className='flex  items-center px-4 hover:bg-gray-700 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>

                        <li className="px-4 py-3 text-white hover:bg-gray-700 cursor-pointer">My WatchList</li>
                    </div>
                </Link>
            
            </ul>
            <div className='flex flex-col w-full items-center justify-center ' onClick={toggle}>
                 {!user &&  <Link to="/signup" className='w-1/2'><button  className="p-2 m-2 block text-white bg-red-600 cursor-pointer w-full  rounded">Sign up</button></Link>}
                 {!user && <Link to="/login" className='w-1/2'><button  className="p-2 m-2 text-white bg-red-600 cursor-pointer w-full rounded">Log in</button></Link>}
                 {user && <button onClick={handleClick} className="p-2 m-2 text-white bg-red-600 cursor-pointer w-1/2  rounded">Log out</button>}
            </div>
                 
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
