import { useEffect, useState } from "react";
import type { Movie } from "../models/Movie";
import axios from "axios";
import { useDebounce } from "./useDebounce";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

export function useMovie(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(query, 500);

  useEffect(() => {
    function fetchMovies() {
      if (!debouncedSearch.trim()) {
        setMovies([]);
        return;
      }
      axios.get<Movie[]>(`${API_BASE_URL}/movies/search?query=${encodeURIComponent(debouncedSearch)}`)
        .then((response) => {
          setMovies(response.data || []);
        })
        .catch((error) => {
          setError(error.message);
        }).finally(() => {
          setLoading(false);
        })
    }
    fetchMovies();
    
  }, [debouncedSearch]);
  return { movies, loading, error };
}