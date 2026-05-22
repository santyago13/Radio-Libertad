import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Panel = () => {
    // ==========================================
    // ESTADO DE NAVEGACIÓN DEL PANEL
    // ==========================================
    const [pestañaActiva, setPestañaActiva] = useState('carrusel'); // Lo puse en carrusel por defecto para que lo pruebes rápido

    // ==========================================
    // ESTADOS: SPONSORS (Carrusel de Logos)
    // ==========================================
    const [sponsors, setSponsors] = useState([
        { id: 1, nombre: "Corralón San Pedro", estado: "Activo", fecha: "Hoy", imagen: null },
    ]);
    const [nombreSponsor, setNombreSponsor] = useState('');
    const [estadoSponsor, setEstadoSponsor] = useState('Activo');
    const [imagenSponsor, setImagenSponsor] = useState(null);
    const [previewSponsorUrl, setPreviewSponsorUrl] = useState(null);
    const sponsorInputRef = useRef(null);

    // ==========================================
    // ESTADOS: CARRUSEL (Banners Principales)
    // ==========================================
    const [slides, setSlides] = useState([
        { id: 1, titulo: "Fiesta de la Humita", subtitulo: "Transmisión Exclusiva", estado: "Activo", fecha: "Ayer", imagen: null },
    ]);
    const [tituloSlide, setTituloSlide] = useState('');
    const [subtituloSlide, setSubtituloSlide] = useState('');
    const [estadoSlide, setEstadoSlide] = useState('Activo');
    const [imagenSlide, setImagenSlide] = useState(null);
    const [previewSlideUrl, setPreviewSlideUrl] = useState(null);
    const slideInputRef = useRef(null);
    
    // NUEVO: Estado para saber si estamos editando un slide y cuál es
    const [editandoSlideId, setEditandoSlideId] = useState(null);

    // ==========================================
    // FUNCIONES: SPONSORS
    // ==========================================
    const manejarImagenSponsor = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            setImagenSponsor(archivo);
            setPreviewSponsorUrl(URL.createObjectURL(archivo));
        }
    };

    const agregarSponsor = (e) => {
        e.preventDefault();
        if (!nombreSponsor.trim()) return;
        const nuevo = { id: Date.now(), nombre: nombreSponsor, estado: estadoSponsor, fecha: new Date().toLocaleDateString(), imagen: previewSponsorUrl };
        setSponsors([nuevo, ...sponsors]);
        setNombreSponsor(''); setImagenSponsor(null); setPreviewSponsorUrl(null);
        if (sponsorInputRef.current) sponsorInputRef.current.value = "";
    };

    const eliminarSponsor = (id) => setSponsors(sponsors.filter(s => s.id !== id));

    // ==========================================
    // FUNCIONES: CARRUSEL PRINCIPAL
    // ==========================================
    const manejarImagenSlide = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            setImagenSlide(archivo);
            setPreviewSlideUrl(URL.createObjectURL(archivo));
        }
    };

    // Función unificada para Guardar Nuevo o Actualizar Existente
    const guardarSlide = (e) => {
        e.preventDefault();
        if (!tituloSlide.trim()) return; 

        if (editandoSlideId) {
            // Modo Edición: Actualizamos el que ya existe
            setSlides(slides.map(slide => 
                slide.id === editandoSlideId 
                ? { ...slide, titulo: tituloSlide, subtitulo: subtituloSlide, imagen: previewSlideUrl } 
                : slide
            ));
        } else {
            // Modo Nuevo: Exigimos foto y lo creamos
            if (!previewSlideUrl) return; 
            const nuevo = { id: Date.now(), titulo: tituloSlide, subtitulo: subtituloSlide, estado: estadoSlide, fecha: new Date().toLocaleDateString(), imagen: previewSlideUrl };
            setSlides([nuevo, ...slides]);
        }
        
        limpiarFormularioSlide();
    };

    // Carga los datos del banner seleccionado en el formulario
    const iniciarEdicionSlide = (slide) => {
        setEditandoSlideId(slide.id);
        setTituloSlide(slide.titulo);
        setSubtituloSlide(slide.subtitulo || '');
        setPreviewSlideUrl(slide.imagen);
        setImagenSlide(null); // Vaciamos el file real, mantenemos solo la URL de preview
    };

    // Resetea el formulario de Banners
    const limpiarFormularioSlide = () => {
        setEditandoSlideId(null);
        setTituloSlide(''); 
        setSubtituloSlide(''); 
        setImagenSlide(null); 
        setPreviewSlideUrl(null);
        if (slideInputRef.current) slideInputRef.current.value = "";
    };

    const eliminarSlide = (id) => setSlides(slides.filter(s => s.id !== id));

    return (
        <div className="min-h-screen pt-30 md:pt-35 bg-neutral-950 flex flex-col md:flex-row font-sans text-neutral-content">
            
            {/* SIDEBAR */}
            <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between shrink-0">
                <div className="p-6">
                    <div className="mb-10 flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-black text-white tracking-tighter uppercase">Admin</h2>
                    </div>
                    
                    <nav className="flex flex-col gap-2">
                        <button 
                            onClick={() => setPestañaActiva('sponsors')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left ${
                                pestañaActiva === 'sponsors' 
                                ? 'bg-red-600/10 text-red-500 border border-red-600/20' 
                                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.5a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            Sponsors
                        </button>
                        
                        <button 
                            onClick={() => setPestañaActiva('carrusel')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left ${
                                pestañaActiva === 'carrusel' 
                                ? 'bg-red-600/10 text-red-500 border border-red-600/20' 
                                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            Carrusel Portada
                        </button>
                    </nav>
                </div>
                <div className="p-6 border-t border-neutral-800">
                    <Link to="/" className="text-neutral-500 hover:text-white transition-colors text-sm flex items-center gap-2">
                        ← Volver a la Web
                    </Link>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                
                {/* ------------------------------------------------------------------------
                    VISTA 1: SPONSORS 
                ------------------------------------------------------------------------ */}
                {pestañaActiva === 'sponsors' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* ... TODO EL CÓDIGO DE SPONSORS QUEDA IGUAL ... */}
                        <header className="mb-10">
                            <h1 className="text-3xl font-black text-white tracking-tight">Gestión de Auspiciantes</h1>
                            <p className="text-neutral-500">Cargá el nombre y el logo de los comercios para la marquesina.</p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl h-fit">
                                <h3 className="font-bold text-white text-lg mb-6">Nuevo Sponsor</h3>
                                <form onSubmit={agregarSponsor} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Nombre</label>
                                        <input type="text" value={nombreSponsor} onChange={(e) => setNombreSponsor(e.target.value)} placeholder="Ej: Farmacia Centro" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Logo del comercio</label>
                                        <div className="relative">
                                            <input type="file" accept="image/*" onChange={manejarImagenSponsor} ref={sponsorInputRef} className="hidden" id="sponsor-upload" />
                                            <label htmlFor="sponsor-upload" className="w-full bg-neutral-950 border-2 border-dashed border-neutral-800 rounded-xl px-4 py-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-600/50 transition-all group">
                                                {previewSponsorUrl ? <img src={previewSponsorUrl} alt="Preview" className="h-20 object-contain rounded-lg mb-2" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-600 group-hover:text-red-500 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>}
                                                <span className="text-xs font-medium text-neutral-500">{previewSponsorUrl ? "Cambiar Imagen" : "Click para subir logo"}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95 mt-2">Guardar Auspiciante</button>
                                </form>
                            </div>

                            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
                                <div className="px-8 py-6 border-b border-neutral-800"><h3 className="font-bold text-white text-lg">Sponsors Activos</h3></div>
                                <div className="divide-y divide-neutral-800">
                                    {sponsors.map((sponsor) => (
                                        <div key={sponsor.id} className="px-8 py-5 flex items-center justify-between hover:bg-neutral-800/30 transition-colors group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                                    {sponsor.imagen ? <img src={sponsor.imagen} alt={sponsor.nombre} className="w-full h-full object-contain p-1" /> : <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349" /></svg>}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{sponsor.nombre}</p>
                                                    <p className="text-neutral-500 text-xs tracking-wide">Cargado el: {sponsor.fecha}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => eliminarSponsor(sponsor.id)} className="p-2.5 bg-neutral-950 hover:bg-red-600/10 text-neutral-600 hover:text-red-500 border border-neutral-800 rounded-xl transition-all">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 12m-4.72 0-.34-12M9.25 13.25c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8Zm4.7 0c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8ZM4.75 5.75h14.5M6.25 5.75l.77 13.97a2.25 2.25 0 0 0 2.24 2.13h5.48a2.25 2.25 0 0 0 2.24-2.13l.77-13.97M9.25 5.75V4.3c0-.85.65-1.55 1.5-1.55h2.5c.85 0 1.5.7 1.5 1.55v1.45" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ------------------------------------------------------------------------
                    VISTA 2: CARRUSEL PRINCIPAL
                ------------------------------------------------------------------------ */}
                {pestañaActiva === 'carrusel' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="mb-10">
                            <h1 className="text-3xl font-black text-white tracking-tight">Carrusel de Portada</h1>
                            <p className="text-neutral-500">Cargá o editá las noticias o publicidades grandes que pasan al inicio de la web.</p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* FORMULARIO CARRUSEL */}
                            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl h-fit">
                                <h3 className="font-bold text-white text-lg mb-6">
                                    {editandoSlideId ? "Editar Banner" : "Nuevo Banner"}
                                </h3>
                                <form onSubmit={guardarSlide} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Título Principal</label>
                                        <input type="text" value={tituloSlide} onChange={(e) => setTituloSlide(e.target.value)} placeholder="Ej: Gran Sorteo Día del Padre" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Subtítulo (Opcional)</label>
                                        <input type="text" value={subtituloSlide} onChange={(e) => setSubtituloSlide(e.target.value)} placeholder="Ej: Participá mandando un WhatsApp" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Imagen de Fondo <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input type="file" accept="image/*" onChange={manejarImagenSlide} ref={slideInputRef} className="hidden" id="slide-upload" />
                                            <label htmlFor="slide-upload" className="w-full bg-neutral-950 border-2 border-dashed border-neutral-800 rounded-xl px-4 py-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-600/50 transition-all group">
                                                {previewSlideUrl ? <img src={previewSlideUrl} alt="Preview" className="h-20 object-cover rounded-lg mb-2 w-full" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-600 group-hover:text-red-500 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>}
                                                <span className="text-xs font-medium text-neutral-500">{previewSlideUrl ? "Cambiar Fondo" : "Subir foto panorámica"}</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 mt-2">
                                        <button type="submit" className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95">
                                            {editandoSlideId ? "Actualizar" : "Guardar"}
                                        </button>
                                        
                                        {/* Si estamos editando, mostramos el botón de Cancelar */}
                                        {editandoSlideId && (
                                            <button 
                                                type="button" 
                                                onClick={limpiarFormularioSlide}
                                                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* LISTADO CARRUSEL */}
                            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl h-fit">
                                <div className="px-8 py-6 border-b border-neutral-800"><h3 className="font-bold text-white text-lg">Banners Activos</h3></div>
                                <div className="divide-y divide-neutral-800">
                                    {slides.map((slide) => (
                                        <div key={slide.id} className="px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-800/30 transition-colors group gap-4">
                                            <div className="flex items-center gap-5 w-full">
                                                {/* Miniatura Panorámica */}
                                                <div className="w-24 h-14 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                                    {slide.imagen ? <img src={slide.imagen} alt={slide.titulo} className="w-full h-full object-cover" /> : <span className="text-xs text-neutral-600">Sin Foto</span>}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-white truncate">{slide.titulo}</p>
                                                    <p className="text-neutral-500 text-xs truncate">{slide.subtitulo || "Sin subtítulo"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0 justify-end">
                                                {/* Botón Editar */}
                                                <button 
                                                    onClick={() => iniciarEdicionSlide(slide)} 
                                                    className="p-2.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-500 hover:text-white border border-neutral-800 rounded-xl transition-all"
                                                    title="Editar Banner"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </button>
                                                
                                                {/* Botón Eliminar */}
                                                <button 
                                                    onClick={() => eliminarSlide(slide.id)} 
                                                    className="p-2.5 bg-neutral-950 hover:bg-red-600/10 text-neutral-600 hover:text-red-500 border border-neutral-800 rounded-xl transition-all"
                                                    title="Eliminar Banner"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 12m-4.72 0-.34-12M9.25 13.25c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8Zm4.7 0c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8ZM4.75 5.75h14.5M6.25 5.75l.77 13.97a2.25 2.25 0 0 0 2.24 2.13h5.48a2.25 2.25 0 0 0 2.24-2.13l.77-13.97M9.25 5.75V4.3c0-.85.65-1.55 1.5-1.55h2.5c.85 0 1.5.7 1.5 1.55v1.45" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {slides.length === 0 && (
                                        <div className="p-10 text-center text-neutral-500 text-sm">No hay banners cargados.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Panel;