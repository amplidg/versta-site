import type { CSSProperties } from "react";
import { InView } from "@/components/motion/InView";

/*
 * "Forma de atuar" da página Sobre (ideia de Claude aprovada pelo Lucas,
 * 06/11: "do foco ao horizonte"). Os dois cartões viram duas etapas do mesmo
 * caminho, ligadas por uma linha tracejada caramelo:
 *  1. Análise antes da direção — um mapa de curvas de nível; uma lupa passa
 *     por ele e para sobre um ponto, que acende em caramelo.
 *  2. Abertura para novos caminhos — do ponto, a linha desce e se abre em
 *     quatro trilhas que se desenham em leque até pontos novos, sobre uma
 *     mancha de aquarela clara.
 * A animação roda uma vez, quando o bloco entra na tela (InView); com
 * movimento reduzido, tudo já aparece desenhado. Os textos ficam sempre
 * visíveis. CSS em globals.css (atuar-*).
 *
 * Geometria: a ilustração tem 112 px no celular e 140 px a partir do tablet;
 * o centro dela (onde passa a linha) fica a 24 + 56 = 80 px / 40 + 70 = 110 px
 * da borda do cartão — o conector entre os cartões usa essas medidas.
 */

const etapas = [
  {
    titulo: "Análise antes da direção",
    texto:
      "Toda indicação parte de uma leitura cuidadosa da empresa. Compreender o cenário com clareza vem antes de apontar qualquer caminho.",
  },
  {
    titulo: "Abertura para novos caminhos",
    texto:
      "A análise se completa com a experiência e a percepção. Olhar além do óbvio ajuda a antecipar riscos e reconhecer oportunidades.",
  },
];

/** Mapa de curvas de nível com a lupa e o ponto encontrado. */
function Foco() {
  return (
    <svg
      viewBox="0 0 140 140"
      aria-hidden="true"
      className="size-full overflow-visible"
    >
      <g
        fill="none"
        stroke="var(--color-navy)"
        strokeWidth="1.3"
        opacity="0.28"
      >
        <path d="M70 18 C 106 16, 128 42, 124 70 C 120 100, 94 116, 64 112 C 34 108, 14 86, 18 58 C 22 34, 44 20, 70 18 Z" />
        <path d="M70 34 C 96 32, 110 50, 108 70 C 106 92, 88 102, 66 100 C 44 98, 30 84, 32 64 C 34 46, 50 36, 70 34 Z" />
        <path d="M70 50 C 84 49, 93 58, 92 70 C 91 82, 81 88, 69 87 C 57 86, 49 78, 50 67 C 51 57, 59 51, 70 50 Z" />
      </g>
      {/* a linha que sai do ponto e desce até o próximo cartão */}
      <line
        className="atuar-saida"
        x1="70"
        y1="69"
        x2="70"
        y2="140"
        stroke="var(--color-caramel)"
        strokeWidth="2"
        strokeDasharray="5 6"
        vectorEffect="non-scaling-stroke"
      />
      <g className="atuar-ponto">
        <circle
          className="atuar-pulso"
          cx="70"
          cy="69"
          r="6"
          fill="var(--color-caramel)"
          opacity="0.35"
        />
        <circle
          cx="70"
          cy="69"
          r="5"
          fill="var(--color-caramel)"
          stroke="white"
          strokeWidth="1.5"
        />
      </g>
      {/* lupa (desenhada em torno da origem e levada até o ponto) */}
      <g
        className="atuar-lupa"
        fill="none"
        stroke="var(--color-navy)"
        strokeLinecap="round"
      >
        <circle
          cx="0"
          cy="0"
          r="14"
          strokeWidth="2.6"
          fill="white"
          fillOpacity="0.35"
        />
        <line x1="10" y1="10" x2="22" y2="22" strokeWidth="4" />
      </g>
    </svg>
  );
}

/** A linha chega e se abre em trilhas até pontos novos. */
function Horizonte() {
  const trilhas = [
    {
      d: "M70 40 C 70 70, 32 82, 18 118",
      x: 18,
      y: 118,
      cor: "var(--color-caramel)",
    },
    {
      d: "M70 40 C 70 78, 52 98, 48 126",
      x: 48,
      y: 126,
      cor: "var(--color-navy)",
    },
    {
      d: "M70 40 C 70 78, 88 98, 92 126",
      x: 92,
      y: 126,
      cor: "var(--color-caramel)",
    },
    {
      d: "M70 40 C 70 70, 108 82, 122 118",
      x: 122,
      y: 118,
      cor: "var(--color-navy)",
    },
  ];
  return (
    <svg
      viewBox="0 0 140 140"
      aria-hidden="true"
      className="size-full overflow-visible"
    >
      <defs>
        <filter id="atuar-aq" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            seed="7"
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
          <feGaussianBlur in="borda" stdDeviation="2.5" />
        </filter>
      </defs>
      {/* horizonte em aquarela */}
      <g className="atuar-horizonte" filter="url(#atuar-aq)">
        <ellipse
          cx="70"
          cy="112"
          rx="64"
          ry="26"
          fill="var(--color-mint)"
          opacity="0.9"
        />
        <ellipse
          cx="96"
          cy="100"
          rx="30"
          ry="16"
          fill="var(--color-peach-100)"
          opacity="0.9"
        />
      </g>
      <line
        className="atuar-chegada"
        x1="70"
        y1="0"
        x2="70"
        y2="40"
        stroke="var(--color-caramel)"
        strokeWidth="2"
        strokeDasharray="5 6"
        vectorEffect="non-scaling-stroke"
      />
      {trilhas.map((t, i) => (
        <g key={t.d} style={{ "--i": i } as CSSProperties}>
          <path
            className="atuar-trilha"
            d={t.d}
            pathLength={1}
            fill="none"
            stroke={t.cor}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            className="atuar-destino"
            cx={t.x}
            cy={t.y}
            r="5"
            fill={t.cor}
            stroke="white"
            strokeWidth="1.5"
          />
        </g>
      ))}
      <circle cx="70" cy="40" r="4" fill="var(--color-caramel)" />
    </svg>
  );
}

export function FormaDeAtuar() {
  const [foco, horizonte] = etapas;
  return (
    <InView className="atuar">
      {/* 1 · FOCO */}
      <div className="flex flex-col gap-5 rounded-card bg-peach-100 p-6 md:flex-row md:gap-8 md:p-10">
        <div className="order-last -mb-6 size-28 shrink-0 self-start md:order-none md:-mb-10 md:size-[140px] md:self-end">
          <Foco />
        </div>
        <div className="md:self-center">
          <p className="eyebrow text-caramel-700">1 · Foco</p>
          <h3 className="mt-2 text-h3 text-navy">{foco.titulo}</h3>
          <p className="mt-3 text-ink-muted">{foco.texto}</p>
        </div>
      </div>

      {/* conector entre os dois cartões */}
      <div
        aria-hidden="true"
        className="atuar-conector ml-[79px] h-12 w-[2px] md:ml-[109px] md:h-14"
      />

      {/* 2 · HORIZONTE */}
      <div className="flex flex-col gap-5 rounded-card bg-mist/55 p-6 md:flex-row md:gap-8 md:p-10">
        <div className="-mt-6 size-28 shrink-0 self-start md:-mt-10 md:size-[140px]">
          <Horizonte />
        </div>
        <div className="md:self-center">
          <p className="eyebrow text-caramel-700">2 · Horizonte</p>
          <h3 className="mt-2 text-h3 text-navy">{horizonte.titulo}</h3>
          <p className="mt-3 text-ink-muted">{horizonte.texto}</p>
        </div>
      </div>
    </InView>
  );
}
