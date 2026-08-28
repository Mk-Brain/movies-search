import { useState, useEffect, useRef } from "react";
import SalaCine from '../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg'
import { BtnNeon } from "./BtnNeon";
type Movie = {
    title: string;
    badge: string;
    image: string;
};

const movies: Movie[] = [
    { title: "CinéExplorer", badge: "DUNG. DART TIAD", image: "/images/hero-1.jpg" },
    { title: "Oppenheimer", badge: "NOUVEAUTÉ", image: "/images/hero-2.jpg" },
    { title: "Dune Part Two", badge: "TENDANCE", image: "/images/hero-3.jpg" },
];

export const Hero = () => {
    const [current, setCurrent] = useState(0);
    // Durée de l'effet Ken Burns en secondes, pilotée par le slider (min 4s, max 20s)
    const [duration, setDuration] = useState(10);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Passage automatique au slide suivant, calé sur la durée du Ken Burns
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, duration * 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [duration]);

    const movie = movies[current];

    return (
        <section className="relative w-full h-screen overflow-hidden  flex items-center">
            {/* Image de fond avec zoom lent (Ken Burns) */}
            <div
                key={current} // force le remount => l'animation redémarre à chaque slide
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${SalaCine})`,
                    animation: `ken-burns ${duration}s ease-out forwards`,
                }}
            />

            {/* Voile sombre pour la lisibilité du texte */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 to-60%"></div>
            {/* Contenu texte */}
            <div className='absolute w-screen h-screen z-20 p-16 flex flex-col items-center'>
                <h1 className='text-6xl text-white my-auto font-bold text-shadow-[0_0_5px,0_0_10px,0_0_15px] text-shadow-pink-600/50 mt-40'>CinéExplorer</h1>
                <div className='w-full text-white flex flex-col gap-2'>
                    <span className="text-pink-500 text-xs font-bold tracking-widest">
                        {movie.badge}
                    </span>
                    <h1 className="text-white text-4xl font-bold ">{movie.title}</h1>
                    <p className='text-gray-200 text-sm w-80 wrap-break-word'>detmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmails</p>
                    <p className='text-gray-200 text-sm w-80 wrap-break-word'>descmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmription</p>
                    <BtnNeon width={160} title='Voir les détails' />
                </div>
            </div>

            {/* Slider vertical de vitesse, à droite */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
                <input
                    type="range"
                    min={4}
                    max={20}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="h-32 accent-pink-600"
                    style={{ writingMode: "vertical-lr", direction: "rtl" }}
                />
                <span className="text-white/70 text-[10px] text-center max-w-[80px]">
                    Sliding animation sequence
                </span>
            </div>

            {/* Indicateurs de slides */}
            <div className="absolute bottom-4 left-10 z-10 flex gap-2">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-pink-600" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};
