import Pagina from "../Pagina";
import { useIdioma } from "../Idioma";

const canais = [
  { nome: "E-mail", texto: "kevenhenmg@gmail.com", link: "mailto:kevenhenmg@gmail.com" },
  { nome: "WhatsApp", texto: "+55 31 99216-1393", link: "https://wa.me/5531992161393" },
  { nome: "LinkedIn", texto: "keven-lino", link: "https://www.linkedin.com/in/keven-lino" },
  { nome: "GitHub", texto: "Tuzfi", link: "https://github.com/Tuzfi" }
];

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
          {canais.map((canal) => (
            <a key={canal.nome} href={canal.link} target="_blank" rel="noreferrer">
              <span>{canal.nome}</span>
              <small>{canal.texto}</small>
            </a>
          ))}
        </aside>
      </div>
    </Pagina>
  );
}
