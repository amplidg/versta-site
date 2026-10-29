"use client";

import { useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Armchair, CalendarClock, DoorClosed, MonitorSmartphone, PartyPopper } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fotosHouse, type FotoHouse, type GrupoHouse } from "@/data/house";
import { asset } from "@/lib/paths";

/*
 * Bloco "A House Coworking" da página do Programa SH2 (especificação do
 * Lucas, 29/10): um pequeno tour pelo espaço. À esquerda, texto, os dois usos
 * do espaço e recursos; à direita, mosaico de fotos.
 *
 * Os mosaicos dos dois grupos se revezam sozinhos a cada 8 s, em loop, com
 * troca suave (o Lucas preferiu isso às abas clicáveis, 29/10). O cartão do
 * grupo que está aparecendo fica destacado, com uma linha que se enche até a
 * próxima troca. Com o mouse sobre as fotos, o revezamento pausa.
 * As fotos, legendas e a ordem ficam em data/house.ts.
 */

const grupos: { grupo: GrupoHouse; titulo: string; texto: string }[] = [
  {
    grupo: "colaboradores",
    titulo: "Para os colaboradores",
    texto: "Terapias e atendimentos com hora marcada, relaxamento, yoga e meditação.",
  },
  {
    grupo: "empresa",
    titulo: "Para a empresa",
    texto: "Reuniões, treinamentos, eventos e confraternizações.",
  },
];

const recursos: { texto: string; icone: LucideIcon }[] = [
  { texto: "Salas privativas", icone: DoorClosed },
  { texto: "Equipamentos de relaxamento", icone: Armchair },
  { texto: "Espaço para eventos", icone: PartyPopper },
  { texto: "Atendimento com hora marcada", icone: CalendarClock },
  { texto: "Atividades também online", icone: MonitorSmartphone },
];

export function HouseTour() {
  const id = useId().replace(/:/g, "");
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);

  // a troca acontece quando a linha de progresso do cartão ativo termina
  // (animação de 8 s em globals.css); assim a pausa vale para os dois
  const avancar = () => setAtivo((a) => (a + 1) % grupos.length);

  return (
    <Section tone="peach" aria-labelledby="house-titulo" className="overflow-hidden">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* TEXTO, USOS E RECURSOS */}
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="house-titulo"
            eyebrow="A House Business Coworking"
            title="Um espaço preparado para cuidar das pessoas"
          />
          <p className="mt-6 text-lead text-ink-muted">
            Parte das atividades do Programa SH2 acontece na House Business Coworking, um espaço acolhedor
            fora da rotina da empresa, com salas privativas, equipamentos e ambientes preparados
            para cuidar das pessoas e reunir equipes.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {grupos.map((g, i) => {
              const destacado = i === ativo;
              return (
                <li
                  key={g.grupo}
                  className={`relative overflow-hidden rounded-card border px-4 py-3.5 transition-colors duration-700 ease-[var(--ease-calm)] ${
                    destacado ? "border-navy bg-navy text-offwhite" : "border-navy/35 text-navy"
                  }`}
                >
                  <span className="block font-semibold">{g.titulo}</span>
                  <span
                    className={`mt-1 block text-sm leading-snug transition-colors duration-700 ${
                      destacado ? "text-offwhite/85" : "text-ink-muted"
                    }`}
                  >
                    {g.texto}
                  </span>
                  {destacado && (
                    <span
                      key={ativo}
                      aria-hidden="true"
                      onAnimationEnd={avancar}
                      className="house-progresso absolute inset-x-0 bottom-0 h-[3px] origin-left bg-peach-200 motion-reduce:opacity-0"
                      style={{ animationPlayState: pausado ? "paused" : "running" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-navy">
            {recursos.map(({ texto, icone: Icone }) => (
              <li key={texto} className="flex items-center gap-2">
                <Icone aria-hidden="true" className="size-[18px] shrink-0 text-caramel-700" strokeWidth={1.75} />
                {texto}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* MOSAICO DE FOTOS */}
        <Reveal from="fade" delay={150} className="relative lg:col-span-7">
          <ManchaAquarela id={id} />
          <div
            className="relative grid aspect-[4/5] sm:aspect-[6/5] lg:aspect-square"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
          >
            {grupos.map((g, i) => {
              const visivel = i === ativo;
              return (
                <div
                  key={g.grupo}
                  role="group"
                  aria-label={`Fotos da House Coworking: ${g.titulo.toLowerCase()}`}
                  className={`grid grid-cols-[1.2fr_1fr] auto-rows-fr gap-2.5 transition-opacity duration-1000 ease-[var(--ease-calm)] [grid-area:1/1] motion-reduce:transition-none sm:gap-3 ${
                    visivel ? "z-10 opacity-100" : "opacity-0"
                  }`}
                >
                  {fotosHouse
                    .filter((f) => f.grupo === g.grupo)
                    .map((f) => (
                      <Foto key={f.arquivo} foto={f} />
                    ))}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Uma foto do mosaico, com legenda e zoom leve no hover. */
function Foto({ foto }: { foto: FotoHouse }) {
  const base = asset(`/images/house/${foto.arquivo}`);
  // larguras reais dos arquivos (ver data/house.ts)
  const [menor, maior] = foto.horizontal ? [800, 1200] : foto.destaque ? [600, 1200] : [600, 900];
  const sizes = foto.horizontal
    ? "(min-width: 1024px) 55vw, 100vw"
    : foto.destaque
      ? "(min-width: 1024px) 30vw, 55vw"
      : "(min-width: 1024px) 25vw, 45vw";

  return (
    <figure
      className={`group relative overflow-hidden rounded-[16px] bg-mist/40 ${
        foto.destaque ? "row-span-2" : ""
      } ${foto.horizontal ? "col-span-2" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- site estático: srcset feito à mão */}
      <img
        src={`${base}.webp`}
        srcSet={`${base}-800.webp ${menor}w, ${base}.webp ${maior}w`}
        sizes={sizes}
        alt={foto.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.04] motion-reduce:transition-none"
        style={{ objectPosition: foto.posicao ?? "center" }}
      />
      <figcaption
        aria-hidden="true"
        className="absolute bottom-2.5 left-2.5 rounded-full bg-offwhite/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur-sm"
      >
        {foto.legenda}
      </figcaption>
    </figure>
  );
}

/**
 * Mancha de aquarela atrás do mosaico (azul claro, menta e um toque de
 * pêssego), maior que as fotos e vazando pelas bordas.
 */
function ManchaAquarela({ id }: { id: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-[12%] -left-[7%] h-[124%] w-[117%] overflow-visible"
    >
      <defs>
        <filter id={`${id}-aq`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="8" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="12" xChannelSelector="R" yChannelSelector="G" result="borda" />
          <feGaussianBlur in="borda" stdDeviation="1.6" />
        </filter>
      </defs>
      <g filter={`url(#${id}-aq)`}>
        <ellipse cx="46" cy="48" rx="46" ry="44" fill="var(--color-mist)" opacity="0.75" />
        <ellipse cx="60" cy="60" rx="38" ry="36" fill="var(--color-mint)" opacity="0.9" />
        <ellipse cx="30" cy="26" rx="20" ry="16" fill="var(--color-mint)" opacity="0.6" />
        <ellipse cx="78" cy="24" rx="15" ry="12" fill="var(--color-peach-200)" opacity="0.8" />
      </g>
    </svg>
  );
}
