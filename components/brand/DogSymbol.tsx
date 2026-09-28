import { asset } from "@/lib/paths";
import Image from "next/image";

/**
 * Símbolo do cão. Ao receber o SVG oficial, salve em
 * /public/brand/versta-simbolo-cao.svg (caramelo) e
 * /public/brand/versta-simbolo-cao-branco.svg e mude `pronto` para true.
 * Até lá, exibe uma moldura tracejada como marcador provisório.
 */
export const simbolo = {
  pronto: false,
  caramelo: "/brand/versta-simbolo-cao.svg",
  branco: "/brand/versta-simbolo-cao-branco.svg",
};

type Props = {
  tone?: "caramelo" | "branco";
  className?: string;
  /** Texto alternativo. Vazio = decorativo. */
  label?: string;
};

export function DogSymbol({ tone = "caramelo", className = "", label = "" }: Props) {
  if (simbolo.pronto) {
    return (
      <Image
        src={asset(simbolo[tone])}
        alt={label}
        width={120}
        height={90}
        className={className}
        aria-hidden={label ? undefined : true}
      />
    );
  }
  // Placeholder neutro: moldura tracejada indicando onde entra o símbolo
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label || undefined}
      role={label ? "img" : undefined}
      className={`inline-flex aspect-[4/3] items-center justify-center rounded-[4px] border border-dashed ${
        tone === "caramelo" ? "border-caramel text-caramel-700" : "border-offwhite/70 text-offwhite/85"
      } ${className}`}
    >
      <span className="font-body text-[max(0.5rem,0.14em)] font-semibold tracking-[0.14em] uppercase">
        símbolo
      </span>
    </span>
  );
}
