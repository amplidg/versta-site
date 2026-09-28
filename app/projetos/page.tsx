import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projetos",
  description:
    "Conheça os projetos da Versta, como o Projeto RH2 — Ser Humano em Harmonia.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow="Projetos"
        title="Projeto RH2"
        lead="Ser Humano em Harmonia."
        imagem="projetosHero"
      >
        <Button href="/contato" variant="primary" arrow>
          Fale com a Versta
        </Button>
      </PageHero>

      <Section tone="peach" aria-labelledby="rh2-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="rh2-titulo" eyebrow="Sobre o projeto" title="Ser Humano em Harmonia" />
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lead text-ink-muted lg:col-span-7">
            <p>
              <Texto>[PREENCHER: descrição do Projeto RH2 — objetivo, público e como funciona.]</Texto>
            </p>
            <p>
              <Texto>[PREENCHER: resultados ou próximos passos do projeto, se houver.]</Texto>
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner
        title="Quer levar o Projeto RH2 para a sua empresa?"
        text="[PREENCHER: chamada específica do Projeto RH2.]"
      />
    </>
  );
}
