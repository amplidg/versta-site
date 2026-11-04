import type { CSSProperties, ReactNode } from "react";
import { InView } from "@/components/motion/InView";

/*
 * "Da semente ao impacto" (página Projetos Sociais, especificação e textos do
 * Lucas, 04/11): três etapas ligadas por uma linha tracejada sálvia, cada uma
 * com o mesmo broto num estágio (semente, broto, árvore), em traço caramelo e
 * azul-marinho sobre uma mancha de aquarela sálvia.
 *
 * Ao entrar na tela (InView), a linha se desenha e cada ilustração "nasce" em
 * sequência: a semente aparece, o broto sobe da terra, a copa da árvore se
 * abre; o texto vem logo depois. CSS em globals.css (impacto-*). Com movimento
 * reduzido, tudo já aparece pronto. Celular: etapas empilhadas, com a linha
 * descendo pela esquerda.
 */

const etapas: {
  titulo: string;
  texto: string;
  desenho: ReactNode;
  nome: string;
}[] = [
  {
    nome: "Semente",
    titulo: "A Versta apresenta os caminhos",
    texto:
      "Levamos à empresa projetos sociais que combinam com a sua história e a sua comunidade.",
    desenho: (
      <g className="impacto-semente">
        <ellipse
          cx="60"
          cy="98"
          rx="8"
          ry="5.5"
          fill="var(--color-caramel)"
          opacity="0.25"
        />
        <path
          d="M52 98 C 52 93, 57 91, 61 92 C 66 93, 68 97, 66 100 C 63 104, 54 103, 52 98 Z"
          fill="none"
          stroke="var(--color-caramel)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M57 97 C 59 95, 62 95, 64 97"
          fill="none"
          stroke="var(--color-caramel)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    nome: "Broto",
    titulo: "As pessoas participam",
    texto:
      "Os colaboradores são convidados a se envolver, com tempo, talento e mãos na massa.",
    desenho: (
      <g className="impacto-broto">
        <path
          d="M60 92 C 60 82, 61 74, 60 64"
          fill="none"
          stroke="var(--color-navy)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M60 74 C 50 74, 42 68, 41 58 C 51 57, 59 63, 60 74 Z"
          fill="var(--color-mint)"
          stroke="var(--color-caramel)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M60 68 C 69 69, 78 63, 80 53 C 70 51, 61 57, 60 68 Z"
          fill="var(--color-mint)"
          stroke="var(--color-caramel)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    nome: "Árvore",
    titulo: "O impacto se espalha",
    texto:
      "A comunidade é beneficiada, e a experiência volta para dentro da empresa em forma de propósito, união e orgulho de fazer parte.",
    desenho: (
      <>
        <g className="impacto-tronco">
          <path
            d="M60 92 L 60 58"
            fill="none"
            stroke="var(--color-navy)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M60 74 L 50 64 M60 68 L 70 59"
            fill="none"
            stroke="var(--color-navy)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
        <g
          className="impacto-copa"
          fill="var(--color-mint)"
          stroke="var(--color-caramel)"
          strokeWidth="2.2"
        >
          <circle cx="44" cy="54" r="14" />
          <circle cx="76" cy="54" r="14" />
          <circle cx="60" cy="42" r="19" />
        </g>
      </>
    ),
  },
];

export function SementeImpacto() {
  return (
    <InView className="impacto relative mt-12 md:mt-16">
      {/* linha tracejada: horizontal no computador/tablet, vertical no celular */}
      <svg
        aria-hidden="true"
        className="impacto-linha impacto-linha-h absolute top-[7.6rem] left-[16.5%] hidden h-1 w-[67%] md:block lg:top-[9.15rem]"
        preserveAspectRatio="none"
        viewBox="0 0 100 2"
      >
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="var(--color-sage)"
          strokeWidth="2"
          strokeDasharray="6 7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="impacto-linha impacto-linha-v absolute top-12 left-12 h-[calc(100%-9rem)] w-1 md:hidden"
        preserveAspectRatio="none"
        viewBox="0 0 2 100"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="100"
          stroke="var(--color-sage)"
          strokeWidth="2"
          strokeDasharray="6 7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {etapas.map((e, i) => (
          <li
            key={e.titulo}
            className="flex items-start gap-5 md:flex-col md:items-center md:text-center"
            style={{ "--i": i } as CSSProperties}
          >
            <div className="relative size-24 shrink-0 md:size-40 lg:size-48">
              <svg
                viewBox="0 0 120 120"
                aria-hidden="true"
                className="impacto-ilu size-full overflow-visible"
              >
                <defs>
                  <filter
                    id={`impacto-aq-${i}`}
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.05"
                      numOctaves="3"
                      seed={4 + i}
                      result="ruido"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="ruido"
                      scale="10"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="borda"
                    />
                    <feGaussianBlur in="borda" stdDeviation="1.6" />
                  </filter>
                </defs>
                <g filter={`url(#impacto-aq-${i})`}>
                  <ellipse
                    cx="60"
                    cy="64"
                    rx="50"
                    ry="46"
                    fill="var(--color-sage)"
                    opacity="0.35"
                  />
                  <ellipse
                    cx="66"
                    cy="72"
                    rx="30"
                    ry="26"
                    fill="var(--color-mint)"
                    opacity="0.8"
                  />
                </g>
                {/* a terra */}
                <path
                  d="M24 93 C 44 89, 76 89, 96 93"
                  fill="none"
                  stroke="var(--color-navy)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M34 99 L 40 99 M78 99 L 86 99"
                  stroke="var(--color-navy)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                {e.desenho}
              </svg>
            </div>
            <div className="impacto-texto pt-2 md:pt-0">
              <p className="eyebrow text-caramel-700">
                {i + 1} · {e.nome}
              </p>
              <h3 className="mt-2 text-h3 text-navy">{e.titulo}</h3>
              <p className="mt-2 text-ink-muted md:mx-auto md:max-w-xs">
                {e.texto}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </InView>
  );
}
