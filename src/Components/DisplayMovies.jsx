import React from 'react'
import { Link } from 'react-router-dom'

const DisplayMovies = ({books, title}) => {

    function truncateString(str, num) {
        // Clear out that junk in your trunk
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      }

      

    

  return (
    <div className='bg-[#FCF5ED] w-full'>
       
    <div className='w-full p-3 font-thin text-start text-2xl  bg-[#FCF5ED]'>
    <h1 className='text-black'>{title}</h1>
    </div>
   
    <div className='w-full overflow-x-auto flex flex-nowrap gap-3 p-3 no-scrollbar bg-[#FCF5ED]'>
    {books.map((m) => (
        <div className='w-1/2 h-[350px] md:w-1/4 lg:w-1/5 lg:h-[500px] md:h-[500px] bg-[#1F1717] rounded-md shrink-0 ' key={m.id}>
            <Link to="/viewmovie" state={m } >
                <div className='w-full h-[250px] md:h-96 bg-[#FCF5ED] rounded-md'>
                    <img  className='bg-contain w-full h-[250px] md:h-96 rounded' loading="lazy" src={m.img} />
                </div>

                <div className=' w-full h-1/5 md: font-medium  text-white p-2 md:pb-5 text-sm flex flex-col justify-between '>
                    <p className='text-lg'>{truncateString(m.name,20)}</p>
                    <p className='text-gray-500 pt-1'> Author: {m.author}</p>

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