import React from "react";

// Acá podés poner las URLs de las imágenes de los logos reales de tus auspiciantes.
const sponsors = [
  { id: 1, nombre: "Auspiciante Local" },
  { id: 2, nombre: "Comercio Amigo" },
  { id: 3, nombre: "Marca Tucumana" },
  { id: 4, nombre: "Negocio Central" },
  { id: 5, nombre: "Sponsor VIP" },
  { id: 6, nombre: "Empresa del Valle" },
];

const Logos = () => {
  return (
    <div className="w-full bg-neutral-950 py-12 border-b border-neutral-900 overflow-hidden relative flex flex-col items-center">
      <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center">
        Acompañan a Radio Libertad
      </p>

      <style>
        {`
                    @keyframes scrollInfinito {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animacion-carrusel {
                        animation: scrollInfinito 20s linear infinite;
                        width: max-content;
                    }
                `}
      </style>

      <div className="relative w-full max-w-7xl mx-auto flex">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-neutral-950 to-transparent z-10"></div>

        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-neutral-950 to-transparent z-10"></div>

        <div className="animacion-carrusel flex items-center">
          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {sponsors.map((sponsor) => (
              <div
                key={`primera-${sponsor.id}`}
                className="flex items-center justify-center whitespace-nowrap text-xl md:text-2xl font-black tracking-tighter text-neutral-600 hover:text-neutral-300 transition-colors cursor-default"
              >
                {sponsor.nombre}
              </div>
            ))}
          </div>

          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {sponsors.map((sponsor) => (
              <div
                key={`segunda-${sponsor.id}`}
                className="flex items-center justify-center whitespace-nowrap text-xl md:text-2xl font-black tracking-tighter text-neutral-600 hover:text-neutral-300 transition-colors cursor-default"
              >
                {sponsor.nombre}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
