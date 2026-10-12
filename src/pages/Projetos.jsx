import Pagina from "../components/shared/Pagina";
import ImagemReal from "../components/shared/ImagemReal";
import { useIdioma } from "../context/IdiomaContext";

const projetos = [
  {
    nome: "Astro Runner: Survival",
    ano: 2026,
    desc: "proj_astro",
    tags: ["Python", "Pygame"],
    repo: "https://github.com/Tuzfi/Astro-Runner-Survival",
    imagem: "/images/astro-runner.gif"
  },
  {
    nome: "MusicFlow",
    ano: 2026,
    desc: "proj_music",
    tags: ["HTML", "CSS", "JavaScript", "Chart.js", "json-server"],
    repo: "https://github.com/Tuzfi/MusicFlow",
    imagem: "/images/musicflow.gif"
  }
].sort((a, b) => a.ano - b.ano);

export default function Projetos() {
  const { t } = useIdioma();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 02 / 05</p>
      <h2>{t("nav_projetos")}</h2>
      <p className="subtitulo">{t("proj_sub")}</p>

      <div className="grade-projetos">
        {projetos.map((projeto) => (
          <article className="projeto" key={projeto.nome}>
            <div className="imagem">
              <ImagemReal
                caminhos={[projeto.imagem]}
                alt={projeto.nome}
                senao={<span>{t("proj_imagem")}</span>}
              />
            </div>
            <div className="projeto-titulo">
              <h3>{projeto.nome}</h3>
              <span>{projeto.ano}</span>
            </div>
            <p>{t(projeto.desc)}</p>
            <ul className="tags">
              {projeto.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="links">
              <a href={projeto.repo} target="_blank" rel="noreferrer">{t("proj_codigo")} ↗</a>
            </div>
          </article>
        ))}
      </div>
    </Pagina>
  );
}
