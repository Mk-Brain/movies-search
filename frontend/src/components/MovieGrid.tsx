import { MovieCard } from './MovieCard'
import type { Movie } from '../models/Movie';
import { useState } from 'react';
import { MovieModal } from './MovieModal';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';



export const MovieGrid = () => {
  const popularMovies = useSelector((state: RootState) => state.movies.popularMovies)
  const searchResult = useSelector((state: RootState) => state.movies.resultSearch)
  const [movie, setMovie] = useState<Movie | null>(null)

  const [isOpen, setIsOpen] = useState(false);

  //ouverture et fermeture du dialog
  const handleOpen = () => {
    setIsOpen(true);
    console.log(isOpen);

  };

  const handleClose = () => {
    setIsOpen(false);
    console.log("close2");
    console.log(isOpen);
  };

  console.log(searchResult.length);
  
  return (
    <>
      <div className='flex flex-col gap-3'>
        <p className='text-white text-3xl'>Resultats de la recherche pour x</p>
        <div className='grid grid-cols-6 gap-8'>
  
          {searchResult.length === 0 ? popularMovies.map((movie) => {
            setMovie(movie)
            return (
              <MovieCard key={movie.id} movie={movie} handleOpen={handleOpen} />
            )
          }) : searchResult.map((movie) => {
            setMovie(movie)
            return (
              <MovieCard key={movie.id} movie={movie} handleOpen={handleOpen} />
            )
          })}
        </div>
      </div>
      <>
        <MovieModal isOpen={isOpen} onClose={handleClose} movie={movie!} />
      </>
    </>
  )
}
