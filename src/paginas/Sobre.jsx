import Pagina from "../Pagina";
import ImagemReal from "../ImagemReal";
import { useIdioma } from "../Idioma";

const fotoCaminhos = ["jpg", "jpeg", "png", "webp"].map((ext) => "/img/kevenfoto." + ext);

export default function Sobre() {
  const { t } = useIdioma();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 01 / 05</p>
      <h2>{t("nav_sobre")}</h2>
      <p className="subtitulo">{t("sobre_sub")}</p>

      <div className="sobre">
        <ImagemReal
          caminhos={fotoCaminhos}
          alt={t("sobre_foto")}
          senao={<div className="foto">{t("sobre_foto")}</div>}
        />
        <div>
          <h3>{t("sobre_ola")}</h3>
          <p>{t("sobre_p1")}</p>
          <p>{t("sobre_p2")}</p>
          <dl className="ficha">
            <dt>{t("sobre_nome")}</dt>
            <dd>Keven Henrique de Carvalho Lino</dd>
            <dt>{t("sobre_formacao")}</dt>
            <dd>{t("sobre_formacao_v")}</dd>
            <dt>{t("sobre_interesses")}</dt>
            <dd>{t("sobre_interesses_v")}</dd>
          </dl>
        </div>
      </div>
    </Pagina>
  );
}
