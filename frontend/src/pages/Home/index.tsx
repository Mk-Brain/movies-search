import { useDispatch } from "react-redux"
import { Hero } from "../../components/Caroussel"

import { usePopularMovie } from "../../hooks/usePopularMovie"
import { useEffect } from "react"
import { setError, setLoading } from "../../slice/appStateSlice"
import { savePopularMovies } from "../../slice/movieSlice"

const HomePage = () => {
  const { movies, loading, error } = usePopularMovie()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(loading))

    dispatch(setError(error))

    dispatch(savePopularMovies(movies))
  }, [loading, error, dispatch, movies])
  return (
    <div>
      <Hero />
    </div>
  )
}

export default HomePage