/**
 * Fotos da House Coworking (bloco "A House Coworking" da página do Programa
 * SH2, components/sections/HouseTour.tsx).
 *
 * Para mudar legendas ou a ordem, edite esta lista: as fotos aparecem na
 * ordem em que estão aqui, separadas pelas abas (`grupo`).
 * - `arquivo`: nome em /public/images/house/, sem o ".webp". Cada foto tem
 *   também uma versão menor com "-800" no fim do nome (para celular).
 * - `destaque`: a foto grande, à esquerda, ocupando duas linhas (uma por aba).
 * - `horizontal`: foto deitada; ocupa a largura toda, embaixo.
 * - `posicao`: qual parte da foto fica visível no recorte (horizontal vertical).
 * - `trocas`: outras fotos que se revezam no mesmo espaço do mosaico (22/11,
 *   pedido do Lucas): um espaço troca por vez, a cada 3 s, enquanto o grupo
 *   está aparecendo. Originais em "Imagens/House - novas (22-11)".
 */

export type TrocaHouse = { arquivo: string; legenda: string; alt: string; posicao?: string };

export type GrupoHouse = "colaboradores" | "empresa";

export type FotoHouse = {
  grupo: GrupoHouse;
  arquivo: string;
  legenda: string;
  alt: string;
  destaque?: boolean;
  horizontal?: boolean;
  posicao?: string;
  trocas?: TrocaHouse[];
};

export const fotosHouse: FotoHouse[] = [
  // Aba "Para os colaboradores"
  {
    grupo: "colaboradores",
    arquivo: "colaboradores-01-sala-de-atendimento",
    legenda: "Sala de atendimento",
    alt: "Sala de atendimento da House Coworking",
    destaque: true,
    posicao: "50% 60%",
    trocas: [
      {
        arquivo: "colaboradores-espaco-de-relaxamento",
        legenda: "Espaço de relaxamento",
        alt: "Espaço de relaxamento da House Coworking, com poltrona, massageador para as costas e massageador para os pés",
        posicao: "45% 60%",
      },
    ],
  },
  {
    grupo: "colaboradores",
    arquivo: "colaboradores-sala-de-terapia",
    legenda: "Sala de terapia",
    alt: "Sala de terapia da House Coworking",
    posicao: "60% 62%",
    trocas: [
      {
        arquivo: "colaboradores-sala-de-terapia-maca",
        legenda: "Sala de terapia",
        alt: "Sala de terapia da House Coworking, com maca, quadros e planta",
        posicao: "55% 62%",
      },
    ],
  },
  {
    grupo: "colaboradores",
    arquivo: "colaboradores-sala-privativa",
    legenda: "Sala privativa",
    alt: "Sala privativa da House Coworking",
    posicao: "45% 60%",
  },
  {
    grupo: "colaboradores",
    arquivo: "colaboradores-area-externa",
    legenda: "Área externa",
    alt: "Área externa da House Coworking",
    horizontal: true,
    posicao: "50% 60%",
    trocas: [
      {
        arquivo: "colaboradores-area-externa-caminho",
        legenda: "Área externa",
        alt: "Caminho de pedriscos com tocos de madeira no jardim da House Coworking",
        posicao: "50% 55%",
      },
      {
        arquivo: "colaboradores-area-externa-bobinas",
        legenda: "Área externa",
        alt: "Bobinas de madeira e gramado na área externa da House Coworking",
        posicao: "50% 55%",
      },
    ],
  },

  // Aba "Para a empresa"
  {
    grupo: "empresa",
    arquivo: "empresa-01-espaco-de-eventos",
    legenda: "Espaço de eventos",
    alt: "Espaço de eventos da House Coworking",
    destaque: true,
    posicao: "45% 60%",
  },
  {
    grupo: "empresa",
    arquivo: "empresa-sala-de-reunioes",
    legenda: "Sala de reuniões",
    alt: "Sala de reuniões da House Coworking",
    posicao: "55% 55%",
  },
  {
    grupo: "empresa",
    arquivo: "empresa-coffee-break",
    legenda: "Coffee break",
    alt: "Coffee break da House Coworking",
    posicao: "62% 58%",
  },
];
