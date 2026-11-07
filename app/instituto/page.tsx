import type { Metadata } from "next";
import { Compass, Earth, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjetosHero } from "@/components/sections/projetos-sociais/ProjetosHero";
import { ProjetosRealizados } from "@/components/sections/projetos-sociais/ProjetosRealizados";
import { SementeImpacto } from "@/components/sections/projetos-sociais/SementeImpacto";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { causas } from "@/data/projetos-sociais";
import { asset } from "@/lib/paths";
import { pageMetadata } from "@/lib/seo";

/*
 * Página Projetos Sociais (especificação e textos do Lucas, 04/11): o braço
 * social da Versta. Não é uma das 10 frentes; o endereço continua /instituto
 * (o mesmo do menu e do organograma da Home). No topo, só o botão "Como
 * funciona" (o Lucas tirou o do WhatsApp, 04/11). Causas e projetos realizados
 * em data/projetos-sociais.ts.
 */

export const metadata: Metadata = pageMetadata({
  title: "Projetos Sociais",
  description:
    "Projetos sociais construídos com empresas e colaboradores para fazer a diferença na comunidade e desenvolver não só profissionais, mas seres humanos melhores.",
  path: "/instituto",
});

const ganhos = [
  {
    titulo: "Engajamento",
    texto:
      "Colaboradores mais envolvidos e com orgulho de fazer parte da empresa.",
    icone: Users,
    fundo: "bg-offwhite",
  },
  {
    titulo: "Cultura de propósito",
    texto: "Valores que saem do papel e se tornam atitudes reais.",
    icone: Compass,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Impacto social",
    texto:
      "Ações concretas que fortalecem o pilar social da agenda ESG da empresa.",
    icone: Earth,
    fundo: "bg-mint",
  },
];

export default function ProjetosSociaisPage() {
  return (
    <>
      <ProjetosHero
        titulo="Desenvolver não apenas profissionais, mas seres humanos melhores"
        texto="Projetos sociais construídos em parceria com os clientes da Versta, que convidam as empresas e seus colaboradores a participar e a fazer a diferença na comunidade."
      >
        <Button href="#como-funciona" variant="outline">
          Como funciona
        </Button>
      </ProjetosHero>

      {/* COMO NASCE UM PROJETO (antes "Da semente ao impacto") */}
      <Section
        id="como-funciona"
        aria-labelledby="impacto-titulo"
        className="scroll-mt-20 overflow-hidden"
      >
        <Container>
          <Reveal>
            <SectionHeading
              id="impacto-titulo"
              title="Como nasce um projeto social com a Versta"
              align="center"
            />
          </Reveal>
          <SementeImpacto />
        </Container>
      </Section>

      {/* CAUSAS */}
      <Section tone="mint" aria-labelledby="causas-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="causas-titulo"
              title="Causas que transformam pessoas e empresas"
              align="center"
            />
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {causas.map((c, i) => (
              <Reveal as="li" key={c.titulo} delay={i * 100}>
                <div className="group h-full rounded-card border border-navy/10 bg-white/70 p-4 transition-[transform,box-shadow] duration-300 ease-[var(--ease-calm)] hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgb(0_41_77/0.4)] motion-reduce:transition-none">
                  <div className="aspect-[4/3] overflow-hidden rounded-[16px] bg-mist/40">
                    {/* eslint-disable-next-line @next/next/no-img-element -- site estático */}
                    <img
                      src={asset(c.foto.arquivo)}
                      alt={c.foto.alt}
                      style={{ objectPosition: c.foto.posicao ?? "center" }}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <h3 className="mt-5 px-2 text-h3 text-navy">{c.titulo}</h3>
                  <p className="mt-2 px-2 pb-2 text-ink-muted">{c.texto}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* O QUE A EMPRESA GANHA */}
      <Section tone="mist" aria-labelledby="ganha-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="ganha-titulo"
              title="Quando a empresa faz a diferença, ela também se transforma"
              align="center"
            />
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
            {ganhos.map(({ titulo, texto, icone: Icone, fundo }, i) => (
              <Reveal
                as="li"
                key={titulo}
                delay={i * 100}
                className="text-center"
              >
                <span
                  className={`mx-auto flex size-14 items-center justify-center rounded-full ${fundo}`}
                >
                  <Icone
                    aria-hidden="true"
                    className="size-6 text-navy"
                    strokeWidth={1.6}
                  />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">
                  {titulo}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-ink-muted">{texto}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* PROJETOS REALIZADOS (só aparece quando houver projetos) */}
      <ProjetosRealizados />
    </>
  );
}
