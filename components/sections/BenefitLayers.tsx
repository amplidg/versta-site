"use client";

import { useRef, useState, type KeyboardEvent } from "react";

/* Textos fornecidos pelo Lucas — não reescrever. */
const camadas = [
  {
    id: "pessoas",
    nome: "Pessoas",
    frase: "Onde tudo começa.",
    beneficios: [
      "Ambiente mais harmonioso e menos conflitos internos",
      "Colaboradores mais saudáveis, com menos afastamentos e faltas",
      "Equipes mais engajadas e produtivas",
      "Lideranças fortalecidas e comunicação interna mais clara",
      "Cultura organizacional mais forte",
      "Retenção e desenvolvimento de talentos, com menor rotatividade e menos custos com desligamentos, contratações e treinamentos",
    ],
  },
  {
    id: "seguranca",
    nome: "Segurança",
    frase: "A estrutura que sustenta o caminho.",
    beneficios: [
      "Adequação à NR-1 e menor risco de multas",
      "Redução de riscos e processos trabalhistas",
      "Maior segurança jurídica nas operações",
      "Governança e compliance fortalecidos",
      "Melhor desempenho em auditorias",
    ],
  },
  {
    id: "mercado",
    nome: "Mercado",
    frase: "Como a sua empresa é vista lá fora.",
    beneficios: [
      "Imagem institucional fortalecida e menor risco reputacional",
      "Conformidade com as exigências de clientes e grandes marcas, no Brasil e no exterior",
      "Mais competitividade e novas oportunidades de negócio",
      "Práticas ESG e um negócio mais sustentável",
    ],
  },
];

/**
 * Geometria dos anéis (viewBox 400×400, centro em 200,200), de dentro para
 * fora. Os anéis não se sobrepõem: cada um tem a sua própria opacidade.
 */
const aneis = [
  { cor: "var(--color-peach-200)", interno: 0, externo: 72, rotuloY: 200 },
  { cor: "var(--color-sage)", interno: 72, externo: 132, rotuloY: 98 },
  { cor: "var(--color-mist)", interno: 132, externo: 192, rotuloY: 38 },
];

const PAINEL_ID = "beneficios-painel";

/**
 * Benefícios em três camadas concêntricas (Pessoas → Segurança → Mercado).
 * Os anéis da ilustração e as abas (celular/tablet) são dois conjuntos de
 * role="tab" que controlam o mesmo painel. Estado só em memória.
 */
export function BenefitLayers() {
  const [ativa, setAtiva] = useState(0);
  const aneisRef = useRef<(SVGGElement | null)[]>([]);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);

  /** Setas, Home e End movem a seleção (e o foco) dentro do conjunto de abas. */
  function aoTeclar(e: KeyboardEvent, i: number, refs: { current: ((SVGGElement | HTMLButtonElement) | null)[] }) {
    let proxima: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") proxima = (i + 1) % camadas.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") proxima = (i - 1 + camadas.length) % camadas.length;
    else if (e.key === "Home") proxima = 0;
    else if (e.key === "End") proxima = camadas.length - 1;
    else if (e.key === "Enter" || e.key === " ") proxima = i;
    if (proxima === null) return;
    e.preventDefault();
    setAtiva(proxima);
    refs.current[proxima]?.focus();
  }

  const camada = camadas[ativa];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Ilustração + abas */}
      <div>
        <svg
          viewBox="0 0 400 400"
          role="tablist"
          aria-label="Camadas de benefícios (ilustração)"
          className="mx-auto block w-full max-w-[17rem] overflow-visible sm:max-w-[20rem] lg:max-w-[27rem]"
        >
          <defs>
            {/* borda irregular e suave, como mancha de aquarela */}
            <filter id="aquarela-anel" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="11" />
              <feDisplacementMap in="SourceGraphic" scale="9" />
              <feGaussianBlur stdDeviation="1.1" />
            </filter>
          </defs>
          {/* de fora para dentro, para o anel interno ficar por cima nas bordas */}
          {[2, 1, 0].map((i) => {
            const anel = aneis[i];
            const selecionado = ativa === i;
            const raio = (anel.interno + anel.externo) / 2;
            const espessura = anel.externo - anel.interno;
            return (
              <g
                key={camadas[i].id}
                ref={(el) => {
                  aneisRef.current[i] = el;
                }}
                id={`beneficios-anel-${camadas[i].id}`}
                role="tab"
                aria-selected={selecionado}
                aria-controls={PAINEL_ID}
                tabIndex={selecionado ? 0 : -1}
                onClick={() => setAtiva(i)}
                onKeyDown={(e) => aoTeclar(e, i, aneisRef)}
                className="group cursor-pointer outline-none"
              >
                <g
                  filter="url(#aquarela-anel)"
                  className={`transition-opacity duration-500 ease-[var(--ease-calm)] motion-reduce:transition-none ${
                    selecionado ? "opacity-95" : "opacity-45 group-hover:opacity-70 group-focus-visible:opacity-70"
                  }`}
                >
                  {anel.interno === 0 ? (
                    <circle cx="200" cy="200" r={anel.externo} fill={anel.cor} />
                  ) : (
                    <circle cx="200" cy="200" r={raio} fill="none" stroke={anel.cor} strokeWidth={espessura + 3} />
                  )}
                  {/* leve contorno em caramelo no anel selecionado */}
                  <circle
                    cx="200"
                    cy="200"
                    r={anel.externo - 1}
                    fill="none"
                    stroke="var(--color-caramel)"
                    strokeWidth="1.5"
                    className={`transition-opacity duration-500 motion-reduce:transition-none ${
                      selecionado ? "opacity-90" : "opacity-0"
                    }`}
                  />
                </g>
                {/* indicador de foco pelo teclado */}
                <circle
                  cx="200"
                  cy="200"
                  r={anel.externo - 5}
                  fill="none"
                  stroke="var(--color-navy)"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className="pointer-events-none opacity-0 group-focus-visible:opacity-100"
                />
                <text
                  x="200"
                  y={anel.rotuloY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--color-navy)"
                  className="pointer-events-none font-display text-[19px] font-bold"
                >
                  {camadas[i].nome}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="mt-6 hidden text-center text-sm text-ink-muted lg:block">Explore cada camada</p>

        {/* Abas (celular e tablet) */}
        <div role="tablist" aria-label="Camadas de benefícios" className="mt-7 grid grid-cols-3 gap-2 lg:hidden">
          {camadas.map((c, i) => {
            const selecionada = ativa === i;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  abasRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`beneficios-aba-${c.id}`}
                aria-selected={selecionada}
                aria-controls={PAINEL_ID}
                tabIndex={selecionada ? 0 : -1}
                onClick={() => setAtiva(i)}
                onKeyDown={(e) => aoTeclar(e, i, abasRef)}
                className={`min-h-11 rounded-button border px-2 text-[0.9375rem] font-semibold transition-colors duration-300 ease-[var(--ease-calm)] motion-reduce:transition-none ${
                  selecionada
                    ? "border-navy bg-navy text-offwhite"
                    : "border-navy/25 text-navy hover:border-navy/60"
                }`}
              >
                {c.nome}
              </button>
            );
          })}
        </div>
      </div>

      {/* Painel da camada selecionada */}
      <div
        id={PAINEL_ID}
        role="tabpanel"
        aria-label={camada.nome}
        tabIndex={0}
        className="rounded-card border border-navy/10 bg-white/50 p-7 md:p-10 lg:min-h-[30rem]"
      >
        {/* a key reinicia a animação de fade a cada troca de camada */}
        <div key={camada.id} className="fade-suave">
          <h3 className="text-h3 text-navy">{camada.nome}</h3>
          <p className="mt-2 font-display text-lg text-ink-muted italic">{camada.frase}</p>
          <ul className="mt-7 space-y-4">
            {camada.beneficios.map((b) => (
              <li key={b} className="flex gap-4 text-ink">
                <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-caramel" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
