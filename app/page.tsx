import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowsBackdrop } from "@/components/sections/ArrowsBackdrop";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FrentesGrid } from "@/components/sections/FrentesGrid";
import { HeroIntro } from "@/components/sections/intro/HeroIntro";
import { OrgChart } from "@/components/sections/OrgChart";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TrailSteps, type Etapa } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaDiagnostico } from "@/data/navegacao";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | ${site.tagline}` },
};

const etapas: Etapa[] = [
  {
    titulo: "Diagnóstico",
    texto: "A Versta analisa a empresa para compreender o terreno em que ela atua e os desafios que enfrenta.",
  },
  {
    titulo: "Áreas a desenvolver",
    texto: "Com o diagnóstico, as dores ficam claras e as áreas que precisam se desenvolver para crescer são identificadas.",
  },
  {
    titulo: "Conexão com as soluções",
    texto: "Cada área é conectada à solução especializada adequada, dentro do ecossistema de parceiros da Versta.",
  },
  {
    titulo: "[PREENCHER: etapa de acompanhamento]",
    texto: "[PREENCHER: se houver acompanhamento após a conexão, descrever como funciona.]",
  },
];

export default function Home() {
  return (
    <>
      {/* 1. HERO com intro (nuvens abrindo ao rolar) */}
      <HeroIntro
        labelledBy="home-titulo"
        background={<Illustration imagem="heroHome" priority className="absolute! inset-0 -z-10" />}
        logo={<Logo layout="vertical" className="w-[14rem] md:w-[18rem]" />}
      >
        <h1 id="home-titulo" className="mt-10 max-w-4xl text-h1 text-navy">
          Toda empresa segue o caminho de quem a lidera.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl px-3 text-lead text-balance text-white">
          {/* Tarja por linha: o fundo acompanha cada linha do texto */}
          <span className="box-decoration-clone bg-navy px-3 py-[0.12em]">
            Ajudamos líderes a enxergar sua empresa com clareza
            <br className="hidden md:block" /> e a conduzir as pessoas na
            construção de uma
            <br className="hidden md:block" /> organização mais humana e
            preparada para o futuro.
          </span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={ctaDiagnostico.href} variant="primary" arrow>
            {ctaDiagnostico.label}
          </Button>
          <Button href="/consultoria" variant="outline">
            Conheça as frentes
          </Button>
        </div>
      </HeroIntro>

      {/* 2. QUEM É A VERSTA — título, organograma e texto */}
      <Section aria-labelledby="oque-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="oque-titulo"
              eyebrow="Quem é a Versta"
              title="Um hub entre a sua empresa e as soluções que ela precisa"
            />
          </Reveal>
          <Reveal from="fade" delay={100} className="mt-14">
            <OrgChart />
          </Reveal>
          <Reveal delay={120} className="mt-14 grid gap-5 text-lead text-ink-muted md:grid-cols-2 md:gap-12">
            <p>
              A empresa chega com um problema. A Versta analisa, identifica as dores e
              as áreas que precisam se desenvolver para crescer, aponta o caminho e
              conecta com quem resolve.
            </p>
            <p>
              Essa conexão acontece dentro de um ecossistema de parceiros
              especializados, em áreas que vão da consultoria ambiental ao marketing.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* 3. DIAGNÓSTICO EMPRESARIAL (imagem 3) */}
      <SplitFeature
        id="diagnostico-titulo"
        tone="peach"
        reverse
        eyebrow="Diagnóstico empresarial"
        title="Entendemos a geografia do mercado"
        paragrafos={[
          "Todo caminho começa pela leitura do terreno. A Versta analisa a empresa com rigor para identificar as dores e as áreas que precisam se desenvolver para crescer.",
          "Análise, experiência e percepção se somam para reconhecer padrões e perceber sinais discretos antes que fiquem evidentes.",
        ]}
        imagem="diagnosticoEmpresarial"
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
      </SplitFeature>

      {/* 4. CONEXÃO ENTRE DESAFIOS E SOLUÇÕES (imagem 4) */}
      <SplitFeature
        id="conexao-titulo"
        eyebrow="Conexão"
        title="Do desafio à solução certa"
        paragrafos={[
          "Com o diagnóstico em mãos, a Versta conecta cada necessidade a quem resolve, dentro do seu ecossistema de parceiros especializados.",
          "Em vez de procurar sozinha, a empresa segue por um caminho indicado com segurança.",
        ]}
        imagem="conexao"
      >
        <Link
          href="/consultoria"
          className="group inline-flex items-center gap-2 font-semibold text-caramel-700 underline-offset-4 hover:underline"
        >
          Conheça as frentes
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
        </Link>
      </SplitFeature>

      {/* 5. MÉTODO DE TRABALHO (imagem 5) */}
      <Section tone="forest" aria-labelledby="como-titulo" className="relative isolate overflow-hidden">
        {/* flechas de crescimento compondo todo o fundo do bloco */}
        <ArrowsBackdrop />
        <Container>
          <Reveal>
            <SectionHeading
              onDark
              id="como-titulo"
              eyebrow="Método de trabalho"
              title="Do diagnóstico à solução, um passo de cada vez"
              lead="Toda jornada começa por entender onde se está. A partir daí, a direção fica mais clara."
            />
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <TrailSteps etapas={etapas} onDark />
          </div>
        </Container>
      </Section>

      {/* 6. ÁREAS DE ATUAÇÃO — FRENTES (imagem 6) */}
      <Section aria-labelledby="frentes-titulo">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal from="left" className="lg:order-1 lg:col-span-6">
              <Illustration
                imagem="areasAtuacao"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/9] w-full rounded-card"
              />
            </Reveal>
            <Reveal delay={120} className="lg:order-2 lg:col-span-6">
              <SectionHeading
                id="frentes-titulo"
                eyebrow="Áreas de atuação"
                title="Nove frentes, um mesmo olhar"
                lead="Da consultoria ambiental ao marketing, cada frente reúne soluções especializadas para uma área da empresa."
              />
              <Link
                href="/consultoria"
                className="group mt-8 inline-flex items-center gap-2 font-semibold text-caramel-700 underline-offset-4 hover:underline"
              >
                Ver todas as frentes
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 lg:mt-16">
            <FrentesGrid />
          </div>
        </Container>
      </Section>

      {/* 5. CTA FINAL */}
      <CtaBanner />
    </>
  );
}
