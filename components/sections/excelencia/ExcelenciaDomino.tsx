"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

/*
 * "Um erro pequeno nunca fica pequeno" (página da Excelência, especificação do
 * Lucas, 04/11): seis dominós com as consequências de um erro.
 * 1º clique ("Ver o que acontece"): os dominós caem um por um e cada
 *    consequência se acende.
 * 2º clique ("Com a Excelência"): eles se levantam, surge uma barreira caramelo
 *    depois do primeiro, o primeiro tomba e para nela; as outras consequências
 *    ficam riscadas e aparece a mensagem final.
 * Os seis textos estão no HTML desde o início (só mais apagados). Com movimento
 * reduzido, tudo muda direto, sem queda. Computador/tablet: fila horizontal;
 * celular: fila vertical, com o texto ao lado de cada dominó.
 */

const consequencias = [
  "Um detalhe anotado errado",
  "O trabalho é refeito",
  "Material e tempo desperdiçados",
  "A entrega atrasa",
  "O cliente fica insatisfeito",
  "A empresa perde a próxima venda",
];

type Etapa = "inicial" | "caindo" | "caido" | "erguendo" | "barreira" | "contido";

const INTERVALO = 250; // entre um dominó e o próximo, em ms

export function ExcelenciaDomino({ prediagUrl }: { prediagUrl: string }) {
  const [etapa, setEtapa] = useState<Etapa>("inicial");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const depois = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const derrubar = () => {
    if (semMovimento()) return setEtapa("caido");
    setEtapa("caindo");
    depois(INTERVALO * (consequencias.length - 1) + 700, () => setEtapa("caido"));
  };

  const conter = () => {
    if (semMovimento()) return setEtapa("contido");
    setEtapa("erguendo");
    depois(350, () => setEtapa("barreira"));
    depois(900, () => setEtapa("contido"));
  };

  const reiniciar = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setEtapa("inicial");
  };

  const caidos = etapa === "caindo" || etapa === "caido";
  const comBarreira = etapa === "barreira" || etapa === "contido";

  return (
    <div className="relative mt-12 md:mt-16">
      {/* mancha de aquarela pêssego atrás do card */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+3rem)] opacity-70"
      >
        <defs>
          <filter id="excelencia-mancha" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="21" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="5" xChannelSelector="R" yChannelSelector="G" result="borda" />
            <feGaussianBlur in="borda" stdDeviation="1.5" />
          </filter>
        </defs>
        <g filter="url(#excelencia-mancha)">
          <ellipse cx="72" cy="40" rx="34" ry="44" fill="var(--color-peach-100)" />
          <ellipse cx="20" cy="70" rx="22" ry="26" fill="var(--color-peach-200)" opacity="0.5" />
        </g>
      </svg>

      <div className="rounded-[20px] border border-navy/10 bg-white/85 px-6 py-10 shadow-[0_24px_50px_-30px_rgb(0_41_77/0.45)] sm:px-10 md:py-14">
        {/* FILA DE DOMINÓS */}
        <ol className="relative grid gap-5 md:grid-cols-6 md:gap-3 md:pr-10">
          {/* linha de base (computador/tablet) */}
          <span aria-hidden="true" className="absolute inset-x-0 top-28 hidden h-px bg-navy/25 md:block lg:top-32" />
          {consequencias.map((texto, i) => {
            const primeiro = i === 0;
            const ultimo = i === consequencias.length - 1;
            const caiu = caidos || (primeiro && etapa === "contido");
            // encostado na barreira, o primeiro só inclina um pouco
            const giro = primeiro && etapa === "contido" ? 9 : caidos ? 75 : 0;
            const atraso = etapa === "caindo" ? i * INTERVALO : 0;
            const aceso = caidos || (primeiro && etapa === "contido");
            const riscado = etapa === "contido" && !primeiro;
            return (
              <li key={texto} className="flex items-center gap-5 md:flex-col md:gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-end justify-start md:h-28 md:w-full md:justify-center lg:h-32">
                  <span
                    aria-hidden="true"
                    className={`flex h-16 w-8 origin-bottom-right flex-col items-center justify-around rounded-[6px] border-2 py-2 transition-[transform,background-color,border-color] ease-in motion-reduce:transition-none md:h-24 md:w-12 lg:h-28 lg:w-14 ${
                      primeiro
                        ? "border-caramel-700 bg-caramel"
                        : ultimo && caiu
                          ? "border-caramel bg-peach-200"
                          : "border-navy bg-[#f3eee4]"
                    }`}
                    style={
                      {
                        transform: `rotate(${giro}deg)`,
                        transitionDuration: etapa === "caindo" ? "450ms" : "300ms",
                        transitionDelay: `${atraso}ms`,
                      } as CSSProperties
                    }
                  >
                    <span className={`size-2 rounded-full ${primeiro ? "bg-white" : "bg-navy"}`} />
                    <span className={`size-2 rounded-full ${primeiro ? "bg-white" : "bg-navy"}`} />
                  </span>
                  {/* barreira depois do primeiro dominó */}
                  {primeiro && (
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-[2.5rem] flex flex-col items-center transition-[opacity,transform] duration-300 motion-reduce:transition-none md:left-[calc(50%+2.2rem)] lg:left-[calc(50%+2.6rem)] ${
                        comBarreira ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                    >
                      <span className="mb-1 flex size-7 items-center justify-center rounded-full bg-caramel text-white shadow">
                        <ShieldCheck className="size-4" strokeWidth={2} />
                      </span>
                      <span className="h-10 w-1.5 rounded-full bg-caramel md:h-16 lg:h-20" />
                    </span>
                  )}
                </div>
                <p
                  className={`text-[0.9375rem] leading-snug transition-[opacity,color] duration-500 motion-reduce:transition-none md:text-center ${
                    aceso && !riscado ? "font-semibold text-navy opacity-100" : "text-ink-muted"
                  } ${riscado ? "line-through decoration-caramel/70 opacity-50" : aceso ? "" : "opacity-45"}`}
                  style={{ transitionDelay: etapa === "caindo" ? `${i * INTERVALO + 300}ms` : "0ms" }}
                >
                  {texto}
                </p>
              </li>
            );
          })}
        </ol>

        {/* AÇÕES E MENSAGENS */}
        <div aria-live="polite" className="mt-10 flex flex-col items-center text-center">
          {etapa === "contido" ? (
            <>
              <p className="max-w-2xl text-lead text-navy">
                Com processos padronizados e qualidade controlada, o erro é identificado no início e não chega ao
                cliente.
              </p>
              <div className="mt-6 flex flex-col items-center gap-4">
                <Button href={prediagUrl} variant="primary" arrow className="max-sm:w-full">
                  Fazer o pré-diagnóstico
                </Button>
                <button
                  type="button"
                  onClick={reiniciar}
                  className="text-sm font-semibold text-ink-muted underline underline-offset-4 outline-none hover:text-navy focus-visible:ring-2 focus-visible:ring-navy"
                >
                  Ver de novo
                </button>
              </div>
            </>
          ) : (
            <>
              {etapa === "caido" && (
                <p className="sr-only">Os dominós caíram: um erro pequeno levou até a perda da próxima venda.</p>
              )}
              <button
                type="button"
                onClick={etapa === "caido" ? conter : derrubar}
                disabled={etapa === "caindo" || etapa === "erguendo" || etapa === "barreira"}
                className="inline-flex items-center justify-center gap-2 rounded-button border border-navy/70 px-6 py-3.5 text-[0.9375rem] font-semibold text-navy transition-colors duration-300 outline-none hover:bg-navy hover:text-offwhite focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-navy max-sm:w-full"
              >
                {etapa === "caido" ? "Com a Excelência" : "Ver o que acontece"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
