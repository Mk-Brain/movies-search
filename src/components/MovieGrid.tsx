import { MovieCard } from './MovieCard'
import type { Movie } from '../models/Movie';
import { useState } from 'react';
import { MovieModal } from './MovieModal';

const  movies: Movie[] = [
  {
    Title: "The Shawshank Redemption",
    Year: "1994",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "142 min",
    Genre: "Drama",
    Director: "Frank Darabont",
    Writer: "Stephen King (short story), Frank Darabont (screenplay)",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Language: "English",
    Country: "United States",
    Awards: "Won 1 Oscar. 23 wins & 47 nominations total",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjQ0MzQ1YjctZDQxZC00YzI3LWEwMmItYzU5ZGJkN2E1Y2UyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.3/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "99%"
      },
      {
        Source: "Metacritic",
        Value: "91/100"
      }
    ],
    Metascore: "91",
    imdbRating: "9.3",
    imdbVotes: "2,886,478",
    imdbID: "tt0111161",
    Type: "movie",
    DVD: "25 Aug 1998",
    BoxOffice: "$16,000,000",
    Production: "Columbia Pictures",
    Website: "http://www.shawshankredemption.com/",
    Response: "True"
  },
   {
    Title: "The Shawshank Redemption",
    Year: "1994",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "142 min",
    Genre: "Drama",
    Director: "Frank Darabont",
    Writer: "Stephen King (short story), Frank Darabont (screenplay)",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Language: "English",
    Country: "United States",
    Awards: "Won 1 Oscar. 23 wins & 47 nominations total",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjQ0MzQ1YjctZDQxZC00YzI3LWEwMmItYzU5ZGJkN2E1Y2UyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.3/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "99%"
      },
      {
        Source: "Metacritic",
        Value: "91/100"
      }
    ],
    Metascore: "91",
    imdbRating: "9.3",
    imdbVotes: "2,886,478",
    imdbID: "tt0111161",
    Type: "movie",
    DVD: "25 Aug 1998",
    BoxOffice: "$16,000,000",
    Production: "Columbia Pictures",
    Website: "http://www.shawshankredemption.com/",
    Response: "True"
  },
   {
    Title: "The Shawshank Redemption",
    Year: "1994",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "142 min",
    Genre: "Drama",
    Director: "Frank Darabont",
    Writer: "Stephen King (short story), Frank Darabont (screenplay)",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Language: "English",
    Country: "United States",
    Awards: "Won 1 Oscar. 23 wins & 47 nominations total",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjQ0MzQ1YjctZDQxZC00YzI3LWEwMmItYzU5ZGJkN2E1Y2UyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.3/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "99%"
      },
      {
        Source: "Metacritic",
        Value: "91/100"
      }
    ],
    Metascore: "91",
    imdbRating: "9.3",
    imdbVotes: "2,886,478",
    imdbID: "tt0111161",
    Type: "movie",
    DVD: "25 Aug 1998",
    BoxOffice: "$16,000,000",
    Production: "Columbia Pictures",
    Website: "http://www.shawshankredemption.com/",
    Response: "True"
  },
];

export const MovieGrid = () => {
  const [movie, setMovie] = useState<Movie | null>(null)

  const [isOpen, setIsOpen] = useState(false);
  
    //ouverture et fermeture du dialog
    const handleOpen = () => {
        setIsOpen(true);
        console.log(isOpen);
        
    };

    const handleClose = () => {
        setIsOpen(false);
        console.log("close2");
        console.log(isOpen);
    };
  return (
    <>
    <div className='flex flex-col gap-3'>
      <p className='text-white text-3xl'>Resultats de la recherche pour x</p>
      <div className='grid grid-cols-6 gap-8'>
        {movies.map((movie) => {
          setMovie(movie)
          return (
          <MovieCard key={movie.imdbID} movie={movie} handleOpen={handleOpen}/>
        )
        })}
      </div>
    </div>
    <>
                <MovieModal isOpen={isOpen} onClose={handleClose} movie={movie!}/>
            </>
    </>
  )
}
