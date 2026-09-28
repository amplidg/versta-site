"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Direção do movimento de entrada. */
  from?: "up" | "left" | "right" | "fade";
  /** Atraso em ms, para escalonar elementos vizinhos. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Entrada suave ao aparecer na tela. A animação em si fica no CSS
 * (globals.css), que já respeita prefers-reduced-motion e só esconde o
 * conteúdo quando há JavaScript disponível.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  as: Tag = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.revealed = "";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={from}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
