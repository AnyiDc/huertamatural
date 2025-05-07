import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../util/storage";
import { iniciarSesion } from "../util/autenticacion";
import "./Login.css";

function Login() {
  const [paso, setPaso] = useState("seleccion");
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const [rolGuardado, setRolGuardado] = useState(null);  // Estado para el rol guardado

  const navigate = useNavigate();

  // Comprobar si ya hay un rol guardado en localStorage cuando el componente se monta
  useEffect(() => {
    const rolEnStorage = localStorage.getItem("rol"); // Verifica si hay rol guardado
    setRolGuardado(rolEnStorage); // Actualiza el estado con el valor del rol
    if (rolEnStorage === "admin") {
      navigate("/FormularioProductos");
    } else if (rolEnStorage === "usuario") {
      navigate("/productos");
    }
  }, [navigate]);

  const manejarSeleccionRol = (rol) => {
    setRolSeleccionado(rol);
    if (rol === "cliente") {
      storage.agregar("rol", "usuario"); // Guarda el rol en localStorage
      setRolGuardado("usuario"); // Actualiza el estado del rol
      navigate("/productos");
    } else {
      setPaso("login");
    }
  };

  const manejarLoginAdmin = () => {
    const valido = iniciarSesion(usuario, contraseña);

    if (valido) {
      storage.agregar("rol", "admin"); // Guarda el rol como admin en localStorage
      setRolGuardado("admin"); // Actualiza el estado del rol
      navigate("/FormularioProductos");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  // Función para cerrar sesión
  const manejarCerrarSesion = () => {
    storage.eliminar("rol");  // Elimina el rol guardado en localStorage
    setRolGuardado(null);  // Actualiza el estado del rol
    navigate("/login");  // Redirige a la página de login
  };

  return (
    <div className="login-container">
  {rolGuardado && (
    <button onClick={manejarCerrarSesion} className="button button-logout">
      Cerrar sesión
    </button>
  )}

  {paso === "seleccion" && !rolGuardado && (
    <>
      <h2 className="login-title">Selecciona tu rol</h2>
      <button onClick={() => manejarSeleccionRol("admin")} className="button button-admin">
        Iniciar como Admin
      </button>
      <button onClick={() => manejarSeleccionRol("cliente")} className="button button-cliente">
        Iniciar como Cliente
      </button>
    </>
  )}

  {paso === "login" && !rolGuardado && (
    <>
      <h2 className="login-title">Iniciar sesión (Admin)</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        className="login-input"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={manejarLoginAdmin} className="button button-admin">
        Iniciar sesión como Admin
      </button>
      <button onClick={() => setPaso("seleccion")} className="link-button">
        Volver
      </button>
    </>
  )}
</div>

  );
}

export default Login;

