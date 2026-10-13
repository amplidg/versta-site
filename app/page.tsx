import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Layers } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowsBackdrop } from "@/components/sections/ArrowsBackdrop";
import { BenefitLayers } from "@/components/sections/BenefitLayers";
import { ConnectionMap } from "@/components/sections/ConnectionMap";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FrentesGrid } from "@/components/sections/FrentesGrid";
import { HeroIntro } from "@/components/sections/intro/HeroIntro";
import { OrgChart } from "@/components/sections/OrgChart";
import { Sh2Highlight } from "@/components/sections/Sh2Highlight";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TrailSteps } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { etapasMetodologia } from "@/data/metodologia";
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

export default function Home() {
  return (
    <>
      {/* 1. HERO com intro (nuvens abrindo ao rolar) */}
      <HeroIntro
        labelledBy="home-titulo"
        background={<Illustration imagem="heroHome" priority className="absolute! inset-0 -z-10" />}
        logo={<Logo layout="vertical" className="w-[14rem] md:w-[18rem]" />}
      >
        <h1 id="home-titulo" className="mt-10 max-w-4xl text-h1 leading-[calc(1.1em-2px)] text-navy md:leading-[1.1]">
          Para cada desafio, a Versta conecta sua empresa com a solução.
        </h1>
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
      {/* sem texto após o organograma: metade do respiro de baixo, para aproximar do próximo bloco */}
      <Section aria-labelledby="oque-titulo" className="pb-[calc(var(--section-y)/2)]">
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
        </Container>
      </Section>

      {/* PROGRAMA SH2 — destaque em azul-marinho, com checklist da NR-1 */}
      <Sh2Highlight />

      {/* ALÉM DO PROGRAMA SH2 — sinais do diagnóstico ligados às nove frentes */}
      <Section aria-labelledby="alem-titulo" className="relative isolate overflow-hidden">
        {/* textura sutil de aquarela nas bordas (decorativa) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-24 -left-48 size-[34rem] rounded-full bg-sage opacity-30 blur-3xl" />
          <div className="absolute -right-48 bottom-10 size-[36rem] rounded-full bg-peach-200 opacity-30 blur-3xl" />
        </div>
        <Container>
          <Reveal>
            <SectionHeading
              id="alem-titulo"
              eyebrow="Além do Programa SH2"
              title="O diagnóstico empresarial revela sinais em todas as áreas da empresa."
              lead="Por isso, olhamos para ela por inteiro e conectamos cada desafio à sua solução."
              align="center"
            />
          </Reveal>
          <Reveal from="fade" delay={120} className="mt-12 lg:mt-14">
            <ConnectionMap />
          </Reveal>
          <Reveal delay={120} className="mt-14 text-center lg:mt-16">
            <p className="mx-auto max-w-3xl font-display text-h3 font-bold text-balance text-navy">
              Um diagnóstico. Um único olhar. Todas as soluções conectadas.
            </p>
            <div className="mt-8">
              <Button href="#como-funciona" variant="outline">
                Veja como funciona
                <ArrowDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. COMO A METODOLOGIA SE APLICA — mesmo bloco da página Metodologia */}
      <Section id="como-funciona" tone="forest" aria-labelledby="como-titulo" className="relative isolate overflow-hidden">
        {/* flechas de crescimento compondo todo o fundo do bloco */}
        <ArrowsBackdrop />
        <Container>
          <Reveal>
            <SectionHeading
              onDark
              id="como-titulo"
              eyebrow="Como a metodologia se aplica"
              title="Do diagnóstico à evolução contínua"
            />
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <TrailSteps etapas={etapasMetodologia} onDark />
          </div>
        </Container>
      </Section>

      {/* BENEFÍCIOS — três camadas concêntricas: Pessoas, Segurança, Mercado */}
      <Section aria-labelledby="beneficios-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="beneficios-titulo"
              eyebrow="Benefícios"
              title="Uma transformação que começa nas pessoas e chega ao mercado."
              lead="Com o Programa SH2 e as nove frentes de solução, a Versta atua em todas as camadas da empresa. O cuidado com as pessoas fortalece a estrutura, e uma estrutura sólida muda a forma como a empresa é vista lá fora."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-8 lg:mt-9">
            <BenefitLayers />
          </Reveal>
          {/* faixa de destaque */}
          <Reveal
            delay={120}
            className="mt-12 flex flex-col gap-6 rounded-card bg-mint p-7 md:flex-row md:items-center md:gap-8 md:px-9 lg:mt-16"
          >
            <Layers aria-hidden="true" className="size-9 shrink-0 text-caramel" strokeWidth={1.5} />
            <p className="flex-1 text-lead text-ink">
              <strong className="font-semibold text-navy">Gestão simplificada.</strong> Todas as ações
              reunidas em uma só condução, sem precisar contratar e coordenar vários fornecedores.
            </p>
            <div className="shrink-0">
              <Button href={ctaDiagnostico.href} variant="primary" arrow>
                {ctaDiagnostico.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 4. DIAGNÓSTICO EMPRESARIAL (imagem 3) */}
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

      {/* 5. CONEXÃO ENTRE DESAFIOS E SOLUÇÕES (imagem 4) */}
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

      {/* 7. CTA FINAL */}
      <CtaBanner />
    </>
  );
}
