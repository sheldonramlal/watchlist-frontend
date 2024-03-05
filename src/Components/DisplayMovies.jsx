import React from 'react'
import { Link } from 'react-router-dom'

const DisplayMovies = ({movies, title}) => {
  return (
    <div className='bg-gray-800 w-full'>
       
    <div className='w-full p-3 font-thin text-start text-2xl  bg-gray-800'>
    <h1 className='text-white'>{title}</h1>
    </div>
   
    <div className='w-full overflow-x-auto flex flex-nowrap gap-3 p-3 no-scrollbar bg-gray-800'>
    {movies.map((m) => (
        <div className='w-1/2 h-[350px] md:w-1/4 lg:w-1/5 lg:h-[500px] md:h-[500px] bg-gray-900 rounded-md shrink-0 ' key={m.id}>
            <Link to="/viewmovie" state={m } >
                <div className='w-full h-[250px] md:h-96 bg-slate-500 rounded-md'>
                    <img  className='bg-contain w-full h-[250px] md:h-96 rounded' loading="lazy" src={m.image} />
                </div>

                <div className=' w-full h-1/5 md: font-medium  text-white p-2 md:pb-5 text-sm flex flex-col justify-between '>
                    <p>{m.name}</p>
                    <p className='text-gray-500 pt-1'> Release date: {m.year}</p>

                </div>
                {/*
                <div className='w-full flex justify-center mt-5 md:mt-1 p-2 '>
                    <button onClick={ () => addToWatchList(m)} className='p-2 w-full bg-yellow-300 text-black font-medium hover:bg-yellow-400'>{m.buttonText}</button> 
                </div>*/}

             </Link>
        </div>
    ))

    }
    </div>
   
</div>
  )
}

export default DisplayMovies