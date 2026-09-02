import React, { useRef } from 'react';

import { Avatar } from './Avatar';
import MovieStepper from './Stepper';
import { BtnNeon } from './BtnNeon';
import CancelIcon from '@mui/icons-material/Cancel';
import type { Movie } from '../models/Movie';

// URLs de base pour les images TMDB
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_AVATAR_BASE = 'https://image.tmdb.org/t/p/w185';

export function MovieModal({
  isOpen,
  onClose,
  movie,
}: {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Gestion de l'ouverture et de la fermeture du dialog natif
  React.useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      if (!dialogElement.open) {
        dialogElement.showModal();
      }
    } else {
      dialogElement.close();
    }
  }, [isOpen]);

  // Fermeture lors d'un clic sur l'arrière-plan (backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      e.stopPropagation();
      onClose();
    }
  };

  // Fermeture via le bouton X
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  if (!movie) return null;

  // Formatage des données TMDB
  const posterUrl = movie.poster_path
    ? `${TMDB_POSTER_BASE}${movie.poster_path}`
    : '/placeholder.jpg';
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';
  const genresList = movie.genres?.map((g) => g.name).join(', ') || '';
  const runtimeText = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const ratingText = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  
  // Récupération des 5 premiers acteurs du casting
  const topCast = movie.credits?.cast?.slice(0, 5) || [];
  const actorsSummary =
    movie.credits?.cast?.slice(0, 3).map((a) => a.name).join(', ') || 'N/A';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="top-0 z-50 w-screen h-screen bg-transparent backdrop-blur-xs hidden open:flex items-center justify-center m-0"
    >
      <div
        className="flex flex-col w-[60vw] h-[80vh] rounded-xl overflow-hidden pb-3 border border-white bg-white/30 backdrop-blur-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 bg-transparent flex items-end pt-1 pr-2">
          <button
            type="button"
            onClick={handleCloseClick}
            className="rounded text-xl text-white/55 flex justify-end w-full cursor-pointer hover:text-white"
            aria-label="Fermer la boîte de dialogue"
          >
            <CancelIcon />
          </button>
        </div>

        <div className="flex gap-6 overflow-y-auto px-4 h-full">
          {/* Affiche du film */}
          <div className="flex flex-col w-3/7 h-3/4 shrink-0">
            <img
              className="w-full h-full object-cover rounded-md"
              src={posterUrl}
              alt={movie.title}
            />
          </div>

          {/* Fiche d'information du film */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-white text-4xl font-bold">{movie.title}</h1>

            <span className="text-pink-500 text-xs font-bold tracking-widest flex items-center gap-1">
              <p className="text-white">Acteurs: </p>
              <p className="text-md">{actorsSummary}</p>
            </span>

            <p className="text-gray-200 text-sm w-80 wrap-break-word">
              {releaseYear} | {genresList} | {runtimeText} | &#11088; {ratingText}/10
            </p>

            <p className="text-gray-200 text-sm w-80 wrap-break-word">
              {movie.overview}
            </p>

            <h2 className="text-2xl text-white font-bold inline-block align-middle mt-2">
              Casting Principal
            </h2>

            {/* Rendu dynamique des photos et noms d'acteurs depuis TMDB */}
            <div className="flex gap-4 w-full overflow-x-auto py-2">
              {topCast.map((actor) => {
                const avatarUrl = actor.profile_path
                  ? `${TMDB_AVATAR_BASE}${actor.profile_path}`
                  : '/placeholder-avatar.jpg';

                return (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center justify-center gap-1 min-w-[75px]"
                  >
                    <Avatar picture={avatarUrl} width={70} height={70} />
                    <p className="text-xs font-semibold text-white text-center line-clamp-1 w-20">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-gray-300 text-center line-clamp-1 w-20">
                      {actor.character}
                    </p>
                  </div>
                );
              })}
            </div>

            <MovieStepper />

            <BtnNeon
              width={250}
              title="Voir la Bande d'annonce"
              onClick={() => {
                // Logique pour ouvrir le trailer YouTube TMDB
              }}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}