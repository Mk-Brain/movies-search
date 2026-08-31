import { useEffect, useState } from "react";
import type { URLParams } from "../models/urlParams";
import type { Movie } from "../models/Movie";
import axios from "axios";

const key = import.meta.env.VITE_OMDB_API_KEY;

export function useMovie(params: URLParams | undefined) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?apikey=${key}&t=${params?.t}&plot=${params?.plot}&r=${params?.r}`)
      .then((response) => {
        setMovies(response.data.Search || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      }).finally(()=>{
        setLoading(false);
      })

    return () => {
      
    };
  }, [params?.plot, params?.r, params?.t, params?.type]);
  return {movies, loading, error};
}