import type { CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/paths";

/*
 * Fechamento do bloco "O custo de não estar em dia" (página da Semear; o Lucas
 * pediu mais destaque para a frase em 03/11). Cartão azul-marinho com a frase
 * grande, "antes que vire problema" em destaque e sublinhado à mão em caramelo
 * que se desenha ao entrar na tela (CSS semear-traco, em globals.css), botão do
 * pré-diagnóstico e o símbolo da Semear grande e suave ao fundo.
 */
export function SemearChamada({ prediagUrl }: { prediagUrl: string }) {
  return (
    <InView className="semear-chamada relative isolate mt-16 overflow-hidden rounded-card bg-navy px-7 py-10 text-offwhite shadow-[0_24px_50px_-28px_rgb(0_41_77/0.7)] sm:px-10 md:px-14 md:py-12">
      {/* símbolo da Semear ao fundo, bem suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-12 -z-10 size-64 bg-peach-100 opacity-[0.07] md:-right-6 md:size-80"
        style={
          {
            maskImage: `url(${asset("/images/semear/semear-simbolo.png")})`,
            WebkitMaskImage: `url(${asset("/images/semear/semear-simbolo.png")})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          } as CSSProperties
        }
      />

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <p className="max-w-2xl font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-tight font-bold">
          Com a Semear, sua empresa cuida disso{" "}
          <span className="relative inline-block text-peach-200">
            antes que vire problema.
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
                className="semear-traco"
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
