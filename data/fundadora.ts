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
  nome: "[PREENCHER: nome completo]",

  apresentacao: [
    "[PREENCHER: parágrafo 1 sobre a trajetória]",
    "[PREENCHER: parágrafo 2 sobre por que isso importa para o cliente]",
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
