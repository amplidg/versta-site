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
  /**
   * Conteúdo do topo da página (já visível ao abrir): entra com uma animação
   * só de CSS, que começa no carregamento, sem esperar o JavaScript. Assim o
   * título aparece logo, mesmo em celular lento (auditoria de 10/11: o título
   * das frentes levava ~7 s para surgir no 4G lento).
   */
  noTopo?: boolean;
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
  noTopo = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || noTopo) return;
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
  }, [noTopo]);

  if (noTopo) {
    return (
      <Tag
        className={`sh2-hero-entra ${className ?? ""}`}
        style={{ "--d": `${delay}ms` } as React.CSSProperties}
      >
        {children}
      </Tag>
    );
  }

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
