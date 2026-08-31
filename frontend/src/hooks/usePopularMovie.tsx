import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie } from '../models/Movie';



const API_BASE_URL = import.meta.env.BACKEND_URL || 'http://localhost:8000';

export function usePopularMovie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = `${API_BASE_URL}/movies/popular`;

        axios.get<Movie[]>(url)
            .then((response) => {
                setMovies(response.data);
                console.log(response.data);
                
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