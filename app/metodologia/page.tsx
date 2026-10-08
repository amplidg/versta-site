import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Compass, Layers, Map, Repeat, Search, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowsBackdrop } from "@/components/sections/ArrowsBackdrop";
import { PageHero } from "@/components/sections/PageHero";
import { TrailSteps } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { etapasMetodologia } from "@/data/metodologia";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Metodologia para saúde mental nas empresas",
  description:
    "A metodologia da Versta olha para a empresa como um todo: do diagnóstico dos riscos psicossociais ao acompanhamento contínuo, com apoio à conformidade com a NR-1.",
  path: "/metodologia",
});

/* Textos fornecidos pelo Lucas (08/10/2026) — não reescrever. */

const principios: { titulo: string; texto: string; icone: LucideIcon }[] = [
  {
    titulo: "Entender antes de agir",
    texto:
      "Toda atuação começa por um diagnóstico. Antes de propor qualquer ação, conhecemos a realidade da empresa, seus riscos, suas fragilidades e seus pontos fortes.",
    icone: Search,
  },
  {
    titulo: "Olhar para o todo",
    texto:
      "Saúde mental envolve corpo, mente, relações, ambiente e cultura. Por isso, a metodologia integra diferentes áreas e profissionais em um mesmo plano, em vez de ações soltas e desconectadas.",
    icone: Layers,
  },
  {
    titulo: "A liderança como ponto de partida",
    texto:
      "Quando o líder compreende seu papel e é preparado para ele, a mudança chega a todas as pessoas da organização.",
    icone: Compass,
  },
  {
    titulo: "Continuidade",
    texto:
      "Um ambiente de trabalho saudável é construído com constância. A metodologia acontece ao longo do tempo, com acompanhamento e ajustes.",
    icone: Repeat,
  },
  {
    titulo: "Conformidade com propósito",
    texto:
      "Atender à NR-1 é necessário, mas não é o fim. Buscamos que a empresa esteja em conformidade porque, de fato, cuida das pessoas.",
    icone: ShieldCheck,
  },
  {
    titulo: "Cada empresa tem seu terreno",
    texto:
      "Não existe um modelo único. O plano é construído de acordo com o porte, a realidade e as necessidades de cada organização.",
    icone: Map,
  },
];

export default function MetodologiaPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Metodologia"
        title="Metodologia para saúde mental nas empresas"
        headline="Cuidar das pessoas não é uma ação isolada. É um caminho contínuo."
        lead="Criamos uma metodologia que olha para a empresa como um todo, porque a saúde mental dos colaboradores nasce do ambiente, das relações e da forma como cada organização é conduzida."
        imagem="metodo"
      />

      {/* POR QUE ESTA METODOLOGIA EXISTE */}
      <Section tone="peach" aria-labelledby="porque-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="porque-titulo"
              eyebrow="Por que esta metodologia existe"
              title="Uma nova exigência, um antigo desafio"
            />
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lead text-ink-muted lg:col-span-7">
            <p>
              Com a atualização da NR-1, as empresas passaram a ter a obrigação de identificar e
              gerenciar os riscos psicossociais dentro do seu Programa de Gerenciamento de Riscos.
            </p>
            <p>
              Muitas organizações ainda não sabem por onde começar. Outras acreditam que basta
              contratar um profissional da área para conversar com a equipe. Ações isoladas como
              essa podem até ajudar algumas pessoas, mas não mudam o que gera o problema e, muitas
              vezes, deixam brechas que expõem a empresa a riscos trabalhistas e jurídicos.
            </p>
            <p>
              Foi a partir desse cenário que a Versta desenvolveu sua metodologia: para que as
              empresas cuidem da saúde mental das pessoas de forma consistente, com segurança e com
              responsabilidade.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* O RACIOCÍNIO POR TRÁS */}
      <Section tone="navy" aria-labelledby="raciocinio-titulo">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                onDark
                id="raciocinio-titulo"
                eyebrow="O raciocínio por trás"
                title="O que acontece dentro da empresa acontece dentro das pessoas"
              />
            </Reveal>
            <Reveal delay={120} className="mt-10 space-y-6 text-lead text-offwhite">
              <p>
                A saúde mental no trabalho não depende só do indivíduo. Ela é influenciada pela
                rotina, pela carga de trabalho, pela comunicação, pelas relações entre as equipes,
                pela cultura e, principalmente, pela liderança.
              </p>
              <p>
                {/* frase-chave em destaque; o parágrafo segue logo abaixo */}
                <strong className="mb-4 block border-l-2 border-caramel py-1 pl-6 font-display text-h3 font-bold text-peach-100">
                  Toda empresa segue o caminho de quem a lidera.
                </strong>{" "}
                A forma como um líder se comunica, decide e conduz as pessoas se espalha por toda a
                organização, para o bem ou para o mal.
              </p>
              <p>
                Por isso, a nossa metodologia não trata a saúde mental como um serviço a ser
                entregue aos colaboradores, e sim como uma construção que envolve a empresa
                inteira, começando por quem está à frente dela.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* PRINCÍPIOS */}
      <Section aria-labelledby="principios-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="principios-titulo"
              eyebrow="Princípios"
              title="Os princípios que guiam o nosso trabalho"
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {principios.map((p, i) => {
              const Icon = p.icone;
              return (
                <Reveal
                  as="li"
                  key={p.titulo}
                  delay={(i % 3) * 120}
                  className="rounded-card border border-navy/10 bg-offwhite p-7 md:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-mint">
                    <Icon aria-hidden="true" className="size-6 text-caramel-700" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-h3 text-navy">{p.titulo}</h3>
                  <p className="mt-3 text-ink-muted">{p.texto}</p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* COMO A METODOLOGIA SE APLICA */}
      <Section tone="forest" aria-labelledby="aplicacao-titulo" className="relative isolate overflow-hidden">
        <ArrowsBackdrop />
        <Container>
          <Reveal>
            <SectionHeading
              onDark
              id="aplicacao-titulo"
              eyebrow="Como a metodologia se aplica"
              title="Do diagnóstico à evolução contínua"
            />
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <TrailSteps etapas={etapasMetodologia} onDark />
          </div>
        </Container>
      </Section>

      {/* SH2, A APLICAÇÃO DA METODOLOGIA */}
      <Section tone="mint" aria-labelledby="sh2-titulo">
        <Container>
          <div className="grid overflow-hidden rounded-card bg-offwhite/60 lg:grid-cols-2">
            <Reveal className="flex flex-col justify-center p-8 md:p-14">
              <p className="eyebrow mb-4 flex items-center gap-3 text-caramel-700">
                <span aria-hidden="true" className="h-px w-8 bg-caramel" />
                A aplicação da metodologia
              </p>
              <h2 id="sh2-titulo" className="text-h2 text-navy">
                SH2: Ser Humano em Harmonia
              </h2>
              <p className="mt-5 max-w-lg text-lead text-ink-muted">
                O SH2 é a forma como colocamos essa metodologia em prática dentro das empresas. Ele
                reúne, em um só programa, as ações e os profissionais necessários para cuidar da
                saúde mental dos colaboradores e apoiar a empresa na conformidade com a NR-1.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/metodologia/sh2" variant="accent" arrow>
                  Conheça o SH2
                </Button>
                <Button href={ctaDiagnostico.href} variant="outline">
                  {ctaDiagnostico.label}
                </Button>
              </div>
            </Reveal>
            <Illustration
              imagem="ctaHome"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="min-h-72 lg:min-h-[28rem]"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
