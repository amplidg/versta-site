import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Coffee,
  DoorClosed,
  HeartHandshake,
  Leaf,
  PartyPopper,
  Presentation,
  Snowflake,
  Trees,
  Users,
  Wifi,
} from "lucide-react";

/**
 * Conteúdo da página do Espaço · House Business Coworking
 * (/consultoria/espaco, especificação e textos do Lucas, 04/11).
 *
 * As fotos são as mesmas do bloco da House na página do SH2 (data/house.ts):
 * aqui só se usa o nome do arquivo (`arquivo`), sem duplicar imagens.
 */

/** Ocasiões do bloco "Para que sua empresa precisa do espaço?". */
export type Ocasiao = {
  /** Nome no botão e no painel. */
  nome: string;
  icone: LucideIcon;
  /** 1ª foto = principal (grande); 2ª = menor, sobreposta (opcional). */
  fotos: string[];
  descricao: string;
  itens: string[];
};

export const ocasioes: Ocasiao[] = [
  {
    nome: "Terapias e atendimentos",
    icone: HeartHandshake,
    fotos: ["colaboradores-01-sala-de-atendimento", "colaboradores-sala-de-terapia"],
    descricao: "Salas privativas, silenciosas e acolhedoras para atendimentos individuais com hora marcada.",
    itens: ["Salas privativas", "Ambiente reservado e confortável", "Profissionais da rede Versta"],
  },
  {
    nome: "Relaxamento e bem-estar",
    icone: Leaf,
    fotos: ["colaboradores-area-externa", "colaboradores-sala-privativa"],
    descricao: "Equipamentos de relaxamento e espaços tranquilos para a equipe desacelerar e recarregar.",
    itens: ["Equipamentos de relaxamento", "Área externa com jardim", "Práticas como yoga e meditação"],
  },
  {
    nome: "Treinamentos e palestras",
    icone: Presentation,
    fotos: ["empresa-01-espaco-de-eventos", "empresa-coffee-break"],
    descricao: "Um ambiente inspirador para capacitar a equipe e desenvolver lideranças.",
    itens: ["Espaço para grupos", "Estrutura para apresentações", "Coffee break"],
  },
  {
    nome: "Reuniões",
    icone: Users,
    fotos: ["empresa-sala-de-reunioes"],
    descricao:
      "Salas equipadas para reuniões estratégicas, com clientes ou com a equipe, longe das interrupções do dia a dia.",
    itens: ["Mesa para grupos", "Ambiente climatizado", "Coffee break opcional"],
  },
  {
    nome: "Eventos e confraternizações",
    icone: PartyPopper,
    fotos: ["empresa-01-espaco-de-eventos", "empresa-coffee-break"],
    descricao: "Um espaço versátil para celebrar conquistas, integrar equipes e receber convidados.",
    itens: ["Espaço de eventos", "Área de coffee break", "Área externa"],
  },
];

/**
 * Ordem das fotos na galeria "Conheça os ambientes" (e no visualizador).
 * A posição no mosaico do computador está em EspacoGaleria.tsx.
 */
export const galeriaEspaco: string[] = [
  "empresa-01-espaco-de-eventos",
  "colaboradores-01-sala-de-atendimento",
  "colaboradores-sala-de-terapia",
  "empresa-sala-de-reunioes",
  "colaboradores-sala-privativa",
  "colaboradores-area-externa",
  "empresa-coffee-break",
];

/** Itens do bloco "Estrutura pensada para o bem-estar". */
export const comodidades: { rotulo: string; icone: LucideIcon }[] = [
  { rotulo: "Salas privativas", icone: DoorClosed },
  { rotulo: "Equipamentos de relaxamento", icone: Armchair },
  { rotulo: "Espaço de eventos", icone: PartyPopper },
  { rotulo: "Sala de reuniões", icone: Users },
  { rotulo: "Coffee break", icone: Coffee },
  { rotulo: "Área externa com jardim", icone: Trees },
  { rotulo: "Ambientes climatizados", icone: Snowflake },
  { rotulo: "Wi-Fi", icone: Wifi },
];
