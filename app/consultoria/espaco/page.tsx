import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EspacoGaleria } from "@/components/sections/espaco/EspacoGaleria";
import { EspacoOcasioes } from "@/components/sections/espaco/EspacoOcasioes";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { comodidades } from "@/data/espaco";
import { HOUSE_ENDERECO, HOUSE_MAPS_URL, HOUSE_URL, PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Espaço · House Business Coworking (especificação e
 * textos do Lucas, 04/11), no padrão das outras frentes. Seguindo a regra do
 * Lucas para as páginas das frentes, só há botões de pré-diagnóstico (a
 * especificação pedia "Agendar uma visita" pelo WhatsApp) e o cartão azul
 * final fica sem mancha. Ficam os links internos para o SH2, o mapa e, quando
 * existir, o site da House (data/links.ts).
 * Conteúdo editável (ocasiões, ordem da galeria e comodidades) em data/espaco.ts.
 */

export const metadata: Metadata = pageMetadata({
  title: "Espaço · House Business Coworking",
  description:
    "Salas para terapias e atendimentos, relaxamento, treinamentos, reuniões e eventos corporativos. Conheça a House Business Coworking, o espaço da Versta e do Programa SH2.",
  path: "/consultoria/espaco",
});

/** Fundos pastel alternados dos ícones das comodidades. */
const fundos = ["bg-mint", "bg-offwhite", "bg-mist/70", "bg-sage/50"];

const novaAba = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function EspacoPage() {
  return (
    <>
      <FrenteHero
        nome="Espaço"
        slug="espaco"
        eyebrow="Espaço · House Business Coworking"
        titulo="Um lugar fora da rotina para cuidar, aprender e celebrar"
        texto="A House Business Coworking é o espaço da Versta para terapias, relaxamento, treinamentos, reuniões e eventos. Ambientes acolhedores e preparados para receber sua equipe com conforto, e que fazem parte do Programa SH2."
        selo={{
          texto: "Incluído no Programa SH2",
          icone: Building2,
          fundo: "bg-mist/70",
          cor: "text-navy",
        }}
        emblema={{ icone: Building2, cores: ["var(--color-mist)", "var(--color-mint)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* OCASIÕES */}
      <Section tone="mint" aria-labelledby="ocasioes-titulo" className="overflow-hidden">
        <Container>
          <Reveal>
            <SectionHeading
              id="ocasioes-titulo"
              title="Para que sua empresa precisa do espaço?"
              lead="Escolha uma ocasião e veja como a House recebe sua equipe."
              align="center"
            />
          </Reveal>
          <Reveal delay={120}>
            <EspacoOcasioes />
          </Reveal>
          <div className="mt-14 flex justify-center md:mt-16">
            <Button href={PREDIAG_URL} variant="primary" arrow className="max-sm:w-full">
              Fazer o pré-diagnóstico
            </Button>
          </div>
        </Container>
      </Section>

      {/* AMBIENTES */}
      <Section aria-labelledby="ambientes-titulo" id="ambientes" className="overflow-hidden">
        <Container>
          <Reveal>
            <SectionHeading id="ambientes-titulo" title="Conheça os ambientes" align="center" />
          </Reveal>
          <Reveal delay={120}>
            <EspacoGaleria />
          </Reveal>
        </Container>
      </Section>

      {/* ESTRUTURA E COMODIDADES */}
      <Section tone="peach" aria-labelledby="estrutura-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="estrutura-titulo" title="Estrutura pensada para o bem-estar" align="center" />
          </Reveal>
          <Reveal delay={120}>
            <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-y-10">
              {comodidades.map(({ rotulo, icone: Icone }, i) => (
                <li key={rotulo} className="flex flex-col items-center gap-3 text-center">
                  <span
                    className={`flex size-14 items-center justify-center rounded-full ${fundos[i % fundos.length]} ring-1 ring-navy/5`}
                  >
                    <Icone aria-hidden="true" className="size-6 text-navy" strokeWidth={1.6} />
                  </span>
                  <span className="max-w-[12rem] text-[0.9375rem] leading-snug font-semibold text-navy">
                    {rotulo}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* PARTE DO PROGRAMA SH2 */}
      <Section aria-labelledby="visita-titulo">
        <Container>
          <Reveal>
            <div className="grid gap-10 rounded-card bg-navy px-7 py-10 text-offwhite shadow-[0_24px_50px_-28px_rgb(0_41_77/0.7)] sm:px-10 md:px-14 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className="lg:col-span-8">
                <h2
                  id="visita-titulo"
                  className="font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-tight font-bold"
                >
                  Venha conhecer a House pessoalmente.
                </h2>
                <p className="mt-5 max-w-2xl text-lead text-offwhite/75">
                  As empresas que contratam o Programa SH2 contam com a House para atendimentos, práticas de
                  bem-estar, treinamentos e encontros. Agende uma visita e conheça o espaço.
                </p>
                <div className="mt-8 flex flex-col gap-x-7 gap-y-5 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button href={PREDIAG_URL} variant="light" arrow className="max-sm:w-full">
                    Fazer o pré-diagnóstico
                  </Button>
                  <Link
                    href="/metodologia/sh2"
                    className="font-semibold text-offwhite underline decoration-peach-200/70 underline-offset-4 hover:decoration-peach-200"
                  >
                    Conhecer o Programa SH2
                  </Link>
                  {HOUSE_URL !== "#" && (
                    <a
                      href={HOUSE_URL}
                      {...novaAba}
                      className="inline-flex items-center gap-1 text-sm text-offwhite/75 underline underline-offset-4 hover:text-offwhite"
                    >
                      Site da House
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-offwhite/15 pt-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-offwhite/10">
                  <MapPin aria-hidden="true" className="size-5 text-peach-200" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-offwhite/60 uppercase">Endereço</p>
                  <address className="mt-1 text-offwhite not-italic">
                    <Texto>{HOUSE_ENDERECO}</Texto>
                  </address>
                  <a
                    href={HOUSE_MAPS_URL}
                    {...novaAba}
                    className="mt-3 inline-flex items-center gap-1 font-semibold text-offwhite underline decoration-peach-200/70 underline-offset-4 hover:decoration-peach-200"
                  >
                    Ver no mapa
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
