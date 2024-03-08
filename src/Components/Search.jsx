import React, { useEffect, useState } from 'react'

import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom'




const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searched , setSearched] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    const close = () => {
        setError(null)
    }

    const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchQuery}?exact=false`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c4b3eaabefmsh5fcd816cced9a83p180eabjsn8414d6b0af97',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
    };

    const arr =[]
    const searchMovie = async() => {
        setLoading(true)
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            
            result.results.map((item) => {
                let url = ''
                let year = ''
                if(item.primaryImage){
                     url = item.primaryImage.url
                }else{
                    url = "/no-image.png"
                }

                if(item.releaseYear){
                     year = item.releaseYear.year
                }else{
                   year = "No release date"
                }

                let name = item.titleText.text
                
                let id = item.id
                let buttonText = "Add to watchList"

                arr.push({image: url, name, year, id, buttonText })

            })
            
            setSearched(arr)
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }


const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
        searchMovie()
    }
}
    
 const addToWatchList = async (movie) => {
    if(!user){
        setError('You must be loggin in to add movies to your watchlist')
        return
    }
    const index = searched.findIndex((m) => m.id === movie.id)
    const newData = [...searched]
   

    try{
    const response = await fetch("https://good-gold-sparrow-robe.cyclic.app/addmovie", {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })


    if (response.ok) {
        newData[index].buttonText = 'Added to watchlist';
    } else if(response.status(404)){
        newData[index].buttonText = 'Already added';
    }

    // Update the state with the final data
    setSearched(newData);
    }catch (error) {
        console.error('Error adding movie:', error);
        newData[index].buttonText = 'Already added';
        setSearched(newData);
    }

}



  return (
    <div className='bg-gray-800'>
    
        <div className='p-3 flex items-center justify-center'>
            <div className='flex w-full lg:w-1/2  relative'>
                <input className='w-full rounded-md p-3 focus:outline-none '
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='What are you looking for?'
                />
                <button onClick={searchMovie}>

                <svg xmlns="http://www.w3.org/2000/svg"  className='absolute top-4 right-3 cursor-pointer' height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </button>
                
            </div>
        </div>

        <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-gray-800'>
        {loading ? 
        <div className="flex w-[98vw] justify-center items-end text-white">Loading...</div> : (
        
        searched.map((m) => (
            
            <div className='w-full h-[600px] md:h-[500px] bg-gray-900 rounded-md mt-2' key={m.id}>
               
                <div className='w-full h-[450px] md:h-96 bg-slate-500 rounded-md'>
                    <img  className='bg-contain w-full h-[450px] md:h-96 rounded' loading="lazy" src={m.image} />
                </div>

                <div className=' w-full  h-36 font-medium text-white p-2 text-sm'>
                    <p className='truncate font-bold'>{m.name}</p>
                    <p className='text-gray-500 py-1'> Release date: {m.year}</p>

                    <div className='w-full flex  justify-center pt-1  md:mt-1  '>
                        <button onClick={ () => addToWatchList(m)} className='p-2 w-full bg-yellow-300 text-black font-medium hover:bg-yellow-400'>{m.buttonText}</button>
                    </div>
                </div>
                
            </div>
        ))

        
        )}
         {error && (
                       <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                       <div class="relative p-4 w-full max-w-md max-h-full">
                           <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                                   <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You must be logged in to add this movie to your watchlist</h3>
                                   <Link to="/login" >
                                   <button data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                       Log in
                                   </button>
                                   </Link>
                                   <button onClick={close} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                               </div>
                           </div>
                       </div>
                   </div>
                    )}
        </div> 

    </div>
  )
}

export default Search