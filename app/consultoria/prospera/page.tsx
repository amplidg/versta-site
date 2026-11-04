import type { Metadata } from "next";
import {
  BadgePercent,
  Calculator,
  FileChartColumn,
  Eye,
  PiggyBank,
  Sun,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import {
  MotivosLista,
  type Motivo,
} from "@/components/sections/frente/MotivosLista";
import {
  ServicosGrid,
  type Servico,
} from "@/components/sections/frente/ServicosGrid";
import { ProsperaPerguntas } from "@/components/sections/prospera/ProsperaPerguntas";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Próspera (especificação e textos do Lucas, 04/11),
 * no padrão das outras frentes (peças em components/sections/frente/). Sem a
 * lista de sinais de alerta: o teste das 5 perguntas faz esse papel. Seguindo
 * as regras do Lucas: só botões de pré-diagnóstico (a especificação trazia
 * "Falar com um especialista"), cartão azul final sem mancha e o título padrão
 * "O que entregamos" (a especificação trazia "O que a Próspera faz").
 */

export const metadata: Metadata = pageMetadata({
  title: "Próspera · Assessoria Financeira e Contábil",
  description:
    "Organização financeira, fluxo de caixa, custos e margens, planejamento tributário e contabilidade para empresas. Números claros para decisões seguras.",
  path: "/consultoria/prospera",
});

const servicos: Servico[] = [
  {
    titulo: "Organização financeira",
    texto:
      "Separamos as finanças da empresa e dos sócios e organizamos contas a pagar e a receber.",
    icone: Wallet,
    fundo: "bg-mint",
  },
  {
    titulo: "Custos e margens",
    texto:
      "Calculamos o custo e a margem de cada produto ou serviço para precificar com segurança.",
    icone: Calculator,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Planejamento tributário",
    texto:
      "Revisamos o regime tributário para a empresa pagar o que é justo, dentro da lei.",
    icone: BadgePercent,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Contabilidade e relatórios",
    texto:
      "Contabilidade em dia e relatórios simples para decidir com base em números.",
    icone: FileChartColumn,
    fundo: "bg-peach-200/70",
  },
];

const mudancas: Motivo[] = [
  {
    titulo: "Clareza",
    texto: "Você sabe exatamente quanto entra, quanto sai e quanto sobra.",
    icone: Eye,
  },
  {
    titulo: "Economia",
    texto: "Custos e impostos revisados deixam mais dinheiro na empresa.",
    icone: PiggyBank,
  },
  {
    titulo: "Tranquilidade",
    texto: "Decisões tomadas com base em números, não no improviso.",
    icone: Sun,
  },
];

export default function ProsperaPage() {
  return (
    <>
      <FrenteHero
        nome="Próspera"
        slug="prospera"
        eyebrow="Próspera · Assessoria financeira e contábil"
        titulo="Números claros para decisões seguras"
        texto="Fluxo de caixa organizado, margens conhecidas, impostos revisados e relatórios que fazem sentido. Colocamos as finanças da sua empresa em ordem para você decidir com segurança."
        selo={{
          texto: "Financeiro e contábil lado a lado",
          icone: TrendingUp,
          fundo: "bg-mint",
          cor: "text-green-900",
        }}
        emblema={{
          icone: TrendingUp,
          cores: ["var(--color-sage)", "var(--color-mint)"],
        }}
        prediagUrl={PREDIAG_URL}
      />

      {/* AS 5 PERGUNTAS */}
      <Section
        tone="mint"
        aria-labelledby="perguntas-titulo"
        className="overflow-hidden"
      >
        <Container>
          <Reveal>
            <SectionHeading
              id="perguntas-titulo"
              title="5 perguntas que todo empresário deveria saber responder"
              lead="Seja sincero. Leva menos de um minuto."
              align="center"
            />
          </Reveal>
          <Reveal delay={120}>
            <ProsperaPerguntas prediagUrl={PREDIAG_URL} />
          </Reveal>
        </Container>
      </Section>

      {/* O QUE ENTREGAMOS */}
      <Section tone="peach" aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="faz-titulo"
              title="O que entregamos"
              align="center"
            />
          </Reveal>
          <ServicosGrid servicos={servicos} colunas={2} />
        </Container>
      </Section>

      {/* O QUE MUDA NA PRÁTICA */}
      <Section aria-labelledby="pratica-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="pratica-titulo"
              title="O que muda na prática"
              align="center"
            />
          </Reveal>
          <MotivosLista itens={mudancas} />
          <FrenteChamada
            antes="Empresa próspera é empresa que"
            destaque="conhece os próprios números."
            prediagUrl={PREDIAG_URL}
          />
        </Container>
      </Section>
    </>
  );
}
