import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext.jsx'
function Movie_Card({movie}){
    const {isFavourite,removeFromFavourites,addToFavourites}= useMovieContext();
    const favourite=isFavourite(movie.id);

    function onLike(e){
        e.preventDefault();
        if(favourite) removeFromFavourites(movie.id);
        else addToFavourites(movie);
    }
    return (
        <>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}></img>
                    <div className="movie-overlay">
                        <button className={`favourite-btn ${favourite? "active" :""}`} onClick={onLike}>♥</button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
            </div>
        </>
    )
}

export default Movie_Card