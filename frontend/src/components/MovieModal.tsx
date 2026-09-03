import React, { useRef } from 'react';
import { Avatar } from './Avatar';
import { BtnNeon } from './BtnNeon';
import CancelIcon from '@mui/icons-material/Cancel';
import type { Movie } from '../models/Movie';
import { TMDB_AVATAR_BASE, TMDB_BACKDROP_BASE, TMDB_POSTER_BASE } from '../utils/globalVar';
import { formatCurrency, getCrewMember } from '../utils/function';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const getMovieTrailer = async (movieId: number): Promise<string | null> => {
  try {
    const response = await axios.get<{ youtube_url: string }>(`${API_BASE_URL}/movies/${movieId}/trailer`);
    console.log(response.data);

    return response.data.youtube_url;
  } catch (error) {
    console.warn("Bande-annonce non disponible:", error);
    return null;
  }
};

export function MovieModal({ isOpen, onClose, movie, }: {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      e.stopPropagation();
      onClose();
    }
  };

  if (!movie) return null;

  // Formatage des données TMDB
  const posterUrl = movie.poster_path
    ? `${TMDB_POSTER_BASE}${movie.poster_path}`
    : '/placeholder.jpg';

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_BACKDROP_BASE}${movie.backdrop_path}`
    : posterUrl;

  console.log("poster", posterUrl);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(movie);

  // 1. Titre original
  const originalTitle = movie.original_title || movie.title;

  // 2. Langue originale (ex: "en" -> "Anglais", "ja" -> "Japonais")
  const originalLanguage = movie.original_language
    ? new Intl.DisplayNames(['fr'], { type: 'language' }).of(movie.original_language)
    : 'Non spécifiée';

  // 3. Pays de production (ex: "United States of America, United Kingdom")
  const productionCountries =
    movie.production_countries?.map((c) => c.name).join(', ') || 'Non spécifié';



  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';
  const genresList = movie.genres?.map((g) => g.name).join(', ') || 'Cinéma';
  const directorName = movie.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Inconnu';

  // Étoiles de notation sur 5
  const ratingValue = movie.vote_average ? Math.round(movie.vote_average / 2) : 4;
  const topCast = movie.credits?.cast?.slice(0, 2) || [];

  // TODO: s'occuper du responsive

  const handleWatchTrailer = async () => {
    if (!movie?.id) return;

    const trailerUrl = await getMovieTrailer(movie.id);
    console.log(trailerUrl);

    if (trailerUrl) {
      // Ouvre la vidéo YouTube dans un nouvel onglet
      window.open(trailerUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("Désolé, aucune bande-annonce n'a été trouvée pour ce film.");
    }
  };
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="fixed inset-0 max-w-none max-h-none m-0 w-screen h-screen z-50  bg-black/50 backdrop-blur-md hidden open:flex items-center justify-center  border-none outline-none"
    >
      <div
        className="relative w-full max-w-4xl bg-white/20 border border-neutral-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl p-6 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton Fermer (X) en haut à droite */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Fermer"
        >
          <CancelIcon fontSize="medium" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* Colonne Gauche : Affiche principale + 3 petites vignettes */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="w-full h-[330px] rounded-xl overflow-hidden border border-neutral-800 shadow-lg">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rangée de 3 vignettes (Aperçus/Stills) */}
            <div className="grid grid-cols-3 gap-2">
              <img
                src={backdropUrl}
                alt="Still 1"
                className="w-full h-14 object-cover rounded-lg border border-neutral-800/80 hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src={posterUrl}
                alt="Still 2"
                className="w-full h-14 object-cover rounded-lg border border-neutral-800/80 hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src={backdropUrl}
                alt="Still 3"
                className="w-full h-14 object-cover rounded-lg border border-neutral-800/80 hover:opacity-80 transition-opacity cursor-pointer"
              />
            </div>
          </div>

          {/* Colonne Droite : Fiche descriptive */}
          <div className="md:col-span-7 flex flex-col gap-3 pr-2">
            {/* Titre (Année) */}
            <h1 className="text-2xl font-bold tracking-wide text-white uppercase">
              {movie.title} ({releaseYear})
            </h1>
            {movie.tagline && (
              <p className="text-pink-400 text-xs italic font-medium -mt-1 mb-1">
                "{movie.tagline}"
              </p>
            )}
            {/* Note en étoiles + Genres + Réalisateur */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>{'★'.repeat(ratingValue)}{'☆'.repeat(5 - ratingValue)}</span>
              <span className="text-gray-400 font-normal">
                | {genresList} | Dir: {directorName}
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-xs text-gray-300 leading-relaxed line-clamp-4">
              {movie.overview || "Aucun résumé disponible pour ce film."}
            </p>
            {/* ... sous le titre principal ... */}
            <div className="flex flex-col gap-1 text-xs text-gray-300 my-1">

              {/* Titre original (s'il est différent du titre fr) */}
              {originalTitle !== movie.title && (
                <p>
                  <span className="text-gray-400">Titre original :</span>{' '}
                  <span className="italic font-medium text-white">{originalTitle}</span>
                </p>
              )}

              {/* Langue originale & Pays de production */}
              <p>
                <span className="text-gray-400">Langue originale :</span>{' '}
                <span className="capitalize font-medium text-white">{originalLanguage}</span>
              </p>

              <p>
                <span className="text-gray-400">Pays de production :</span>{' '}
                <span className="font-medium text-white">{productionCountries}</span>
              </p>
            </div>

            {/* Section Casting Principal */}
            <div className="mt-1">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                CASTING PRINCIPAL
              </h2>
              <div className="flex gap-4">
                {topCast.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center">
                    <Avatar
                      picture={
                        actor.profile_path
                          ? `${TMDB_AVATAR_BASE}${actor.profile_path}`
                          : '/placeholder-avatar.jpg'
                      }
                      width={48}
                      height={48}
                    />
                    <span className="text-[10px] text-gray-200 mt-1 font-medium text-center line-clamp-1 w-16">
                      {actor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800 text-center my-1">
              <div>
                <p className="text-[10px] text-gray-400">Budget</p>
                <p className="text-xs font-semibold text-white">{formatCurrency(movie.budget)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Recettes</p>
                <p className="text-xs font-semibold text-green-400">{formatCurrency(movie.revenue)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Avis</p>
                <p className="text-xs font-semibold text-amber-400">{movie.vote_count?.toLocaleString('fr-FR')} votes</p>
              </div>
            </div>

            <div className="text-xs text-gray-300 flex flex-col gap-1">
              <p><span className="text-gray-400">Scénario :</span> {getCrewMember(movie.credits?.crew, 'Screenplay')}</p>
              <p><span className="text-gray-400">Musique :</span> {getCrewMember(movie.credits?.crew, 'Original Music Composer')}</p>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {movie.production_companies
                  .filter((company) => company.logo_path)
                  .slice(0, 3)
                  .map((company) => (
                    <img
                      key={company.id}
                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                      alt={company.name}
                      className="h-5 object-contain brightness-200 opacity-70 hover:opacity-100 transition-opacity"
                      title={company.name}
                    />
                  ))}
              </div>
            )}

            {/* Bouton Néon Action */}
            <div className="mt-2">
              <BtnNeon
                width={220}
                title="VOIR BANDE-ANNONCE"
                onClick={handleWatchTrailer}
              />
            </div>
          </div>

        </div>
      </div>
    </dialog>
  );
}