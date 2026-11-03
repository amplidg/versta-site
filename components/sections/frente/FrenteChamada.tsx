import { InView } from "@/components/motion/InView";
import { Button } from "@/components/ui/Button";

/*
 * Cartão azul-marinho de fechamento das páginas das frentes (criado na Semear,
 * 03/11): frase grande com o final em destaque (pêssego, sublinhado à mão em
 * caramelo que se desenha ao entrar na tela — CSS frente-traco, em
 * globals.css) e o botão do pré-diagnóstico.
 */
export function FrenteChamada({
  antes,
  destaque,
  prediagUrl,
}: {
  /** Início da frase. */
  antes: string;
  /** Final da frase, em destaque. */
  destaque: string;
  prediagUrl: string;
}) {
  return (
    <InView className="frente-chamada relative isolate mt-16 overflow-hidden rounded-card bg-navy px-7 py-10 text-offwhite shadow-[0_24px_50px_-28px_rgb(0_41_77/0.7)] sm:px-10 md:px-14 md:py-12">
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
        <Button href={prediagUrl} variant="light" arrow className="shrink-0 max-sm:w-full">
          Fazer o pré-diagnóstico
        </Button>
      </div>
    </InView>
  );
}
