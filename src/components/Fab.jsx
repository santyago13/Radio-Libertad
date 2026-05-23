import React from 'react';

const Fab = () => {
    // Datos oficiales de la radio corregidos
    const numeroWhatsApp = "5493815317139";
    const mensajeWeb = encodeURIComponent("¡Hola Radio Libertad! Me comunico desde la página web.");

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center group">
            
            {/* ENLACE DIRECTO DE WHATSAPP CON ESTILO RADIO INTERACTIVO */}
            <a 
                href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWeb}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white rounded-full p-3 md:p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden"
            >
                {/* Contenedor del ícono con el pulso rojo de "Al Aire" */}
                <div className="relative flex items-center justify-center bg-red-600 text-white p-2.5 rounded-full shadow-md shadow-red-600/20 group-hover:bg-red-500 transition-colors duration-300">
                    {/* El puntito parpadeante por detrás */}
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25 group-hover:opacity-40"></span>
                    
                    {/* Ícono de WhatsApp Blanco Estilizado */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:rotate-12"
                    >
                        <path d="M12.012 2C6.484 2 2 6.484 2 12.012c0 1.76.452 3.447 1.309 4.957L2 22l5.195-1.36a9.962 9.962 0 0 0 4.817 1.24h.003c5.526 0 10.012-4.484 10.012-10.01C22.027 6.484 17.54 2 12.012 2zM12.015 20.198c-1.492 0-2.957-.402-4.24-1.162l-.303-.18-3.155.826.842-3.076-.197-.315a8.318 8.318 0 0 1-1.272-4.468c0-4.606 3.748-8.354 8.354-8.354 4.608 0 8.356 3.748 8.356 8.354 0 4.607-3.748 8.356-8.354 8.356zm4.582-6.262c-.251-.126-1.488-.736-1.718-.82-.23-.085-.398-.126-.566.126-.168.252-.647.82-.793.988-.147.168-.293.188-.544.062-.252-.125-1.061-.39-2.022-1.25-.747-.668-1.252-1.494-1.4-1.745-.146-.252-.016-.388.11-.513.113-.113.251-.294.377-.44.126-.147.168-.25.251-.418.084-.168.042-.315-.021-.44-.063-.126-.566-1.365-.775-1.87-.204-.492-.41-.424-.566-.432-.146-.008-.314-.008-.482-.008s-.44.063-.67.315c-.23.252-.88.86-.88 2.096s.901 2.43 1.026 2.6c.126.167 1.772 2.705 4.291 3.792.6.258 1.068.412 1.433.527.603.191 1.152.164 1.586.1.487-.072 1.488-.609 1.698-1.196.21-.588.21-1.092.147-1.196-.063-.105-.23-.168-.482-.294z"/>
                    </svg>
                </div>

                {/* Texto dinámico que se despliega sutilmente en hover */}
                {/* En móvil se mantiene oculto para no estorbar y en pantallas grandes se expande de forma muy pro */}
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-white font-bold text-sm tracking-wide transition-all duration-300 ease-out group-hover:max-w-xs group-hover:ml-3 group-hover:mr-2">
                    Escribinos
                </span>
            </a>

        </div>
    );
};

export default Fab;