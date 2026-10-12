import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const grupos = [
  { titulo: "hab_linguagens", tags: ["Python", "JavaScript", "Java", "C++", "HTML", "CSS"] },
  { titulo: "hab_frameworks", tags: ["Pygame", "Chart.js", "Spring Boot", "Thymeleaf", "React"] },
  { titulo: "hab_ferramentas", tags: ["Git", "GitHub", "VS Code", "Maven", "Excel", "AutoCAD", "Word"] },
  {
    titulo: "hab_pessoais",
    tags: ["hab_curiosidade", "hab_organizacao", "hab_equipe", "hab_comunicacao", "hab_analitico"],
    traduzir: true
  }
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
            <ul className="tags">
              {grupo.tags.map((tag) => (
                <li key={tag}>{grupo.traduzir ? t(tag) : tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Pagina>
  );
}
