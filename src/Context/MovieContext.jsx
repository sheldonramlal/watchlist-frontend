import React, { createContext, useState, useEffect  } from "react";

//create a context
 const MovieContext = createContext()

//create a provider component
 const MovieProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [newdata, setNewData] = useState([])

    useEffect( () => {

        const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c4b3eaabefmsh5fcd816cced9a83p180eabjsn8414d6b0af97',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
        };

        const url2 = 'https://moviesdatabase.p.rapidapi.com/titles/random?startYear=2022&list=top_boxoffice_200';
        const url3 = 'https://moviesdatabase.p.rapidapi.com/titles/random?startYear=2022&list=top_boxoffice_last_weekend_10';

        const getData = async() => {
            try {
                const response = await fetch(url, options);
                const {results} = await response.json();
                

                const response2 = await fetch(url2, options);
                const json = await response2.json();
                const results2 = json.results

                const response3 = await fetch(url3, options)
                const json3 = await response3.json()
                const results3 = json3.results
               
                const data = [...results, ...results2, ...results3]
                
                const arr = []

                data.map((item) => {
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

const addToWatchList = async (movie, data, setData) => {

    const index = data.findIndex((m) => m.id === movie.id)
    const newData = [...data]
   

    try{
    const response = await fetch("https://good-gold-sparrow-robe.cyclic.app/addmovie", {
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

}

return(
    <MovieContext.Provider value={{data, setData, addToWatchList}}>
        {children}
    </MovieContext.Provider>
)


}

export {MovieProvider, MovieContext}