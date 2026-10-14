import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartas } from "../data/cartas";
import Carta from "../components/deck/Carta";
import Pagina from "../components/shared/Pagina";
import { useIdioma } from "../context/IdiomaContext";

export default function Inicio() {
  const { t } = useIdioma();
  const navegar = useNavigate();
   const reduzir = false;
  const [distribuir] = useState(() => !reduzir);
  const [intro, setIntro] = useState(distribuir);
  const [pulou, setPulou] = useState(false);
  const [escolhida, setEscolhida] = useState(null);

  const encerrarIntro = () => {
    setIntro(false);
  };

  useLayoutEffect(() => {
    if (!intro) return;

    const html = document.documentElement;
    const body = document.body;
    const overflowHtml = html.style.overflowY;
    const overflowBody = body.style.overflowY;

    html.style.overflowY = "hidden";
    body.style.overflowY = "hidden";

    return () => {
      html.style.overflowY = overflowHtml;
      body.style.overflowY = overflowBody;
    };
  }, [intro]);

  const pularIntro = () => {
    setPulou(true);
    encerrarIntro();
  };

  useEffect(() => {
    if (!intro) return;
    const aoTeclar = (evento) => {
      if (evento.key === "Escape") pularIntro();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [intro]);

  const escolher = (evento, id) => {
    if (evento.metaKey || evento.ctrlKey || escolhida) return;
    evento.preventDefault();
    if (reduzir) return navegar("/" + id);
    setEscolhida(id);
    setTimeout(() => navegar("/" + id), 650);
  };

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
            pular={pulou}
            destaque={escolhida === carta.id}
            recuo={escolhida !== null && escolhida !== carta.id}
            aoEscolher={escolher}
            aoTerminar={i === cartas.length - 1 ? encerrarIntro : undefined}
          />
        ))}
      </div>

      <p className="legenda">{t("inicio_legenda")}</p>

      {intro && (
        <button type="button" className="botao pular" onClick={pularIntro}>
          {t("pular")}
        </button>
      )}
    </Pagina>
  );
}
