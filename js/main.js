const cartas = [
  { id: "sobre", titulo: "nav_sobre" },
  { id: "projetos", titulo: "nav_projetos" },
  { id: "experiencias", titulo: "nav_experiencias" },
  { id: "habilidades", titulo: "nav_habilidades" },
  { id: "contato", titulo: "nav_contato" }
];

const paginaAtual = document.body.dataset.pagina;
const baralho = document.getElementById("baralho");

let idiomaAtual = localStorage.getItem("idioma") || "pt";

function montarCartas(container) {
  cartas.forEach((carta, i) => {
    const aberta = carta.id === paginaAtual;
    const link = document.createElement("a");
    link.className = aberta ? "carta atual" : "carta";
    link.href = carta.id + ".html";
    link.style.setProperty("--giro", (i - 2) * 7 + "deg");
    link.style.setProperty("--queda", Math.abs(i - 2) * 10 + "px");
    link.innerHTML =
      '<span class="carta-topo"><span>0' + (i + 1) + '</span><span data-i18n="secao"></span></span>' +
      '<span class="carta-icone"></span>' +
      '<strong data-i18n="' + carta.titulo + '"></strong>' +
      '<span class="carta-acao" data-i18n="' + (aberta ? "carta_aberta" : "selecionar") + '"></span>';
    container.appendChild(link);
  });
}

function aplicarIdioma(idioma) {
  idiomaAtual = idioma;
  localStorage.setItem("idioma", idioma);
  document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = textos[idioma][el.dataset.i18n];
  });
  document.querySelectorAll("[data-idioma]").forEach(function (botao) {
    botao.classList.toggle("ativo", botao.dataset.idioma === idioma);
  });
}

const cartasInicio = document.getElementById("cartas-inicio");
if (cartasInicio) montarCartas(cartasInicio);

if (baralho) {
  montarCartas(document.getElementById("cartas-baralho"));

  document.getElementById("abrir-baralho").addEventListener("click", function () {
    baralho.hidden = false;
  });
  document.getElementById("fechar-baralho").addEventListener("click", function () {
    baralho.hidden = true;
  });
  document.querySelector(".baralho-fundo").addEventListener("click", function () {
    baralho.hidden = true;
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") baralho.hidden = true;
  });
}

aplicarIdioma(idiomaAtual);

document.querySelectorAll("[data-idioma]").forEach(function (botao) {
  botao.addEventListener("click", function () {
    aplicarIdioma(botao.dataset.idioma);
  });
});

const formContato = document.getElementById("form-contato");
if (formContato) {
  // o envio por e-mail só entra na Sprint 2
  formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();
  });
}
