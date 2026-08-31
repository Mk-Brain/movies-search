import { useDispatch } from "react-redux"
import { Hero } from "../../components/Caroussel"

import { usePopularMovie } from "../../hooks/usePopularMovie"
import { useEffect } from "react"
import { setError, setLoading } from "../../slice/appStateSlice"
import { savePopularMovies } from "../../slice/movieSlice"
import { useOnlineStatus } from "../../hooks/useOnlineStatus"
import { Navigate } from "react-router"

const HomePage = () => {
  const { movies, loading, error } = usePopularMovie()
  const isOnline = useOnlineStatus()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(loading))

    dispatch(setError(error))

    dispatch(savePopularMovies(movies))
  }, [loading, error, dispatch, movies])

  if (!isOnline)
    return <Navigate to={'*'}/>
  return (
    <div>
      <Hero />
    </div>
  )
}

export default HomePage