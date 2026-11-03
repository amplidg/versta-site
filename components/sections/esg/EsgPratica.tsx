import type { CSSProperties } from "react";
import { InView } from "@/components/motion/InView";

/*
 * "O que é ESG, na prática" (página da ESG, especificação do Lucas, 03/11):
 * três colunas, cada uma com uma letra enorme sobre uma mancha de aquarela.
 * Ao entrar na tela, as letras surgem em sequência e as manchas se espalham;
 * com o mouse ou o foco numa coluna, a letra sobe, a mancha fica mais forte e
 * as outras colunas ficam mais apagadas. No celular, a letra (menor) fica ao
 * lado do título. Animações em globals.css (classes esg-*), que respeitam
 * prefers-reduced-motion.
 */

const colunas = [
  {
    letra: "E",
    nome: "Ambiental",
    cores: ["var(--color-mint)", "var(--color-sage)"],
    exemplos: ["Consumo de energia e água", "Gestão de resíduos", "Emissões e impacto da operação"],
  },
  {
    letra: "S",
    nome: "Social",
    cores: ["var(--color-peach-100)", "var(--color-peach-200)"],
    exemplos: [
      "Saúde, segurança e bem-estar da equipe",
      "Diversidade e inclusão",
      "Relação com a comunidade e fornecedores",
    ],
  },
  {
    letra: "G",
    nome: "Governança",
    cores: ["var(--color-mist)", "var(--color-sky)"],
    exemplos: ["Ética, conduta e integridade", "Transparência nas decisões", "Controles e gestão de riscos"],
  },
];

export function EsgPratica() {
  return (
    <InView className="esg-pratica mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-8">
      {colunas.map(({ letra, nome, cores: [clara, forte], exemplos }, i) => (
        <article
          key={letra}
          tabIndex={0}
          aria-labelledby={`esg-${letra}`}
          className="esg-coluna rounded-card outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4"
          style={{ "--i": i } as CSSProperties}
        >
          <div className="flex items-center gap-5 md:flex-col md:gap-4">
            {/* letra sobre a mancha */}
            <div className="esg-letra-caixa relative flex size-24 shrink-0 items-center justify-center md:size-56">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="esg-mancha absolute -inset-[12%] size-[124%] overflow-visible"
              >
                <defs>
                  <filter id={`esg-f-${letra}`} x="-25%" y="-25%" width="150%" height="150%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed={7 + i * 9} result="ruido" />
                    <feDisplacementMap in="SourceGraphic" in2="ruido" scale="14" xChannelSelector="R" yChannelSelector="G" result="borda" />
                    <feGaussianBlur in="borda" stdDeviation="1.4" />
                  </filter>
                </defs>
                <g filter={`url(#esg-f-${letra})`}>
                  <ellipse cx="50" cy="52" rx="40" ry="36" fill={clara} />
                  <ellipse cx="58" cy="44" rx="26" ry="22" fill={forte} opacity="0.35" />
                  <ellipse cx="38" cy="62" rx="20" ry="16" fill={forte} opacity="0.2" />
                </g>
              </svg>
              <span
                aria-hidden="true"
                className="esg-letra relative font-display text-[5rem] leading-none font-bold text-navy md:text-[clamp(8.5rem,5rem+5vw,11rem)]"
              >
                {letra}
              </span>
            </div>
            <h3 id={`esg-${letra}`} className="font-display text-h3 font-bold text-navy md:text-center">
              <span className="sr-only">{letra} · </span>
              {nome}
            </h3>
          </div>
          <ul className="mt-5 space-y-2.5 md:mx-auto md:max-w-[17rem]">
            {exemplos.map((ex) => (
              <li key={ex} className="flex gap-3 text-ink-muted">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-caramel" />
                {ex}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </InView>
  );
}
