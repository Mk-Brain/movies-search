import React, { useEffect, useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import type { URLParams } from '../models/urlParams';
import { useMovie } from '../hooks/useMovie';
import { useDispatch } from 'react-redux';
import { setError, setLoading } from '../slice/appStateSlice';
import { saveSearchResults } from '../slice/movieSlice';


export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selected, setSelected] = useState(false)
  const [params, setParams] = useState<URLParams>({
    't': '',
    'plot': 'full',
    'r': 'json',
    i: null,
    type: null,
    y: null
  })
  const { movies, loading, error } = useMovie(params)
  function handleClick() {
    const p: URLParams = {
      't': searchValue,
      'plot': 'full',
      'r': 'json',
      i: null,
      type: null,
      y: null
    }

    setParams(p)



  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    handleClick();
    e.target.querySelector('input')!.blur();

  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(loading))

    dispatch(setError(error))

    dispatch(saveSearchResults(movies))
  }, [loading, error, dispatch, movies])

  const activeStyle = selected ? "border-2 border-pink-800 shadow-[0_2px_12px] shadow-pink-700/50" : "border border-white"
  return (
    <form
      action=""
      onSubmit={(e) => handleSubmit(e)}
      className={`my-4 p-3 items-center rounded-full  bg-white/10 backdrop-blur-2xl justify-start flex flex-row gap-2 w-1/2 h-12 ${activeStyle}`}
    >
      <SearchOutlinedIcon className='text-white' fontSize="small" />
      <input
        onFocus={() => {
          setSelected(true)
        }}
        onBlur={() => {
          setSelected(false)
        }}
        type="search"
        enterKeyHint="search"
        name="search"
        className="appearance-none bg-transparent border-none outline-none focus:outline-none flex w-full text-white px-2 
        "
        placeholder="Rechercher un pays"
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          setSearchValue(e.target.value);
        }}
      />
    </form>

  )
}

//TODO: ajouter un outlet pour l'affichage des résultats de recherche
