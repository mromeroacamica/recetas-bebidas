import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const ModalContext = createContext();
const ModalProvider = (props) => {
  const [idReceta, guardarIdReceta] = useState(null);
  const [inforeceta, guardarReceta] = useState({});
  //llamar a la api una vez seleccionada una receta
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
      const resultado = await Axios.get(url);
      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  });
  return (
    <ModalContext.Provider
      value={{ guardarIdReceta, inforeceta, guardarReceta }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
