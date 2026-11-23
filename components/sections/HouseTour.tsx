"use client";

import { useEffect, useId, useRef, useState } from "react";
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
 *
 * Dentro do mosaico, os espaços que têm fotos extras (`trocas` em
 * data/house.ts) trocam de foto um de cada vez, a cada 3 s, enquanto o grupo
 * está aparecendo (22/11, pedido do Lucas). Por isso "Para os colaboradores"
 * fica 12 s na tela; "Para a empresa" segue com 8 s. Pausa junto com o resto e
 * não roda com movimento reduzido.
 */

const TROCA_MS = 3000;
const DURACAO_GRUPO: Record<GrupoHouse, string> = { colaboradores: "12s", empresa: "8s" };

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
  // qual foto cada espaço com trocas está mostrando (chave: arquivo principal)
  const [variante, setVariante] = useState<Record<string, number>>({});
  const tique = useRef(0);

  useEffect(() => {
    const grupo = grupos[ativo].grupo;
    const espacos = fotosHouse.filter((f) => f.grupo === grupo && f.trocas?.length);
    if (!espacos.length || pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const foto = espacos[tique.current % espacos.length];
      tique.current += 1;
      const total = 1 + (foto.trocas?.length ?? 0);
      setVariante((v) => ({ ...v, [foto.arquivo]: ((v[foto.arquivo] ?? 0) + 1) % total }));
    }, TROCA_MS);
    return () => window.clearInterval(timer);
  }, [ativo, pausado]);

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
            // centralizado no celular (pedido do Lucas, 07/11)
            align="centro-celular"
          />
          {/* texto encurtado pelo Lucas (22/11), em todas as telas; linhas equilibradas */}
          <p className="mt-6 text-lead text-balance text-ink-muted max-md:text-center">
            Parte das atividades do Programa SH2 acontece na House Business Coworking.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {grupos.map((g, i) => {
              const destacado = i === ativo;
              return (
                <li
                  key={g.grupo}
                  className={`relative overflow-hidden rounded-card border px-4 py-3.5 max-md:text-center transition-colors duration-700 ease-[var(--ease-calm)] ${
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
                      style={{ animationPlayState: pausado ? "paused" : "running", animationDuration: DURACAO_GRUPO[g.grupo] }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-navy max-md:justify-center">
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
                      <Foto key={f.arquivo} foto={f} indice={variante[f.arquivo] ?? 0} />
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

/**
 * Um espaço do mosaico, com legenda e zoom leve no hover. Se tiver `trocas`,
 * as fotos ficam empilhadas e só a da vez aparece, com troca suave.
 */
function Foto({ foto, indice }: { foto: FotoHouse; indice: number }) {
  const variantes = [foto, ...(foto.trocas ?? [])];
  const atual = variantes[indice] ?? foto;
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
      {variantes.map((v, i) => {
        const base = asset(`/images/house/${v.arquivo}`);
        const visivel = i === indice;
        return (
          // eslint-disable-next-line @next/next/no-img-element -- site estático: srcset feito à mão
          <img
            key={v.arquivo}
            src={`${base}.webp`}
            srcSet={`${base}-800.webp ${menor}w, ${base}.webp ${maior}w`}
            sizes={sizes}
            alt={visivel ? v.alt : ""}
            aria-hidden={visivel ? undefined : true}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 size-full object-cover transition-[transform,opacity] duration-1000 ease-[var(--ease-calm)] group-hover:scale-[1.04] motion-reduce:transition-none ${
              visivel ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: v.posicao ?? "center" }}
          />
        );
      })}
      <figcaption
        aria-hidden="true"
        className="absolute bottom-2.5 left-2.5 rounded-full bg-offwhite/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur-sm"
      >
        {atual.legenda}
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
