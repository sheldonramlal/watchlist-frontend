import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieContext } from '../Context/MovieContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom'

const ViewMovie = () => {
    const location = useLocation()
    const { name, image, year, id, buttonText } = location.state
    const movie = location.state
    const { data, setData }  = useContext(MovieContext)
    const [text, setText] = useState('Add to watchlist')
    const [error, setError] = useState(null)
    const { user } = useAuthContext()



    const close = () => {
        setError(null)
    }
    
const addToWatchList = async (movie, data, setData) => {

    if(!user){
        setError('You must be loggin in to add movies to your watchlist')
        return
    }

    try{
    const response = await fetch("http://localhost:3000/addmovie", {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })


    if (response.ok) {
        setText('Added to watchlist')
    } else {
        setText('Already added')
    }

    // Update the state with the final data
   
    }catch (error) {
        console.error('Error adding movie:', error);
       
    }

}


  return (
    <>
     <div className='w-full h-[90vh] p-3  bg-slate-800 '>
        <div className='flex flex-col justify-between w-full h-full md:h-[700px] bg-slate-800 rounded-md shrink-0   ' key={movie.id}>
                    <div className='overflow-y-auto h-450px md:flex md:flex-row  md:justify-around overflow-scroll no-scrollbar '>

                        <div className='w-full md:w-[650px] h-[350px] md:h-[450px]'>
                            <img  className='bg-contain w-full h-[350px] md:h-full md:w-full  ' loading="lazy" src={movie.image} />
                        </div>

                        <div className=' w-full bg-slate-900   md:font-medium text-white p-2 text-sm flex  flex-col justify-between md:justify-start h-auto overflow-scroll no-scrollbar '>
                            <p className='font-semibold text-lg'>{movie.name}</p>
                            <p className='py-2'>{movie.description}</p>
                            <p className='text-gray-500 mt-1'> Release date: {movie.year}</p>

                        </div>
                    </div>
                    {error && (
                       <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                       <div class="relative p-4 w-full max-w-md max-h-full">
                           <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                               <button onClick={close}type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center " data-modal-hide="popup-modal">
                                   <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                   </svg>
                                   <span class="sr-only">Close modal</span>
                               </button>
                               <div class="p-4 md:p-5 text-center">
                                   <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                   </svg>                                  
                                   <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You must be logged in to add this movie to your watchlist</h3>
                                   <Link to="/login" >
                                   <button data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                       Log in
                                   </button>
                                   </Link>
                                   <button onClick={close} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 ">Cancel</button>
                               </div>
                           </div>
                       </div>
                   </div>
                    )}
                    <div className='w-full md:grow  h-24 flex justify-center items-center  pb-7 md:mt-1  '>
                            <button onClick={ () => addToWatchList(movie,data,setData)} className='p-2 w-full md:w-1/4 bg-yellow-300 text-black font-medium hover:bg-yellow-400 rounded-md '>{text}</button> 
                    </div>


                
        </div>

     </div>

    </>
  )
}

export default ViewMovie