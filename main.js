const cartas = [
  { id: "sobre", titulo: "nav_sobre" },
  { id: "projetos", titulo: "nav_projetos" },
  { id: "experiencias", titulo: "nav_experiencias" },
  { id: "habilidades", titulo: "nav_habilidades" },
  { id: "contato", titulo: "nav_contato" }
];

const paginas = document.querySelectorAll(".pagina");
const botaoVoltar = document.getElementById("voltar");
const botaoAbrir = document.getElementById("abrir-baralho");
const baralho = document.getElementById("baralho");

let idiomaAtual = localStorage.getItem("idioma") || "pt";

function montarCartas(container) {
  cartas.forEach((carta, i) => {
    const link = document.createElement("a");
    link.className = "carta";
    link.href = "#" + carta.id;
    link.style.setProperty("--giro", (i - 2) * 7 + "deg");
    link.style.setProperty("--queda", Math.abs(i - 2) * 10 + "px");
    link.innerHTML =
      '<span class="carta-topo"><span>0' + (i + 1) + '</span><span data-i18n="secao"></span></span>' +
      '<span class="carta-icone"></span>' +
      '<strong data-i18n="' + carta.titulo + '"></strong>' +
      '<span class="carta-acao" data-i18n="selecionar"></span>';
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

function mostrarPagina() {
  const alvo = location.hash.slice(1);
  const existe = cartas.some(function (c) { return c.id === alvo; });
  const atual = existe ? alvo : "inicio";

  paginas.forEach(function (pagina) {
    pagina.hidden = pagina.id !== atual;
  });

  const naHome = atual === "inicio";
  botaoVoltar.hidden = naHome;
  botaoAbrir.hidden = naHome;
  baralho.hidden = true;
  window.scrollTo(0, 0);
}

montarCartas(document.getElementById("cartas-inicio"));
montarCartas(document.getElementById("cartas-baralho"));
aplicarIdioma(idiomaAtual);
mostrarPagina();

window.addEventListener("hashchange", mostrarPagina);

document.querySelectorAll("[data-idioma]").forEach(function (botao) {
  botao.addEventListener("click", function () {
    aplicarIdioma(botao.dataset.idioma);
  });
});

botaoAbrir.addEventListener("click", function () {
  baralho.hidden = false;
});

document.getElementById("fechar-baralho").addEventListener("click", function () {
  baralho.hidden = true;
});

document.querySelector(".baralho-fundo").addEventListener("click", function () {
  baralho.hidden = true;
});

// o envio por e-mail só entra na Sprint 2
document.getElementById("form-contato").addEventListener("submit", function (evento) {
  evento.preventDefault();
});
