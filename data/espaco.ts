import { Armchair, Droplet, Layers, Sun, Wind, Zap, type LucideIcon } from "lucide-react";

/*
 * Conteúdo da página do Espaço · Arquitetura Sustentável (especificação e
 * textos do Lucas, 07/11). A página da House Business Coworking (04/11) foi
 * feita por engano e substituída por esta.
 *
 * Camadas da planta interativa ("O que torna um espaço sustentável",
 * components/sections/espaco/EspacoPlanta.tsx). Para editar um texto, nome ou
 * cor, basta mudar aqui. O desenho de cada camada sobre a planta fica no
 * componente (procure pelo `id`).
 */

export type CamadaId = "luz" | "ventilacao" | "energia" | "agua" | "conforto" | "materiais";

export type Camada = {
  id: CamadaId;
  nome: string;
  icone: LucideIcon;
  /** Cor de fundo do ícone (classe do Tailwind). */
  cor: string;
  texto: string;
};

export const camadas: Camada[] = [
  {
    id: "luz",
    nome: "Luz natural",
    icone: Sun,
    cor: "bg-peach-200",
    texto:
      "Janelas bem posicionadas e aberturas inteligentes aproveitam a luz do dia, reduzem o uso de lâmpadas e melhoram o bem-estar da equipe.",
  },
  {
    id: "ventilacao",
    nome: "Ventilação natural",
    icone: Wind,
    cor: "bg-mist",
    texto:
      "A ventilação cruzada renova o ar e reduz a necessidade de ar-condicionado, com mais conforto e menos gasto.",
  },
  {
    id: "energia",
    nome: "Energia",
    icone: Zap,
    cor: "bg-peach-100",
    texto: "Energia solar, iluminação LED e equipamentos eficientes diminuem a conta de luz e o impacto ambiental.",
  },
  {
    id: "agua",
    nome: "Água",
    icone: Droplet,
    cor: "bg-mist/70",
    texto: "Captação de água da chuva, reuso e metais economizadores reduzem o consumo de água.",
  },
  {
    id: "conforto",
    nome: "Conforto",
    icone: Armchair,
    cor: "bg-sage/60",
    texto:
      "Isolamento acústico e térmico, ergonomia e vegetação criam ambientes onde as pessoas trabalham melhor.",
  },
  {
    id: "materiais",
    nome: "Materiais",
    icone: Layers,
    cor: "bg-caramel/25",
    texto: "Materiais de menor impacto, de origem certificada e duráveis, com menos desperdício na obra.",
  },
];
