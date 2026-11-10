import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Manifesto } from "@/components/sections/Manifesto";
import { FormaDeAtuar } from "@/components/sections/sobre/FormaDeAtuar";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre a Versta",
  description:
    "Conheça a Versta: o significado do nome, o símbolo do cão e a forma de atuar que une análise, experiência e percepção para indicar o caminho mais seguro.",
  path: "/sobre",
});

/* Em 06/11 o Lucas tirou o topo ("Experiência acumulada ao longo da jornada")
   e o organograma ("Como a Versta se organiza"). O "Versta" do bloco "O nome"
   passou a ser o título principal (h1) da página. */

export default function SobrePage() {
  return (
    <>
      {/* O nome */}
      <Section tone="forest" aria-labelledby="nome-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal noTopo className="lg:col-span-4">
            <p className="eyebrow text-peach-100">O nome</p>
            <h1
              id="nome-titulo"
              className="mt-4 font-display text-[clamp(3.5rem,2rem+6vw,6rem)] leading-none font-bold text-peach-100"
            >
              Versta
            </h1>
          </Reveal>
          <Reveal
            delay={120}
            className="space-y-5 text-lead text-offwhite lg:col-span-7 lg:col-start-6"
          >
            <p>
              Versta é uma palavra que remete à ideia de caminho e de distância
              percorrida. Mais do que medir quilômetros, representa a
              experiência acumulada ao longo da jornada.
            </p>
            <p>
              Cada desafio enfrentado amplia a capacidade de compreender o
              terreno, reconhecer padrões e indicar a direção mais segura para
              seguir adiante.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* O símbolo */}
      <Manifesto />

      {/* Forma de atuar (do foco ao horizonte, 06/11; sem a imagem; texto da esquerda centralizado na altura dos cartões, pedido do Lucas) */}
      <Section aria-labelledby="atuar-titulo">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                id="atuar-titulo"
                eyebrow="Forma de atuar"
                title="Rigor para analisar, disposição para explorar"
                lead="A forma de atuar da Versta combina a profundidade da análise com a atenção a cada trecho do caminho."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <FormaDeAtuar />
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
