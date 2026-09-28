import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Instituto",
  description: "Conheça o Instituto da Versta e seus projetos sociais.",
  path: "/instituto",
});

export default function InstitutoPage() {
  return (
    <>
      <PageHero
        eyebrow="Instituto"
        title="Projetos Sociais"
        lead="[PREENCHER: frase de apresentação do Instituto.]"
        imagem="institutoHero"
      >
        <Button href="/contato" variant="primary" arrow>
          Fale com o Instituto
        </Button>
      </PageHero>

      <Section tone="mist" aria-labelledby="instituto-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="instituto-titulo" eyebrow="Sobre o Instituto" title="O braço social da Versta" />
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lead text-ink-muted lg:col-span-7">
            <p>
              <Texto>[PREENCHER: descrição do Instituto — missão, causas e públicos atendidos.]</Texto>
            </p>
            <p>
              <Texto>[PREENCHER: lista ou resumo dos projetos sociais em andamento.]</Texto>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" aria-labelledby="apoie-titulo">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <SectionHeading
              id="apoie-titulo"
              onDark
              eyebrow="Participe"
              title="Quer apoiar ou conhecer os projetos?"
              lead="[PREENCHER: como empresas e pessoas podem apoiar o Instituto.]"
            />
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <Button href="/contato" variant="light" arrow>
              Entrar em contato
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
