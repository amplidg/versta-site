/**
 * Conteúdo da página Projetos Sociais (/instituto, especificação e textos do
 * Lucas, 04/11).
 *
 * FOTOS (04/11): fotos reais de ações sociais enviadas pelo Lucas (pasta
 * "Desktop/Materiais Vídeo Versta/Imagens 3/Vídeos animados/Cenas 17 e 18"),
 * convertidas para public/images/projetos-sociais/. Para trocar uma foto,
 * salve o arquivo novo nessa pasta e mude o nome aqui. `posicao` diz qual parte
 * da foto fica visível no recorte (horizontal vertical).
 */

type Foto = { arquivo: string; alt: string; posicao?: string };

const fotos = {
  cadernos: {
    arquivo: "/images/projetos-sociais/cadernos-fraternos.webp",
    alt: "Crianças de uma comunidade, ao ar livre, mostrando os cadernos recebidos na ação Cadernos Fraternos",
    posicao: "50% 55%",
  },
  maisRosaGrupo: {
    arquivo: "/images/projetos-sociais/mais-rosa-grupo.webp",
    alt: "Participantes vestidas de rosa reunidas na ação Mais Rosa",
    posicao: "50% 40%",
  },
  maisRosaAbraco: {
    arquivo: "/images/projetos-sociais/mais-rosa-abraco.webp",
    alt: "Grupo de mulheres vestidas de rosa abraçadas em roda, num jardim, durante a ação Mais Rosa",
    posicao: "50% 58%",
  },
  nucleo: {
    arquivo: "/images/projetos-sociais/nucleo-sustentabilidade.webp",
    alt: "Participantes reunidos em grupo num encontro do Núcleo de Sustentabilidade",
    posicao: "50% 68%",
  },
  coleta: {
    arquivo: "/images/projetos-sociais/coleta-seletiva.webp",
    alt: "Lixeiras coloridas de coleta seletiva, para metal e plástico",
    posicao: "50% 82%",
  },
} satisfies Record<string, Foto>;

/** Colagem do topo da página (três quadros sobrepostos, pedido do Lucas, 04/11). */
export const colagemProjetos: { centro: Foto; esquerda: Foto; direita: Foto } =
  {
    centro: fotos.cadernos,
    esquerda: fotos.maisRosaGrupo,
    direita: fotos.nucleo,
  };

/** Cards do bloco "Causas que transformam pessoas e empresas". */
export const causas: { titulo: string; foto: Foto; texto: string }[] = [
  {
    titulo: "Meio ambiente",
    foto: fotos.coleta,
    texto:
      "Plantio de árvores, recuperação de áreas verdes e educação ambiental.",
  },
  {
    titulo: "Comunidade",
    foto: fotos.cadernos,
    texto:
      "Ações em escolas, espaços comunitários e projetos que aproximam a empresa de quem está ao redor.",
  },
  {
    titulo: "Solidariedade",
    foto: fotos.maisRosaAbraco,
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
