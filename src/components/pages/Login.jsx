import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    // Estados para guardar lo que el usuario escribe (cambiado de email a usuario)
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Acá iría la lógica para conectarte a tu base de datos
        console.log("Intentando iniciar sesión con el usuario:", usuario);
    };

    return (
        <div className="w-full min-h-screen bg-neutral-950 pt-40 pb-16 md:pt-45 flex items-center justify-center px-4">
            
            {/* Tarjeta del Login */}
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black relative overflow-hidden">
                
                {/* Brillo de fondo sutil */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-red-600/10 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center mb-8">
                    <div className="w-16 h-16 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                        Iniciar Sesión
                    </h2>
                    <p className="text-neutral-400 text-sm">
                        Ingresá al panel de administración.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                    
                    {/* Input Usuario */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="usuario" className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                            Usuario
                        </label>
                        <input 
                            type="text" 
                            id="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Nombre de usuario"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-700"
                        />
                    </div>

                    {/* Input Contraseña */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                                Contraseña
                            </label>                      
                        </div>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-700"
                        />
                    </div>

                    {/* Botón Entrar */}
                    <button 
                        type="submit" 
                        className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2"
                    >
                        Entrar al Panel
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </form>

                {/* Volver al inicio */}
                <div className="mt-8 text-center relative z-10 border-t border-neutral-800/50 pt-6">
                    <Link to="/" className="text-sm font-medium text-neutral-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Volver a la página principal
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;