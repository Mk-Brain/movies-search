import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface AppState {
  isOnline: boolean
  loading: boolean
  error: string | null
}

const initialState: AppState = {
  isOnline: false,
  loading: false,
  error: null,
}

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setIsOnline, setLoading, setError } = appStateSlice.actions

export default appStateSlice.reducer