import React, { useEffect, useState, useContext } from 'react'
import Search from './Search';
import DisplayMovies from './DisplayMovies';
import { MovieContext } from '../Context/MovieContext';

const MovieData = () => {

    const {data} = useContext(MovieContext)

    const upComing = data.slice(0,10)
    const popular = data.slice(10,20)
    const showingNow = data.slice(20)

    
   
{/*}
    useEffect( () => {

        const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c4b3eaabefmsh5fcd816cced9a83p180eabjsn8414d6b0af97',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
        };

        const getData = async() => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                
               
                
                const arr = []

                result.results.map((item) => {
                    let url = ''
                    let description = ''
                    if(item.primaryImage){
                         url = item.primaryImage.url
                         description = item.primaryImage.caption.plainText
                    }else{
                        url = "/no-image.png"
                    }

                    let name = item.titleText.text
                    let year = item.releaseYear.year
                    let id = item.id
                   
                    let buttonText = "Add to watchList"

                    arr.push({image: url, name, year, id, description, buttonText })
                })

                setData(arr)
                localStorage.setItem('movies', JSON.stringify(arr))

            } catch (error) {
                console.error(error);
            }
    }

        const cachedMovies = localStorage.getItem('movies')

        if(cachedMovies){
            setData(JSON.parse(cachedMovies))
        } else {
            getData()
        }

       

   
}, [])
console.log(data);
*/}

  {/*}
 const addToWatchList = async (movie) => {

    const index = data.findIndex((m) => m.id === movie.id)
    const newData = [...data]
   

    try{
    const response = await fetch("http://localhost:3000/addmovie", {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json'
        }
    })


    if (response.ok) {
        newData[index].buttonText = 'Added to watchlist';
    } else if(response.status(404)){
        newData[index].buttonText = 'Failed to add';
    }

    // Update the state with the final data
    setData(newData);
    }catch (error) {
        console.error('Error adding movie:', error);
        newData[index].buttonText = 'Failed to add';
        setData(newData);
    }

}*/}

  return (
    <>
      
    <DisplayMovies movies={upComing}  title="Upcoming"/>
    <DisplayMovies movies={popular}  title="Box Office hits"/>
    <DisplayMovies movies={showingNow}  title="Popular now"/>
    </>
  )
}

export default MovieData
