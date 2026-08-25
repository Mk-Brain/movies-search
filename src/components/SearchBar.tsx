import React, { useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const SearchBar = () => {
    const [searchValue,setSearchValue] = useState<string>("")
  return (
    <form
        action=""
        className="my-4 p-3 items-center rounded-xl  bg-gray-900 justify-start flex flex-row gap-2 w-1/2 h-12 shadow-md shadow-black/50"
      >
        <SearchOutlinedIcon color="primary" fontSize="small" />
        <input
          name="search"
          className="appearance-none bg-transparent border-none outline-none focus:outline-none flex w-full text-white px-2 "
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
