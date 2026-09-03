import { useState, useEffect, useRef } from "react";
import { BtnNeon } from "./BtnNeon";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import { MovieModal } from "./MovieModal";
import type { Movie } from "../models/Movie";
import { TMDB_POSTER_BASE } from "../utils/globalVar";




export const Hero = () => {
    const movies = useSelector((state: RootState) => state.movies.popularMovies);
    const isLoading = useSelector((state: RootState) => state.appState.loading);
    const [current, setCurrent] = useState(0);
    // État pour stocker le film actuellement sélectionné
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Ouverture de la modale avec enregistrement du film cliqué
  const handleOpen = (movie: Movie | null) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };
      const handleClose = () => setIsOpen(false);
    
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Passage automatique au slide suivant, calé sur la durée du Ken Burns
    useEffect(() => {
        if (!movies || movies.length === 0) return;

        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, 8 * 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [movies]);

    const movie: Movie | null = movies && movies.length > 0 ? movies[current] : null;




    // Formatage des données TMDB
    const backdropUrl = movie?.backdrop_path || movie?.poster_path 
        ? `${TMDB_POSTER_BASE}${movie.backdrop_path || movie.poster_path}` 
        : "/placeholder.jpg";

    const releaseYear = movie?.release_date ? movie.release_date.split("-")[0] : "";
    const genresList = movie?.genres?.map((g) => g.name).join(", ") || "";
    const mainCast = movie?.credits?.cast?.slice(0, 3).map((actor) => actor.name).join(", ") || "N/A";
    const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    if (isLoading) {
        return (
            <section className="w-full h-screen bg-black flex items-center justify-center text-white">
                <p>Chargement des films populaires...</p>
            </section>
        );
    }

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center">
            {/* Image de fond avec zoom lent (Ken Burns) - Priorité au backdrop pour la haute résolution */}
            <div
                key={current} // force le remount => l'animation redémarre à chaque slide
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                    animation: `ken-burns ${8}s ease-out forwards`,
                }}
            />

            {/* Voile sombre pour la lisibilité du texte */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 z-10 bg-linear-to-t from-black to-80%" />

            {/* Contenu texte */}
            <div className="absolute w-screen h-screen z-20 p-16 flex flex-col items-center">
                <h1 className="text-6xl text-white my-auto font-bold text-shadow-[0_0_5px,0_0_10px,0_0_15px] text-shadow-pink-600/50 mt-40">
                    CinéExplorer
                </h1>
                <div className="w-full text-white flex flex-col gap-2">
                    {/* Propriété TMDB: title */}
                    <h1 className="text-white text-4xl font-bold">{movie?.title}</h1>

                    {/* Acteurs depuis credits.cast */}
                    <span className="text-pink-500 text-xs font-bold tracking-widest flex items-center gap-1">
                        <p className="text-white">Acteurs: </p>
                        <p className="text-md">{mainCast}</p>
                    </span>

                    {/* Métadonnées : release_date, genres, runtime, vote_average */}
                    <p className="text-gray-200 text-sm w-xl wrap-break-word">
                        {releaseYear} | {genresList} {movie?.runtime ? `| ${movie?.runtime} min` : ""} | &#11088; {rating}/10
                    </p>

                    {/* Propriété TMDB: overview */}
                    <p className="text-gray-200 text-sm w-96 wrap-break-word line-clamp-3">
                        {movie?.overview}
                    </p>

                    <BtnNeon width={160} title="Voir les détails" onClick={()=>handleOpen(movie)} />
                </div>
            </div>


            {/* Indicateurs de slides */}
            <div className="absolute bottom-4 left-10 z-10 flex gap-2">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            i === current ? "bg-pink-600" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>

            <MovieModal isOpen={isOpen} onClose={handleClose} movie={selectedMovie} />
        </section>
    );
};