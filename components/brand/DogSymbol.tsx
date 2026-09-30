import { DOG_PATH } from "./logoPaths";

/**
 * Símbolo do cão da Versta (vetor oficial, extraído do logo).
 * Caramelo (#B46D49) por padrão; branco para fundos escuros.
 */
type Props = {
  tone?: "caramelo" | "branco";
  className?: string;
  /** Texto alternativo. Vazio = decorativo. */
  label?: string;
};

export function DogSymbol({ tone = "caramelo", className = "", label = "" }: Props) {
  return (
    <svg
      // caixa do cão no arquivo original (167.9, 82.45, 119.18 × 81.52) + folga
      viewBox="166 80.5 123 85.5"
      className={`block h-auto ${className}`}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <path d={DOG_PATH} fill={tone === "caramelo" ? "var(--color-caramel)" : "#ffffff"} />
    </svg>
  );
}
