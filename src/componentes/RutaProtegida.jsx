import { Navigate } from "react-router-dom";
import storage from "../util/storage";

const RutaProtegida = ({ children, rolRequerido }) => {
  const usuario = storage.consultar("usuario");
  const rolUsuario = storage.consultar("rol");

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (rolUsuario !== rolRequerido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RutaProtegida;


