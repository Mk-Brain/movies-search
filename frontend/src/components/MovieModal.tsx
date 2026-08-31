import React, { useRef } from 'react';
import type { Movie } from '../models/Movie';
import SalaCine from '../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg'
import { Avatar } from './Avatar';
import MovieStepper from './Stepper';
import { BtnNeon } from './BtnNeon';

import CancelIcon from '@mui/icons-material/Cancel'


export function MovieModal({ isOpen, onClose,  movie }: { isOpen: boolean, onClose: () => void, movie: Movie }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  console.log(isOpen);
  
  //gestion de l'ouverture et de la fermeture du dialog
  React.useEffect(() => {
    console.log("close 4");
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      // showModal() active l'affichage natif au-dessus de tout
      if (!dialogElement.open) {
        dialogElement.showModal();
      }
    } else {
      console.log("close");
      dialogElement.close();

    }
  }, [isOpen]);

  // Permet de fermer si l'utilisateur clique en dehors de la boîte 
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      e.stopPropagation();
      onClose();
    }
  };

  // Permet de fermer si l'utilisateur clique sur le bouton de fermeture
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("close 1");
    onClose();
  };
  console.log(">>>>>>>>XX" + isOpen);
  
  return (
    <dialog
      ref={dialogRef}
      onClose={onClose} // Déclenché nativement si l'utilisateur appuie sur Échap
      onClick={handleBackdropClick}
      className="top-0 z-50 w-screen h-screen bg-transparent backdrop-blur-xs hidden open:flex items-center justify-center m-0"
    >
      <div
        className="flex flex-col w-[60vw] h-[80vh] rounded-xl
        overflow-hidden pb-3 border border-white bg-white/30 backdrop-blur-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 bg-transparent flex items-end pt-1 pr-2">
          <button
            type="button"
            onClick={handleCloseClick}
            className="rounded  text-xl text-white/55 flex justify-end w-full"
            aria-label="Fermer la boîte de dialogue"
          >
            <CancelIcon/>
          </button>
        </div>
        <div className="flex gap-6 overflow-y-auto px-4 h-full ">
          <div className='flex flex-col w-3/7 h-3/4  ' >
            <img className='w-full h-full object-cover rounded-md' src={movie?.Poster} alt="" />
          </div>
          <div className='flex-1 gap-3'>
             <h1 className="text-white text-4xl font-bold ">{movie?.Title}</h1>
                    <span className="text-pink-500 text-xs font-bold tracking-widest flex">
                       <p className="text-white">Actors: </p><p className="text-md"> {movie?.Actors}</p>
                    </span>
                    <p className='text-gray-200 text-sm w-80 wrap-break-word'>{movie?.Year} | {movie?.Genre} | {movie?.Runtime} | &#11088; {movie?.imdbRating}/10</p>
                    <p className='text-gray-200 text-sm w-80 wrap-break-word'>{movie?.Plot}</p>
            <h2 className='text-2xl text-white font-bold inline-block align-middle'>Casting Principal</h2>
            <div className="flex gap-3 w-full">
              <div className='flex flex-col items-center justify-center gap-2'>
                <Avatar picture={SalaCine} width={70} height={70}/>
                <p className='text-xs font-semibold text-white'>Name</p>
              </div>
              
            </div>
            <MovieStepper/>
            <BtnNeon width={250} title="Voir la Bande d'annonce" onClick={()=>{

            }}/>
          </div>
        </div>
      </div>
    </dialog>
  );
}