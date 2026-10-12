import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIdioma } from "./Idioma";
import { lances, montarLance } from "./distribuicao";

const molaHover = { type: "spring", stiffness: 300, damping: 20 };
const molaDestaque = { type: "spring", stiffness: 140, damping: 18 };

// distância entre uma carta e a seguinte na fileira (largura da carta menos a sobreposição do CSS)
const PASSO = 180;

function montarChegada(modo, posicao, giro, altura, compacto) {
  if (modo === "distribuir") {
    const lance = montarLance(lances[posicao], giro, altura, compacto);
    return {
      partida: lance.cartaPartida,
      entrada: lance.cartaEntrada,
      sombraPartida: lance.sombraPartida,
      sombraEntrada: lance.sombraEntrada
    };
  }

  if (modo === "subir") {
    const mola = { type: "spring", stiffness: 110, damping: 15, delay: 0.1 + posicao * 0.08 };
    return {
      partida: { x: 0, y: 240, rotate: 0, opacity: 0 },
      entrada: { x: 0, y: altura, rotate: giro, opacity: 1, transition: mola },
      sombraPartida: { y: 18, scale: 1, opacity: 0 },
      sombraEntrada: { y: 18, scale: 1, opacity: 0.6, transition: mola }
    };
  }

  return { partida: false, entrada: {}, sombraPartida: false, sombraEntrada: {} };
}

// modo: "distribuir" (primeira visita), "parado" (já na mesa) ou "subir" (baralho aberto)
export default function Carta({ carta, posicao, modo = "parado", atual, destaque, recuo, pular, aoEscolher, aoTerminar }) {
  const { t } = useIdioma();
  const [fase, setFase] = useState(modo === "parado" ? "repouso" : "voo");
  const [sobre, setSobre] = useState(false);

  const compacto = window.innerWidth <= 800;
  const giro = compacto ? 0 : carta.giro;
  const altura = compacto ? 0 : carta.altura;
  const elevada = sobre && fase === "repouso" && !compacto && !destaque && !recuo;

  // calculado uma vez: se mudasse a cada render, passar o mouse no voo reiniciaria os quadros
  const [chegada] = useState(() => montarChegada(modo, posicao, giro, altura, compacto));

  useEffect(() => {
    if (pular && fase === "voo") setFase("repouso");
  }, [pular, fase]);

  // a escolhida vem para o centro da fileira e cresce; as outras afundam e escurecem
  let repouso = {
    x: 0, y: elevada ? -30 : altura, rotate: elevada ? 0 : giro,
    rotateX: 0, rotateY: 0, scale: 1, opacity: 1, transition: molaHover
  };
  let sombraRepouso = {
    y: elevada ? 40 : 18, scale: elevada ? 1.04 : 1, opacity: elevada ? 0.4 : 0.6, transition: molaHover
  };

  if (destaque) {
    repouso = {
      x: compacto ? 0 : (2 - posicao) * PASSO, y: -10, rotate: 0,
      rotateX: 0, rotateY: 0, scale: compacto ? 1.06 : 1.4, opacity: 1, transition: molaDestaque
    };
    sombraRepouso = { y: 60, scale: 1.1, opacity: 0.5, transition: molaDestaque };
  }

  if (recuo) {
    repouso = { ...repouso, y: altura + 24, scale: 0.92, opacity: 0.3, transition: molaDestaque };
    sombraRepouso = { ...sombraRepouso, opacity: 0.2, transition: molaDestaque };
  }

  const assentou = () => {
    if (fase !== "voo") return;
    setFase("repouso");
    if (aoTerminar) aoTerminar();
  };

  return (
    <motion.div
      className="carta-mesa"
      style={{ transformPerspective: 900, zIndex: destaque ? 20 : undefined }}
      initial={chegada.partida}
      animate={fase === "voo" ? chegada.entrada : repouso}
      exit={modo === "subir" ? { y: 240, opacity: 0, transition: { duration: 0.2 } } : undefined}
      onAnimationComplete={assentou}
      onHoverStart={() => setSobre(true)}
      onHoverEnd={() => setSobre(false)}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="carta-sombra"
        initial={chegada.sombraPartida}
        animate={fase === "voo" ? chegada.sombraEntrada : sombraRepouso}
      />

      <div className={atual ? "carta atual" : "carta"}>
        <span className="carta-numero">{carta.romano}</span>
        {carta.id === "contato" && (
          <svg className="carta-icone" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 6l9 7 9-7" />
          </svg>
        )}
        <span className="carta-rotulo">{carta.rotulo}</span>
        <strong className="carta-titulo">{t("nav_" + carta.id)}</strong>
        <span className="carta-texto">{t("carta_" + carta.id)}</span>

        <Link
          className="carta-link"
          to={"/" + carta.id}
          aria-label={t("nav_" + carta.id)}
          onClick={(evento) => aoEscolher && aoEscolher(evento, carta.id)}
        />
      </div>
    </motion.div>
  );
}
