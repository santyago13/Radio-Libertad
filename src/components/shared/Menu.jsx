import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Reveal from './Reveal';

const navLinks = [
    { id: 1, text: "Inicio", path: "/" },
    { id: 2, text: "Quienes Somos", path: "/quienes-somos" },
];

const Menu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('tokenAdmin'));
    const location = useLocation();

    useEffect(() => {
        const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem('tokenAdmin'));
        window.addEventListener('auth-change', handleAuthChange);
        return () => window.removeEventListener('auth-change', handleAuthChange);
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);
    const streamUrl = "https://streaming.escuchanosonline.com:7307/;";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);
    const togglePlay = () => {
        if (isPlaying) audioRef.current.pause();
        else { audioRef.current.load(); audioRef.current.play(); }
        setIsPlaying(!isPlaying);
    };
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const getLinkClass = (path) => 
        `relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all 
        ${location.pathname === path ? "text-white after:w-full after:bg-red-600" : "text-neutral-300 hover:text-white after:w-0 hover:after:w-full after:bg-red-600"}`;

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800 text-neutral-content transition-all flex flex-col shadow-xl">
            <audio ref={audioRef} src={streamUrl} preload="none" />

            {/* --- PISO 1: BARRA DE NAVEGACIÓN (LOGO + LINKS + REDES) --- */}
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 md:px-8 h-16 md:h-20">
                
                {/* IZQUIERDA: Logo a la par de 103.1 FM */}
                <div className="flex-1 flex justify-start items-center gap-1 md:gap-3">
                    <button onClick={toggleMenu} className="btn btn-ghost btn-circle -ml-2 text-neutral-300 hover:text-white lg:hidden">
                        {isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>}
                    </button>
                    
                    <Reveal animation="fade-in-left">
                        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 md:gap-3 group cursor-pointer">
                            {/* Logo limpio y de tamaño prudente (h-10 / md:h-12) */}
                            <img 
                                src="/Logo.png" 
                                alt="Radio Libertad" 
                                className="h-10 md:h-10 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                            />
                            {/* Texto 103.1 FM a la par con una línea separadora */}
                            <span className="hidden sm:block text-red-500 font-black text-sm md:text-base tracking-widest border-l border-neutral-700 pl-2 md:pl-3">
                                103.1 <span className="text-neutral-400 font-medium">FM</span>
                            </span>
                        </Link>
                    </Reveal>
                </div>

                {/* CENTRO: Links de Navegación */}
                <Reveal animation="fade-in-down" className="hidden lg:flex items-center justify-center flex-2">
                    <ul className="flex items-center gap-8 font-semibold tracking-wide text-sm">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link to={link.path} className={getLinkClass(link.path)}>
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                        {isLoggedIn && (
                            <li>
                                <Link to="/panel" className={getLinkClass("/panel")}>
                                    Panel
                                </Link>
                            </li>
                        )}
                    </ul>
                </Reveal>

                {/* DERECHA: Redes Sociales */}
                <Reveal animation="fade-in-right" className="flex-1 flex items-center justify-end gap-4 text-neutral-400">
                    <a href="#" className="hover:text-red-500 hover:scale-110 transition-all duration-200" aria-label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="#" className="hover:text-red-500 hover:scale-110 transition-all duration-200" aria-label="Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    </a>
                </Reveal>
            </div>

            {/* --- PISO 2: REPRODUCTOR --- */}
            <div className="w-full border-t border-neutral-800/50 bg-neutral-900/40">
                <Reveal animation="fade-in-up" className="max-w-7xl mx-auto w-full px-4 md:px-8 py-2 md:py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 w-auto md:w-1/3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-lg overflow-hidden shrink-0 shadow-inner">
                            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=150&auto=format&fit=crop" alt="Radio Libertad" className={`object-cover w-full h-full transition-all duration-500 ${isPlaying ? 'opacity-80 scale-105' : 'opacity-100'}`} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-none">Escuchanos en vivo</h3>
                            <div className="flex items-center gap-2 mt-1">
                                {isPlaying ? <span className="flex items-center gap-1 text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none"><span className="animate-pulse h-1.5 w-1.5 bg-red-500 rounded-full"></span> Al Aire</span> : <span className="text-neutral-500 text-[10px] md:text-xs font-medium uppercase tracking-widest leading-none">Pausado</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end md:justify-center flex-1 md:flex-none md:w-1/3 pr-1 md:pr-0">
                        <button onClick={togglePlay} className="btn btn-circle btn-error border-none min-h-0 h-10 w-10 md:h-12 md:w-12 text-white shadow-lg shadow-red-600/20 hover:scale-105 transition-transform">
                            {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="solid" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>}
                        </button>
                    </div>
                    <div className="hidden md:flex items-center justify-end gap-3 w-1/3 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-400 group-hover:text-neutral-200 transition-colors"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500 transition-all" />
                    </div>
                </Reveal>
            </div>

            {/* --- MENÚ MÓVIL --- */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 border-t border-neutral-800 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="flex flex-col px-6 py-4 gap-2 font-medium text-base bg-black/95">
                    {navLinks.map((link) => (
                        <li key={link.id}><Link to={link.path} onClick={closeMobileMenu} className={`block py-2 ${location.pathname === link.path ? "text-red-500" : "hover:text-red-500"}`}>{link.text}</Link></li>
                    ))}
                    {isLoggedIn && (
                        <li><Link to="/panel" onClick={closeMobileMenu} className={`block py-2 ${location.pathname === "/panel" ? "text-red-500 font-bold" : "text-white"}`}>Panel</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Menu;