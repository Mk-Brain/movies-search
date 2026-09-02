import { useEffect, useState } from "react";
import type { Movie } from "../models/Movie";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

export function useMovie(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    axios.get<Movie[]>(`${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`)
      .then((response) => {
        setMovies(response.data || []);
      })
      .catch((error) => {
        setError(error.message);
      }).finally(()=>{
        setLoading(false);
      })

    return () => {
      
    };
  }, [query]);
  return {movies, loading, error};
}