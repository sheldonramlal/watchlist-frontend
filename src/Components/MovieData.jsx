import React, { useEffect, useState, useContext } from 'react'
import Search from './Search';
import DisplayMovies from './DisplayMovies';
import { MovieContext } from '../Context/MovieContext';

const MovieData = () => {
   
    const {data} = useContext(MovieContext)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if data is available
        if (data && data.length > 0) {
            setLoading(false); // Data is available, set loading to false
        }
    }, [data]);

    if (loading) {
        return (
        <div className='w-full h-10 flex items-center justify-center text-black font-xl'>
            <p>Loading...</p>
        </div>
        ) // Render loading message
    }

    const upComing = data.slice(0,10)
    const popular = data.slice(10,20)
    const showingNow = data.slice(20,30)
    const romance = data.slice(30)

 
   

  return (
    <>
   
    <DisplayMovies books={upComing}  title="Fiction"/>
    <DisplayMovies books={popular}  title="Historical Fiction"/>
    <DisplayMovies books={showingNow}  title="Literature"/>
    <DisplayMovies books={romance}  title="Romance"/>
    </>
  )
}

export default MovieData
