import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Carrusel = () => {
    const [slides, setSlides] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/slides')
            .then(res => res.json())
            .then(data => {
                // ACÁ ESTÁ EL CHISMOSO: Vamos a ver qué trae la base de datos
                console.log("Datos de la base de datos:", data);
                setSlides(data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error al cargar los slides del carrusel:", error);
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <div className="w-full h-100 md:h-125 lg:h-130 bg-neutral-900 flex items-center justify-center text-white">Cargando portada...</div>;
    }

    if (slides.length === 0) {
        return null; 
    }

    return (
        <div className="w-full relative group">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={slides.length > 1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100',
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                className="w-full h-100 md:h-125 lg:h-130 bg-neutral-900"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide._id}>
                        <div style={{ backgroundImage: `url(${slide.imagen})` }} className="absolute inset-0 bg-center bg-cover"></div>

                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
                            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
                                {slide.titulo}
                            </h2>
                            
                            {slide.subtitulo && (
                                <p className="text-gray-200 text-lg md:text-xl font-medium mb-8 max-w-2xl drop-shadow-sm">
                                    {slide.subtitulo}
                                </p>
                            )}

                            {/* FORZAMOS A QUE EL BOTÓN APAREZCA SIEMPRE (le saqué el {slide.link &&}) */}
                            {/* También le agregué un mt-4 (margen arriba) y bg-red-600 por las dudas */}
                            <a 
                                href={slide.link || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-error btn-md md:btn-lg bg-red-600 text-white font-bold border-none shadow-md rounded-md px-8 mt-4 hover:bg-red-700 pointer-events-auto relative z-20 inline-flex items-center justify-center"
                            >
                                Ver más
                            </a>
                        </div>
                    </SwiperSlide>
                ))}

                {slides.length > 1 && (
                    <>
                        <button className="swiper-button-prev-custom hidden md:flex absolute top-[50%] translate-y-[-50%] left-6 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20 items-center justify-center w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                        </button>
                        <button className="swiper-button-next-custom hidden md:flex absolute top-[50%] translate-y-[-50%] right-6 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20 items-center justify-center w-10 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                        </button>
                    </>
                )}
            </Swiper>

            <style jsx="true" global="true">{`
                .swiper-pagination { bottom: 24px !important; }
            `}</style>
        </div>
    );
};

export default Carrusel;