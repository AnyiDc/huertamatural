import { useEffect, useState } from "react";
import storage from "../util/storage";
import FiltroCategoria from "../componentes/FiltroCategoria";
import "../componentes/Producto.css";

function VistaPrincipal() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  useEffect(() => {
    const lista = storage.consultar("productos") || [];
    setProductos(lista);
  }, []);

  const categorias = ["todas", ...new Set(productos.map(p => p.categoria))];
  const productosFiltrados = categoriaSeleccionada === "todas"
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  return (
    <div>
      <div className="fondo-suave"></div>

      <FiltroCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        onCambiar={setCategoriaSeleccionada}
      />

      <h1 style={{ textAlign: "center" }}>Productos disponibles</h1>
      <div className="productos-container">
        {productosFiltrados.map((p, i) => (
          <div key={i} className="producto-card">
            {p.imagen && (
              <img src={p.imagen} alt={p.nombre} className="producto-imagen" />
            )}
            <h2 className="producto-nombre">{p.nombre}</h2>
            <p className="producto-descripcion">{p.descripcion}</p>
            <p className="producto-precio">Precio: ${p.precio}</p>
            <p className="producto-categoria">Categoría: {p.categoria}</p>
            <p className="producto-cantidad">Cantidad: {p.cantidad}</p>
            {p.agotado && <p className="producto-agotado">¡Producto agotado!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VistaPrincipal;




