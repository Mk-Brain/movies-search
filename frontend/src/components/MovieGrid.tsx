import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from './MovieCard';
import { MovieModal } from './MovieModal';
import type { RootState } from '../store/store';
import type { Movie } from '../models/Movie';


export const MovieGrid = () => {
  const popularMovies = useSelector((state: RootState) => state.movies.popularMovies);
  const searchResult = useSelector((state: RootState) => state.movies.resultSearch);
  
  // État pour stocker le film actuellement sélectionné
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Ouverture de la modale avec enregistrement du film cliqué
  const handleOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedMovie(null);
  };

  // Sélection du tableau à afficher (résultats de recherche ou populaires)
  const isSearching = searchResult && searchResult.length > 0;
  const moviesToDisplay = isSearching ? searchResult : popularMovies;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-white text-3xl font-bold">
        {isSearching ? 'Résultats de la recherche' : 'Films populaires'}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {moviesToDisplay.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleOpen={() => handleOpen(movie)}
          />
        ))}
      </div>

      <MovieModal
        isOpen={isOpen}
        onClose={handleClose}
        movie={selectedMovie}
      />
    </div>
  );
};