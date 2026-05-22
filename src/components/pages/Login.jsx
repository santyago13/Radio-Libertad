import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar
    const [cargando, setCargando] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const respuesta = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, password })
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                // Guardamos el pase VIP
                localStorage.setItem('tokenAdmin', data.token);
                
                // Avisamos al Menú que el estado de sesión cambió
                window.dispatchEvent(new Event('auth-change'));
                
                Swal.fire({
                    title: '¡Bienvenido!', 
                    text: 'Sesión iniciada correctamente.', 
                    icon: 'success',
                    background: '#171717', 
                    color: '#ffffff', 
                    timer: 1500, 
                    showConfirmButton: false,
                    customClass: { popup: 'rounded-3xl border border-neutral-800' }
                }).then(() => {
                    navigate('/panel');
                });
            } else {
                Swal.fire({
                    title: 'Error', 
                    text: data.mensaje || 'Credenciales incorrectas.', 
                    icon: 'error',
                    background: '#171717', 
                    color: '#ffffff', 
                    confirmButtonColor: '#dc2626',
                    customClass: { popup: 'rounded-3xl border border-neutral-800' }
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                title: 'Error de Conexión', 
                text: 'No se pudo conectar con el servidor.', 
                icon: 'error',
                background: '#171717', 
                color: '#ffffff',
                customClass: { popup: 'rounded-3xl border border-neutral-800' }
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-neutral-950 pt-40 pb-16 md:pt-45 flex items-center justify-center px-4">
            
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black relative overflow-hidden">
                
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
                            disabled={cargando}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-700 disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                                Contraseña
                            </label>                      
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={cargando}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-700 disabled:opacity-50 pr-12"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={cargando}
                        className={`mt-4 w-full font-bold py-4 rounded-xl transition-transform flex justify-center items-center gap-2 ${cargando ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95'}`}
                    >
                        {cargando ? 'Verificando...' : 'Entrar al Panel'}
                        {!cargando && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        )}
                    </button>
                </form>

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