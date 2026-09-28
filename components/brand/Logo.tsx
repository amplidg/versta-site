import { asset } from "@/lib/paths";
import Image from "next/image";
import { site } from "@/data/site";
import { DogSymbol } from "./DogSymbol";

/**
 * Arquivos oficiais da marca. Ao receber os SVGs:
 *   1. salve em /public/brand com os nomes abaixo;
 *   2. mude `pronta` para true.
 */
export const marca = {
  pronta: false,
  horizontalAzul: "/brand/versta-logo-horizontal-azul.svg", // fundo claro
  horizontalBranca: "/brand/versta-logo-horizontal-branca.svg", // fundo azul
  verticalAzul: "/brand/versta-logo-vertical-azul.svg",
  verticalBranca: "/brand/versta-logo-vertical-branca.svg",
};

type Props = {
  /** horizontal: header e rodapé. vertical: símbolo acima do nome (hero). */
  layout?: "horizontal" | "vertical";
  /** Cor do texto: azul para fundo claro, branca para fundo azul. */
  tone?: "azul" | "branca";
  /** Exibe a tagline abaixo do nome. */
  tagline?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  layout = "horizontal",
  tone = "azul",
  tagline = false,
  className = "",
  priority = false,
}: Props) {
  if (marca.pronta) {
    const key = `${layout}${tone === "azul" ? "Azul" : "Branca"}` as const;
    return (
      <Image
        src={asset(marca[key])}
        alt={`${site.name} — ${site.tagline}`}
        width={layout === "horizontal" ? 220 : 280}
        height={layout === "horizontal" ? 56 : 180}
        priority={priority}
        className={className}
      />
    );
  }

  // Placeholder: nome em serifada + símbolo provisório
  const textColor = tone === "azul" ? "text-navy" : "text-white";
  const tagColor = tone === "azul" ? "text-navy/80" : "text-offwhite/85";

  if (layout === "vertical") {
    return (
      <span className={`inline-flex flex-col items-center ${className}`}>
        <DogSymbol className="mb-2 h-[0.9em] w-auto" />
        <span
          className={`font-display leading-none font-bold tracking-[0.02em] ${textColor}`}
        >
          VERSTA
        </span>
        {tagline && (
          <span
            className={`mt-[0.35em] text-[0.14em] font-semibold tracking-[0.2em] uppercase ${tagColor}`}
          >
            {site.tagline}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col ${className}`}>
      {/* Placeholder de texto; o cão entra junto com o arquivo oficial do logo */}
      <span
        className={`font-display text-[1.625rem] leading-none font-bold tracking-[0.02em] ${textColor}`}
      >
        VERSTA
      </span>
      {tagline && (
        <span
          className={`mt-1.5 text-[0.5625rem] font-semibold tracking-[0.18em] uppercase ${tagColor}`}
        >
          {site.tagline}
        </span>
      )}
    </span>
  );
}
