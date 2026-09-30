import type { ComponentPropsWithoutRef } from "react";

export type SectionTone =
  | "offwhite"
  | "peach"
  | "peach-strong"
  | "mist"
  | "sage"
  | "mint"
  | "green"
  | "forest"
  | "navy";

const tones: Record<SectionTone, string> = {
  offwhite: "bg-offwhite text-ink",
  peach: "bg-peach-100 text-ink",
  "peach-strong": "bg-peach-200 text-ink",
  mist: "bg-mist/60 text-ink",
  sage: "bg-sage/45 text-ink",
  /** Verde menta claro oficial (#D6E9DF). */
  mint: "bg-mint text-ink",
  green: "bg-green-700 text-offwhite on-dark",
  /** Verde escuro da paleta: permite texto pequeno claro com contraste AA. */
  forest: "bg-green-900 text-offwhite on-dark",
  navy: "bg-navy text-offwhite on-dark",
};

export const darkTones: SectionTone[] = ["green", "forest", "navy"];

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  /** Remove o padding vertical padrão. */
  flush?: boolean;
};

export function Section({
  tone = "offwhite",
  flush = false,
  className = "",
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={`${tones[tone]} ${flush ? "" : "section-y"} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Container({
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`container-site ${className}`} {...rest} />;
}
