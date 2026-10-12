import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const experiencias = [
  { cargo: "exp1_cargo", local: "exp1_local", desc: "exp1_desc", atual: true },
  { cargo: "exp2_cargo", local: "exp2_local", desc: "exp2_desc" },
  { cargo: "exp3_cargo", local: "exp3_local", desc: "exp3_desc" }
];

export default function Experiencias() {
  const { t } = useIdioma();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 03 / 05</p>
      <h2>{t("nav_experiencias")}</h2>
      <p className="subtitulo">{t("exp_sub")}</p>

      <ol className="linha-tempo">
        {experiencias.map((exp) => (
          <li key={exp.cargo}>
            <div className="cabeca">
              <h3>{t(exp.cargo)}</h3>
              <span>20XX — {exp.atual ? t("exp_atual") : "20XX"}</span>
            </div>
            <p className="local">{t(exp.local)}</p>
            <p>{t(exp.desc)}</p>
          </li>
        ))}
      </ol>
      <p className="aviso">{t("exp_aviso")}</p>
    </Pagina>
  );
}
