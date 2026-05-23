import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Reveal from './Reveal';
// ACA IMPORTAMOS EL COMPONENTE
import Reproductor from '../Reproductor'; 

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
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);

    const getLinkClass = (path) => 
        `relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all 
        ${location.pathname === path ? "text-white after:w-full after:bg-red-600" : "text-neutral-300 hover:text-white after:w-0 hover:after:w-full after:bg-red-600"}`;

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800 text-neutral-content transition-all flex flex-col shadow-xl">
            
            {/* --- PISO 1: BARRA DE NAVEGACIÓN (LOGO + LINKS + REDES) --- */}
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 md:px-8 h-16 md:h-20">
                
                {/* IZQUIERDA: Logo a la par de 103.1 FM */}
                <div className="flex-1 flex justify-start items-center gap-1 md:gap-3">
                    <button onClick={toggleMenu} className="btn btn-ghost btn-circle -ml-2 text-neutral-300 hover:text-white lg:hidden">
                        {isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>}
                    </button>
                    
                    <Reveal animation="fade-in-left">
                        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 md:gap-3 group cursor-pointer">
                            <img src="/Logo.png" alt="Radio Libertad" className="h-10 md:h-10 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
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
                                <Link to={link.path} className={getLinkClass(link.path)}>{link.text}</Link>
                            </li>
                        ))}
                        {isLoggedIn && (
                            <li><Link to="/panel" className={getLinkClass("/panel")}>Panel</Link></li>
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

            {/* --- PISO 2: REPRODUCTOR INYECTADO AQUÍ --- */}
            <Reproductor />

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