import React from 'react';

const Contactanos = () => {
    // Reemplazá este número por el oficial de la radio
    const numeroWhatsApp = "5493810000000"; 

    return (
        <div className="w-full min-h-[75vh] flex flex-col justify-center bg-neutral-950 pt-5 pb-16 md:pt-5 md:pb-24 border-b border-neutral-900">
            <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
                
                {/* Etiqueta superior */}
                <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-6 flex items-center justify-center gap-3">
                    <span className="w-8 h-0.5 bg-red-600"></span>
                    Contacto
                    <span className="w-8 h-0.5 bg-red-600"></span>
                </span>
                
                {/* Título Principal */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
                    Estemos en <br className="hidden md:block"/> contacto.
                </h2>
                
                {/* Texto descriptivo */}
                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                    ¿Querés hacer crecer tu marca anunciando con nosotros, pedir tu tema favorito o mandar un saludo al aire? Escribinos directo a nuestro WhatsApp.
                </p>

                {/* Botón Único y Gigante de WhatsApp */}
                <div className="flex justify-center">
                    <a 
                        href={`https://wa.me/${numeroWhatsApp}?text=Hola!%20Me%20comunico%20desde%20la%20p%C3%A1gina%20web%20de%20la%20radio.`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-4 bg-red-600 hover:bg-red-500 text-white font-bold text-lg md:text-xl py-5 px-10 rounded-2xl shadow-2xl shadow-red-600/20 transition-all hover:scale-105 active:scale-95 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300">
                            <path fillRule="evenodd" d="M12 2c5.523 0 10 4.477 10 10a9.962 9.962 0 0 1-1.638 5.485l1.096 4.02-4.108-1.077A9.96 9.96 0 0 1 12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2zm0 1.615c-4.632 0-8.385 3.753-8.385 8.385 0 1.63.468 3.208 1.344 4.542l-.578 2.122 2.18-.571a8.356 8.356 0 0 0 5.439 1.907c4.632 0 8.385-3.753 8.385-8.385S16.632 3.615 12 3.615zm3.896 11.583c-.214.606-1.238 1.157-1.722 1.206-.443.045-1.01-.065-3.082-.924-2.493-1.034-4.08-3.57-4.205-3.738-.124-.168-1.004-1.336-1.004-2.545 0-1.21.624-1.807.848-2.036.223-.23.483-.287.644-.287.161 0 .323.003.46.009.146.007.34-.058.53.407.243.593.702 1.714.764 1.838.061.125.103.27.02.435-.08.165-.123.268-.246.413-.122.144-.262.316-.372.418-.122.115-.25.241-.112.48.138.238.614 1.014 1.32 1.642.915.814 1.683 1.066 1.921 1.181.238.115.378.096.52-.068.141-.165.613-.715.774-.96.161-.246.323-.205.545-.121.222.084 1.408.665 1.65.786.242.12.404.181.465.281.061.1.061.579-.153 1.185z" clipRule="evenodd" />
                        </svg>
                        Escribinos a WhatsApp
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Contactanos;