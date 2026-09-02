
import SalaCine from '../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg';
import type { Movie } from '../models/Movie';
import { TMDB_POSTER_BASE } from '../utils/globalVar';


export const MovieCard = ({
    movie,
    handleOpen,
}: {
    movie: Movie;
    handleOpen: () => void;
}) => {
    // Construction de l'URL de l'image avec fallback sur l'image locale
    const posterUrl = movie?.poster_path
        ? `${TMDB_POSTER_BASE}${movie.poster_path}`
        : SalaCine;

    // Extraction de l'année depuis la date de sortie (ex: "2024-05-15" -> "2024")
    const releaseYear = movie?.release_date ? movie.release_date.split('-')[0] : '';

    return (
        <div
            className="w-full h-70 m-1 p-2 rounded-xl cursor-pointer flex flex-col
            hover:border-3 hover:border-pink-800 hover:scale-105 transition-all duration-300
            shadow-[0_2px_8px] shadow-black/70 hover:shadow-[0_2px_12px] hover:shadow-pink-700/50"
            onClick={handleOpen}
        >
            <img
                src={posterUrl}
                alt={movie?.title || 'Film'}
                className="w-full h-3/4 object-cover rounded-lg"
            />
            <div className="w-full flex flex-col items-start justify-center bg-gray-950/0 text-sm font-semibold mt-2">
                {/* Addition de truncate pour éviter que les titres longs ne déforment la carte */}
                <p className="text-white truncate w-full">{movie?.title}</p>
                <p className="text-gray-400">{releaseYear}</p>
            </div>
        </div>
    );
};