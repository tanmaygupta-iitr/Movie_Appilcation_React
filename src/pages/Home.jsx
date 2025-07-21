import { useState } from "react";
import { useEffect } from "react";
import '../css/Home.css'
import Movie_Card from "../components/MovieCard";
import { getPopularMovies,searchMovies} from '../services/api.js'
function Home(){
    const [searchQuery,setSearchQuery]=useState("");
    const [movies,setMovies]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    //the function you want to call when your mentioned array changes.
    useEffect(()=>{
        const loadPopularMovies=async()=>{
            try {
                const popularMovies=await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError(error);
                console.log("Failed to load movies")
            }
            finally{
                setLoading(false);
            }
        }
        loadPopularMovies();
    },[])
    async function handleSearch(e){
        e.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return;

        setLoading(true);//makes complete sense. when we are searching, there should be loading as that is the part of the process
        try {
            const searchResults=await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);//makes all sense. first search, then display on user interface and then remove the error coz its working!

        } catch (error) {
            setError("Failed to search movies....");
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="home">
            <form onSubmit={handleSearch} className="video-search">
                <div className="form-div">
                    <div>
                        <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}></input>
                    </div>
                    <div>
                        <button className="search-button" type="submit">Search</button>
                    </div>
                </div>   
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div>: <div className="movie-grid">
                {movies.map((movie)=>(
                    (movie.title.toLowerCase().startsWith(searchQuery)) && 
                    (<Movie_Card movie={movie} key={movie.id} />)
                ))}
            </div>}
            
        </div>
    );
}
export default Home
