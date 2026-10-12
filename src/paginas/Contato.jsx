import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

export default function Contato() {
  const { t } = useIdioma();

  // o envio por e-mail só entra na Sprint 2
  const enviar = (evento) => evento.preventDefault();

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 05 / 05</p>
      <h2>{t("nav_contato")}</h2>
      <p className="subtitulo">{t("cont_sub")}</p>

      <div className="contato">
        <form onSubmit={enviar}>
          <label htmlFor="nome">{t("cont_nome")}</label>
          <input id="nome" type="text" name="nome" />

          <label htmlFor="email">{t("cont_email")}</label>
          <input id="email" type="email" name="email" />

          <label htmlFor="mensagem">{t("cont_mensagem")}</label>
          <textarea id="mensagem" name="mensagem" rows="5" />

          <button type="submit" className="botao">{t("cont_enviar")}</button>
        </form>

        <aside className="canais">
          <h3>{t("cont_outro")}</h3>
          <p>{t("cont_outro_d")}</p>
          <a href="#">{t("cont_link_email")}</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </aside>
      </div>
    </Pagina>
  );
}
