import { site } from "@/data/site";
import {
  DOG_PATH,
  H_DOG_PATH,
  H_TAGLINE_PATHS,
  H_WORDMARK_PATHS,
  TAGLINE_PATHS,
  WORDMARK_PATHS,
} from "./logoPaths";

/**
 * Logo oficial da Versta, em SVG inline (vetores dos arquivos oficiais em
 * public/brand).
 *
 * - vertical: arquivo versta-logo-vertical-azul.svg (cão acima do nome +
 *   tagline). Usado no hero.
 * - horizontal: arquivos versta-logo-horizontal-*.svg (cão à direita do nome,
 *   tagline centralizada abaixo). Header e organograma sem a tagline (ficaria
 *   ilegível no tamanho pequeno); rodapé com a tagline.
 *
 * Cores (versões 5 e 6 do manual): nome e tagline em azul-marinho (#00294D)
 * no fundo claro ou brancos no fundo azul; o cão sempre em caramelo (#B46D49).
 * As versões monocromáticas (7 e 8) estão em public/brand, se necessárias.
 */

type Props = {
  /** horizontal: header, rodapé, organograma. vertical: hero. */
  layout?: "horizontal" | "vertical";
  /** Cor do nome: azul para fundo claro, branca para fundo azul. */
  tone?: "azul" | "branca";
  /** Exibe a tagline abaixo do nome (a versão vertical sempre exibe). */
  tagline?: boolean;
  className?: string;
  /** Mantido por compatibilidade (o logo é inline, não há arquivo a priorizar). */
  priority?: boolean;
};

const NAVY = "var(--color-navy)";
const CARAMEL = "var(--color-caramel)";

export function Logo({ layout = "horizontal", tone = "azul", tagline = false, className = "" }: Props) {
  const nameFill = tone === "azul" ? NAVY : "#ffffff";
  const label = `${site.name} — ${site.tagline}`;

  if (layout === "vertical") {
    return (
      <svg viewBox="50 79 325 181" role="img" aria-label={label} className={`block h-auto ${className}`}>
        <path d={DOG_PATH} fill={CARAMEL} />
        <g fill={nameFill}>
          <Paths list={WORDMARK_PATHS} />
          <Paths list={TAGLINE_PATHS} />
        </g>
      </svg>
    );
  }

  // Horizontal oficial: nome + cão à direita (y 69.9–127.7); tagline
  // opcional centralizada abaixo do conjunto (y 139.7–156.9).
  const viewBox = tagline ? "65 68 437 91" : "65 68 437 62";
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className={`block h-auto ${className}`}>
      <g fill={nameFill}>
        <Paths list={H_WORDMARK_PATHS} />
        {tagline && <Paths list={H_TAGLINE_PATHS} />}
      </g>
      <path d={H_DOG_PATH} fill={CARAMEL} />
    </svg>
  );
}

function Paths({ list }: { list: string[] }) {
  return list.map((d, i) => <path key={i} d={d} />);
}
