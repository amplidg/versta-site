import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowsBackdrop } from "@/components/sections/ArrowsBackdrop";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FrentesGrid } from "@/components/sections/FrentesGrid";
import { HubDiagram } from "@/components/sections/HubDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { TrailSteps } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { etapasMetodologia } from "@/data/metodologia";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Soluções",
  description:
    "Dez frentes de consultoria, da consultoria ambiental à assessoria financeira. A Versta diagnostica sua empresa e conecta cada área à solução especializada certa.",
  path: "/consultoria",
});

export default function ConsultoriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluções"
        title="Um diagnóstico, dez soluções possíveis"
        lead="A Versta funciona como um hub: analisa a empresa, aponta as áreas que precisam se desenvolver e conecta cada uma à solução especializada do seu ecossistema de parceiros."
        // diagrama do hub no lugar da ilustração, que desceu para o bloco final (29/10)
        aside={<HubDiagram />}
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
      </PageHero>

      {/* COMO A METODOLOGIA SE APLICA — mesmo bloco da Home (substituiu a trilha "O modelo", 29/10) */}
      <Section id="como-funciona" tone="forest" aria-labelledby="como-titulo" className="relative isolate overflow-hidden">
        <ArrowsBackdrop />
        <Container>
          <Reveal>
            <SectionHeading
              onDark
              id="como-titulo"
              eyebrow="Como a metodologia se aplica"
              title="Do diagnóstico à evolução contínua"
              align="center"
            />
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <TrailSteps etapas={etapasMetodologia} onDark />
          </div>
        </Container>
      </Section>

      <Section id="frentes" aria-labelledby="frentes-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="frentes-titulo"
              eyebrow="As frentes"
              title="Dez frentes de consultoria"
              lead="Cada frente reúne soluções especializadas para uma área da empresa. Escolha uma para saber mais."
            />
          </Reveal>
          <div className="mt-14">
            <FrentesGrid />
          </div>
        </Container>
      </Section>

      {/* ilustração das áreas de atuação: saiu do topo da página em 29/10 */}
      <CtaBanner
        imagem="areasAtuacao"
        title="Não sabe por qual frente começar?"
        text="É para isso que existe o diagnóstico. Ele mostra quais áreas precisam de atenção e qual caminho seguir."
      />
    </>
  );
}
