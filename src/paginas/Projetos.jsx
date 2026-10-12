import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const projetos = [
  { nome: "Organizador de estudos", desc: "proj1_desc", tags: ["React", "TypeScript"] },
  { nome: "Catálogo de livros", desc: "proj2_desc", tags: ["JavaScript", "CSS"] },
  { nome: "Painel de finanças", desc: "proj3_desc", tags: ["React", "Node.js"] }
];

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
            <div className="imagem">{t("proj_imagem")}</div>
            <h3>{projeto.nome}</h3>
            <p>{t(projeto.desc)}</p>
            <ul className="tags">
              {projeto.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="links">
              <a href="#">{t("proj_codigo")}</a>
              <a href="#">{t("proj_demo")}</a>
            </div>
          </article>
        ))}
      </div>
      <p className="aviso">{t("proj_aviso")}</p>
    </Pagina>
  );
}
