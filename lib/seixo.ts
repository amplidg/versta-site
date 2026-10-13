/**
 * Forma de seixo (pedra de rio): quatro curvas, em coordenadas de 0 a 1,
 * começando no topo e seguindo no sentido horário. A mesma lista de pontos
 * gera o recorte do retrato da fundadora, o seu contorno em caramelo e as
 * fotos dos depoimentos — por isso todos têm exatamente o mesmo formato.
 */
const SEIXO_INICIO = [0.52, 0];
const SEIXO_CURVAS = [
  [0.8, 0, 1, 0.2, 1, 0.46],
  [1, 0.72, 0.84, 1, 0.54, 1],
  [0.24, 1, 0, 0.8, 0, 0.5],
  [0, 0.2, 0.22, 0, 0.52, 0],
];

/** Path do seixo numa caixa de `largura` × `altura`. */
export function seixo(largura: number, altura: number) {
  const ponto = (v: number, i: number) => +(v * (i % 2 === 0 ? largura : altura)).toFixed(3);
  const curvas = SEIXO_CURVAS.map((c) => `C${c.map(ponto).join(" ")}`).join(" ");
  return `M${SEIXO_INICIO.map(ponto).join(" ")} ${curvas}Z`;
}
