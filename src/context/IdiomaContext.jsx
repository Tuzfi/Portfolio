import { createContext, useContext, useEffect, useState } from "react";
import { textos } from "../data/textos";

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "pt");

  useEffect(() => {
    localStorage.setItem("idioma", idioma);
    document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";
  }, [idioma]);

  const t = (chave) => textos[idioma][chave];

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma, t }}>
      {children}
    </IdiomaContext.Provider>
  );
}

export const useIdioma = () => useContext(IdiomaContext);
