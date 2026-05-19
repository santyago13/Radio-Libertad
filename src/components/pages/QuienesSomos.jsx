import React from 'react';

const QuienesSomos = () => {
    return (
        <div className="w-full bg-neutral-950 pt-35 pb-16 md:pt-40 md:pb-24 border-b border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* -----------------------------------------------------
                    SECCIÓN 1: HISTORIA E IMAGEN
                ------------------------------------------------------ */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 md:mb-32">
                    
                    {/* Columna Izquierda: Textos */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start">
                        <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-3">
                            <span className="w-8 h-0.5 bg-red-600"></span>
                            Nuestra Historia
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
                            La voz de San Pedro <br className="hidden md:block" /> de Colalao.
                        </h2>
                        
                        <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6">
                            Desde nuestros inicios, <strong className="text-white">Radio Libertad 103.1</strong> nació con un propósito claro: ser el puente que une a los vecinos de nuestra villa turística y a todos los tucumanos. No somos solo una frecuencia, somos el latido de la comunidad.
                        </p>
                        <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10">
                            Día a día, trabajamos para llevarte la información más precisa, la actualidad provincial y esa selección musical inconfundible que acompaña tus mañanas, tardes y fines de semana. Nuestro compromiso es con la verdad y con nuestra gente.
                        </p>
                        
                        {/* Estadísticas / Datos rápidos */}
                        <div className="grid grid-cols-2 gap-8 w-full pt-8 border-t border-neutral-800">
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white mb-1">24/7</div>
                                <div className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-widest">Transmisión</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white mb-1">103.1</div>
                                <div className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-widest">Frecuencia</div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Imagen Destacada */}
                    <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                        <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full z-0 pointer-events-none"></div>
                        
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black border border-neutral-800 bg-neutral-900 group">
                            <img 
                                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop" 
                                alt="Estudio de Radio Libertad"
                                className="w-full h-full object-cover aspect-4/3 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6 pt-24">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg tracking-tight">Estudios Centrales</div>
                                        <div className="text-neutral-300 text-sm font-medium">Siempre al aire</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* -----------------------------------------------------
                    SECCIÓN 2: MAPA DE UBICACIÓN
                ------------------------------------------------------ */}
                <div className="w-full bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-10 flex flex-col items-center">
                    
                    <div className="text-center mb-8">
                        <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2 block">
                            Visitanos
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                            Dónde Encontrarnos
                        </h3>
                        <p className="text-neutral-400 mt-3 max-w-lg mx-auto">
                            Transmitiendo en vivo desde San Pedro de Colalao. Pasá a dejarnos un saludo por nuestros estudios.
                        </p>
                    </div>

                    {/* Contenedor del Iframe. 
                        Acá ocurre la magia del modo oscuro en el className del iframe */}
                    <div className="w-full h-75 md:h-112.5 rounded-2xl overflow-hidden border border-neutral-700 shadow-xl shadow-black/50 relative bg-neutral-950">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.8102365621858!2d-65.49872072466363!3d-26.235354765243233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9418bd811a82ec49%3A0xc3d2bd845eb443b!2sRadio%20Libertad%20103.1%20Mhz.!5e0!3m2!1ses!2sar!4v1779220075161!5m2!1ses!2sar" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 invert hue-rotate-180 contrast-75 opacity-90 hover:contrast-100 hover:opacity-100 transition-all duration-500"
                            title="Mapa de ubicación"
                        ></iframe>
                    </div>

                    {/* Fila inferior de datos rápidos abajo del mapa */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mt-8 w-full">
                        <div className="flex items-center gap-3 text-neutral-300">
                            <div className="p-3 rounded-full bg-neutral-800/80 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-0.5">Ubicación</div>
                                <div className="font-medium text-sm md:text-base">San Pedro de Colalao, Tucumán</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-300">
                            <div className="p-3 rounded-full bg-neutral-800/80 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-0.5">Email</div>
                                <div className="font-medium text-sm md:text-base">contacto@radiolibertad.com</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuienesSomos;