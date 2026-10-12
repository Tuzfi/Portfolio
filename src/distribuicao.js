// um lance por carta, na ordem em que o baralho é distribuído
// lado: de onde a carta vem (-1 esquerda, 1 direita); desvio: distância horizontal na partida (px)
// giroVoo e inclinacao: graus extras durante o voo; duracao e atraso: segundos
export const lances = [
  { lado: -1, desvio: 280, giroVoo: -38, inclinacao: 20, duracao: 0.74, atraso: 0.2 },
  { lado: 1, desvio: 235, giroVoo: 30, inclinacao: 14, duracao: 0.7, atraso: 0.42 },
  { lado: -1, desvio: 210, giroVoo: -26, inclinacao: 22, duracao: 0.78, atraso: 0.62 },
  { lado: 1, desvio: 270, giroVoo: 36, inclinacao: 16, duracao: 0.72, atraso: 0.85 },
  { lado: -1, desvio: 190, giroVoo: -22, inclinacao: 18, duracao: 0.76, atraso: 1.05 }
];

// voo, impacto, rebote e assentamento
const tempos = [0, 0.52, 0.76, 1];
const curvas = [[0.2, 0.55, 0.55, 0.98], "easeOut", "easeInOut"];

const primeiros = (quadros) =>
  Object.fromEntries(Object.entries(quadros).map(([chave, valores]) => [chave, valores[0]]));

export function montarLance(lance, giro, altura, compacto) {
  const desvio = lance.lado * lance.desvio * (compacto ? 0.35 : 1);
  // no celular a fileira rola na horizontal e corta o que passa do topo, então o voo é mais curto
  const queda = compacto ? 300 : window.innerHeight + 120;
  const sentido = -lance.lado;
  const girou = Math.sign(lance.giroVoo);

  const transition = { duration: lance.duracao, delay: lance.atraso, times: tempos, ease: curvas };

  const carta = {
    x: [desvio, sentido * 7, -sentido * 2, 0],
    y: [altura - queda, altura + 9, altura - 3, altura],
    rotate: [giro + lance.giroVoo, giro - girou * 3, giro + girou, giro],
    rotateX: [lance.inclinacao, -lance.inclinacao * 0.18, lance.inclinacao * 0.05, 0],
    rotateY: [lance.lado * 12, -lance.lado * 2, lance.lado * 0.5, 0],
    scale: [1.12, 1, 1.012, 1]
  };

  const sombra = {
    y: [95, 10, 16, 18],
    scale: [1.14, 0.97, 1, 1],
    opacity: [0.16, 0.8, 0.55, 0.6]
  };

  return {
    cartaPartida: primeiros(carta),
    cartaEntrada: { ...carta, transition },
    sombraPartida: primeiros(sombra),
    sombraEntrada: { ...sombra, transition }
  };
}
