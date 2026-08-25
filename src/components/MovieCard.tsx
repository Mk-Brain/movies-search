import { useState } from 'react'
import { MovieModal } from './MovieModal';

export const MovieCard = () => {
  const [isOpen, setIsOpen] = useState(false);

    //ouverture et fermeture du dialog
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    


    return (
        <div className="w-1/7 h-30 m-1 border rounded-lg overflow-hidden relative cursor-pointer" onClick={handleOpen}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gray-950/0  text-sm font-semibold hover:bg-gray-950/80 text-transparent hover:text-gray-100 transition-all duration-300 absolute overflow-auto" >
                <p className="text-center ">{}</p>
                <p className="text-center ">{}</p>
                <p className="text-center ">{}</p>
                <p className="text-center ">{}</p>
            </div>

            
            <>
                <MovieModal isOpen={isOpen} onClose={handleClose} title={""} >
                    <div></div>
                </MovieModal>
            </>
        </div>
    )
}
