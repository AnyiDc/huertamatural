// componentes/FiltroCategoria.jsx
import React from "react";
import "./FiltroCategoria.css"; // Puedes usar el mismo CSS o moverlo aquí

function FiltroCategoria({ categorias, categoriaSeleccionada, onCambiar }) {
  return (
    <div className="filtro-barra">
      <label>Filtrar por categoría:</label>
      <select
        value={categoriaSeleccionada}
        onChange={(e) => onCambiar(e.target.value)}
      >
        {categorias.map((cat, index) => (
          <option key={index} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategoria;
