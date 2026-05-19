import { useState, useEffect } from 'react';

const renderIcono = (estado, className) => {
    switch (estado) {
        case "soleado":
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-yellow-400 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>;
        case "nublado":
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-gray-400 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>;
        case "parcial":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-yellow-200 ${className}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                </svg>
            );
        case "lluvia":
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-blue-400 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m-4.5-2v2m9-2v2m-9 1a5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75a4.5 4.5 0 0 1-1.332-8.757 5.25 5.25 0 0 1 2.082-1.743Z" /></svg>;
        default:
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-neutral-500 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>;
    }
};

const ClimaSemanal = () => {
    const [pronostico, setPronostico] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerClima = async () => {
            try {
                const API_KEY = "152b898bb51cafef3bdfc4583915735e";
                const lat = "-26.23";
                const lon = "-65.49";
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;

                const respuesta = await fetch(url);
                const datos = await respuesta.json();

                if (datos.cod !== "200") {
                    throw new Error(datos.message);
                }

                if (datos && datos.list) {
                    const diasAgrupados = {};

                    datos.list.forEach(item => {
                        const fecha = item.dt_txt.split(' ')[0]; 
                        
                        if (!diasAgrupados[fecha]) {
                            diasAgrupados[fecha] = {
                                min: item.main.temp_min,
                                max: item.main.temp_max,
                                condiciones: [],
                                textos: []
                            };
                        } else {
                            if (item.main.temp_min < diasAgrupados[fecha].min) diasAgrupados[fecha].min = item.main.temp_min;
                            if (item.main.temp_max > diasAgrupados[fecha].max) diasAgrupados[fecha].max = item.main.temp_max;
                        }
                        
                        diasAgrupados[fecha].condiciones.push(item.weather[0].main);
                        diasAgrupados[fecha].textos.push(item.weather[0].description);
                    });

                    const diasMapeados = Object.keys(diasAgrupados).slice(0, 6).map((fechaStr, index) => {
                        const diaData = diasAgrupados[fechaStr];
                        
                        const fechaObj = new Date(fechaStr + "T12:00:00");
                        const opciones = { weekday: 'long' };
                        let nombreDia = new Intl.DateTimeFormat('es-AR', opciones).format(fechaObj);
                        nombreDia = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);

                        // --- NUEVA LÓGICA DE PRIORIDAD DE LLUVIA ---
                        // Buscamos si en alguna de las 8 franjas horarias del día hay lluvia o tormenta
                        const indiceLluvia = diaData.condiciones.findIndex(c => ["Rain", "Drizzle", "Thunderstorm"].includes(c));
                        
                        let condicionPrincipal = "";
                        let textoPrincipal = "";

                        if (indiceLluvia !== -1) {
                            // Si llueve, forzamos esa condición para avisar
                            condicionPrincipal = diaData.condiciones[indiceLluvia];
                            textoPrincipal = diaData.textos[indiceLluvia];
                        } else {
                            // Si no llueve, tomamos el clima del mediodía
                            const indiceCentral = Math.floor(diaData.condiciones.length / 2);
                            condicionPrincipal = diaData.condiciones[indiceCentral];
                            textoPrincipal = diaData.textos[indiceCentral];
                        }
                        // ---------------------------------------------

                        let estadoClima = "soleado";
                        if (["Rain", "Drizzle", "Thunderstorm"].includes(condicionPrincipal)) {
                            estadoClima = "lluvia";
                        } else if (condicionPrincipal === "Clouds") {
                            if (textoPrincipal.includes("muy") || textoPrincipal.includes("cubierto")) {
                                estadoClima = "nublado";
                            } else {
                                estadoClima = "parcial";
                            }
                        } else if (condicionPrincipal === "Clear") {
                            estadoClima = "soleado";
                        }

                        return {
                            id: index,
                            dia: index === 0 ? "Hoy" : nombreDia.substring(0, 3), 
                            min: Math.round(diaData.min),
                            max: Math.round(diaData.max),
                            estadoTexto: textoPrincipal,
                            estado: estadoClima
                        };
                    });

                    setPronostico(diasMapeados);
                }
            } catch (err) {
                console.error("Error cargando el clima:", err);
                if (err.message.includes("Invalid API key")) {
                    setError("Clave API en proceso de activación. Por favor, esperá unos minutos.");
                } else {
                    setError(err.message);
                }
            } finally {
                setCargando(false);
            }
        };

        obtenerClima();
    }, []);

    return (
        <div className="w-full bg-neutral-950 py-8 md:py-12">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                    
                    <div className="lg:w-1/3 bg-linear-to-br from-neutral-800 to-neutral-900 p-6 md:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-800">
                        <div className="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span className="text-neutral-300 font-semibold uppercase tracking-wider text-sm">San Pedro de Colalao</span>
                        </div>

                        {cargando ? (
                            <div className="flex items-center gap-3 text-neutral-500 py-4">
                                <div className="w-6 h-6 border-2 border-neutral-700 border-t-red-600 rounded-full animate-spin"></div>
                                <span>Cargando...</span>
                            </div>
                        ) : error ? (
                            <span className="text-red-500 text-sm">{error}</span>
                        ) : pronostico.length > 0 && (
                            <div className="flex items-center gap-6">
                                {renderIcono(pronostico[0].estado, 'w-20 h-20 md:w-24 md:h-24 drop-shadow-md')}
                                <div>
                                    <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                                        {pronostico[0].max}°
                                    </div>
                                    <div className="text-neutral-400 font-medium text-lg capitalize mt-1">
                                        {pronostico[0].estadoTexto}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-2/3 p-6 md:p-8 flex items-center">
                        {cargando ? (
                            <div className="w-full text-center text-neutral-600 font-medium">Buscando pronóstico exacto...</div>
                        ) : error ? (
                            <div className="w-full text-center text-neutral-600 font-medium">No disponible</div>
                        ) : (
                            <div className="w-full flex justify-between gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                                {pronostico.slice(1).map((dia) => (
                                    <div key={dia.id} className="flex flex-col items-center justify-center min-w-15 md:min-w-20">
                                        <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs mb-3">
                                            {dia.dia}
                                        </span>
                                        
                                        <div className="mb-3" title={dia.estadoTexto}>
                                            {renderIcono(dia.estado, 'w-8 h-8 md:w-10 md:h-10')}
                                        </div>
                                        
                                        <div className="flex flex-col items-center gap-0.5 text-sm md:text-base">
                                            <span className="text-white font-bold">{dia.max}°</span>
                                            <span className="text-neutral-500 font-medium">{dia.min}°</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ClimaSemanal;