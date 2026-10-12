import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useIdioma } from "../Idioma";
import "./Curriculo.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const arquivos = {
  pt: "/curriculo-keven-pt.pdf",
  en: "/curriculo-keven-en.pdf"
};

const zoomMinimo = 0.5;
const zoomMaximo = 2;
const passoZoom = 0.25;

export default function Curriculo() {
  const { idioma, t } = useIdioma();
  const areaRef = useRef(null);
  const arquivo = arquivos[idioma];
  const nomeDownload = idioma === "pt" ? "Curriculo-Keven-PT.pdf" : "Curriculo-Keven-EN.pdf";
  const [paginas, setPaginas] = useState(0);
  const [arquivoCarregado, setArquivoCarregado] = useState("");
  const [zoom, setZoom] = useState(1);
  const [largura, setLargura] = useState(0);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setLargura(Math.floor(entry.contentRect.width));
    });
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPaginas(0);
    setArquivoCarregado("");
    setErro(false);
  }, [arquivo]);

  const alterarZoom = (delta) => {
    setZoom((valor) => Math.min(zoomMaximo, Math.max(zoomMinimo, +(valor + delta).toFixed(2))));
  };

  const larguraPagina = largura > 0 ? Math.round(Math.min(largura, 900) * zoom) : undefined;
  const carregando = !erro && arquivoCarregado !== arquivo;
  const paginaAtual = arquivoCarregado === arquivo ? paginas : 0;

  return (
    <section className="pagina curriculo">
      <h2>{t("curriculo_titulo")}</h2>
      <div className="cv-viewer">
        <div className="cv-toolbar">
          <div className="cv-zoom" role="group" aria-label={t("curriculo_zoom")}>
            <button
              type="button"
              onClick={() => alterarZoom(-passoZoom)}
              disabled={zoom <= zoomMinimo}
              aria-label={t("curriculo_diminuir")}
              title={t("curriculo_diminuir")}
            >
              −
            </button>
            <span className="cv-zoom-value" aria-live="polite">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => alterarZoom(passoZoom)}
              disabled={zoom >= zoomMaximo}
              aria-label={t("curriculo_aumentar")}
              title={t("curriculo_aumentar")}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              disabled={zoom === 1}
              aria-label={t("curriculo_ajustar")}
              title={t("curriculo_ajustar")}
            >
              1:1
            </button>
          </div>

          {paginaAtual > 0 && (
            <span className="cv-pages">
              {paginaAtual} {paginaAtual === 1 ? t("curriculo_pagina") : t("curriculo_paginas")}
            </span>
          )}

          <div className="cv-actions">
            <a className="cv-button primary" href={arquivo} download={nomeDownload}>
              {t("curriculo_baixar")}
            </a>
            <a className="cv-button" href={arquivo} target="_blank" rel="noopener noreferrer">
              {t("curriculo_abrir")}
            </a>
          </div>
        </div>

        <div className="cv-area" ref={areaRef}>
          {carregando && <p className="cv-status" role="status">{t("curriculo_carregando_pdf")}</p>}
          {erro ? (
            <p className="cv-status cv-error" role="alert">{t("curriculo_erro")}</p>
          ) : (
            <Document
              key={arquivo}
              file={arquivo}
              onLoadSuccess={({ numPages }) => {
                setPaginas(numPages);
                setArquivoCarregado(arquivo);
              }}
              onLoadError={(error) => {
                console.error("Falha ao carregar o currículo em PDF", error);
                setErro(true);
              }}
              loading={null}
              error={null}
              externalLinkTarget="_blank"
              externalLinkRel="noopener noreferrer"
            >
              {larguraPagina && paginaAtual > 0 &&
                Array.from({ length: paginaAtual }, (_, indice) => (
                  <div key={indice} className="cv-page">
                    <Page pageNumber={indice + 1} width={larguraPagina} loading={null} />
                  </div>
                ))}
            </Document>
          )}
        </div>
      </div>
    </section>
  );
}
