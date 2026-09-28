import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  Compass,
  Earth,
  Network,
  Scale,
  Sprout,
  Target,
  Users,
} from "lucide-react";

/**
 * As 9 frentes de consultoria da Versta.
 * As páginas /consultoria/[slug], os cards, o menu, o rodapé, o select dos
 * formulários e o sitemap são gerados a partir desta lista.
 */
export type Frente = {
  slug: string;
  nome: string;
  area: string;
  icone: LucideIcon;
  /** Frase curta usada em meta description e no topo da página da frente. */
  descricaoCurta: string;
  /** Texto principal da página da frente. */
  descricaoLonga: string[];
  /** Dores para as quais a frente é indicada. */
  dores: string[];
};

const doresPlaceholder = (nome: string) => [
  `[PREENCHER: dor 1 atendida pela frente ${nome}]`,
  `[PREENCHER: dor 2 atendida pela frente ${nome}]`,
  `[PREENCHER: dor 3 atendida pela frente ${nome}]`,
];

const longaPlaceholder = (nome: string, area: string) => [
  `[PREENCHER: descrição da frente ${nome} (${area}) — o que ela faz, para quem é e qual resultado busca.]`,
];

function frente(
  slug: string,
  nome: string,
  area: string,
  icone: LucideIcon,
): Frente {
  return {
    slug,
    nome,
    area,
    icone,
    descricaoCurta: `${nome}: frente de ${area.toLowerCase()} do ecossistema Versta.`,
    descricaoLonga: longaPlaceholder(nome, area),
    dores: doresPlaceholder(nome),
  };
}

export const frentes: Frente[] = [
  frente("semear", "Semear", "Consultoria Ambiental", Sprout),
  frente("esg", "ESG", "Ambiental, Social e Governança", Earth),
  frente("turismo", "Turismo", "Turismo de Experiência", Compass),
  frente("inova", "Inova", "Tecnologia e Inovação", Network),
  frente("conexao", "Conexão", "Marketing e Endomarketing", Target),
  frente("cultura", "Cultura", "RH e Pessoas", Users),
  frente("excelencia", "Excelência", "Qualidade e Produção", BadgeCheck),
  frente("espaco", "Espaço", "Arquitetura Sustentável para Empresas", Building2),
  frente("integra", "Íntegra", "Estratégia Jurídica Sistêmica", Scale),
];

export function getFrente(slug: string) {
  return frentes.find((f) => f.slug === slug);
}
