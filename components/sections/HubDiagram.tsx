"use client";

import { useId, useState, type CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { H_DOG_PATH } from "@/components/brand/logoPaths";
import { frentes, type Frente } from "@/data/frentes";

/*
 * Diagrama do hub (topo da página Soluções, pedido do Lucas em 29/10):
 * o diagnóstico no centro e as dez frentes em órbita, cada uma ligada a ele
 * por uma linha tracejada. Cada frente é um link para o card dela, mais
 * abaixo na mesma página (#semear, #esg…).
 *
 * No computador/tablet: círculo. No celular (< 768px): selo "Diagnóstico" e
 * grade de 2 colunas com os mesmos links.
 * Animação de entrada no CSS (globals.css, classes hub-*), que respeita
 * prefers-reduced-motion.
 */

/** Descrições curtas do diagrama (textos do Lucas, 29/10). */
const rotulos: Record<string, string> = {
  semear: "Consultoria ambiental",
  esg: "Ambiental, social e governança",
  turismo: "Viagens e vivências corporativas",
  inova: "Tecnologia e inovação",
  conexao: "Marketing e endomarketing",
  cultura: "RH e pessoas",
  excelencia: "Qualidade e produção",
  espaco: "Arquitetura sustentável",
  integra: "Estratégia jurídica",
  prospera: "Financeiro e contábil",
};

/** Cores secundárias da marca, alternadas entre as frentes. */
const cores = [
  "var(--color-peach-100)",
  "var(--color-mint)",
  "var(--color-mist)",
  "var(--color-peach-200)",
  "var(--color-sage)",
];

// Geometria, em % do quadrado do diagrama
const RAIO_ORBITA = 38; // centro de cada frente
const RAIO_CENTRO = 15; // círculo do diagnóstico
const RAIO_FRENTE = 7.5; // mancha de cada frente

function posicao(i: number, total: number) {
  const ang = (-90 + (360 / total) * i) * (Math.PI / 180);
  return { cos: Math.cos(ang), sin: Math.sin(ang) };
}

export function HubDiagram() {
  const id = useId().replace(/:/g, "");
  const [ativo, setAtivo] = useState<number | null>(null);
  const total = frentes.length;

  return (
    <InView className="hub">
      <ManchaFiltros id={id} />

      {/* COMPUTADOR / TABLET — círculo */}
      <div className="@container relative mx-auto hidden aspect-square w-full max-w-[36rem] md:block">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-labelledby={`${id}-t ${id}-d`}
          className="absolute inset-0 size-full overflow-visible"
        >
          <title id={`${id}-t`}>Um diagnóstico, dez soluções</title>
          <desc id={`${id}-d`}>
            Diagrama com o diagnóstico da Versta no centro, ligado por linhas às dez frentes de
            soluções distribuídas ao redor: {frentes.map((f) => f.nome).join(", ")}.
          </desc>
          <defs>
            {/* as linhas se desenham do centro para fora (máscara animada no CSS) */}
            <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              {frentes.map((f, i) => {
                const { cos, sin } = posicao(i, total);
                return (
                  <line
                    key={f.slug}
                    className="hub-revelar"
                    x1={50 + cos * RAIO_CENTRO}
                    y1={50 + sin * RAIO_CENTRO}
                    x2={50 + cos * (RAIO_ORBITA - RAIO_FRENTE)}
                    y2={50 + sin * (RAIO_ORBITA - RAIO_FRENTE)}
                    pathLength={1}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                );
              })}
            </mask>
          </defs>
          <g mask={`url(#${id}-m)`}>
            {frentes.map((f, i) => {
              const { cos, sin } = posicao(i, total);
              const coords = {
                x1: 50 + cos * (RAIO_CENTRO + 0.6),
                y1: 50 + sin * (RAIO_CENTRO + 0.6),
                x2: 50 + cos * (RAIO_ORBITA - RAIO_FRENTE - 0.6),
                y2: 50 + sin * (RAIO_ORBITA - RAIO_FRENTE - 0.6),
              };
              return (
                <g key={f.slug}>
                  {/* tracejada em sálvia; no hover/foco, contínua em caramelo */}
                  <line
                    {...coords}
                    stroke="var(--color-sage)"
                    strokeWidth="0.35"
                    strokeDasharray="0.45 1.6"
                    strokeLinecap="round"
                    className="transition-opacity duration-300"
                    opacity={ativo === i ? 0 : 1}
                  />
                  <line
                    {...coords}
                    stroke="var(--color-caramel)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    className="transition-opacity duration-300"
                    opacity={ativo === i ? 1 : 0}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* centro: o diagnóstico */}
        <div
          className="hub-centro absolute top-1/2 left-1/2 flex aspect-square -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[1.6cqw] rounded-full bg-navy shadow-[0_18px_40px_-18px_rgb(0_41_77/0.55)]"
          style={{ width: `${RAIO_CENTRO * 2}%` }}
        >
          <Cao className="w-[11cqw]" />
          <span className="font-display text-[max(14px,3.4cqw)] font-bold text-white">Diagnóstico</span>
        </div>

        {/* as dez frentes */}
        <ul>
          {frentes.map((f, i) => {
            const { cos, sin } = posicao(i, total);
            const metadeDeCima = sin < -0.01;
            return (
              <li
                key={f.slug}
                className="absolute"
                style={{
                  left: `${50 + cos * RAIO_ORBITA}%`,
                  top: `${50 + sin * RAIO_ORBITA}%`,
                }}
              >
                <div className="hub-no" style={{ "--i": i } as CSSProperties}>
                  <a
                    href={`#${f.slug}`}
                    onMouseEnter={() => setAtivo(i)}
                    onMouseLeave={() => setAtivo(null)}
                    onFocus={() => setAtivo(i)}
                    onBlur={() => setAtivo(null)}
                    className="group absolute top-0 left-0 flex w-[22cqw] -translate-x-1/2 -translate-y-[7.5cqw] flex-col items-center rounded-card text-center text-navy outline-none"
                  >
                    <Mancha
                      id={id}
                      i={i}
                      className="relative size-[15cqw] transition-transform duration-300 ease-[var(--ease-calm)] group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none"
                    >
                      <Icone frente={f} className="size-[5.4cqw]" />
                    </Mancha>
                    <span className="mt-[1cqw] rounded-sm px-1 font-semibold leading-tight text-[max(13px,2.7cqw)] group-focus-visible:ring-2 group-focus-visible:ring-navy">
                      {f.nome}
                    </span>
                    {/* balão com a descrição curta, sempre voltado para o centro */}
                    <span
                      className={`pointer-events-none absolute z-10 w-max max-w-[44cqw] rounded-button bg-navy px-3 py-1.5 text-[max(13px,2.5cqw)] leading-snug text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                        metadeDeCima ? "top-full mt-1.5" : "bottom-full mb-1.5"
                      } ${
                        // nas laterais, o balão cresce para dentro, sem sair da tela
                        cos > 0.5 ? "right-0 text-right" : cos < -0.5 ? "left-0 text-left" : "left-1/2 -translate-x-1/2"
                      }`}
                    >
                      <span aria-hidden="true">{f.nome} · </span>
                      {rotulos[f.slug] ?? f.area}
                    </span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CELULAR — selo + grade de 2 colunas */}
      <div className="md:hidden">
        <div className="mx-auto flex size-28 flex-col items-center justify-center gap-1.5 rounded-full bg-navy shadow-[0_18px_40px_-18px_rgb(0_41_77/0.55)]">
          <Cao className="w-12" />
          <span className="font-display text-base font-bold text-white">Diagnóstico</span>
        </div>
        <span aria-hidden="true" className="mx-auto block h-8 w-0 border-l-[1.5px] border-dashed border-sage" />
        <ul className="grid grid-cols-2 gap-3">
          {frentes.map((f, i) => (
            <li key={f.slug}>
              <a
                href={`#${f.slug}`}
                className="relative isolate flex h-full flex-col items-start gap-2 rounded-card p-4 text-navy"
              >
                <Mancha id={id} i={i} retangular className="absolute inset-0 -z-10 size-full" />
                <Icone frente={f} className="size-6" />
                <span className="font-display text-lg leading-tight font-bold">{f.nome}</span>
                <span className="text-sm leading-snug">{rotulos[f.slug] ?? f.area}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

function Icone({ frente, className }: { frente: Frente; className?: string }) {
  const Icon = frente.icone;
  return <Icon aria-hidden="true" className={`relative ${className}`} strokeWidth={1.75} />;
}

/** Símbolo do cão (vetor oficial), sempre em caramelo. */
function Cao({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="416 69.5 85 58.5" className={`h-auto ${className}`}>
      <path d={H_DOG_PATH} fill="var(--color-caramel)" />
    </svg>
  );
}

/**
 * Mancha de aquarela: duas camadas translúcidas, com a borda deformada por
 * ruído (filtros abaixo) — onde se sobrepõem, a cor acumula, como tinta.
 */
function Mancha({
  id,
  i,
  retangular = false,
  className = "",
  children,
}: {
  id: string;
  i: number;
  retangular?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const cor = cores[i % cores.length];
  const filtro = `url(#${id}-f${i % 3})`;
  return (
    <span className={`flex items-center justify-center ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        {retangular ? (
          <g filter={filtro}>
            <rect x="3" y="4" width="94" height="92" rx="14" fill={cor} opacity="0.6" />
            <rect x="6" y="2" width="90" height="94" rx="18" fill={cor} opacity="0.35" />
          </g>
        ) : (
          <g filter={filtro}>
            <circle cx="50" cy="51" r="44" fill={cor} opacity="0.6" />
            <circle cx="52" cy="48" r="40" fill={cor} opacity="0.4" />
          </g>
        )}
      </svg>
      {children}
    </span>
  );
}

/** Três variações de borda irregular (o ruído muda com a semente). */
function ManchaFiltros({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      <defs>
        {[3, 11, 27].map((seed, k) => (
          <filter key={seed} id={`${id}-f${k}`} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed={seed} result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="9" xChannelSelector="R" yChannelSelector="G" result="borda" />
            <feGaussianBlur in="borda" stdDeviation="0.8" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
