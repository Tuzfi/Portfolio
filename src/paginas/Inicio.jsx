import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cartas } from "../cartas";
import Carta from "../Carta";
import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const CHAVE = "baralho-distribuido";

export default function Inicio() {
  const { t } = useIdioma();
  const reduzir = useReducedMotion();
  const [distribuir] = useState(() => !reduzir && !sessionStorage.getItem(CHAVE));

  const marcarVisita = () => sessionStorage.setItem(CHAVE, "1");

  return (
    <Pagina className="inicio" entrada={!distribuir}>
      <div className="inicio-texto">
        <p className="rotulo">{t("inicio_tag")}</p>
        <h1>{t("inicio_titulo")}</h1>
        <p>{t("inicio_texto")}</p>
        <p className="dica">{t("inicio_dica")}</p>
      </div>

      <div className="cartas">
        {cartas.map((carta, i) => (
          <Carta
            key={carta.id}
            carta={carta}
            posicao={i}
            modo={distribuir ? "distribuir" : "parado"}
            aoTerminar={i === cartas.length - 1 ? marcarVisita : undefined}
          />
        ))}
      </div>

      <p className="legenda">{t("inicio_legenda")}</p>
    </Pagina>
  );
}
