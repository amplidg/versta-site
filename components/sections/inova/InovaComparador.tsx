"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { LadoHoje, LadoInova, ParesEmLista } from "./InovaCartoes";

/*
 * Comparador "antes e depois" da página da Inova (especificação do Lucas,
 * 03/11). No computador, os dois lados (os mesmos 6 cartões, desarrumados e
 * organizados — InovaCartoes.tsx) ocupam o mesmo espaço (16:7) e uma barra
 * caramelo arrastável revela um ou outro. O controle é um <input type="range">
 * de verdade (invisível, por cima da cena), então funciona com mouse, toque e
 * setas do teclado. Na primeira vez que aparece na tela, a barra faz uma
 * pequena demonstração (30% → 70% → 50%), exceto com movimento reduzido ou se
 * a pessoa já mexeu. No celular/tablet, os 6 pares viram uma lista.
 */

const DEMO: [number, number][] = [
  // [tempo em ms, posição em %]
  [0, 50],
  [600, 30],
  [1400, 70],
  [2000, 50],
];

function posicaoNaDemo(t: number) {
  for (let i = 1; i < DEMO.length; i++) {
    const [t0, p0] = DEMO[i - 1];
    const [t1, p1] = DEMO[i];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      const suave = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      return p0 + (p1 - p0) * suave;
    }
  }
  return 50;
}

export function InovaComparador() {
  const [pos, setPos] = useState(50);
  const caixa = useRef<HTMLDivElement>(null);
  const mexeu = useRef(false);

  useEffect(() => {
    const el = caixa.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let quadro = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const inicio = performance.now();
        const passo = (agora: number) => {
          if (mexeu.current) return;
          const t = agora - inicio;
          setPos(Math.round(posicaoNaDemo(t) * 10) / 10);
          if (t < DEMO[DEMO.length - 1][0]) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, []);

  const parar = () => {
    mexeu.current = true;
  };

  return (
    <>
      {/* COMPUTADOR — comparador com barra */}
      <div
        ref={caixa}
        className="group relative mt-12 hidden aspect-[16/7] overflow-hidden rounded-card shadow-[0_24px_50px_-30px_rgb(0_41_77/0.5)] select-none lg:block"
      >
        <LadoHoje />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <LadoInova />
        </div>

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-white/85 px-3.5 py-1 text-sm font-semibold text-ink-muted shadow-sm">
          Hoje
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-navy px-3.5 py-1 text-sm font-semibold text-offwhite shadow-sm">
          Com a Inova
        </span>

        {/* barra e botão */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-caramel" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-caramel text-white shadow-lg ring-offset-2 group-has-[input:focus-visible]:ring-4 group-has-[input:focus-visible]:ring-navy/50">
            <ArrowLeftRight className="size-5" strokeWidth={2} />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => {
            parar();
            setPos(Number(e.target.value));
          }}
          onPointerDown={parar}
          onKeyDown={parar}
          aria-label="Comparar processo antes e depois"
          aria-valuetext={`${Math.round(pos)}% da cena mostra o processo de hoje`}
          className="absolute inset-0 size-full cursor-ew-resize appearance-none opacity-0"
        />
      </div>

      {/* CELULAR / TABLET — lista dos 6 pares */}
      <div className="lg:hidden">
        <ParesEmLista />
      </div>
    </>
  );
}
