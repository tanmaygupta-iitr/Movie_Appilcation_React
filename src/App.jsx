import './css/App.css'
// import Movie_Card from './components/MovieCard.jsx'
import { Navbar } from './components/navbar.jsx'
import Home from './pages/Home.jsx'
import {Routes,Route} from 'react-router-dom'
import Favourites from './pages/Favourite.jsx'
import { MovieProvider } from './contexts/MovieContext.jsx'
function App() {
  return ( 
    <MovieProvider>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favourites' element={<Favourites/>} />
        </Routes>
      </main>
    </MovieProvider>
    
  )
}
export default App
