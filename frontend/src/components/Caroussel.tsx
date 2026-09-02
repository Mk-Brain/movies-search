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
    // Durée de l'effet Ken Burns en secondes, pilotée par le slider (min 4s, max 20s)
    const [duration, setDuration] = useState(10);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Passage automatique au slide suivant, calé sur la durée du Ken Burns
    useEffect(() => {
        if (!movies || movies.length === 0) return;

        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, duration * 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [duration,  movies.length]);

    const movie: Movie | null = movies && movies.length > 0 ? movies[current] : null;

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

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
                    animation: `ken-burns ${duration}s ease-out forwards`,
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

                    <BtnNeon width={160} title="Voir les détails" onClick={handleOpen} />
                </div>
            </div>

            {/* Slider vertical de vitesse, à droite */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
                <input
                    type="range"
                    min={4}
                    max={20}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="h-32 accent-pink-600"
                    style={{ writingMode: "vertical-lr", direction: "rtl" }}
                />
                <span className="text-white/70 text-[10px] text-center max-w-[80px]">
                    Sliding animation sequence
                </span>
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

            <MovieModal isOpen={isOpen} onClose={handleClose} movie={movie} />
        </section>
    );
};