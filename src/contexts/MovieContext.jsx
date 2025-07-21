import { createContext,useState,useContext,useEffect } from "react";
const MovieContext= createContext();

export const useMovieContext=()=> useContext(MovieContext);

//this MovieProvider  will provide state to any of the compononents that are present insidee of it.
//It is gonna give them access to specific functions, methods when they need to use it.
export const MovieProvider=({children})=>{
    //children is a reserved prop when you write a componenet. children is anything that is inside of the component you rendered. 
    const [fav,setFav]=useState([]);
    //now any of the children that is inside of this function will have access to this state we will be providing in this component
    useEffect(()=>{
        const storedFavs=localStorage.getItem("favourites");
        if(storedFavs){
            setFav(JSON.parse(storedFavs));
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("favourites", JSON.stringify(fav));
    },[fav])

    //3 operations: 1) add a fav, 2) remove 3)check a fav

    const addToFavourites=(movie)=>{
        setFav(prev => [...prev,movie]);
        //we are saying ,take the prev value or any of the favs we already have and then add the movie to the prev value. we cannot do fav.push(movie) as it will not update the state directly
    }
    const removeFromFavourites=(movieId)=>{
        setFav(prev=>prev.filter(movie => movie.id!== movieId))
    }

    const isFavourite=(movieId)=>{
        return fav.some(movie=>movie.id==movieId);

    }


    const value={
        fav,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }//this movie context.provider just gives the context to all the children that are present in variable children. the context it will provide is value!
    return <MovieContext.Provider value={value}>
        {children};
    </MovieContext.Provider> 
}


