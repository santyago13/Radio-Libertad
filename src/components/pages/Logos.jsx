import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from '../shared/Reveal'; 

const Logos = () => {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        // Red de seguridad: si Vercel no inyecta la variable, usamos la URL fija
        const baseUrl = import.meta.env.VITE_API_URL || "https://radio-libertad-back.vercel.app/api";
        
        console.log("DEBUG: La URL que se está usando para el fetch es:", `${baseUrl}/sponsors`);

        fetch(`${baseUrl}/sponsors`)
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status}: No se pudo conectar al servidor`);
                return res.json();
            })
            .then(data => {
                const sponsorsActivos = data.filter(sponsor => sponsor.estado === 'Activo');
                setSponsors(sponsorsActivos);
            })
            .catch(error => console.error("Error al cargar logos:", error));
    }, []);

    if (sponsors.length === 0) return null; 

    const carruselInfinito = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

    const RenderSponsor = ({ sponsor }) => {
        const contenido = sponsor.imagen ? (
            <img 
                src={sponsor.imagen} 
                alt={sponsor.nombre} 
                className="h-22.5 md:h-32.5 w-auto object-contain shrink-0 drop-shadow-lg transition-transform duration-300" 
            />
        ) : (
            <span className="text-3xl md:text-5xl text-neutral-400 font-black tracking-tighter hover:text-white transition-colors duration-300 shrink-0">
                {sponsor.nombre}
            </span>
        );

        if (sponsor.link) {
            return (
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300 shrink-0" title={`Visitar ${sponsor.nombre}`}>
                    {contenido}
                </a>
            );
        }

        return <div className="cursor-default shrink-0">{contenido}</div>;
    };

    return (
        <div className="w-full bg-neutral-950 py-16 border-b border-neutral-900 overflow-hidden relative flex flex-col items-center">
            
            <Reveal animation="fade-in-up" delay="100ms">
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-12 text-center">
                    Acompañan a Radio Libertad
                </p>
            </Reveal>

            <style>
                {`
                    @keyframes scrollInfinito {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animacion-carrusel {
                        display: flex;
                        align-items: center;
                        width: max-content;
                        animation: scrollInfinito 40s linear infinite;
                    }
                `}
            </style>

            <Reveal animation="fade-in-up" delay="300ms" className="relative w-full flex">
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-linear-to-r from-neutral-950 to-neutral-950/0 z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-linear-to-l from-neutral-950 to-neutral-950/0 z-10 pointer-events-none"></div>

                <div className="animacion-carrusel gap-20 md:gap-37.5 pr-20 md:pr-37.5">
                    {carruselInfinito.map((sponsor, index) => (
                        <div key={`${sponsor._id}-${index}`} className="flex items-center justify-center whitespace-nowrap shrink-0">
                            <RenderSponsor sponsor={sponsor} />
                        </div>
                    ))}
                </div>
            </Reveal>
        </div>
    );
};

export default Logos;