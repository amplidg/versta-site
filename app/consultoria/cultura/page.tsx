import type { Metadata } from "next";
import { Compass, Flag, MessageSquareMore, Sun, UserPlus, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CulturaArvore } from "@/components/sections/cultura/CulturaArvore";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Cultura (especificação e textos do Lucas, 03/11), no
 * padrão das outras frentes (peças em components/sections/frente/). Seguindo as
 * regras do Lucas: só o botão do pré-diagnóstico (mais o link interno para a
 * página do SH2) e os títulos padronizados "Sua empresa precisa dessa solução
 * se..." e "O que entregamos" (mudanças que ele fez na Conexão, 04/11).
 */

export const metadata: Metadata = pageMetadata({
  title: "Cultura · RH e Gestão de Pessoas",
  description:
    "Desenvolvimento de lideranças, cultura e valores, recrutamento, avaliação de desempenho e clima organizacional. Pessoas que escolhem ficar e fazer a diferença.",
  path: "/consultoria/cultura",
});

const sinais = [
  "É difícil contratar ou manter bons profissionais.",
  "A rotatividade da equipe é alta.",
  "Os líderes foram promovidos pela competência técnica, mas nunca foram preparados para gerir pessoas.",
  "Conflitos entre colaboradores ou entre áreas são frequentes.",
  "Não existem avaliações, feedbacks ou um plano de desenvolvimento para a equipe.",
];

const servicos: Servico[] = [
  {
    titulo: "Desenvolvimento de lideranças",
    texto: "Preparamos líderes para conduzir pessoas com clareza, escuta e exemplo.",
    icone: Compass,
    fundo: "bg-mint",
  },
  {
    titulo: "Cultura e valores",
    texto: "Definimos e colocamos em prática o propósito e os valores da empresa.",
    icone: Flag,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Recrutamento e integração",
    texto: "Processos para atrair as pessoas certas e recebê-las bem desde o primeiro dia.",
    icone: UserPlus,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Avaliação e feedback",
    texto: "Avaliações de desempenho, feedbacks e planos de desenvolvimento para cada pessoa.",
    icone: MessageSquareMore,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Clima e engajamento",
    texto: "Pesquisas de clima e ações para fortalecer o engajamento e a convivência.",
    icone: Sun,
    fundo: "bg-peach-200/70",
  },
];

export default function CulturaPage() {
  return (
    <>
      <FrenteHero
        nome="Cultura"
        slug="cultura"
        eyebrow="Cultura · RH e pessoas"
        titulo="Pessoas que escolhem ficar e fazer a diferença"
        texto="Atrair, desenvolver e manter bons profissionais começa por uma cultura clara e por líderes preparados. A Versta estrutura a gestão de pessoas da sua empresa para que a equipe evolua junto com o negócio."
        selo={{
          texto: "Liderança, cultura e gestão de pessoas",
          icone: Users,
          fundo: "bg-mint",
          cor: "text-green-900",
        }}
        emblema={{ icone: Users, cores: ["var(--color-green-700)", "var(--color-mint)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* SINAIS DE ALERTA */}
      <Section tone="mint" aria-labelledby="sinais-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="sinais-titulo"
              title="Sua empresa precisa dessa solução se..."
              lead="Marque o que acontece hoje na sua empresa."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <SinaisAlerta
              sinais={sinais}
              mensagem="As pessoas da sua empresa estão pedindo atenção. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* A ÁRVORE DA CULTURA */}
      <Section aria-labelledby="arvore-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="arvore-titulo"
              title="Como uma cultura forte se forma"
              lead="Toque em cada parte da árvore."
              align="center"
            />
          </Reveal>
          <CulturaArvore />
        </Container>
      </Section>

      {/* O QUE ENTREGAMOS — título trocado pelo Lucas em 04/11 */}
      <Section tone="peach" aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="O que forma uma cultura forte" align="center" />
          </Reveal>
          <ServicosGrid servicos={servicos} />
        </Container>
      </Section>

      {/* CULTURA E SAÚDE MENTAL */}
      <Section tone="mist" aria-labelledby="sh2-titulo">
        <Container>
          {/* no celular/tablet, centralizado (pedido do Lucas, 07/11) */}
          <div className="grid items-center gap-10 max-lg:text-center lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <SectionHeading id="sh2-titulo" title="Cultura e saúde mental caminham juntas" />
              <p className="mt-6 text-lead text-ink-muted">
                Uma cultura saudável protege as pessoas, e pessoas cuidadas fortalecem a cultura. Por isso, a frente
                Cultura conversa diretamente com o Programa SH2, a solução da Versta para saúde mental no trabalho e
                adequação à NR-1.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <div className="rounded-card bg-navy p-8 text-offwhite shadow-[0_24px_50px_-28px_rgb(0_41_77/0.7)] md:p-10">
                <p className="font-display text-2xl leading-tight font-bold">
                  Programa SH2
                  <span className="mt-1 block text-lg text-peach-200">Ser Humano em Harmonia</span>
                </p>
                <p className="mt-4 text-offwhite/80">Saúde mental no trabalho e adequação à NR-1</p>
                <Button href="/metodologia/sh2" variant="light" arrow className="mt-7 max-sm:w-full">
                  Conhecer o Programa SH2
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-12 flex justify-center">
            <Button href={PREDIAG_URL} variant="primary" arrow className="max-sm:w-full">
              Fazer o pré-diagnóstico
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
