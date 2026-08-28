import type { Movie } from '../models/Movie';

import SalaCine from '../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg'

export const MovieCard = ({ movie, handleOpen }: { movie: Movie, handleOpen:() => void }) => {

    return (
       
        <div 
        className="w-full h-70 m-1 p-2  rounded-xl cursor-pointer flex flex-col
        hover:border-3 hover:border-pink-800 hover:scale-105 transition-all duration-300
        shadow-[0_2px_8px] shadow-black/70 hover:shadow-[0_2px_12px] hover:shadow-pink-700/50" 
        onClick={handleOpen}>
            <img
                src={SalaCine}
                alt={movie.Title}
                className="w-full h-3/4 object-cover rounded-lg"
            />
            <div className="w-full  flex flex-col items-start justify-center  bg-gray-950/0  text-sm font-semibold " >
                <p className="text-white">{movie.Title}</p>
                <p className="text-gray-400">{movie.Year}</p>
            </div>
        </div>
    
    )
}
