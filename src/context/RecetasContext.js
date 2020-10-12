import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, guardarRecetas] = useState([]);
  const [busqueda, guardarBusquedaRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [consultar, guardarConsultar] = useState(false);
  const { nombre, categoria } = busqueda;
  //   console.log(busqueda);
  useEffect(() => {
    // console.log(consultar);
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await Axios.get(url);
        guardarRecetas(resultado.data.drinks);
      };
      obtenerRecetas();
      guardarConsultar(false);
    }
    return;
  }, [busqueda]);
  return (
    <RecetasContext.Provider
      value={{ guardarBusquedaRecetas, guardarConsultar, recetas }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};
export default RecetasProvider;
