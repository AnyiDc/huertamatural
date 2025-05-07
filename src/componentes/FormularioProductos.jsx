import storage from "../util/storage";
import { useEffect, useState } from "react";
import Producto from "./Producto";
import Mermeladas from "../assets/Mermeladas.jpg";
import Panaderia from "../assets/Panaderia.jpg";
import Lacteos from "../assets/Lacteos.jpg";
import Conservas from "../assets/Conservas.jpg";
import "./FormularioProductos.css"

function FormularioProductos() {
  const [rolUsuario, setRolUsuario] = useState("usuario");

  useEffect(() => {
    const rol = localStorage.getItem("rol") || "usuario";
    setRolUsuario(rol);
  }, []);

  const [guardaproductos, setGuardarProductos] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    categoria: "",
    cantidad: "",
  });

  const [productosGuardados, setProductosGuardados] = useState([]);
  const [indiceEditando, setIndiceEditando] = useState(null);

  useEffect(() => {
    const lista = storage.consultar("productos") || [];
    setProductosGuardados(lista);
  }, []);

  const guardar = (e) => {
    setGuardarProductos({
      ...guardaproductos,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
  
   
    let imagenFinal = guardaproductos.imagen.trim();
  
    if (!imagenFinal || (imagenFinal.startsWith("data:") === false && imagenFinal.startsWith("/assets") === false)) {
      switch (guardaproductos.categoria) {
        case "mermeladas":
          imagenFinal = Mermeladas;
          break;
        case "panaderia":
          imagenFinal = Panaderia;
          break;
        case "lacteos":
          imagenFinal = Lacteos;
          break;
        case "conservas":
          imagenFinal = Conservas;
          break;
        default:
          imagenFinal = "/assets/default.png";
      }
    }
  
    if (!guardaproductos.nombre || !guardaproductos.precio || !guardaproductos.cantidad) {
      alert("Por favor, completa todos los campos obligatorios.");
      return; // Evitar el envío si hay campos vacíos
    }
  
    const descripcionFinal = `${guardaproductos.descripcion} - Categoría: ${guardaproductos.categoria}`;
    const productoFinal = {
      ...guardaproductos,
      imagen: imagenFinal,
      descripcion: descripcionFinal,
    };
  
    let nuevaLista;
    if (indiceEditando !== null) {
      nuevaLista = [...productosGuardados];
      nuevaLista[indiceEditando] = productoFinal;
      setIndiceEditando(null);
    } else {
      nuevaLista = [...productosGuardados, productoFinal];
    }
  
    // Actualizar el estado de productos guardados y el almacenamiento
    setProductosGuardados(nuevaLista);
    storage.actualizar("productos", nuevaLista);
  
    // Limpiar el formulario
    setGuardarProductos({
      nombre: "",
      precio: "",
      descripcion: "",
      imagen: "",
      categoria: "",
      cantidad: "",
      agotado: false,
    });
  };
  
    

  const eliminarProducto = (index) => {
    const nuevaLista = [...productosGuardados];
    nuevaLista.splice(index, 1);
    setProductosGuardados(nuevaLista);
    storage.actualizar("productos", nuevaLista);
  };

  const editarProducto = (index) => {
    const productoAEditar = productosGuardados[index];
    setGuardarProductos(productoAEditar);
    setIndiceEditando(index);
  };

  return (
    <div>
      {rolUsuario === '"admin"' && (
        <form onSubmit={submit} className="formularioproductos">
          <h1>Formulario productos</h1>
          <label>Nombre del producto</label>
          <input
            name="nombre"
            onChange={guardar}
            type="text"
            value={guardaproductos.nombre}
          />
          <label>Imagen del producto</label>
          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGuardarProductos({
          ...guardaproductos,
          imagen: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }}
/>



          <label>Precio</label>
          <input
            name="precio"
            onChange={guardar}
            type="text"
            value={guardaproductos.precio}
          />

          <label>Descripción</label>
          <input
            name="descripcion"
            onChange={guardar}
            type="text"
            value={guardaproductos.descripcion}
          />

          <label>Categoría</label>
          <select
            name="categoria"
            onChange={guardar}
            value={guardaproductos.categoria}
          >
            <option value="mermeladas">Mermeladas</option>
            <option value="panaderia">Panadería</option>
            <option value="lacteos">Lácteos</option>
            <option value="conservas">Conservas</option>
          </select>

          <label>Cantidad</label>
          <input
            name="cantidad"
            onChange={guardar}
            type="text"
            value={guardaproductos.cantidad}
          />
          <label>
            <input
              type="checkbox"
              name="agotado"
              checked={guardaproductos.agotado}
              onChange={(e) => {
                const agotado = e.target.checked;
                setGuardarProductos({
                  ...guardaproductos,
                  agotado,
                  cantidad: agotado ? "0" : guardaproductos.cantidad, 
                });
              }}
            />
            ¿Producto agotado?
          </label>

          <button type="submit">Agregar</button>
        </form>
      )}

      <Producto
        datos={productosGuardados}
        eliminarProducto={eliminarProducto}
        editarProducto={editarProducto}
        rol={rolUsuario}
      />
    </div>
  );
}

export default FormularioProductos;
