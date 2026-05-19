import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Inicio from "./components/pages/Inicio";
import QuienesSomos from "./components/pages/QuienesSomos";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
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
