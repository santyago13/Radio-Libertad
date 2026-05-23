import React, { useState, useRef } from 'react';
import Reveal from './shared/Reveal'; 

const Reproductor = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);
    const streamUrl = "https://streaming.escuchanosonline.com:7307/;";

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            audio.removeAttribute('src'); 
            audio.load();
            setIsPlaying(false);
        } else {
            audio.src = streamUrl;
            audio.load();
            
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.error("El navegador bloqueó el audio:", error);
                    setIsPlaying(false);
                });
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="w-full border-t border-neutral-800/50 bg-neutral-900/40 relative z-60">
            {/* Animación CSS para el ecualizador */}
            <style>
                {`
                    @keyframes eq {
                        0% { height: 3px; }
                        50% { height: 12px; }
                        100% { height: 3px; }
                    }
                    .bar-eq {
                        width: 3px;
                        background-color: #ef4444; 
                        border-radius: 2px;
                        animation: eq 1s ease-in-out infinite;
                    }
                    .bar-eq:nth-child(1) { animation-duration: 0.7s; }
                    .bar-eq:nth-child(2) { animation-duration: 1.1s; }
                    .bar-eq:nth-child(3) { animation-duration: 0.9s; }
                    .bar-eq:nth-child(4) { animation-duration: 1.3s; }
                `}
            </style>

            {/* Ocultamos el audio explícitamente para que Safari/Chrome no lo rendericen como un bloque invisible */}
            <audio ref={audioRef} className="hidden" preload="none" playsInline />
            
            <Reveal animation="fade-in-up" className="max-w-7xl mx-auto w-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
                
                {/* SECCIÓN IZQUIERDA: Ajustada con min-w-0 para que no aplaste al botón en celulares chicos */}
                <div className="flex flex-col text-left flex-1 min-w-0 pr-2 md:w-1/3">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-none truncate">
                            Radio Libertad <span className="text-neutral-500 font-normal ml-1">103.1 FM</span>
                        </h3>
                        <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium uppercase tracking-widest leading-none truncate">
                            Estudio Toufick Massa
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1.5 h-4">
                        {isPlaying ? (
                            <span className="flex items-center gap-1.5 text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">
                                <div className="flex items-end gap-0.5 h-3 mr-1">
                                    <div className="bar-eq"></div>
                                    <div className="bar-eq"></div>
                                    <div className="bar-eq"></div>
                                    <div className="bar-eq"></div>
                                </div>
                                En Vivo
                            </span>
                        ) : (
                            <span className="text-neutral-500 text-[10px] md:text-xs font-medium uppercase tracking-widest leading-none">
                                Pausado
                            </span>
                        )}
                    </div>
                </div>

                {/* CENTRO: Botón Play blindado (shrink-0 asegura que mantenga su tamaño, z-50 lo pone por encima de todo) */}
                <div className="flex justify-end md:justify-center shrink-0 w-14 md:flex-none md:w-1/3 pr-1 md:pr-0">
                    <button 
                        onClick={togglePlay} 
                        className="btn btn-circle btn-error border-none min-h-0 h-11 w-11 md:h-12 md:w-12 text-white shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-90 active:bg-red-700 pointer-events-auto relative z-99"
                        aria-label={isPlaying ? "Pausar Radio" : "Escuchar en Vivo"}
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="solid" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
                        )}
                    </button>
                </div>

                {/* DERECHA: Control de Volumen */}
                <div className="hidden md:flex items-center justify-end gap-3 w-1/3 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-400 group-hover:text-neutral-200 transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={volume} 
                        onChange={handleVolumeChange} 
                        className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all" 
                    />
                </div>
            </Reveal>
        </div>
    );
};

export default Reproductor;