import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../models/Movie'

interface MoviesList{
    popularMovies: Movie[],
    resultSearch: Movie[]
}

const initialState: MoviesList = {
    popularMovies: [],
    resultSearch: []
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    savePopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload
    },
    saveSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.resultSearch = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { savePopularMovies, saveSearchResults } = movieSlice.actions

export default movieSlice.reducer