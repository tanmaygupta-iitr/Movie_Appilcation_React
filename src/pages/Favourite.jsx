import '../css/Favourites.css'
import {useMovieContext} from '../contexts/MovieContext.jsx'
import MovieCard from '../components/MovieCard.jsx'
function Favourite(){

    const {fav}= useMovieContext();
    console.log(fav);
    if(fav.length!==0) {
        return <div className='favorites'><h2>Your Favourites</h2>
            <div className="movie-grid">
                {fav.map((movie)=>(
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    }
    return <div className="favorites-empty">
        <h2>No Favourite Movies Yet!</h2>
        <p>Add your Favourite Movies and they will be displayed here</p>
    </div>
}
export default Favourite