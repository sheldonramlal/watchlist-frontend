import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'


const WatchList = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const {user} = useAuthContext()


    const close = () => {
        setError(null)
    }

    useEffect(() => {
        if(!user){
            setError('You must be logged in to add books to your Reading list')
            return
        }
        const getMovies = async () => {
            try{  
                const response = await fetch("https://good-gold-sparrow-robe.cyclic.app/readbooks", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${user.token}`
                    }
                })

                if (!response.ok) {
                    // If the response status is not ok (e.g., 404 Not Found), throw an error
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const jsonData = await response.json()
                setData(jsonData)
            } catch(error) {
                console.error("Error fetching data:", error.message);
            }
        }

        if(user){
            getMovies()
        }
    }, [])

   const removeFromWatchList = async (movie) => {
    if(!user){
        setError('You must be loggin in to add movies to your watchlist')
        return
    }
    const id = movie._id
    try{
        const response = await fetch('https://good-gold-sparrow-robe.cyclic.app/deletereadbook/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        })

        if (!response.ok) {
            // If the response status is not ok (e.g., 404 Not Found), throw an error
            throw new Error(`Failed to remove data. Status: ${response.status}`);
        }
        const updatedMovies = data.filter((m) => m !== movie)
        setData(updatedMovies)
    }catch(error){
        console.log(error);
    }
    
   }

  return (
    <div className='w-full h-fit bg-[#FCF5ED] pt-10'>
         <p className='font-bold text-2xl text-[#1F1717] pl-4'>Read Books</p>
        <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-[#FCF5ED]'>
        {error && (
                       <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                       <div class="relative p-4 w-full max-w-md max-h-full">
                           <div class="relative bg-[#1F1717]">
                               <button onClick={close}type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                                   <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                   </svg>
                                   <span class="sr-only">Close modal</span>
                               </button>
                               <div class="p-4 md:p-5 text-center">
                                   <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                   </svg>                                  
                                   <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You must be logged in to add books to your Read list</h3>
                                   <Link to="/login" >
                                   <button data-modal-hide="popup-modal" type="button" class=" bg-[#F4BF96] text-black font-semibold rounded-lg  inline-flex items-center px-5 py-2.5  text-center">
                                       Log in
                                   </button>
                                   </Link>
                                   <button onClick={close} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3  font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 ">Cancel</button>
                               </div>
                           </div>
                       </div>
                   </div>
                    )}
            { data && data.length > 0 ? (data.map((m) => (
            <div className='w-full h-[580px] md:h-[500px] bg-[#1F1717] rounded-md mt-2' key={m.id}>
            <Link to="/viewmovie" state={m }>
            <div className='w-full h-[450px] md:h-96 bg-slate-500 rounded-md'>
                <img  className='bg-contain w-full h-[450px] md:h-96 rounded' loading="lazy" src={m.img} />
            </div>
            </Link>

            <div className=' w-full  h-30 font-medium text-white p-2 text-sm'>
                <p className='truncate font-bold'>{m.name}</p>
                <p className='text-gray-500 py-1'> Author: {m.author}</p>

                <div className='w-full flex  justify-center pt-5 lg:pt-2 md:mt-1  '>
                    <button onClick={ () => removeFromWatchList(m)} className='p-2 w-full bg-yellow-300 text-black font-medium hover:bg-red-500'>Remove from Read list</button>
                </div>
            </div>
        </div>
                ))) : (
                <div className='w-full h-14 flex justify-center items-center bg-[#CE5A67] col-span-4 '>
                    <p className='text-white'>You haven't read any books</p>
                </div>
                )
            }
    </div>
 </div>
  )
}

export default WatchList