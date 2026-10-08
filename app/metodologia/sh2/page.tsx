import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  BookOpen,
  Brain,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  Flower2,
  HeartHandshake,
  PersonStanding,
  Plus,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowsBackdrop } from "@/components/sections/ArrowsBackdrop";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TrailSteps, type Etapa } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "SH2: programa de saúde mental para empresas e adequação à NR-1",
  description:
    "O SH2 (Ser Humano em Harmonia) é o programa da Versta que une diagnóstico, cuidado com a saúde mental e bem-estar no dia a dia, para que a empresa cuide das pessoas e esteja preparada para a NR-1.",
  path: "/metodologia/sh2",
});

/* Textos fornecidos pelo Lucas (08/10/2026) — não reescrever. */

type Item = string | { texto: string; sub: string[] };

const areas: { titulo: string; descricao: string; icone: LucideIcon; itens: Item[] }[] = [
  {
    titulo: "Base técnica e legal",
    descricao: "A estrutura que dá segurança à empresa e orienta todas as outras ações.",
    icone: ClipboardCheck,
    itens: [
      "Diagnóstico do PGR (Programa de Gerenciamento de Riscos) conforme a NR-01",
      "Questionário investigativo dos colaboradores com médica de saúde da família",
    ],
  },
  {
    titulo: "Saúde mental e emocional",
    descricao: "Acompanhamento profissional para quem precisa de escuta e cuidado.",
    icone: Brain,
    itens: ["Terapia com psicólogo (House Coworking ou online)"],
  },
  {
    titulo: "Terapias integrativas e relaxamento",
    descricao: "Momentos que reduzem o estresse e aliviam a tensão do dia a dia.",
    icone: Flower2,
    itens: [
      "Reiki presencial (uma vez por semana)",
      "Acupuntura presencial (uma vez por semana)",
      "Escalda-pés presencial (quinzenal)",
      "Massagem nos pés com aparelho, em sessões de 40 minutos (uma vez por semana)",
      "Cadeira de massagem na House Coworking, com hora marcada",
    ],
  },
  {
    titulo: "Corpo e movimento",
    descricao: "Práticas que trabalham o corpo e a mente ao mesmo tempo.",
    icone: PersonStanding,
    itens: [
      "Yoga online (diariamente)",
      "Yoga presencial (uma vez por semana)",
      "Tai chi presencial (uma vez por semana)",
    ],
  },
  {
    titulo: "Saúde física e nutrição",
    descricao: "Cuidado com a base física que sustenta o bem-estar emocional.",
    icone: Apple,
    itens: [
      "Acompanhamento com nutricionista (House Coworking ou online)",
      "Bioimpedância na House Coworking, com hora marcada (mensal)",
    ],
  },
  {
    titulo: "Educação e conscientização",
    descricao: "Conteúdos contínuos que ampliam o conhecimento e o cuidado de cada colaborador.",
    icone: BookOpen,
    itens: [
      {
        texto: "Pílulas mensais de conhecimento:",
        sub: [
          "1ª semana: saúde",
          "2ª semana: meio ambiente",
          "3ª semana: planejamento financeiro",
          "4ª semana: curiosidades divertidas",
        ],
      },
      "Palestras temáticas ligadas às campanhas de conscientização, como Maio Amarelo, Setembro Amarelo, Outubro Rosa, Novembro Azul e autismo",
    ],
  },
  {
    titulo: "Cultura, propósito e pertencimento",
    descricao: "Ações que fortalecem os vínculos entre as pessoas e com a empresa.",
    icone: HeartHandshake,
    itens: [
      "Ambiente e projetos de voluntariado",
      "1 evento festivo na House Coworking",
      "2 usos da House Coworking para treinamentos ou integrações corporativas",
    ],
  },
  {
    titulo: "Estrutura e espaço (House Coworking)",
    descricao: "Um ambiente pensado para o cuidado acontecer.",
    icone: Building2,
    itens: ["Uso de salas privativas", "Equipamentos e salas disponíveis com hora marcada"],
  },
];

const etapas: Etapa[] = [
  {
    titulo: "Diagnóstico",
    texto:
      "Realizamos o diagnóstico do PGR e o levantamento com os colaboradores para identificar os riscos psicossociais.",
  },
  {
    titulo: "Plano sob medida",
    texto:
      "Com base no diagnóstico, definimos o plano do SH2 mais adequado, com as áreas e as frequências que fazem sentido para a empresa.",
  },
  {
    titulo: "Aplicação integrada",
    texto:
      "Com o plano definido, as atividades começam na empresa. A Versta organiza agendas, profissionais e espaços para que tudo funcione como um só programa.",
  },
  {
    titulo: "Acompanhamento",
    texto:
      "Ao longo do programa, acompanhamos a participação dos colaboradores e a evolução do ambiente de trabalho, e ajustamos o plano sempre que necessário.",
  },
];

const resultados = [
  "Harmonia no ambiente de trabalho",
  "Colaboradores mais saudáveis mentalmente para desempenhar suas funções",
  "Fortalecimento da cultura da empresa e maior engajamento dos colaboradores",
  "Aumento de produtividade",
  "Desenvolvimento pessoal e profissional dos colaboradores",
  "Menor rotatividade, com mais retenção de talentos e menos custos com desligamentos, contratações e treinamentos",
  "Redução de afastamentos e faltas relacionados à saúde mental",
  "Menor risco de multas por não conformidade com a NR-1",
  "Menor risco de processos trabalhistas ligados a riscos psicossociais e ao ambiente de trabalho",
  "Gestão simplificada, com todas as ações reunidas em um só programa, sem precisar contratar e coordenar vários fornecedores",
];

const perguntas = [
  {
    pergunta: "O SH2 ajuda minha empresa a se adequar à NR-1?",
    resposta:
      "Sim. O SH2 começa pelo diagnóstico do PGR, que identifica os riscos psicossociais, e organiza as ações para lidar com eles. A adequação depende também da continuidade dessas ações, e por isso a Versta acompanha a empresa ao longo de todo o processo.",
  },
  {
    pergunta: "Contratar um psicólogo para a equipe não é suficiente?",
    resposta:
      "O atendimento psicológico é importante, mas sozinho não identifica nem trata o que gera os riscos no ambiente de trabalho. Ações isoladas podem deixar brechas que expõem a empresa a riscos trabalhistas. O SH2 une diagnóstico, cuidado e prevenção em um mesmo plano.",
  },
  {
    pergunta: "Preciso contratar todas as áreas do SH2?",
    resposta:
      "Não. Existem planos diferentes, montados de acordo com o diagnóstico, o porte e as necessidades de cada empresa.",
  },
  {
    pergunta: "O SH2 atende empresas de qualquer porte e setor?",
    resposta:
      "Sim. O programa é adaptado à realidade de cada empresa, independentemente do tamanho ou do segmento.",
  },
  {
    pergunta: "As atividades são presenciais ou online?",
    resposta:
      "As duas formas. Algumas atividades, como yoga diário, terapia e nutricionista, podem ser online. Outras acontecem presencialmente na House Coworking, com hora marcada.",
  },
  {
    pergunta: "Quem são os profissionais que atuam no SH2?",
    resposta:
      "A Versta reúne profissionais e empresas especializadas em cada área e coordena todo o trabalho, para que a empresa tenha uma única condução.",
  },
];

/** Schema.org FAQPage: as mesmas perguntas e respostas visíveis na página. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: perguntas.map((p) => ({
    "@type": "Question",
    name: p.pergunta,
    acceptedAnswer: { "@type": "Answer", text: p.resposta },
  })),
};

export default function Sh2Page() {
  return (
    <>
      {/* HERO */}
      <PageHero
        top={
          <nav aria-label="Você está em" className="mb-6 flex items-center gap-1.5 text-sm text-ink-muted">
            <Link href="/metodologia" className="underline-offset-4 hover:underline">
              Metodologia
            </Link>
            <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
            <span aria-current="page">SH2</span>
          </nav>
        }
        eyebrow="SH2"
        title="Programa de saúde mental para empresas e adequação à NR-1"
        headline="SH2: Ser Humano em Harmonia"
        lead="Um programa completo que une diagnóstico, cuidado com a saúde mental e bem-estar no dia a dia, para que sua empresa cuide das pessoas e esteja preparada para a NR-1."
        imagem="sh2Hero"
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
        <Button href="#incluido" variant="outline">
          Ver o que está incluído
        </Button>
      </PageHero>

      {/* O QUE É O SH2 */}
      <Section tone="peach" aria-labelledby="oque-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="oque-titulo"
              eyebrow="O que é o SH2"
              title="Tudo o que sua empresa precisa, reunido em um só lugar"
            />
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lead text-ink-muted lg:col-span-7">
            <p>
              O SH2 é o programa da Versta para empresas que querem cuidar da saúde mental dos
              colaboradores com seriedade. Em vez de contratar e coordenar vários profissionais
              separadamente, a empresa conta com uma única condução, que começa pelo diagnóstico
              dos riscos psicossociais e se estende às ações que fazem diferença no dia a dia de
              quem trabalha.
            </p>
            <p>
              Tudo é organizado pela Versta: os profissionais, os espaços, os horários e o
              acompanhamento.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* O QUE ESTÁ DENTRO DO SH2 */}
      <Section id="incluido" aria-labelledby="incluido-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="incluido-titulo"
              eyebrow="O que está dentro do SH2"
              title="O que está incluído no SH2"
              lead="O SH2 é organizado em oito áreas que se complementam. Cada empresa recebe um plano de acordo com a sua realidade e as suas necessidades."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
            {areas.map((area, i) => {
              const Icon = area.icone;
              return (
                <Reveal
                  as="li"
                  key={area.titulo}
                  delay={(i % 2) * 120}
                  className="rounded-card border border-navy/10 bg-offwhite p-7 md:p-9"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint">
                      <Icon aria-hidden="true" className="size-6 text-caramel-700" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-h3 text-navy">{area.titulo}</h3>
                      <p className="mt-2 text-ink-muted">{area.descricao}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-navy/10 pt-6">
                    {area.itens.map((item) => {
                      const texto = typeof item === "string" ? item : item.texto;
                      return (
                        <li key={texto} className="flex gap-3 text-ink">
                          <Check
                            aria-hidden="true"
                            className="mt-1 size-4 shrink-0 text-green-900"
                            strokeWidth={2}
                          />
                          <div>
                            {texto}
                            {typeof item !== "string" && (
                              <ul className="mt-2 space-y-1 text-ink-muted">
                                {item.sub.map((s) => (
                                  <li key={s}>{s}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* A HOUSE COWORKING */}
      <SplitFeature
        id="house-titulo"
        eyebrow="A House Coworking"
        title="Um espaço preparado para cuidar das pessoas"
        paragrafos={[
          "Parte das atividades do SH2 acontece na House Coworking, um espaço com salas privativas, equipamentos e ambientes preparados para atendimentos, práticas, treinamentos e encontros. Assim, os colaboradores têm um lugar acolhedor, fora da rotina da empresa, para cuidar de si. Os atendimentos são agendados com hora marcada, e várias atividades também podem ser feitas online.",
        ]}
        imagem="houseCoworking"
        tone="mist"
      />

      {/* COMO FUNCIONA */}
      <Section tone="forest" aria-labelledby="como-titulo" className="relative isolate overflow-hidden">
        <ArrowsBackdrop />
        <Container>
          <Reveal>
            <SectionHeading
              onDark
              id="como-titulo"
              eyebrow="Como funciona"
              title="Como o SH2 chega até a sua empresa"
            />
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <TrailSteps etapas={etapas} onDark />
          </div>
        </Container>
      </Section>

      {/* RESULTADOS */}
      <Section aria-labelledby="resultados-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="resultados-titulo"
              eyebrow="Resultados"
              title="A transformação que o SH2 gera na sua empresa"
            />
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-12 grid gap-x-12 md:grid-cols-2 lg:mt-16">
              {resultados.map((r) => (
                <li key={r} className="flex gap-4 border-t border-navy/10 py-5 text-lead text-ink">
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-mint">
                    <Check aria-hidden="true" className="size-4 text-green-900" strokeWidth={2} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <CtaBanner
        title="Cuidar das pessoas também é cuidar da empresa."
        text="Solicite um diagnóstico e descubra como o SH2 pode ser aplicado na realidade da sua empresa."
      />

      {/* PERGUNTAS FREQUENTES */}
      <Section aria-labelledby="faq-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="faq-titulo"
              eyebrow="Perguntas frequentes"
              title="Perguntas frequentes sobre o SH2"
            />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <div className="border-b border-navy/15">
              {perguntas.map((p) => (
                <details key={p.pergunta} className="group border-t border-navy/15">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-h3 text-navy">{p.pergunta}</h3>
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-navy/25 text-navy transition-transform duration-300 group-open:rotate-45">
                      <Plus aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 text-lead text-ink-muted">{p.resposta}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      </Section>

      {/* ALÉM DO SH2 */}
      <Section tone="peach" aria-labelledby="alem-titulo">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionHeading
              id="alem-titulo"
              eyebrow="Além do SH2"
              title="O começo de um caminho maior"
              align="center"
            />
            <p className="mt-6 text-lead text-ink-muted">
              O diagnóstico do SH2 revela muito sobre a empresa. Muitas vezes, ele mostra outras
              áreas que também precisam evoluir, como a liderança, a cultura, a comunicação, a
              gestão de conflitos ou a segurança jurídica. Nesses casos, a Versta conecta a empresa
              às soluções certas para cada desafio, com o mesmo cuidado e a mesma condução.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/consultoria" variant="primary" arrow>
                Conheça nossas soluções
              </Button>
              <Button href={ctaDiagnostico.href} variant="outline">
                {ctaDiagnostico.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
