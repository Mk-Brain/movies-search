import React, { useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selected, setSelected] = useState(false)
  const activeStyle = selected ? "border-2 border-pink-800 shadow-[0_2px_12px] shadow-pink-700/50" : "border border-white"
  return (
    <form
      action=""
      className={`my-4 p-3 items-center rounded-full  bg-white/10 backdrop-blur-2xl justify-start flex flex-row gap-2 w-1/2 h-12 ${activeStyle}`}
    >
      <SearchOutlinedIcon className='text-white' fontSize="small" />
      <input
        onFocus={()=>{
          setSelected(true)
        }}
        onBlur={()=>{
          setSelected(false)
        }}
      
        name="search"
        className="appearance-none bg-transparent border-none outline-none focus:outline-none flex w-full text-white px-2 
        "
        type="text"
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
