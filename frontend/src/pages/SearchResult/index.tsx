
import { SearchBar } from '../../components/SearchBar'
import { MovieGrid } from '../../components/MovieGrid'



const SearchResultPage = () => {
  
  
  return (
    <div className='pt-16 bg-[#111111] w-screen min-h-screen px-15 flex flex-col items-center justify-start gap-3'>
      <SearchBar/>
      <MovieGrid/>
    </div>
  )
}

export default SearchResultPage