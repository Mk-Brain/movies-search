import type { Movie } from "../models/Movie";
import { TMDB_POSTER_BASE } from "./globalVar";






// 1. Obtenir l'URL complète d'une image (affiches ou casting)
export const getTmdbImageUrl = (
  path: string | null, 
  size: 'w342' | 'w500' | 'w1280' | 'original' = 'w500'
): string => {
  if (!path) return '/placeholder-movie.png';
  return `${TMDB_POSTER_BASE}${size}${path}`;
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

// Formater un montant brut en devises (ex: 165000000 -> 165 000 000 $)
export const formatCurrency = (amount: number) => {
  if (!amount || amount === 0) return 'N/A';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

// Extraire des membres clés de l'équipe technique
export const getCrewMember = (crew: Array<{ job: string; name: string }>, jobTitle: string) => {
  return crew?.find((member) => member.job === jobTitle)?.name || 'N/A';
};