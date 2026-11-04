"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { FotoHouseImg } from "@/components/sections/espaco/FotoHouseImg";
import { ocasioes } from "@/data/espaco";

/*
 * "Para que sua empresa precisa do espaço?" (página do Espaço, especificação
 * do Lucas, 04/11): cinco ocasiões em abas (role="tablist", setas do teclado,
 * Home/End) e um painel que troca com um crossfade de ~350 ms (direto com
 * movimento reduzido). Os painéis ficam empilhados no mesmo lugar, para a
 * altura não pular; os escondidos ficam "inert".
 *
 * As ocasiões rodam sozinhas, em loop, a cada 7 s (pedido do Lucas, 04/11).
 * Um clique troca na hora e recomeça a contagem. Não pausa com o mouse (como
 * no tour da House, o Lucas quer ver a troca acontecer); só pausa enquanto
 * alguém navega pelas abas com o teclado. O painel só é anunciado a leitores
 * de tela depois que a pessoa interage.
 *
 * As ocasiões (nome, ícone, fotos, descrição e itens) ficam em data/espaco.ts.
 */

const INTERVALO = 7000;

export function EspacoOcasioes() {
  const id = useId().replace(/:/g, "");
  const [ativa, setAtiva] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [interagiu, setInteragiu] = useState(false);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const trilho = useRef<HTMLDivElement>(null);

  // avança sozinho; o temporizador recomeça a cada troca (inclusive por clique)
  useEffect(() => {
    if (pausado) return;
    const t = window.setTimeout(() => setAtiva((a) => (a + 1) % ocasioes.length), INTERVALO);
    return () => window.clearTimeout(t);
  }, [ativa, pausado]);

  // no celular, a fileira de ocasiões rola de lado: mantém a ativa à vista
  useEffect(() => {
    const t = trilho.current;
    const aba = abas.current[ativa];
    if (!t || !aba || t.scrollWidth <= t.clientWidth) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: aba.offsetLeft - 16, behavior: reduzido ? "auto" : "smooth" });
  }, [ativa]);

  const escolher = (i: number, focar = false) => {
    setInteragiu(true);
    setAtiva(i);
    if (focar) abas.current[i]?.focus();
  };

  const teclado = (e: KeyboardEvent) => {
    const total = ocasioes.length;
    const alvo =
      e.key === "ArrowRight"
        ? (ativa + 1) % total
        : e.key === "ArrowLeft"
          ? (ativa - 1 + total) % total
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? total - 1
              : null;
    if (alvo === null) return;
    e.preventDefault();
    escolher(alvo, true);
  };

  return (
    <div
      className="mt-10 md:mt-12"
      onFocus={(e) => setPausado(e.target.matches(":focus-visible"))}
      onBlur={() => setPausado(false)}
    >
      {/* OCASIÕES */}
      <div
        ref={trilho}
        className="-mx-4 overflow-x-auto px-4 pt-1 pb-3 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div
          role="tablist"
          aria-label="Ocasiões"
          onKeyDown={teclado}
          className="flex w-max gap-2.5 md:w-auto md:flex-wrap md:justify-center md:gap-3"
        >
          {ocasioes.map((o, i) => {
            const selecionada = i === ativa;
            const Icone = o.icone;
            return (
              <button
                key={o.nome}
                ref={(el) => {
                  abas.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-aba-${i}`}
                aria-selected={selecionada}
                aria-controls={`${id}-painel-${i}`}
                tabIndex={selecionada ? 0 : -1}
                onClick={() => escolher(i)}
                className={`flex shrink-0 snap-start items-center gap-2.5 rounded-full border px-5 py-3 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-peach-100 md:px-6 md:py-3.5 ${
                  selecionada
                    ? "border-navy bg-navy text-offwhite"
                    : "border-navy/25 bg-white/55 text-navy hover:border-navy/60"
                }`}
              >
                <Icone
                  aria-hidden="true"
                  className={`size-5 shrink-0 ${selecionada ? "text-peach-200" : "text-caramel-700"}`}
                  strokeWidth={1.75}
                />
                {o.nome}
              </button>
            );
          })}
        </div>
      </div>

      {/* PAINÉIS (empilhados; só o ativo aparece) */}
      <div className="mt-8 grid md:mt-12" aria-live={interagiu ? "polite" : "off"}>
        {ocasioes.map((o, i) => {
          const visivel = i === ativa;
          const [principal, segunda] = o.fotos;
          return (
            <div
              key={o.nome}
              role="tabpanel"
              id={`${id}-painel-${i}`}
              aria-labelledby={`${id}-aba-${i}`}
              aria-hidden={!visivel}
              inert={!visivel}
              className={`grid items-center gap-8 transition-opacity duration-[350ms] ease-[var(--ease-calm)] [grid-area:1/1] motion-reduce:transition-none md:grid-cols-[55fr_45fr] md:gap-12 lg:gap-16 ${
                visivel ? "z-10 opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* FOTOS */}
              <div className="relative md:mr-6 md:mb-8">
                <Mancha id={`${id}-${i}`} />
                <div className="relative aspect-[5/4] overflow-hidden rounded-[16px] bg-mist/40 shadow-[0_24px_50px_-30px_rgb(0_41_77/0.5)]">
                  <FotoHouseImg
                    arquivo={principal}
                    sizes="(min-width: 1280px) 640px, (min-width: 768px) 52vw, 100vw"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                {segunda && (
                  <div className="absolute -right-6 -bottom-8 hidden aspect-[3/4] w-[34%] overflow-hidden rounded-[14px] border-4 border-peach-100 bg-mist/40 shadow-[0_18px_36px_-16px_rgb(0_41_77/0.55)] md:block">
                    <FotoHouseImg
                      arquivo={segunda}
                      sizes="(min-width: 1280px) 220px, 18vw"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* TEXTO */}
              <div>
                <h3 className="text-h3 text-navy">{o.nome}</h3>
                <p className="mt-4 text-lead text-ink-muted">{o.descricao}</p>
                <ul className="mt-7 space-y-3.5">
                  {o.itens.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-navy">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/80">
                        <Check aria-hidden="true" className="size-4 text-green-900" strokeWidth={2.25} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Mancha de aquarela suave atrás da foto principal, vazando pelas bordas. */
function Mancha({ id }: { id: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-[10%] -left-[8%] h-[122%] w-[118%] overflow-visible"
    >
      <defs>
        <filter id={`${id}-aq`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="12" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="12" xChannelSelector="R" yChannelSelector="G" result="borda" />
          <feGaussianBlur in="borda" stdDeviation="1.6" />
        </filter>
      </defs>
      <g filter={`url(#${id}-aq)`}>
        <ellipse cx="44" cy="50" rx="46" ry="44" fill="var(--color-mist)" opacity="0.7" />
        <ellipse cx="22" cy="24" rx="20" ry="16" fill="var(--color-offwhite)" opacity="0.8" />
        <ellipse cx="80" cy="78" rx="18" ry="15" fill="var(--color-peach-200)" opacity="0.75" />
      </g>
    </svg>
  );
}
