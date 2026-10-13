"use client";

import { useEffect, useRef, useState } from "react";

const DURACAO = 1400;

/**
 * Número que conta de zero até `valor` ao entrar na tela. Sem JavaScript ou
 * com "reduzir movimento", mostra o valor final direto.
 */
export function CountUp({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let quadro = 0;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / DURACAO);
          // desacelera no final
          setAtual(Math.round(valor * (1 - Math.pow(1 - t, 3))));
          if (t < 1) quadro = requestAnimationFrame(passo);
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
  }, [valor]);

  return (
    <span ref={ref} className="tabular-nums">
      {atual.toLocaleString("pt-BR")}
    </span>
  );
}
