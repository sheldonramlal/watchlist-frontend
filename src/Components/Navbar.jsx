import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () =>{
    setIsOpen(false)
  }

  
  return (
    <div className='w-full h-16 bg-gray-900 flex flex-row p-4 items-center justify-between'>
          <div className='flex  w-full lg:w-1/5'>

              <button onClick={toggleSidebar} className=" text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
  </button>
         {/* <SidebarWithBurgerMenu />*/}
              <div className=' w-full flex justify-center items-center  '>
                <Link to="/">
                <h1 className='font-bold text-3xl  text-yellow-400 '>WatchList</h1>
                </Link>
              </div>
                
          </div>
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} close={closeSidebar} />
          

            <div className='flex flex-row '>
                <Link to="/search" >
                <button className='bg-yellow-400 p-2 mr-5 font-medium relative h-10 min-w-10 hidden lg:block'>
  <p className='md:pr-5 hidden md:block'>Search</p>
  <svg xmlns="http://www.w3.org/2000/svg" className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer' height="12" width="12" viewBox="0 0 512 512">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
  </svg>
</button>

                </Link>

                <Link to="/mywatchlist">
                <button className='bg-yellow-400 p-2 mr-5 font-medium hidden lg:block'>My WatchList</button>
                </Link>
            </div>
    </div>
  )
}

export default Navbar