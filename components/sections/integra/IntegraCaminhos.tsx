"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { LucideIcon } from "lucide-react";
import { Check, Gavel, Handshake } from "lucide-react";
import { InView } from "@/components/motion/InView";
import { situacoes } from "@/data/integra";

/*
 * "Dois caminhos para o mesmo conflito" (página da Íntegra, especificação do
 * Lucas, 04/11). Três situações em abas (role="tablist", setas do teclado,
 * Home/End). Para a situação escolhida, um ponto de partida no alto se divide
 * em dois caminhos: o da disputa (linha tracejada, irregular, em tons
 * apagados) e o estratégico (linha contínua em sálvia e azul-marinho). Cada um
 * tem 3 etapas e termina num card de resultado; o do caminho estratégico tem
 * borda caramelo e selo de check. No celular, os caminhos ficam um embaixo do
 * outro.
 *
 * Animação (globals.css, integra-*): ao entrar na tela e a cada troca, as
 * linhas se desenham de cima para baixo — a da disputa mais lenta, com
 * paradas — e as etapas aparecem conforme a linha passa. Com movimento
 * reduzido, tudo aparece direto.
 *
 * As situações rodam sozinhas a cada 10 s (mais que os 7 s da Cultura e do
 * Espaço, porque há seis etapas para ler); não pausa com o mouse, só enquanto
 * alguém navega pelas abas com o teclado. Um clique recomeça a contagem.
 * As situações ficam em data/integra.ts.
 */

const INTERVALO = 10000;

/** Momento (s) em que cada etapa e o resultado aparecem, por caminho. */
const TEMPOS = {
  disputa: { etapas: [0.35, 1.3, 2.25], resultado: 2.8 },
  estrategico: { etapas: [0.2, 0.65, 1.1], resultado: 1.55 },
};

export function IntegraCaminhos() {
  const id = useId().replace(/:/g, "");
  const [ativa, setAtiva] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [interagiu, setInteragiu] = useState(false);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const trilho = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pausado) return;
    const t = window.setTimeout(
      () => setAtiva((a) => (a + 1) % situacoes.length),
      INTERVALO,
    );
    return () => window.clearTimeout(t);
  }, [ativa, pausado]);

  // no celular, a fileira de situações rola de lado: mantém a ativa à vista
  useEffect(() => {
    const t = trilho.current;
    const aba = abas.current[ativa];
    if (!t || !aba || t.scrollWidth <= t.clientWidth) return;
    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    t.scrollTo({
      left: aba.offsetLeft - 16,
      behavior: reduzido ? "auto" : "smooth",
    });
  }, [ativa]);

  const escolher = (i: number, focar = false) => {
    setInteragiu(true);
    setAtiva(i);
    if (focar) abas.current[i]?.focus();
  };

  const teclado = (e: KeyboardEvent) => {
    const total = situacoes.length;
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

  const s = situacoes[ativa];
  const painel = `${id}-painel`;

  return (
    <div
      onFocus={(e) => setPausado(e.target.matches(":focus-visible"))}
      onBlur={() => setPausado(false)}
    >
      <InView className="integra mt-10 md:mt-12">
        {/* SITUAÇÕES */}
        <div
          ref={trilho}
          className="-mx-4 overflow-x-auto px-4 pt-1 pb-3 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div
            role="tablist"
            aria-label="Situações"
            onKeyDown={teclado}
            className="flex w-max gap-2.5 md:w-auto md:flex-wrap md:justify-center md:gap-3"
          >
            {situacoes.map((sit, i) => {
              const selecionada = i === ativa;
              const Icone = sit.icone;
              return (
                <button
                  key={sit.nome}
                  ref={(el) => {
                    abas.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-aba-${i}`}
                  aria-selected={selecionada}
                  aria-controls={painel}
                  tabIndex={selecionada ? 0 : -1}
                  onClick={() => escolher(i)}
                  className={`flex shrink-0 snap-start items-center gap-2.5 rounded-full border px-5 py-3 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 md:px-6 md:py-3.5 ${
                    selecionada
                      ? "border-navy bg-navy text-offwhite"
                      : "border-navy/25 bg-white/60 text-navy hover:border-navy/60"
                  }`}
                >
                  <Icone
                    aria-hidden="true"
                    className={`size-5 shrink-0 ${selecionada ? "text-peach-200" : "text-caramel-700"}`}
                    strokeWidth={1.75}
                  />
                  {sit.nome}
                </button>
              );
            })}
          </div>
        </div>

        {/* OS DOIS CAMINHOS (remontado a cada troca, para a animação recomeçar) */}
        <div
          key={ativa}
          role="tabpanel"
          id={painel}
          aria-labelledby={`${id}-aba-${ativa}`}
          aria-live={interagiu ? "polite" : "off"}
          className="integra-painel mt-10 md:mt-12"
        >
          {/* ponto de partida */}
          <div className="flex justify-center">
            <p className="relative z-10 flex items-center gap-3 rounded-full border border-navy/15 bg-white px-5 py-3 text-center font-display text-lg leading-snug font-bold text-navy shadow-[0_12px_28px_-18px_rgb(0_41_77/0.45)] md:px-7">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full bg-caramel"
              />
              {s.nome}
            </p>
          </div>

          {/* a divisão em dois caminhos (computador/tablet) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="integra-garfo -mt-1 hidden h-16 w-full md:block"
          >
            <path
              d="M50 0 C 50 22, 24 16, 23.4 40"
              fill="none"
              stroke="#a9a29b"
              strokeWidth="2"
              strokeDasharray="5 6"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M50 0 C 50 22, 76 16, 76.6 40"
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="mt-8 grid gap-12 md:mt-2 md:grid-cols-2 md:gap-14 lg:gap-20">
            <Caminho
              tipo="disputa"
              titulo="Caminho da disputa"
              icone={Gavel}
              etapas={s.disputa}
              resultado={s.resultadoDisputa}
            />
            <Caminho
              tipo="estrategico"
              titulo="Caminho estratégico"
              icone={Handshake}
              etapas={s.estrategico}
              resultado={s.resultadoEstrategico}
            />
          </div>
        </div>
      </InView>
    </div>
  );
}

function Caminho({
  tipo,
  titulo,
  icone: Icone,
  etapas,
  resultado,
}: {
  tipo: "disputa" | "estrategico";
  titulo: string;
  icone: LucideIcon;
  etapas: string[];
  resultado: string;
}) {
  const disputa = tipo === "disputa";
  const tempos = TEMPOS[tipo];
  return (
    <div>
      {/* no celular, tudo centralizado (pedido do Lucas, 07/11): ícone em cima,
          etapas com o ponto em cima e um trecho do caminho entre elas */}
      <h3 className="flex flex-col items-center gap-2.5 text-center">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-full ${
            disputa
              ? "border border-dashed border-[#a9a29b] bg-[#ece7e1]"
              : "bg-sage/60"
          }`}
        >
          <Icone
            aria-hidden="true"
            className={`size-6 ${disputa ? "text-[#6b6259]" : "text-navy"}`}
            strokeWidth={1.75}
          />
        </span>
        <span
          className={`font-display text-xl font-bold ${disputa ? "text-[#5f5852]" : "text-navy"}`}
        >
          {titulo}
        </span>
      </h3>

      <div className="relative mt-7">
        {/* a linha do caminho */}
        <span
          aria-hidden="true"
          className={`integra-linha ${disputa ? "integra-linha-disputa" : "integra-linha-estrategico"} absolute top-[13px] bottom-[15px] left-0 w-5 max-md:hidden`}
        >
          {disputa ? (
            <svg
              viewBox="0 0 20 100"
              preserveAspectRatio="none"
              className="size-full overflow-visible"
            >
              <path
                d="M10 0 C 5 12, 15 22, 9 34 S 4 52, 11 64 S 15 86, 10 100"
                fill="none"
                stroke="#b9a596"
                strokeWidth="2"
                strokeDasharray="5 7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : (
            <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sage to-navy" />
          )}
        </span>

        <ol className="max-md:text-center md:space-y-7 md:pl-10">
          {etapas.map((etapa, i) => (
            <li
              key={etapa}
              className="integra-passo relative max-md:flex max-md:flex-col max-md:items-center"
              style={{ "--d": `${tempos.etapas[i]}s` } as CSSProperties}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`my-1.5 h-6 md:hidden ${
                    disputa
                      ? "border-l-2 border-dashed border-[#b9a596]"
                      : "w-[3px] rounded-full bg-gradient-to-b from-sage to-navy"
                  }`}
                />
              )}
              <span
                aria-hidden="true"
                className={`mb-2 block size-3 rounded-full md:absolute md:top-[0.45rem] md:-left-[36px] md:mb-0 ${
                  disputa
                    ? "border-2 border-[#b9a596] bg-offwhite"
                    : "bg-navy ring-4 ring-sage/40"
                }`}
              />
              <span className="sr-only">{`Etapa ${i + 1}: `}</span>
              <span
                className={
                  disputa ? "text-[#5f5852]" : "font-semibold text-navy"
                }
              >
                {etapa}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className={`integra-passo relative mt-8 rounded-card p-5 max-md:text-center md:p-6 ${
          disputa
            ? "border border-dashed border-[#c8bdb3] bg-[#f3efea]"
            : "border-2 border-caramel bg-white shadow-[0_18px_36px_-24px_rgb(0_41_77/0.45)]"
        }`}
        style={{ "--d": `${tempos.resultado}s` } as CSSProperties}
      >
        {!disputa && (
          <span
            aria-hidden="true"
            className="absolute -top-3.5 -right-3.5 flex size-8 items-center justify-center rounded-full bg-caramel text-white shadow-md"
          >
            <Check className="size-4.5" strokeWidth={2.5} />
          </span>
        )}
        <p
          className={`eyebrow ${disputa ? "text-[#6b6259]" : "text-caramel-700"}`}
        >
          Resultado
        </p>
        <p
          className={`mt-2 ${disputa ? "text-[#5f5852]" : "font-semibold text-navy"}`}
        >
          {resultado}
        </p>
      </div>
    </div>
  );
}
