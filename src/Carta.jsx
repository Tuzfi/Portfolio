import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIdioma } from "./Idioma";
import { lances, montarLance } from "./distribuicao";

const molaHover = { type: "spring", stiffness: 300, damping: 20 };
const molaDestaque = { type: "spring", stiffness: 140, damping: 18 };

// distância entre uma carta e a seguinte na fileira (largura da carta menos a sobreposição do CSS)
const PASSO = 180;
const AJUSTES_MESA = [-20, -20, -25, 40, 35];

function IlustracaoCarta({ id }) {
  const formas = {
    sobre: (
      <>
        <circle cx="60" cy="43" r="14" />
        <path d="M31 103c2-22 13-34 29-34s27 12 29 34c-17 9-41 9-58 0Z" />
        <path d="M24 108h72M37 87l-8 10m54-10 8 10M60 20v8m-38 15 8 5m60-5-8 5" />
      </>
    ),
    projetos: (
      <>
        <path d="m26 47 34-20 34 20-34 20-34-20Z" />
        <path d="m26 60 34 20 34-20M26 74l34 20 34-20M60 47v20" />
        <path d="m48 43 12-7 12 7-12 7-12-7Z" />
      </>
    ),
    experiencias: (
      <>
        <path d="M39 25h42M39 101h42M43 27c0 16 17 19 17 36S43 83 43 99m34-72c0 16-17 19-17 36s17 20 17 36" />
        <path d="M49 58h22M51 66h18M55 74h10" />
        <circle cx="60" cy="63" r="39" />
      </>
    ),
    habilidades: (
      <>
        <path d="m39 35 42 50M78 31l-9 8 8 9 9-8a17 17 0 0 1-22 20L39 85l-9-9 25-25a17 17 0 0 1 22-20Z" />
        <path d="m30 76 9 9m-5-19 9 9m28-39 8 8" />
        <circle cx="60" cy="63" r="39" />
      </>
    ),
    contato: (
      <>
        <rect x="26" y="39" width="68" height="48" rx="1" />
        <path d="m27 42 33 27 33-27M28 85l23-20m41 20L69 65" />
        <path d="M60 20v10m-37 8 8 5m58-5-8 5" />
      </>
    )
  };

  return (
    <svg className={`carta-arte carta-arte-${id}`} viewBox="0 0 120 126" fill="none" aria-hidden="true">
      <circle className="carta-arte-halo" cx="60" cy="63" r="49" />
      <g stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
        {formas[id]}
      </g>
      <path className="carta-arte-base" d="M18 116h84" />
    </svg>
  );
}

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

// modo: "distribuir" (entrada na home), "parado" (já na mesa) ou "subir" (baralho aberto)
export default function Carta({ carta, posicao, modo = "parado", atual, destaque, recuo, pular, aoEscolher, aoTerminar }) {
  const { t } = useIdioma();
  const [fase, setFase] = useState(modo === "parado" ? "repouso" : "voo");
  const [sobre, setSobre] = useState(false);
  const [centroX, setCentroX] = useState(0);
  const elemento = useRef(null);

  const compacto = window.innerWidth <= 800;
  const giro = compacto ? 0 : carta.giro;
  const altura = compacto ? 0 : carta.altura;
  const ajusteMesa = compacto || modo === "subir" ? 0 : AJUSTES_MESA[posicao];
  const elevada = sobre && fase === "repouso" && !compacto && !destaque && !recuo;

  useLayoutEffect(() => {
    if (!destaque || !compacto || !elemento.current) return;
    const caixa = elemento.current.getBoundingClientRect();
    setCentroX(window.innerWidth / 2 - (caixa.left + caixa.width / 2));
  }, [destaque, compacto]);

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
      x: compacto ? centroX : (2 - posicao) * PASSO - ajusteMesa, y: -10, rotate: 0,
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
      ref={elemento}
      className="carta-mesa"
      style={{ left: ajusteMesa, transformPerspective: 900, zIndex: destaque ? 20 : undefined }}
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

      <div className={`carta carta-${carta.id}${atual ? " atual" : ""}`}>
        <span className="carta-numero">{carta.romano}</span>
        <IlustracaoCarta id={carta.id} />
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
