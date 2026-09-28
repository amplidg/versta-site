import type { ComponentPropsWithoutRef } from "react";

export type CardTone = "plain" | "peach" | "mist" | "sage";

const tones: Record<CardTone, string> = {
  plain: "bg-offwhite border border-navy/10",
  peach: "bg-peach-100",
  mist: "bg-mist/55",
  sage: "bg-sage/40",
};

type Props = ComponentPropsWithoutRef<"div"> & { tone?: CardTone };

/** Superfície básica. Sem sombra: a hierarquia vem de cor e espaço. */
export function Card({ tone = "plain", className = "", ...rest }: Props) {
  return (
    <div
      className={`rounded-card p-7 md:p-9 ${tones[tone]} ${className}`}
      {...rest}
    />
  );
}
