import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const cargos = ["exp1", "exp2", "exp3", "exp4"];

export default function Experiencias() {
  const { t } = useIdioma();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 03 / 05</p>
      <h2>{t("nav_experiencias")}</h2>
      <p className="subtitulo">{t("exp_sub")}</p>

      <ol className="linha-tempo">
        {cargos.map((chave) => (
          <li key={chave}>
            <div className="cabeca">
              <h3>{t(chave + "_cargo")}</h3>
              <span>{t(chave + "_periodo")}</span>
            </div>
            <p className="local">GO Engenharia LTDA</p>
            <p>{t(chave + "_desc")}</p>
          </li>
        ))}
      </ol>

      <div className="formacoes">
        <div>
          <h3>{t("form_academica")}</h3>
          <p><strong>{t("form1_nome")}</strong><br />{t("form1_desc")}</p>
          <p><strong>{t("form2_nome")}</strong><br />{t("form2_desc")}</p>
        </div>
        <div>
          <h3>{t("form_complementar")}</h3>
          <p><strong>{t("form3_nome")}</strong><br />{t("form3_desc")}</p>
        </div>
      </div>
    </Pagina>
  );
}
