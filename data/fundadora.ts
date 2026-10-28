/**
 * Bloco "Quem conduz a Versta" da Home (components/sections/FounderBlock.tsx).
 *
 * TUDO o que aparece nesse bloco vem deste arquivo: para publicar as
 * informações definitivas, basta trocar os textos [PREENCHER: ...] abaixo.
 * Enquanto um campo estiver com [PREENCHER], o site o destaca visualmente.
 */

type Numero = {
  /**
   * Use um número de verdade (ex.: 15) para ativar a animação de contagem.
   * Enquanto for texto (ex.: "[X]"), aparece exatamente como está.
   */
  valor: number | string;
  /** Texto colado ao número, como "+" (opcional). */
  sufixo?: string;
  legenda: string;
};

type Marco = { ano: string; descricao: string };

export const fundadora = {
  nome: "Vivian Prá Philippi",

  apresentacao: [
    // textos fornecidos pelo Lucas (28/10) — só pontuação ajustada
    "Empresária com mais de 20 anos de trajetória, Vivian Prá Philippi fundou a Semear Soluções Ambientais, consultoria que acompanha empresas na gestão ambiental, e, mais recentemente, criou a House Business Coworking. Ao longo desse caminho, conviveu de perto com empresas de diferentes setores e conheceu, na prática, os desafios que vão muito além de uma única área.",
    "Foi dessa vivência que nasceu a Versta, ao perceber que muitas empresas enfrentam desafios de liderança, processos, comunicação e cultura, mas nem sempre sabem por onde começar nem a quem recorrer. A Versta vem para ser a ponte entre os desafios empresariais e suas soluções.",
  ],

  /**
   * Foto: salve o arquivo em /public/images/fundadora.webp (retrato, na
   * vertical, ~1200 px de largura) e mude `pronta` para true.
   */
  foto: {
    arquivo: "/images/fundadora.webp",
    /** Descrição da foto para leitores de tela. */
    alt: "Retrato da fundadora da Versta",
    pronta: false,
  },

  /** O caminho em números: exatamente três itens. */
  numeros: [
    { valor: "[X]", legenda: "anos de experiência" },
    { valor: "[X]", legenda: "empresas atendidas" },
    { valor: "[X]", legenda: "segmentos diferentes" },
  ] as Numero[],

  /**
   * Marcos da trajetória, do mais antigo ao mais recente (2 a 4 itens).
   * O último marco, "Fundação da Versta", é fixo e usa `anoFundacao`.
   */
  marcos: [
    { ano: "[PREENCHER: ano]", descricao: "[PREENCHER: marco 1]" },
    { ano: "[PREENCHER: ano]", descricao: "[PREENCHER: marco 2]" },
    { ano: "[PREENCHER: ano]", descricao: "[PREENCHER: marco 3]" },
  ] as Marco[],
  anoFundacao: "[PREENCHER: ano]",
};
