import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie } from '../models/Movie';



const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

export function usePopularMovie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = `${API_BASE_URL}/movies/popular`;
        console.log(url);

        axios.get<Movie[]>(url, { headers: { 'Accept': 'application/json' } })
            .then((response) => {
                console.log(response.data);
                setMovies(response.data);
                console.log(">>p>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

            })
            .catch((e) => {
                console.error('Erreur lors de la récupération des films:', e);
                setError('Failed to fetch popular movies');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { movies, loading, error };
}