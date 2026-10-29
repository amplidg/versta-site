import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Apple,
  BookOpen,
  Brain,
  Building2,
  Check,
  ClipboardCheck,
  Flower2,
  HeartHandshake,
  PersonStanding,
  Plus,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HouseTour } from "@/components/sections/HouseTour";
import { Sh2Hero } from "@/components/sections/sh2-hero/Sh2Hero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Programa SH2: saúde mental para empresas e adequação à NR-1",
  description:
    "O Programa SH2 (Ser Humano em Harmonia), da Versta, une diagnóstico, cuidado com a saúde mental e bem-estar no dia a dia, para que a empresa cuide das pessoas e esteja preparada para a NR-1.",
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
    pergunta: "O Programa SH2 ajuda minha empresa a se adequar à NR-1?",
    resposta:
      "Sim. O Programa SH2 começa pelo diagnóstico do PGR, que identifica os riscos psicossociais, e organiza as ações para lidar com eles. A adequação depende também da continuidade dessas ações, e por isso a Versta acompanha a empresa ao longo de todo o processo.",
  },
  {
    pergunta: "Contratar um psicólogo para a equipe não é suficiente?",
    resposta:
      "O atendimento psicológico é importante, mas sozinho não identifica nem trata o que gera os riscos no ambiente de trabalho. Ações isoladas podem deixar brechas que expõem a empresa a riscos trabalhistas. O Programa SH2 une diagnóstico, cuidado e prevenção em um mesmo plano.",
  },
  {
    pergunta: "Preciso contratar todas as áreas do Programa SH2?",
    resposta:
      "Não. Existem planos diferentes, montados de acordo com o diagnóstico, o porte e as necessidades de cada empresa.",
  },
  {
    pergunta: "O Programa SH2 atende empresas de qualquer porte e setor?",
    resposta:
      "Sim. O programa é adaptado à realidade de cada empresa, independentemente do tamanho ou do segmento.",
  },
  {
    pergunta: "As atividades são presenciais ou online?",
    resposta:
      "As duas formas. Algumas atividades, como yoga diário, terapia e nutricionista, podem ser online. Outras acontecem presencialmente na House Coworking, com hora marcada.",
  },
  {
    pergunta: "Quem são os profissionais que atuam no Programa SH2?",
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
      <Sh2Hero
        lead="Um programa completo que une diagnóstico, cuidado com a saúde mental e bem-estar no dia a dia, para que sua empresa cuide das pessoas e esteja preparada para a NR-1."
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
        <Button href="#incluido" variant="outline">
          Ver o que está incluído
        </Button>
      </Sh2Hero>

      {/* O QUE ESTÁ DENTRO DO Programa SH2 */}
      {/* mesmo fundo do topo: sem o respiro de cima, para não sobrar um vão */}
      <Section id="incluido" aria-labelledby="incluido-titulo" className="pt-4 md:pt-6">
        <Container>
          <Reveal>
            <SectionHeading
              id="incluido-titulo"
              eyebrow="O que está dentro do Programa SH2"
              title="O que está incluído no Programa SH2"
              lead="O Programa SH2 é organizado em oito áreas que se complementam. Cada empresa recebe um plano de acordo com a sua realidade e as suas necessidades."
            />
          </Reveal>
          {/* uma área por linha: nome e descrição à esquerda, itens à direita */}
          <ul className="mt-12 border-b border-navy/15 lg:mt-14">
            {areas.map((area) => {
              const Icon = area.icone;
              return (
                <Reveal
                  as="li"
                  key={area.titulo}
                  className="grid gap-5 border-t border-navy/15 py-7 lg:grid-cols-12 lg:gap-10 lg:py-8"
                >
                  <div className="flex items-start gap-4 lg:col-span-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mint">
                      <Icon aria-hidden="true" className="size-5 text-caramel-700" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-snug font-bold text-navy">{area.titulo}</h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{area.descricao}</p>
                    </div>
                  </div>
                  <ul className="grid content-start gap-x-8 gap-y-2.5 pl-14 text-[0.9375rem] leading-snug text-ink sm:grid-cols-2 lg:col-span-7 lg:pt-1.5 lg:pl-0">
                    {area.itens.map((item) => {
                      const texto = typeof item === "string" ? item : item.texto;
                      return (
                        <li key={texto} className="flex gap-2.5">
                          <Check
                            aria-hidden="true"
                            className="mt-[0.2em] size-4 shrink-0 text-green-900"
                            strokeWidth={2}
                          />
                          <div>
                            {texto}
                            {typeof item !== "string" && (
                              <ul className="mt-1.5 space-y-1 text-ink-muted">
                                {item.sub.map((sub) => (
                                  <li key={sub}>{sub}</li>
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
      <HouseTour />

      {/* RESULTADOS */}
      <Section aria-labelledby="resultados-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="resultados-titulo"
              eyebrow="Resultados"
              title="A transformação que o Programa SH2 gera na sua empresa"
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
        text="Solicite um diagnóstico e descubra como o Programa SH2 pode ser aplicado na realidade da sua empresa."
      />

      {/* PERGUNTAS FREQUENTES */}
      <Section aria-labelledby="faq-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="faq-titulo"
              eyebrow="Perguntas frequentes"
              title="Perguntas frequentes sobre o Programa SH2"
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
    </>
  );
}
