const storage = {
    agregar: (clave, valor) => {
      localStorage.setItem(clave, JSON.stringify(valor));
    },
  
    eliminar: (clave) => {
      localStorage.removeItem(clave);
    },
  
    actualizar: (clave, nuevoValor) => {
      localStorage.setItem(clave, JSON.stringify(nuevoValor));
    },
  
    consultar: (clave) => {
      const dato = localStorage.getItem(clave);
      return dato ? JSON.parse(dato) : null;
    }
    
  };
  
  export default storage;
  