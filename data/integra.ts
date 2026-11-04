import type { LucideIcon } from "lucide-react";
import { ReceiptText, UserMinus, UserX } from "lucide-react";

/**
 * Situações do bloco "Dois caminhos para o mesmo conflito" da página da
 * Íntegra (/consultoria/integra, especificação e textos do Lucas, 04/11).
 * Para mudar textos ou acrescentar situações, edite esta lista.
 * - `disputa` / `estrategico`: as 3 etapas de cada caminho, em ordem.
 * - `resultadoDisputa` / `resultadoEstrategico`: o card no fim de cada caminho.
 */
export type Situacao = {
  nome: string;
  icone: LucideIcon;
  disputa: string[];
  resultadoDisputa: string;
  estrategico: string[];
  resultadoEstrategico: string;
};

export const situacoes: Situacao[] = [
  {
    nome: "Um sócio quer sair da empresa",
    icone: UserMinus,
    disputa: [
      "Desentendimento sobre valores e direitos",
      "Ação judicial de dissolução",
      "Anos de disputa e empresa paralisada",
    ],
    resultadoDisputa: "Custos altos, desgaste e relação rompida.",
    estrategico: [
      "Acordo de sócios revisado",
      "Negociação mediada, com regras claras",
      "Saída organizada e documentada",
    ],
    resultadoEstrategico:
      "Mais rapidez, menos custo e a empresa segue funcionando.",
  },
  {
    nome: "Um ex-colaborador está insatisfeito",
    icone: UserX,
    disputa: [
      "Rotinas de RH sem respaldo legal",
      "Reclamação trabalhista",
      "Audiências, provas e incerteza",
    ],
    resultadoDisputa: "Custo imprevisível e exposição da empresa.",
    estrategico: [
      "Rotinas trabalhistas revisadas e documentadas",
      "Diálogo e acordo quando surge o conflito",
      "Encerramento formalizado com segurança",
    ],
    resultadoEstrategico: "Risco reduzido e relação encerrada com respeito.",
  },
  {
    nome: "Um cliente não pagou",
    icone: ReceiptText,
    disputa: [
      "Contrato frágil ou inexistente",
      "Ação de cobrança",
      "Espera longa pelo recebimento",
    ],
    resultadoDisputa: "Dinheiro parado e cliente perdido.",
    estrategico: [
      "Contrato bem estruturado desde o início",
      "Negociação com base em cláusulas claras",
      "Acordo de pagamento formalizado",
    ],
    resultadoEstrategico: "Recebimento mais rápido e relação preservada.",
  },
];
