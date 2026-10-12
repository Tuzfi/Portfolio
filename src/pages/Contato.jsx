import { useState } from "react";
import emailjs from "@emailjs/browser";
import emailJsConfig, { emailJsConfigured } from "../services/emailJsConfig";
import Pagina from "../components/shared/Pagina";
import { useIdioma } from "../context/IdiomaContext";

const canais = [
  { nome: "E-mail", texto: "kevenhenmg@gmail.com", link: "mailto:kevenhenmg@gmail.com" },
  { nome: "WhatsApp", texto: "+55 31 99216-1393", link: "https://wa.me/5531992161393" },
  { nome: "LinkedIn", texto: "keven-lino", link: "https://www.linkedin.com/in/keven-lino" },
  { nome: "GitHub", texto: "Tuzfi", link: "https://github.com/Tuzfi" }
];

export default function Contato() {
  const { t } = useIdioma();
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState(null);

  const enviar = async (evento) => {
    evento.preventDefault();
    if (enviando) return;

    if (!emailJsConfigured) {
      setStatus({ tipo: "erro", chave: "cont_configurar" });
      return;
    }

    const form = evento.currentTarget;
    const dados = new FormData(form);
    setEnviando(true);
    setStatus(null);

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: dados.get("nome"),
          reply_to: dados.get("email"),
          message: dados.get("mensagem")
        },
        { publicKey: emailJsConfig.publicKey }
      );
      form.reset();
      setStatus({ tipo: "sucesso", chave: "cont_sucesso" });
    } catch (error) {
      console.error("Falha ao enviar a mensagem de contato pelo EmailJS", error);
      setStatus({ tipo: "erro", chave: "cont_erro" });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Pagina>
      <p className="rotulo">{t("carta")} 05 / 05</p>
      <h2>{t("nav_contato")}</h2>
      <p className="subtitulo">{t("cont_sub")}</p>

      <div className="contato">
        <form onSubmit={enviar}>
          <label htmlFor="nome">{t("cont_nome")}</label>
          <input id="nome" type="text" name="nome" autoComplete="name" maxLength={120} required />

          <label htmlFor="email">{t("cont_email")}</label>
          <input id="email" type="email" name="email" autoComplete="email" maxLength={254} required />

          <label htmlFor="mensagem">{t("cont_mensagem")}</label>
          <textarea id="mensagem" name="mensagem" rows="5" maxLength={5000} required />

          <button type="submit" className="botao" disabled={enviando}>
            {enviando ? t("cont_enviando") : t("cont_enviar")}
          </button>
          {status && (
            <p className={`contato-status ${status.tipo}`} role={status.tipo === "erro" ? "alert" : "status"}>
              {t(status.chave)}
            </p>
          )}
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
