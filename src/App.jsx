import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/Login";
import VistaPrincipal from "./paginas/VistaPrincipal";
import RutaProtegida from "./componentes/RutaProtegida";
import FormularioProductos from "./componentes/FormularioProductos";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/FormularioProductos" element={<FormularioProductos />} />
        {/* Redirige a Login por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<VistaPrincipal />} />

        {/* Ruta protegida */}
        <Route
          path="/FormularioProductos"
          element={
            <RutaProtegida rolRequerido="admin">
              <FormularioProductos />
            </RutaProtegida>
          }
        />
        
        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


