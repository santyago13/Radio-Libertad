import React, { useState, useEffect } from "react";

const Logos = () => {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/sponsors')
            .then(res => res.json())
            .then(data => {
                const sponsorsActivos = data.filter(sponsor => sponsor.estado === 'Activo');
                setSponsors(sponsorsActivos);
            })
            .catch(error => console.error("Error al cargar logos:", error));
    }, []);

    if (sponsors.length === 0) return null; 

    // Multiplicamos la lista de sponsors por 4. 
    // Esto garantiza que el tren sea larguísimo y cubra hasta monitores 4K.
    // Al trasladar el -50% en CSS, el salto será matemáticamente indetectable.
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
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-12 text-center">
                Acompañan a Radio Libertad
            </p>

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
                        /* Podés cambiar el 40s si querés que vaya más rápido o más lento */
                        animation: scrollInfinito 40s linear infinite;
                    }
                `}
            </style>

            <div className="relative w-full flex">
                
                {/* Sombras laterales */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-linear-to-r from-neutral-950 to-neutral-950/0 z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-linear-to-l from-neutral-950 to-neutral-950/0 z-10 pointer-events-none"></div>

                {/* ACÁ ESTÁ LA MAGIA: 
                    El gap (espacio entre logos) y el pr (padding al final) SON EXACTAMENTE IGUALES.
                    Esto hace que la matemática del translateX(-50%) encaje a la perfección. 
                */}
                <div className="animacion-carrusel gap-20 md:gap-37.5 pr-20 md:pr-37.5">
                    
                    {carruselInfinito.map((sponsor, index) => (
                        <div key={`${sponsor._id}-${index}`} className="flex items-center justify-center whitespace-nowrap shrink-0">
                            <RenderSponsor sponsor={sponsor} />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default Logos;