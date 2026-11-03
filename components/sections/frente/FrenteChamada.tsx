import { InView } from "@/components/motion/InView";
import { Button } from "@/components/ui/Button";

/*
 * Cartão azul-marinho de fechamento das páginas das frentes (criado na Semear,
 * 03/11): frase grande com o final em destaque (pêssego, sublinhado à mão em
 * caramelo que se desenha ao entrar na tela — CSS frente-traco, em
 * globals.css) e um botão — por padrão, o do pré-diagnóstico. Opcional: uma
 * mancha de aquarela pêssego suave num canto (página do Turismo).
 */

type Botao = { href: string; label: string; novaAba?: boolean };

export function FrenteChamada({
  antes,
  destaque,
  prediagUrl,
  botao,
  mancha = false,
  className = "mt-16",
}: {
  /** Início da frase. */
  antes: string;
  /** Final da frase, em destaque. */
  destaque: string;
  prediagUrl: string;
  /** Botão no lugar do padrão ("Fazer o pré-diagnóstico"). */
  botao?: Botao;
  mancha?: boolean;
  className?: string;
}) {
  const { href, label, novaAba } = botao ?? { href: prediagUrl, label: "Fazer o pré-diagnóstico" };
  return (
    <InView
      className={`frente-chamada relative isolate overflow-hidden rounded-card bg-navy px-7 py-10 text-offwhite shadow-[0_24px_50px_-28px_rgb(0_41_77/0.7)] sm:px-10 md:px-14 md:py-12 ${className}`}
    >
      {mancha && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -top-20 -right-16 -z-10 size-52 opacity-80 md:-top-24 md:size-64"
        >
          <defs>
            <filter id="frente-chamada-f" x="-25%" y="-25%" width="150%" height="150%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="ruido" />
              <feDisplacementMap in="SourceGraphic" in2="ruido" scale="16" xChannelSelector="R" yChannelSelector="G" result="borda" />
              <feGaussianBlur in="borda" stdDeviation="2.5" />
            </filter>
          </defs>
          <g filter="url(#frente-chamada-f)">
            <ellipse cx="50" cy="50" rx="40" ry="34" fill="var(--color-peach-200)" />
            <ellipse cx="40" cy="58" rx="22" ry="18" fill="var(--color-peach-100)" opacity="0.7" />
          </g>
        </svg>
      )}
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <p className="max-w-2xl font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-tight font-bold">
          {antes}{" "}
          <span className="relative inline-block text-peach-200">
            {destaque}
            {/* sublinhado feito à mão */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 16"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full overflow-visible"
            >
              <path
                d="M3 11 C 60 4, 120 3, 180 7 S 270 12, 297 5"
                fill="none"
                stroke="var(--color-caramel)"
                strokeWidth="3.5"
                strokeLinecap="round"
                pathLength={1}
                className="frente-traco"
              />
            </svg>
          </span>
        </p>
        <Button
          href={href}
          variant="light"
          arrow
          className="shrink-0 max-sm:w-full"
          {...(novaAba ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
          {novaAba && <span className="sr-only"> (abre em nova aba)</span>}
        </Button>
      </div>
    </InView>
  );
}
