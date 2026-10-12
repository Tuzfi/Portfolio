import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { cartas } from "./cartas";
import { useIdioma } from "./Idioma";
import Baralho from "./Baralho";
import Inicio from "./paginas/Inicio";
import Sobre from "./paginas/Sobre";
import Projetos from "./paginas/Projetos";
import Experiencias from "./paginas/Experiencias";
import Habilidades from "./paginas/Habilidades";
import Contato from "./paginas/Contato";

export default function App() {
  const local = useLocation();
  const { idioma, setIdioma, t } = useIdioma();
  const [baralhoAberto, setBaralhoAberto] = useState(false);

  const naHome = local.pathname === "/";
  const posicao = cartas.findIndex((c) => "/" + c.id === local.pathname);
  const proxima = cartas[(posicao + 1) % cartas.length];

  const fecharBaralho = useCallback(() => setBaralhoAberto(false), []);

  useEffect(() => {
    setBaralhoAberto(false);
    window.scrollTo(0, 0);
  }, [local.pathname]);

  return (
    <>
      <header className="topo">
        <Link className="marca" to="/">Keven Lino</Link>
        <div className="idiomas">
          {["pt", "en"].map((sigla) => (
            <button
              key={sigla}
              type="button"
              className={idioma === sigla ? "ativo" : ""}
              onClick={() => setIdioma(sigla)}
            >
              {sigla.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main>
        {!naHome && (
          <div className="barra">
            <Link className="botao" to="/">{t("voltar")}</Link>
            <Link className="botao" to={"/" + proxima.id}>{t("proxima")}</Link>
          </div>
        )}

        <AnimatePresence mode="wait">
          <Routes location={local} key={local.pathname}>
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/experiencias" element={<Experiencias />} />
            <Route path="/habilidades" element={<Habilidades />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </AnimatePresence>

        {!naHome && (
          <button id="abrir-baralho" className="botao" type="button" onClick={() => setBaralhoAberto(true)}>
            {t("baralho")}
          </button>
        )}
      </main>

      <Baralho aberto={baralhoAberto} fechar={fecharBaralho} />

      <footer className="rodape">
        <span>Portfólio • Keven Lino</span>
        <span>© 2026 Keven Henrique de Carvalho Lino</span>
      </footer>
    </>
  );
}
