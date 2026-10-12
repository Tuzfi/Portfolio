import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const grupos = [
  { titulo: "hab_linguagens", desc: "hab_linguagens_d", tags: ["JavaScript", "TypeScript", "Python", "Java"] },
  { titulo: "hab_frameworks", desc: "hab_frameworks_d", tags: ["React", "Next.js", "Express", "Tailwind CSS"] },
  { titulo: "hab_ferramentas", desc: "hab_ferramentas_d", tags: ["Git", "GitHub", "VS Code", "Figma"] },
  { titulo: "hab_soft", desc: "hab_soft_d", tags: ["hab_comunicacao", "hab_colaboracao", "hab_organizacao"], traduzir: true }
];

export default function Habilidades() {
  const { t } = useIdioma();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 04 / 05</p>
      <h2>{t("nav_habilidades")}</h2>
      <p className="subtitulo">{t("hab_sub")}</p>

      <div className="grade-habilidades">
        {grupos.map((grupo) => (
          <div className="grupo" key={grupo.titulo}>
            <h3>{t(grupo.titulo)}</h3>
            <p>{t(grupo.desc)}</p>
            <ul className="tags">
              {grupo.tags.map((tag) => (
                <li key={tag}>{grupo.traduzir ? t(tag) : tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="aviso">{t("hab_aviso")}</p>
    </Pagina>
  );
}
