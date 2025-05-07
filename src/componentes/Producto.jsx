import React, { useState } from "react";
import "./Producto.css";
import FiltroCategoria from "./FiltroCategoria";

function Producto({ datos, eliminarProducto, editarProducto }) {
  const rol = localStorage.getItem("rol");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  const categorias = ["todas", ...new Set(datos.map(p => p.categoria))];

  const productosFiltrados = categoriaSeleccionada === "todas"
    ? datos
    : datos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <div>
      <FiltroCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onCambiar={setCategoriaSeleccionada}
      />

      <div className="productos-container">
        {productosFiltrados.map((producto, index) => (
          <div key={index} className="producto-card">
            <h2 className="producto-nombre">{producto.nombre}</h2>
            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
              />
            )}
            <p className="producto-precio">Precio: ${producto.precio}</p>
            <p className="producto-descripcion">{producto.descripcion}</p>
            <p className="producto-categoria">Categoría: {producto.categoria}</p>
            <p className="producto-cantidad">Cantidad: {producto.cantidad}</p>
            {producto.agotado && (
              <p className="producto-agotado">¡Producto agotado!</p>
            )}
            {rol === '"admin"' && (
              <div className="producto-botones">
                <button onClick={() => editarProducto(index)} className="btn editar">Editar</button>
                <button onClick={() => eliminarProducto(index)} className="btn eliminar">Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Producto;


