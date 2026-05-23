import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Inicio from "./components/pages/Inicio";
import QuienesSomos from "./components/pages/QuienesSomos";
import Login from "./components/pages/Login";
import Panel from "./components/pages/Panel";
import ScrollToTop from "./components/shared/ScrollToTop";
import Fab from "./components/Fab";

// ESTE ES EL PATOVICA: Protege la ruta del panel
const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('tokenAdmin');
  
  if (!token) {
    // Si no hay token guardado, lo redirigimos al login
    return <Navigate to="/acceder" replace />;
  }
  
  // Si hay token, lo dejamos renderizar el componente (Panel)
  return children;
};

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Menu />
      <Fab/>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/acceder" element={<Login />} />
          
          {/* Envolvemos el Panel con la RutaProtegida */}
          <Route 
            path="/panel" 
            element={
              <RutaProtegida>
                <Panel />
              </RutaProtegida>
            } 
          />
          
          <Route
            path="*"
            element={
              <div className="text-white text-center py-20 text-2xl">
                Error 404: Página no encontrada
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;