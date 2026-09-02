import type { Movie } from "../models/Movie";
import { IMAGE_BASE_URL } from "./globalVar";





// 1. Obtenir l'URL complète d'une image (affiches ou casting)
export const getTmdbImageUrl = (
  path: string | null, 
  size: 'w342' | 'w500' | 'w1280' | 'original' = 'w500'
): string => {
  if (!path) return '/placeholder-movie.png';
  return `${IMAGE_BASE_URL}${size}${path}`;
};

// 2. Extraire le nom du réalisateur
export const getDirectorName = (movie: Movie): string => {
  const director = movie.credits?.crew?.find((member) => member.job === 'Director');
  return director ? director.name : 'Non spécifié';
};

// 3. Formater la durée en heures et minutes (ex: 135 min -> 2h 15m)
export const formatRuntime = (runtimeMinutes: number | null): string => {
  if (!runtimeMinutes) return 'Durée inconnue';
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};