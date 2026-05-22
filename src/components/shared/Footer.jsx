import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // --- LÓGICA DE SESIÓN (SIN BORRAR NADA MÁS) ---
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('tokenAdmin'));

  useEffect(() => {
    const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem('tokenAdmin'));
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAdmin');
    window.dispatchEvent(new Event('auth-change'));
  };

  // Obtenemos el año actual automáticamente para el copyright
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 pt-16 pb-8 border-t border-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Contenedor principal de columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Columna 1: Marca y Descripción */}
          <div className="flex flex-col items-start">
            {/* Logo Tipográfico (Mismo estilo que el menú) */}
            <Link
              to="/"
              className="flex items-center gap-2 group cursor-pointer mb-4"
            >
              <div className="font-black text-2xl tracking-tighter uppercase">
                <span className="text-red-600 group-hover:text-red-500 transition-colors">
                  LIBERTAD
                </span>
              </div>
              <span className="text-neutral-400 font-light text-sm tracking-widest border-l border-neutral-700 pl-2">
                103.1
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Transmitiendo desde el corazón de San Pedro de Colalao.
              Acompañando tus días con la mejor música y la información local y
              provincial que necesitás.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="flex flex-col items-start md:items-center">
            <div>
              <h4 className="text-white font-bold tracking-wide uppercase mb-4 text-sm">
                Enlaces Rápidos
              </h4>
              <ul className="flex flex-col gap-3 text-sm font-medium">
                <li>
                  <Link
                    to="/"
                    className="hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    <span className="text-red-600 text-xs">▸</span> Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quienes-somos"
                    className="hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    <span className="text-red-600 text-xs">▸</span> Quienes
                    Somos
                  </Link>
                </li>
                {/* LÓGICA DE ACCEDER / CERRAR SESIÓN */}
                <li>
                  {!isLoggedIn ? (
                    <Link
                      to="/acceder"
                      className="hover:text-red-500 transition-colors flex items-center gap-2"
                    >
                      <span className="text-red-600 text-xs">▸</span> Acceder
                    </Link>
                  ) : (
                    <button
                      onClick={cerrarSesion}
                      className="hover:text-red-500 transition-colors flex items-center gap-2"
                    >
                      <span className="text-red-600 text-xs">▸</span> Cerrar Sesión
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 3: Contacto y Redes */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <h4 className="text-white font-bold tracking-wide uppercase mb-4 text-sm">
              Comunicate
            </h4>

            <ul className="flex flex-col gap-3 text-sm mb-6 w-full md:items-end">
              {/* Ubicación */}
              <li className="flex items-center md:flex-row-reverse gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-red-600 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span>San Pedro de Colalao, Tucumán</span>
              </li>

              {/* WhatsApp / Teléfono */}
              <li className="flex items-center md:flex-row-reverse gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-red-600 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                <span>+54 9 381 XXXXXXX</span>
              </li>
            </ul>

            {/* Íconos de Redes */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-neutral-900 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="bg-neutral-900 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior: Copyright y Créditos */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-400">
          <p>© {anioActual} Radio Libertad. Todos los derechos reservados.</p>
          <p>
            Desarrollado en <span className="text-red-600">Tucumán</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;