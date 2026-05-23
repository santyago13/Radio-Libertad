import React from 'react';
import Reveal from '../components/shared/Reveal'; // Ajustá esta ruta si es necesario

const Contactanos = () => {
    // Número oficial de la radio (limpio, sin símbolos)
    const numeroWhatsApp = "5493815317139"; 
    
    // Mensaje predefinido para el enlace
    const mensajeWeb = encodeURIComponent("¡Hola Radio Libertad! Me comunico desde la página web.");

    return (
        <section className="w-full min-h-[80vh] flex flex-col justify-center relative bg-neutral-950 pt-16 pb-24 md:pt-20 md:pb-32 border-b border-neutral-900 overflow-hidden">
            
            {/* --- DETALLES DE FONDO SUTILES --- */}
            {/* Patrón de puntos (muy suave para dar textura) */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
            <div className="absolute inset-0 bg-linear-to-b from-neutral-950 via-red-950/10 to-neutral-950 opacity-60"></div>

            <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
                
                {/* --- ETIQUETA SUPERIOR --- */}
                <Reveal animation="fade-in-up" delay="100ms">
                    <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full mb-8 shadow-inner">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="text-red-500 font-bold tracking-widest uppercase text-xs">
                            Canal Oficial
                        </span>
                    </div>
                </Reveal>
                
                {/* --- TÍTULO PRINCIPAL --- */}
                <Reveal animation="fade-in-up" delay="300ms">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8 bg-linear-to-b from-white to-neutral-400 bg-clip-text text-transparent">
                        Estemos en <br className="hidden sm:block"/> contacto.
                    </h2>
                </Reveal>
                
                {/* --- TEXTO DESCRIPTIVO --- */}
                <Reveal animation="fade-in-up" delay="500ms">
                    <p className="text-neutral-400 text-lg md:text-2xl leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
                        ¿Querés anunciar tu marca, pedir un tema o mandar saludos al aire? <strong className="text-neutral-200">Escribinos directo</strong> a nuestro WhatsApp oficial.
                    </p>
                </Reveal>

                {/* --- BOTÓN DE WHATSAPP --- */}
                <Reveal animation="fade-in-up" delay="700ms">
                    <div className="flex justify-center group">
                        <a 
                            href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWeb}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center justify-center gap-4 bg-red-600 hover:bg-red-500 text-white font-extrabold text-lg md:text-xl py-5 px-10 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            {/* --- LOGO DE WHATSAPP BLANCO Y LIMPIO --- */}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                viewBox="0 0 24 24" 
                                className="w-7 h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300"
                            >
                                <path d="M12.012 2C6.484 2 2 6.484 2 12.012c0 1.76.452 3.447 1.309 4.957L2 22l5.195-1.36a9.962 9.962 0 0 0 4.817 1.24h.003c5.526 0 10.012-4.484 10.012-10.01C22.027 6.484 17.54 2 12.012 2zM12.015 20.198c-1.492 0-2.957-.402-4.24-1.162l-.303-.18-3.155.826.842-3.076-.197-.315a8.318 8.318 0 0 1-1.272-4.468c0-4.606 3.748-8.354 8.354-8.354 4.608 0 8.356 3.748 8.356 8.354 0 4.607-3.748 8.356-8.354 8.356zm4.582-6.262c-.251-.126-1.488-.736-1.718-.82-.23-.085-.398-.126-.566.126-.168.252-.647.82-.793.988-.147.168-.293.188-.544.062-.252-.125-1.061-.39-2.022-1.25-.747-.668-1.252-1.494-1.4-1.745-.146-.252-.016-.388.11-.513.113-.113.251-.294.377-.44.126-.147.168-.25.251-.418.084-.168.042-.315-.021-.44-.063-.126-.566-1.365-.775-1.87-.204-.492-.41-.424-.566-.432-.146-.008-.314-.008-.482-.008s-.44.063-.67.315c-.23.252-.88.86-.88 2.096s.901 2.43 1.026 2.6c.126.167 1.772 2.705 4.291 3.792.6.258 1.068.412 1.433.527.603.191 1.152.164 1.586.1.487-.072 1.488-.609 1.698-1.196.21-.588.21-1.092.147-1.196-.063-.105-.23-.168-.482-.294z" />
                            </svg>
                            
                            <span>Escribinos por WhatsApp</span>
                            
                            {/* Efecto de brillo rápido al pasar el mouse */}
                            <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                        </a>
                    </div>
                </Reveal>

            </div>

            <style jsx="true" global="true">{`
                @keyframes shine {
                    100% {
                        left: 125%;
                    }
                }
                .group-hover\\:animate-shine:hover {
                    animation: shine 0.8s;
                }
            `}</style>
        </section>
    );
};

export default Contactanos;