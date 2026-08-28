import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/Home'
import SearchResultPage from './pages/SearchResult'
import ErrorPage from './pages/ErrorPage'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<SearchResultPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
