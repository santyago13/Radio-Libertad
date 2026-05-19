import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Importamos los estilos básicos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920&auto=format&fit=crop",
        title: "Nuevo Aire en San Pedro",
        description: "Acompañando tus mañanas con la mejor información local y provincial.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1920&auto=format&fit=crop",
        title: "El Resumen Deportivo",
        description: "Toda la cobertura de los clubes tucumanos, de lunes a viernes a las 19hs.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop",
        title: "Fines de Semana de Clásicos",
        description: "La mejor selección musical para que disfrutes tu descanso al máximo.",
    }
];

const Carrusel = () => {
    return (
        <div className="w-full relative group">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false, // Sigue en autoplay aunque el usuario lo toque
                }}
                pagination={{ 
                    clickable: true,
                    // Clases para customizar los puntitos y que queden blancos como querías
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
                    <SwiperSlide key={slide.id}>
                        {/* Imagen de fondo */}
                        <div 
                            style={{ backgroundImage: `url(${slide.image})` }}
                            className="absolute inset-0 bg-center bg-cover"
                        ></div>

                        {/* Capa oscura uniforme y Contenido Centrado */}
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
                                {slide.title}
                            </h2>
                            <p className="text-gray-200 text-lg md:text-xl font-medium mb-8 max-w-2xl drop-shadow-sm">
                                {slide.description}
                            </p>
                            <button className="btn btn-error btn-md md:btn-lg text-white font-bold border-none shadow-md rounded-md px-8 hover:bg-red-700 pointer-events-auto">
                                Leer más
                            </button>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Flecha Izquierda Customizada */}
                <button className="swiper-button-prev-custom hidden md:flex absolute top-[50%] translate-y-[-50%] left-6 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20 items-center justify-center w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Flecha Derecha Customizada */}
                <button className="swiper-button-next-custom hidden md:flex absolute top-[50%] translate-y-[-50%] right-6 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-20 items-center justify-center w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </Swiper>

            {/* Estilos globales para forzar la posición de los puntos de paginación de Swiper */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 24px !important;
                }
            `}</style>
        </div>
    );
};

export default Carrusel;