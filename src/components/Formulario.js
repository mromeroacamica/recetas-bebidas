import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/categoriaContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  const { categorias } = useContext(CategoriasContext);
  const { guardarBusquedaRecetas, guardarConsultar } = useContext(
    RecetasContext
  );
  //   console.log(categorias);
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  //funcion para guardar los datos seleccionados
  const obtenerDatosReceta = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        // console.log(busqueda);
        guardarBusquedaRecetas(busqueda);
        guardarConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Busca bebidas por Categoria o Ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por Ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatosReceta}
          >
            <option value="">---Selecciona Categoria---</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Recetas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
