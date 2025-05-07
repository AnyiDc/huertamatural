import storage from "./storage";

export const iniciarSesion = (usuario, contraseña) => {
  if (usuario === "admin" && contraseña === "1234") {
    storage.agregar("rol", "admin"); 
    return true;
  }

  if (usuario === "cliente" && contraseña === "1234") {
    storage.agregar("rol", "usuario"); 
    return true;
  }

  return false;
};

