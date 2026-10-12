import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { cartas } from "../data/cartas";
import { useIdioma } from "../context/IdiomaContext";
import Baralho from "../components/deck/Baralho";
import Inicio from "../pages/Inicio";
import Sobre from "../pages/Sobre";
import Projetos from "../pages/Projetos";
import Experiencias from "../pages/Experiencias";
import Habilidades from "../pages/Habilidades";
import Contato from "../pages/Contato";

const Curriculo = lazy(() => import("../pages/Curriculo"));

export default function App() {
  const local = useLocation();
  const { idioma, setIdioma, t } = useIdioma();
  const [baralhoAberto, setBaralhoAberto] = useState(false);

  const naHome = local.pathname === "/";
  const naPaginaCurriculo = local.pathname === "/curriculo";
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
            {!naPaginaCurriculo && (
              <Link className="botao" to={"/" + proxima.id}>{t("proxima")}</Link>
            )}
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
            <Route
              path="/curriculo"
              element={
                <Suspense fallback={<p className="curriculo-status">{t("curriculo_carregando")}</p>}>
                  <Curriculo />
                </Suspense>
              }
            />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </AnimatePresence>

        {!naHome && !naPaginaCurriculo && (
          <button id="abrir-baralho" className="botao" type="button" onClick={() => setBaralhoAberto(true)}>
            {t("baralho")}
          </button>
        )}
      </main>

      <Baralho aberto={baralhoAberto} fechar={fecharBaralho} />

      <footer className="rodape">
        <span>Portfólio • Keven Lino</span>
        <Link className="botao rodape-curriculo" to="/curriculo">{t("curriculo_botao")}</Link>
        <span>© 2026 Keven Henrique de Carvalho Lino</span>
      </footer>
    </>
  );
}
