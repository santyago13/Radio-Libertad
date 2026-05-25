import React from 'react';
import Reveal from '../shared/Reveal'; // Asegurate de importar tu componente Reveal

// IMPORTAMOS LA IMAGEN LOCAL
import FotoAle from '../../assets/Ale.jpeg';

const QuienesSomos = () => {
    return (
        <div className="w-full bg-neutral-950 pt-40 pb-16 md:pt-45 md:pb-24 border-b border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* -----------------------------------------------------
                    SECCIÓN 1: HISTORIA E IMAGEN
                ------------------------------------------------------ */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 md:mb-32">
                    
                    {/* Columna Izquierda: Textos */}
                    <Reveal animation="fade-in-left" delay="100ms" className="w-full lg:w-1/2 flex flex-col items-start">
                        <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-3">
                            <span className="w-8 h-0.5 bg-red-600"></span>
                            🎙️ ¿Quiénes Somos?
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
                            Informar, acompañar y <br className="hidden md:block" /> conectar a la comunidad.
                        </h2>
                        
                        <div className="text-neutral-400 text-base md:text-lg leading-relaxed flex flex-col gap-5 mb-10">
                            <p>
                                Somos <strong className="text-white">Radio Libertad 103.1 MHz</strong>, una emisora de comunicación y entretenimiento nacida en la Villa Turística de San Pedro de Colalao, Tucumán, con el objetivo de informar, acompañar y conectar a la comunidad a través de una programación dinámica, moderna y cercana a la gente.
                            </p>
                            
                            <p>
                                Nuestra primera transmisión oficial se realizó el <strong className="text-white">9 de julio de 2023</strong>, marcando el inicio de un proyecto de comunicación independiente pensado para crecer junto a la audiencia local y regional, incorporando además el alcance global que hoy permiten las plataformas digitales e Internet.
                            </p>
                            
                            <p>
                                Con contenidos de interés general, programas en vivo, transmisiones deportivas, coberturas especiales y difusión comercial multiplataforma, Radio Libertad se convirtió rápidamente en un medio joven con fuerte presencia en San Pedro de Colalao, el departamento Trancas y distintas localidades de Tucumán, llegando también a oyentes de otras provincias y países.
                            </p>

                            <p className="border-l-2 border-red-600 pl-4 py-1 text-neutral-300">
                                📡 La emisora desarrolla sus actividades bajo el expediente <strong className="text-white">ENACOM EX-2023-55709095</strong>, reafirmando su compromiso con una comunicación responsable, profesional y en constante crecimiento.
                            </p>

                            <p>
                                🎓 Radio Libertad 103.1 MHz fue creada y es dirigida por <strong className="text-white">Ale Carlos Massa</strong>, Licenciado en Comunicación Social y Técnico Universitario en Periodismo, quien impulsa este proyecto con la visión de construir un medio moderno, participativo y comprometido con la información, la cultura, el deporte y la identidad regional.
                            </p>

                            <p>
                                Hoy seguimos creciendo junto a nuestra audiencia, generando contenido de calidad y ofreciendo a empresas, comercios y emprendedores un espacio real para potenciar sus marcas y llegar a miles de personas cada día.
                            </p>
                            
                            <div className="mt-2 inline-block bg-red-600/10 text-red-500 font-bold px-4 py-2 rounded-lg border border-red-600/20">
                                ✨ Radio Libertad 103.1 MHz — Conectamos marcas con audiencia real.
                            </div>
                        </div>
                        
                        {/* Estadísticas / Datos rápidos */}
                        <div className="grid grid-cols-2 gap-8 w-full pt-8 border-t border-neutral-800">
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white mb-1">103.1</div>
                                <div className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-widest">Frecuencia FM</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-white mb-1">2023</div>
                                <div className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-widest">Año de Fundación</div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Columna Derecha: Imagen Destacada */}
                    <Reveal animation="fade-in-right" delay="300ms" className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                        <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full z-0 pointer-events-none"></div>
                        
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black border border-neutral-800 bg-neutral-900 group">
                            {/* USAMOS LA VARIABLE DE LA IMAGEN IMPORTADA */}
                            <img 
                                src={FotoAle} 
                                alt="Ale Carlos Massa - Director de Radio Libertad"
                                className="w-full h-full object-cover aspect-3/4 md:aspect-4/3 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6 pt-24">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg tracking-tight">Ale Carlos Massa</div>
                                        <div className="text-neutral-300 text-sm font-medium">Fundador y Director</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* -----------------------------------------------------
                    SECCIÓN 2: MAPA DE UBICACIÓN
                ------------------------------------------------------ */}
                <Reveal animation="fade-in-up" delay="200ms" className="w-full bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-10 flex flex-col items-center">
                    
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

                    {/* Contenedor del Iframe */}
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

                    {/* Fila inferior de datos rápidos */}
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
                    </div>

                </Reveal>
            </div>
        </div>
    );
};

export default QuienesSomos;