import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

export default function Sobre() {
  const { t } = useIdioma();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 01 / 05</p>
      <h2>{t("nav_sobre")}</h2>
      <p className="subtitulo">{t("sobre_sub")}</p>

      <div className="sobre">
        <div className="foto">{t("sobre_foto")}</div>
        <div>
          <h3>{t("sobre_ola")}</h3>
          <p>{t("sobre_p1")}</p>
          <p>{t("sobre_p2")}</p>
          <dl className="ficha">
            <dt>{t("sobre_formacao")}</dt>
            <dd>{t("sobre_formacao_v")}</dd>
            <dt>{t("sobre_local")}</dt>
            <dd>{t("sobre_local_v")}</dd>
            <dt>{t("sobre_interesses")}</dt>
            <dd>{t("sobre_interesses_v")}</dd>
          </dl>
        </div>
      </div>
      <p className="aviso">{t("sobre_aviso")}</p>
    </Pagina>
  );
}
