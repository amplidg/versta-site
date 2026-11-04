/**
 * Conteúdo da página Projetos Sociais (/instituto, especificação e textos do
 * Lucas, 04/11).
 *
 * IMAGENS: ficam em public/images/projetos-sociais/. Hoje mural.webp,
 * plantio.webp e horta.webp são imagens provisórias (manchas de cor); para
 * trocar, basta salvar as ilustrações definitivas por cima, com o mesmo nome.
 */

/** Imagem do topo da página. */
export const heroProjetos = {
  arquivo: "/images/projetos-sociais/mural.webp",
  alt: "Ilustração em aquarela de colaboradores pintando o mural de uma escola comunitária",
};

/** Cards do bloco "Causas que movem os projetos". */
export const causas: {
  titulo: string;
  imagem: string;
  alt: string;
  texto: string;
}[] = [
  {
    titulo: "Meio ambiente",
    imagem: "/images/projetos-sociais/plantio.webp",
    alt: "Ilustração em aquarela de voluntários plantando uma muda de árvore",
    texto:
      "Plantio de árvores, recuperação de áreas verdes e educação ambiental.",
  },
  {
    titulo: "Comunidade",
    imagem: "/images/projetos-sociais/mural.webp",
    alt: "Ilustração em aquarela de colaboradores pintando o mural de uma escola comunitária",
    texto:
      "Ações em escolas, espaços comunitários e projetos que aproximam a empresa de quem está ao redor.",
  },
  {
    titulo: "Solidariedade",
    imagem: "/images/projetos-sociais/horta.webp",
    alt: "Ilustração em aquarela de uma voluntária entregando uma cesta da horta comunitária a uma senhora",
    texto:
      "Hortas comunitárias, arrecadações e iniciativas que cuidam de quem mais precisa.",
  },
];

/**
 * PROJETOS REALIZADOS. Enquanto a lista estiver vazia, o bloco "Projetos
 * realizados" não aparece na página. Para acrescentar um projeto, copie o
 * modelo abaixo para dentro dos colchetes de `projetos` e preencha:
 *
 *   {
 *     titulo: "Mural da Escola Municipal Exemplo",
 *     empresa: "Nome da empresa parceira",        // opcional: apague a linha se não houver
 *     causa: "Comunidade",                         // aparece como etiqueta
 *     data: "Novembro de 2026",
 *     descricao: "Uma ou duas frases sobre o que foi feito.",
 *     imagens: [
 *       { arquivo: "/images/projetos-sociais/mural-escola-1.webp", alt: "Descrição da foto" },
 *       { arquivo: "/images/projetos-sociais/mural-escola-2.webp", alt: "Descrição da foto" },
 *     ],
 *     resultado: "Ex.: 40 colaboradores e 300 alunos envolvidos.", // opcional
 *   },
 *
 * As fotos vão em public/images/projetos-sociais/ (de preferência em .webp,
 * com até 1600 px de largura). A primeira foto da lista é a capa do card;
 * clicando nela, abre o visualizador com todas.
 */
export type ProjetoSocial = {
  titulo: string;
  empresa?: string;
  causa: string;
  data: string;
  descricao: string;
  imagens: { arquivo: string; alt: string }[];
  resultado?: string;
};

export const projetos: ProjetoSocial[] = [];
