import React, { createContext, useState, useEffect  } from "react";

//create a context
 const MovieContext = createContext()

//create a provider component
 const MovieProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [newdata, setNewData] = useState([])

    useEffect( () => {

        const url = 'https://books-api7.p.rapidapi.com/books/find/genres?genres%5B%5D=fiction';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c4b3eaabefmsh5fcd816cced9a83p180eabjsn8414d6b0af97',
            'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
    };

        const url2 = 'https://books-api7.p.rapidapi.com/books/find/genres?genres%5B%5D=Historical%20Fiction';
        const url3 = 'https://books-api7.p.rapidapi.com/books/find/genres?genres%5B%5D=Literature';
        const url4 = 'https://books-api7.p.rapidapi.com/books/find/genres?genres%5B%5D=Romance';

        const getData = async() => {
            try {
                const response = await fetch(url, options);
                const results = await response.json();
                const results1 = results.slice(0,10)
                
                const response2 = await fetch(url2, options);
                const json = await response2.json();
                const results2 = json.slice(0,10)
            
                const response3 = await fetch(url3, options)
                const json3 = await response3.json()
                const results3 = json3.slice(0,10)

                const response4 = await fetch(url4, options)
                const json4 = await response4.json()
                const results4 = json4.slice(0,10)

                const allData = [...results1,...results2,...results3,...results4]

               console.log('hello');
                
                
                const arr = []

                allData.map((item) => {
                    let id = item._id
                    let author = item.author.first_name + ' ' + item.author.last_name
                    let img = item.cover
                    let url = item.url
                    let description = item.plot
                   

                    let name = item.title
                    let rating = item.rating
                   
                    let buttonText = "Add to Reading List"

                    arr.push({id,author,img,url,description,name,rating,buttonText})
                })

                setData(arr)
                localStorage.setItem('books',JSON.stringify(arr))

            } catch (error) {
                console.error(error);
            }
    }

    

        const cachedBooks = localStorage.getItem('books')

        if(cachedBooks){
            setData(JSON.parse(cachedBooks))
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