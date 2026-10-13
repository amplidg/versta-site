/**
 * Bloco "Depoimentos" da Home (components/sections/TestimonialsBlock.tsx).
 *
 * Tudo o que aparece nesse bloco vem deste arquivo (o nome da fundadora, no
 * título, vem de data/fundadora.ts). Para publicar as informações
 * definitivas, basta trocar os textos [PREENCHER: ...] abaixo.
 *
 * - Lista `depoimentos` vazia: o depoimento em destaque e a trilha de fotos
 *   não aparecem.
 * - Lista `clientes` vazia: a cartela de logos não aparece.
 * - As duas vazias: o bloco inteiro não aparece.
 */

export type Depoimento = {
  /**
   * Caminho da foto em /public (ex.: "/images/depoimentos/maria.webp"),
   * quadrada, ~200 px. Deixe "" enquanto não houver foto.
   */
  foto: string;
  /** Texto do depoimento, sem aspas (o site desenha as aspas). */
  texto: string;
  nome: string;
  cargo: string;
  empresa: string;
};

export type Cliente = {
  /** Nome da empresa (vira o texto alternativo do logo). */
  nome: string;
  /**
   * Caminho do logo em /public (ex.: "/images/clientes/empresa.svg"), em SVG
   * ou PNG com FUNDO TRANSPARENTE: o site pinta o logo de azul-marinho, e um
   * fundo opaco viraria um retângulo. Deixe "" enquanto não houver logo.
   */
  logo: string;
};

export const depoimentos: Depoimento[] = [
  {
    foto: "",
    texto: "[PREENCHER: depoimento 1]",
    nome: "[PREENCHER: nome]",
    cargo: "[PREENCHER: cargo]",
    empresa: "[PREENCHER: empresa]",
  },
  {
    foto: "",
    texto: "[PREENCHER: depoimento 2]",
    nome: "[PREENCHER: nome]",
    cargo: "[PREENCHER: cargo]",
    empresa: "[PREENCHER: empresa]",
  },
  {
    foto: "",
    texto: "[PREENCHER: depoimento 3]",
    nome: "[PREENCHER: nome]",
    cargo: "[PREENCHER: cargo]",
    empresa: "[PREENCHER: empresa]",
  },
  {
    foto: "",
    texto: "[PREENCHER: depoimento 4]",
    nome: "[PREENCHER: nome]",
    cargo: "[PREENCHER: cargo]",
    empresa: "[PREENCHER: empresa]",
  },
];

export const clientes: Cliente[] = [
  { nome: "[PREENCHER: nome da empresa 1]", logo: "" },
  { nome: "[PREENCHER: nome da empresa 2]", logo: "" },
  { nome: "[PREENCHER: nome da empresa 3]", logo: "" },
  { nome: "[PREENCHER: nome da empresa 4]", logo: "" },
  { nome: "[PREENCHER: nome da empresa 5]", logo: "" },
  { nome: "[PREENCHER: nome da empresa 6]", logo: "" },
];
