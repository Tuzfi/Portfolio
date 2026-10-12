import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cartas } from "./cartas";
import Carta from "./Carta";
import { useIdioma } from "./Idioma";

export default function Baralho({ aberto, fechar }) {
  const { t } = useIdioma();
  const local = useLocation();

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento) => {
      if (evento.key === "Escape") fechar();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto, fechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <div className="baralho">
          <motion.div
            className="baralho-fundo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fechar}
          />
          <div className="baralho-painel">
            <p className="rotulo">{t("baralho_aberto")}</p>
            <div className="cartas">
              {cartas.map((carta, i) => (
                <Carta
                  key={carta.id}
                  carta={carta}
                  posicao={i}
                  modo="subir"
                  atual={"/" + carta.id === local.pathname}
                  aoEscolher={fechar}
                />
              ))}
            </div>
            <button className="botao" type="button" onClick={fechar}>{t("fechar")}</button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
