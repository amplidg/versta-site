import { site } from "@/data/site";
import { DOG_PATH, TAGLINE_PATHS, WORDMARK_PATHS } from "./logoPaths";

/**
 * Logo oficial da Versta, em SVG inline (vetores de
 * public/brand/versta-logo-vertical-azul.svg).
 *
 * - vertical: exatamente o arquivo oficial (cão acima do nome + tagline).
 * - horizontal: montada com as mesmas peças oficiais, com o cão à direita
 *   do nome, como aparece no manual da marca. Substituir pelo SVG horizontal
 *   oficial quando ele for enviado.
 *
 * Cores oficiais: nome e tagline em azul-marinho (#00294D) no fundo claro
 * ou brancos no fundo azul; o cão sempre em caramelo (#B46D49).
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

/* Cão da versão horizontal: escala e posição para ficar à direita do nome,
   com a base alinhada à linha de base e altura próxima à das letras. */
const DOG_H_SCALE = 0.613;
const DOG_H_TRANSFORM = `translate(277.83 130.49) scale(${DOG_H_SCALE})`;

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

  // Horizontal: nome (y 177–231) + cão à direita; tagline opcional abaixo.
  const viewBox = tagline ? "50 175 406 85" : "50 175 406 58";
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className={`block h-auto ${className}`}>
      <g fill={nameFill}>
        <Paths list={WORDMARK_PATHS} />
        {tagline && <Paths list={TAGLINE_PATHS} />}
      </g>
      <path d={DOG_PATH} fill={CARAMEL} transform={DOG_H_TRANSFORM} />
    </svg>
  );
}

function Paths({ list }: { list: string[] }) {
  return list.map((d, i) => <path key={i} d={d} />);
}
