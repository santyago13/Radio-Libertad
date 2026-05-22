import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Reveal from '../shared/Reveal'; 

const Panel = () => {
    const [pestañaActiva, setPestañaActiva] = useState('sponsors');
    const [cargando, setCargando] = useState(false);

    // ==========================================
    // ESTADOS: SPONSORS
    // ==========================================
    const [sponsors, setSponsors] = useState([]); 
    const [nombreSponsor, setNombreSponsor] = useState('');
    const [linkSponsor, setLinkSponsor] = useState('');
    const [estadoSponsor, setEstadoSponsor] = useState('Activo');
    const [imagenSponsor, setImagenSponsor] = useState(null);
    const [previewSponsorUrl, setPreviewSponsorUrl] = useState(null);
    const sponsorInputRef = useRef(null);
    const [editandoSponsorId, setEditandoSponsorId] = useState(null);

    // ==========================================
    // ESTADOS: CARRUSEL (SLIDES)
    // ==========================================
    const [slides, setSlides] = useState([]);
    const [tituloSlide, setTituloSlide] = useState('');
    const [subtituloSlide, setSubtituloSlide] = useState('');
    const [linkSlide, setLinkSlide] = useState('');
    const [imagenSlide, setImagenSlide] = useState(null);
    const [previewSlideUrl, setPreviewSlideUrl] = useState(null);
    const slideInputRef = useRef(null);
    const [editandoSlideId, setEditandoSlideId] = useState(null);

    // Al cargar el panel, traemos Sponsors y Slides
    useEffect(() => {
        // Traer Sponsors
        fetch(`${import.meta.env.VITE_API_URL}/sponsors`)
            .then(res => res.json())
            .then(data => setSponsors(data))
            .catch(error => console.error("Error trayendo sponsors:", error));

        // Traer Slides
        fetch(`${import.meta.env.VITE_API_URL}/slides`)
            .then(res => res.json())
            .then(data => setSlides(data))
            .catch(error => console.error("Error trayendo slides:", error));
    }, []);

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

    const iniciarEdicionSponsor = (sponsor) => {
        setEditandoSponsorId(sponsor._id);
        setNombreSponsor(sponsor.nombre);
        setLinkSponsor(sponsor.link || '');
        setEstadoSponsor(sponsor.estado || 'Activo');
        setPreviewSponsorUrl(sponsor.imagen); 
        setImagenSponsor(null); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const limpiarFormularioSponsor = () => {
        setEditandoSponsorId(null);
        setNombreSponsor(''); 
        setLinkSponsor('');
        setEstadoSponsor('Activo');
        setImagenSponsor(null); 
        setPreviewSponsorUrl(null);
        if (sponsorInputRef.current) sponsorInputRef.current.value = "";
    };

    const guardarSponsor = async (e) => {
        e.preventDefault();
        if (!nombreSponsor.trim()) return;

        setCargando(true);
        Swal.fire({
            title: 'Guardando...',
            text: 'Subiendo los datos a la nube, por favor esperá.',
            background: '#171717', color: '#ffffff',
            allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false,
            customClass: { popup: 'rounded-3xl border border-neutral-800' },
            didOpen: () => Swal.showLoading()
        });

        const formData = new FormData();
        formData.append('nombre', nombreSponsor);
        formData.append('link', linkSponsor);
        formData.append('estado', estadoSponsor);
        if (imagenSponsor) formData.append('imagen', imagenSponsor); 

        try {
            let respuesta;
            if (editandoSponsorId) {
                respuesta = await fetch(`${import.meta.env.VITE_API_URL}/sponsors/${editandoSponsorId}`, { method: 'PUT', body: formData });
                const data = await respuesta.json();
                setSponsors(sponsors.map(s => s._id === editandoSponsorId ? data : s));
            } else {
                respuesta = await fetch(`${import.meta.env.VITE_API_URL}/sponsors`, { method: 'POST', body: formData });
                const data = await respuesta.json();
                setSponsors([data, ...sponsors]);
            }
            limpiarFormularioSponsor();
            Swal.fire({ title: '¡Guardado!', text: 'El sponsor se guardó correctamente.', icon: 'success', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' }, timer: 2000, showConfirmButton: false });
        } catch (error) {
            Swal.fire({ title: 'Error', text: 'Hubo un problema al guardar.', icon: 'error', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' } });
        } finally {
            setCargando(false);
        }
    };

    const eliminarSponsor = async (id) => {
        const confirmacion = await Swal.fire({
            title: '¿Borrar sponsor?', text: "Esta acción no se puede deshacer.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: '#262626', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', background: '#171717', color: '#ffffff', customClass: { popup: 'rounded-3xl border border-neutral-800' }
        });
        
        if (confirmacion.isConfirmed) {
            try {
                await fetch(`${import.meta.env.VITE_API_URL}/sponsors/${id}`, { method: 'DELETE' });
                setSponsors(sponsors.filter(s => s._id !== id));
                Swal.fire({ title: '¡Eliminado!', text: 'Sponsor borrado.', icon: 'success', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' }, timer: 1500, showConfirmButton: false });
            } catch (error) {
                Swal.fire({ title: 'Error', text: 'No se pudo borrar.', icon: 'error', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' } });
            }
        }
    };

    // ==========================================
    // FUNCIONES: CARRUSEL (SLIDES)
    // ==========================================
    const manejarImagenSlide = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            setImagenSlide(archivo);
            setPreviewSlideUrl(URL.createObjectURL(archivo));
        }
    };

    const iniciarEdicionSlide = (slide) => {
        setEditandoSlideId(slide._id);
        setTituloSlide(slide.titulo);
        setSubtituloSlide(slide.subtitulo || '');
        setLinkSlide(slide.link || '');
        setPreviewSlideUrl(slide.imagen); 
        setImagenSlide(null); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const limpiarFormularioSlide = () => {
        setEditandoSlideId(null);
        setTituloSlide(''); 
        setSubtituloSlide('');
        setLinkSlide('');
        setImagenSlide(null); 
        setPreviewSlideUrl(null);
        if (slideInputRef.current) slideInputRef.current.value = "";
    };

    const guardarSlide = async (e) => {
        e.preventDefault();
        if (!tituloSlide.trim()) return;

        if (!editandoSlideId && !imagenSlide) {
            Swal.fire({ title: 'Atención', text: 'Tenés que subir una imagen de fondo para el banner.', icon: 'warning', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' } });
            return;
        }

        setCargando(true);
        Swal.fire({
            title: 'Guardando Slide...',
            text: 'Subiendo la foto en alta calidad a la nube.',
            background: '#171717', color: '#ffffff',
            allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false,
            customClass: { popup: 'rounded-3xl border border-neutral-800' },
            didOpen: () => Swal.showLoading()
        });

        const formData = new FormData();
        formData.append('titulo', tituloSlide);
        formData.append('subtitulo', subtituloSlide);
        formData.append('link', linkSlide);
        if (imagenSlide) formData.append('imagen', imagenSlide); 

        try {
            let respuesta;
            if (editandoSlideId) {
                respuesta = await fetch(`${import.meta.env.VITE_API_URL}/slides/${editandoSlideId}`, { method: 'PUT', body: formData });
                const data = await respuesta.json();
                setSlides(slides.map(s => s._id === editandoSlideId ? data : s));
            } else {
                respuesta = await fetch(`${import.meta.env.VITE_API_URL}/slides`, { method: 'POST', body: formData });
                const data = await respuesta.json();
                setSlides([data, ...slides]);
            }
            limpiarFormularioSlide();
            Swal.fire({ title: '¡Guardado!', text: 'La portada se actualizó correctamente.', icon: 'success', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' }, timer: 2000, showConfirmButton: false });
        } catch (error) {
            Swal.fire({ title: 'Error', text: 'Hubo un problema al guardar el slide.', icon: 'error', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' } });
        } finally {
            setCargando(false);
        }
    };

    const eliminarSlide = async (id) => {
        const confirmacion = await Swal.fire({
            title: '¿Quitar de la portada?', text: "El banner se eliminará definitivamente.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: '#262626', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', background: '#171717', color: '#ffffff', customClass: { popup: 'rounded-3xl border border-neutral-800' }
        });
        
        if (confirmacion.isConfirmed) {
            try {
                await fetch(`${import.meta.env.VITE_API_URL}/slides/${id}`, { method: 'DELETE' });
                setSlides(slides.filter(s => s._id !== id));
                Swal.fire({ title: '¡Eliminado!', text: 'Banner removido.', icon: 'success', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' }, timer: 1500, showConfirmButton: false });
            } catch (error) {
                Swal.fire({ title: 'Error', text: 'No se pudo eliminar.', icon: 'error', background: '#171717', color: '#ffffff', confirmButtonColor: '#dc2626', customClass: { popup: 'rounded-3xl border border-neutral-800' } });
            }
        }
    };

    return (
        <div className="min-h-screen pt-30 md:pt-35 bg-neutral-950 flex flex-col md:flex-row font-sans text-neutral-content">
            
            {/* SIDEBAR */}
            <Reveal animation="fade-in-left" className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between shrink-0">
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
                        <button onClick={() => setPestañaActiva('sponsors')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left ${pestañaActiva === 'sponsors' ? 'bg-red-600/10 text-red-500 border border-red-600/20' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent'}`}>Sponsors</button>
                        <button onClick={() => setPestañaActiva('carrusel')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left ${pestañaActiva === 'carrusel' ? 'bg-red-600/10 text-red-500 border border-red-600/20' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent'}`}>Carrusel Portada</button>
                    </nav>
                </div>
                <div className="p-6 border-t border-neutral-800">
                    <Link to="/" className="text-neutral-500 hover:text-white transition-colors text-sm flex items-center gap-2">← Volver a la Web</Link>
                </div>
            </Reveal>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                
                {/* VISTA 1: SPONSORS */}
                {pestañaActiva === 'sponsors' && (
                    <Reveal animation="fade-in-up" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="mb-10">
                            <h1 className="text-3xl font-black text-white tracking-tight">Gestión de Auspiciantes</h1>
                            <p className="text-neutral-500">Cargá el nombre, el link y el logo de los comercios.</p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* FORMULARIO SPONSOR */}
                            <div className={`bg-neutral-900 border ${editandoSponsorId ? 'border-neutral-500' : 'border-neutral-800'} rounded-3xl p-6 shadow-xl h-fit transition-colors`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-white text-lg">{editandoSponsorId ? 'Modificando Sponsor' : 'Nuevo Sponsor'}</h3>
                                    {editandoSponsorId && <button type="button" onClick={limpiarFormularioSponsor} className="text-xs text-neutral-500 hover:text-white uppercase font-bold tracking-wider">Cancelar</button>}
                                </div>
                                <form onSubmit={guardarSponsor} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Nombre</label>
                                        <input type="text" value={nombreSponsor} onChange={(e) => setNombreSponsor(e.target.value)} placeholder="Ej: Farmacia Centro" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-500" disabled={cargando} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Link (Opcional)</label>
                                        <input type="url" value={linkSponsor} onChange={(e) => setLinkSponsor(e.target.value)} placeholder="https://instagram.com/..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-500" disabled={cargando} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Logo del comercio</label>
                                        <div className="relative">
                                            <input type="file" accept="image/*" onChange={manejarImagenSponsor} ref={sponsorInputRef} className="hidden" id="sponsor-upload" disabled={cargando} />
                                            <label htmlFor="sponsor-upload" className={`w-full bg-neutral-950 border-2 border-dashed border-neutral-800 rounded-xl px-4 py-6 flex flex-col items-center justify-center transition-all group ${cargando ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-neutral-600'}`}>
                                                {previewSponsorUrl ? <img src={previewSponsorUrl} alt="Preview" className="h-20 object-contain rounded-lg mb-2" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>}
                                                <span className="text-xs font-medium text-neutral-500">{previewSponsorUrl ? "Cambiar Imagen" : "Click para subir logo"}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={cargando} className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg mt-2 flex justify-center items-center gap-2 ${cargando ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20 active:scale-95'}`}>
                                        {cargando ? 'Guardando...' : editandoSponsorId ? 'Guardar Cambios' : 'Guardar Auspiciante'}
                                    </button>
                                </form>
                            </div>

                            {/* LISTA SPONSORS */}
                            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl h-fit">
                                <div className="px-8 py-6 border-b border-neutral-800"><h3 className="font-bold text-white text-lg">Sponsors Activos</h3></div>
                                <div className="divide-y divide-neutral-800">
                                    {sponsors.map((sponsor) => (
                                        <div key={sponsor._id} className="px-8 py-5 flex items-center justify-between hover:bg-neutral-800/30 transition-colors group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                                    {sponsor.imagen ? <img src={sponsor.imagen} alt={sponsor.nombre} className="w-full h-full object-contain p-1" /> : <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349" /></svg>}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-white">{sponsor.nombre}</p>
                                                        {sponsor.link && (
                                                            <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" title="Probar enlace">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                    <p className="text-neutral-500 text-xs tracking-wide">Cargado el: {new Date(sponsor.fecha).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => iniciarEdicionSponsor(sponsor)} disabled={cargando} className={`p-2.5 rounded-xl transition-all ${cargando ? 'opacity-50 cursor-not-allowed text-neutral-700 bg-neutral-950 border border-neutral-900' : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-600 hover:text-white border border-neutral-800'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg></button>
                                                <button onClick={() => eliminarSponsor(sponsor._id)} disabled={cargando} className={`p-2.5 rounded-xl transition-all ${cargando ? 'opacity-50 cursor-not-allowed text-neutral-700 bg-neutral-950 border border-neutral-900' : 'bg-neutral-950 hover:bg-red-600/10 text-neutral-600 hover:text-red-500 border border-neutral-800'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 12m-4.72 0-.34-12M9.25 13.25c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8Zm4.7 0c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8ZM4.75 5.75h14.5M6.25 5.75l.77 13.97a2.25 2.25 0 0 0 2.24 2.13h5.48a2.25 2.25 0 0 0 2.24-2.13l.77-13.97M9.25 5.75V4.3c0-.85.65-1.55 1.5-1.55h2.5c.85 0 1.5.7 1.5 1.55v1.45" /></svg></button>
                                            </div>
                                        </div>
                                    ))}
                                    {sponsors.length === 0 && <div className="p-10 text-center text-neutral-500 text-sm">No hay sponsors cargados.</div>}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* VISTA 2: CARRUSEL PRINCIPAL */}
                {pestañaActiva === 'carrusel' && (
                    <Reveal animation="fade-in-up" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="mb-10">
                            <h1 className="text-3xl font-black text-white tracking-tight">Carrusel de Portada</h1>
                            <p className="text-neutral-500">Cargá las noticias principales que pasarán en grande al inicio de la web.</p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* FORMULARIO SLIDE */}
                            <div className={`bg-neutral-900 border ${editandoSlideId ? 'border-neutral-500' : 'border-neutral-800'} rounded-3xl p-6 shadow-xl h-fit transition-colors`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-white text-lg">{editandoSlideId ? 'Editando Portada' : 'Nueva Portada'}</h3>
                                    {editandoSlideId && <button type="button" onClick={limpiarFormularioSlide} className="text-xs text-neutral-500 hover:text-white uppercase font-bold tracking-wider">Cancelar</button>}
                                </div>
                                <form onSubmit={guardarSlide} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Título Principal</label>
                                        <input type="text" value={tituloSlide} onChange={(e) => setTituloSlide(e.target.value)} placeholder="Ej: Nuevo Programa" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-500" disabled={cargando} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Subtítulo (Opcional)</label>
                                        <textarea value={subtituloSlide} onChange={(e) => setSubtituloSlide(e.target.value)} placeholder="Breve descripción..." rows="2" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-500 resize-none" disabled={cargando}></textarea>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Link del botón "Ver más" (Opcional)</label>
                                        <input type="url" value={linkSlide} onChange={(e) => setLinkSlide(e.target.value)} placeholder="https://..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-neutral-500" disabled={cargando} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Imagen de fondo</label>
                                        <div className="relative">
                                            <input type="file" accept="image/*" onChange={manejarImagenSlide} ref={slideInputRef} className="hidden" id="slide-upload" disabled={cargando} />
                                            <label htmlFor="slide-upload" className={`w-full bg-neutral-950 border-2 border-dashed border-neutral-800 rounded-xl px-4 py-6 flex flex-col items-center justify-center transition-all group ${cargando ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-neutral-600'}`}>
                                                {previewSlideUrl ? <img src={previewSlideUrl} alt="Preview" className="h-20 w-full object-cover rounded-lg mb-2 opacity-80" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-600 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>}
                                                <span className="text-xs font-medium text-neutral-500">{previewSlideUrl ? "Cambiar Fondo" : "Resolución ideal: 1920x1080px"}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={cargando} className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg mt-2 flex justify-center items-center gap-2 ${cargando ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20 active:scale-95'}`}>
                                        {cargando ? 'Guardando...' : editandoSlideId ? 'Guardar Cambios' : 'Subir Portada'}
                                    </button>
                                </form>
                            </div>

                            {/* LISTA SLIDES */}
                            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl h-fit">
                                <div className="px-8 py-6 border-b border-neutral-800"><h3 className="font-bold text-white text-lg">Portadas Activas en la Web</h3></div>
                                <div className="divide-y divide-neutral-800">
                                    {slides.map((slide) => (
                                        <div key={slide._id} className="px-8 py-5 flex items-center justify-between hover:bg-neutral-800/30 transition-colors group">
                                            <div className="flex items-center gap-5 overflow-hidden">
                                                {/* Miniatura de la imagen */}
                                                <div className="w-24 h-14 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shrink-0">
                                                    <img src={slide.imagen} alt={slide.titulo} className="w-full h-full object-cover opacity-80" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-white truncate max-w-50 md:max-w-75">{slide.titulo}</p>
                                                        {slide.link && (
                                                            <a href={slide.link} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors shrink-0" title="Probar enlace">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                    <p className="text-neutral-500 text-xs truncate max-w-50 md:max-w-75">{slide.subtitulo || "Sin subtítulo"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button onClick={() => iniciarEdicionSlide(slide)} disabled={cargando} className={`p-2.5 rounded-xl transition-all ${cargando ? 'opacity-50 cursor-not-allowed text-neutral-700 bg-neutral-950 border border-neutral-900' : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-600 hover:text-white border border-neutral-800'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg></button>
                                                <button onClick={() => eliminarSlide(slide._id)} disabled={cargando} className={`p-2.5 rounded-xl transition-all ${cargando ? 'opacity-50 cursor-not-allowed text-neutral-700 bg-neutral-950 border border-neutral-900' : 'bg-neutral-950 hover:bg-red-600/10 text-neutral-600 hover:text-red-500 border border-neutral-800'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 12m-4.72 0-.34-12M9.25 13.25c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8Zm4.7 0c.44 0 .8-.36.8-.8v-3.7c0-.44-.36-.8-.8-.8s-.8.36-.8.8v3.7c0 .44.36.8.8.8ZM4.75 5.75h14.5M6.25 5.75l.77 13.97a2.25 2.25 0 0 0 2.24 2.13h5.48a2.25 2.25 0 0 0 2.24-2.13l.77-13.97M9.25 5.75V4.3c0-.85.65-1.55 1.5-1.55h2.5c.85 0 1.5.7 1.5 1.55v1.45" /></svg></button>
                                            </div>
                                        </div>
                                    ))}
                                    {slides.length === 0 && <div className="p-10 text-center text-neutral-500 text-sm">No hay portadas cargadas. Añadí la primera.</div>}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}
            </main>
        </div>
    );
};

export default Panel;