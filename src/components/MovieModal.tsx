import React, { useRef } from 'react';



export function MovieModal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  //gestion de l'ouverture et de la fermeture du dialog
  React.useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      // showModal() active l'affichage natif au-dessus de tout
      if (!dialogElement.open) {
        dialogElement.showModal();
      }
    } else {

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
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose} // Déclenché nativement si l'utilisateur appuie sur Échap
      onClick={handleBackdropClick}
      className="w-[90vw] max-w-[480px] max-h-[90vh] rounded-lg mx-auto my-4 overflow-hidden border-0 p-0"
    >
      <div
        className="flex h-full max-h-[90vh] flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 bg-gray-950/90 text-gray-100 font-bold text-lg flex justify-between items-center p-2">
          <h2>{title}</h2>
          <button
            type="button"
            onClick={handleCloseClick}
            className="rounded p-1 text-xl hover:bg-white/10"
            aria-label="Fermer la boîte de dialogue"
          >
        
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </dialog>
  );
}