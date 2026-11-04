"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { asset } from "@/lib/paths";

/*
 * "Como uma cultura forte se forma" (página da Cultura, especificação do Lucas,
 * 03/11): uma árvore com três pontos clicáveis — raízes, tronco e copa. Cada um
 * mostra o seu texto no painel ao lado (começa nas raízes, pedido do Lucas). Os nomes acima do texto
 * também trocam o conteúdo. Botões de verdade, navegáveis pelo teclado; o
 * painel é anunciado a leitores de tela. Animações em globals.css (cultura-*).
 *
 * Troca automática (pedido do Lucas, 04/11): a cada 7 s o próximo ponto
 * (1 → 2 → 3 → 1…) fica ativo, para quem não percebeu que dá para clicar.
 * Pausa com o mouse sobre o bloco ou com o foco do teclado dentro dele; um
 * clique recomeça a contagem. O painel só é anunciado a leitores de tela depois
 * que a pessoa interage (senão seria lido a cada troca).
 *
 * ILUSTRAÇÃO: quando existir public/images/cultura-arvore.webp, mude
 * IMAGEM_PRONTA para true. Enquanto isso, aparece a árvore desenhada em código.
 * As posições dos pontos ficam em `partes` (em % da ilustração), para ajustar
 * quando a imagem trocar.
 */

const IMAGEM_PRONTA = false;
const IMAGEM = "/images/cultura-arvore.webp";

type Parte = {
  chave: "raizes" | "tronco" | "copa";
  nome: string;
  titulo: string;
  texto: string;
  /** Posição do ponto sobre a ilustração, em %. */
  top: number;
  left: number;
};

const partes: Parte[] = [
  {
    chave: "raizes",
    nome: "Raízes",
    titulo: "Propósito e valores",
    texto:
      "A base que sustenta tudo: o que a empresa acredita, como trabalha e o que não negocia. Quando as raízes são claras, as decisões do dia a dia ficam mais simples.",
    top: 80,
    left: 42,
  },
  {
    chave: "tronco",
    nome: "Tronco",
    titulo: "Liderança",
    texto:
      "É o líder que leva a cultura até as pessoas. Cada atitude dele influencia a equipe inteira, para o bem ou para o mal. Por isso, preparar líderes é o ponto de partida.",
    top: 55,
    left: 52,
  },
  {
    chave: "copa",
    nome: "Copa",
    titulo: "Equipe engajada",
    texto:
      "Pessoas que se sentem parte, entendem seu papel e veem futuro na empresa. Os frutos aparecem: menos rotatividade, melhor clima e mais resultado.",
    top: 24,
    left: 60,
  },
];

const PAINEL = "cultura-painel";
const INTERVALO = 7000;

/** Árvore provisória em SVG (raízes caramelo, tronco azul-marinho, copa em aquarela). */
function ArvoreDesenhada({ ativa }: { ativa: Parte["chave"] }) {
  const parte = (chave: Parte["chave"]) =>
    `cultura-area ${ativa === chave ? "cultura-area-ativa" : ""}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="size-full overflow-visible"
    >
      <defs>
        <filter
          id="cultura-aquarela"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="3"
            seed="9"
            result="ruido"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="ruido"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
            result="borda"
          />
          <feGaussianBlur in="borda" stdDeviation="2" />
        </filter>
      </defs>
      {/* chão */}
      <path
        d="M90 392 C 220 382, 380 384, 510 394"
        fill="none"
        stroke="var(--color-sage)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* raízes */}
      <g
        className={parte("raizes")}
        fill="none"
        stroke="var(--color-caramel)"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M290 392 C 280 440, 230 470, 180 520" />
        <path d="M296 395 C 300 450, 290 500, 300 560" />
        <path d="M306 392 C 330 440, 380 465, 430 515" />
        <path d="M288 400 C 250 420, 200 425, 150 450" strokeWidth="3.5" />
        <path d="M310 400 C 350 420, 410 418, 460 440" strokeWidth="3.5" />
        <path d="M240 480 C 225 500, 220 515, 222 540" strokeWidth="2.5" />
        <path d="M385 480 C 400 495, 405 515, 400 540" strokeWidth="2.5" />
      </g>
      {/* tronco */}
      <path
        className={parte("tronco")}
        d="M272 395 C 280 350, 282 320, 274 282 L 326 282 C 318 320, 320 350, 330 395 Z"
        fill="var(--color-navy)"
        opacity="0.55"
      />
      {/* copa */}
      <g className={parte("copa")}>
        <g filter="url(#cultura-aquarela)">
          <ellipse
            cx="300"
            cy="170"
            rx="200"
            ry="130"
            fill="var(--color-mint)"
          />
          <ellipse
            cx="230"
            cy="195"
            rx="110"
            ry="80"
            fill="var(--color-sage)"
            opacity="0.55"
          />
          <ellipse
            cx="370"
            cy="140"
            rx="120"
            ry="85"
            fill="var(--color-sage)"
            opacity="0.45"
          />
          <ellipse
            cx="300"
            cy="105"
            rx="90"
            ry="60"
            fill="var(--color-mint)"
            opacity="0.9"
          />
        </g>
        {[
          [210, 150],
          [255, 225],
          [340, 200],
          [395, 120],
          [430, 205],
          [300, 120],
          [170, 210],
        ].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="9"
            fill="var(--color-peach-200)"
          />
        ))}
      </g>
    </svg>
  );
}

export function CulturaArvore() {
  const [ativa, setAtiva] = useState<Parte["chave"]>("raizes");
  const [pausado, setPausado] = useState(false);
  const [interagiu, setInteragiu] = useState(false);

  // avança sozinho; o temporizador recomeça a cada troca (inclusive por clique)
  useEffect(() => {
    if (pausado) return;
    const t = window.setTimeout(() => {
      setAtiva(
        (a) =>
          partes[(partes.findIndex((p) => p.chave === a) + 1) % partes.length]
            .chave,
      );
    }, INTERVALO);
    return () => window.clearTimeout(t);
  }, [ativa, pausado]);

  const escolher = (chave: Parte["chave"]) => {
    setInteragiu(true);
    setAtiva(chave);
  };
  const atual = partes.find((p) => p.chave === ativa)!;

  return (
    <div
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <InView className="cultura mt-12 grid items-center gap-10 md:mt-16 lg:grid-cols-12 lg:gap-14">
        {/* ÁRVORE com os pontos */}
        <div className="cultura-arvore relative mx-auto aspect-square h-80 max-w-full lg:col-span-7 lg:h-auto lg:w-full lg:max-w-[34rem]">
          {IMAGEM_PRONTA ? (
            // eslint-disable-next-line @next/next/no-img-element -- ilustração única, site estático
            <img
              src={asset(IMAGEM)}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-contain"
            />
          ) : (
            <ArvoreDesenhada ativa={ativa} />
          )}
          {partes.map((p, i) => {
            const ativo = p.chave === ativa;
            return (
              <button
                key={p.chave}
                type="button"
                aria-pressed={ativo}
                aria-controls={PAINEL}
                aria-label={`${i + 1}. ${p.nome} · ${p.titulo}`}
                onClick={() => escolher(p.chave)}
                className="cultura-ponto absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-navy/50"
                style={
                  {
                    top: `${p.top}%`,
                    left: `${p.left}%`,
                    "--i": i,
                  } as CSSProperties
                }
              >
                <span className="cultura-ponto-entra relative flex">
                  <span
                    aria-hidden="true"
                    className={`cultura-pulso absolute inset-0 rounded-full ${ativo ? "bg-caramel/40" : "bg-navy/25"}`}
                  />
                  <span
                    className={`relative flex items-center justify-center rounded-full font-display font-bold text-white shadow-[0_8px_18px_-8px_rgb(0_41_77/0.6)] transition-[width,height,background-color] duration-300 motion-reduce:transition-none ${
                      ativo
                        ? "size-12 bg-caramel text-lg"
                        : "size-10 bg-navy text-base"
                    }`}
                  >
                    {i + 1}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* PAINEL */}
        <div className="lg:col-span-5">
          <div
            className="flex gap-2"
            role="group"
            aria-label="Partes da árvore"
          >
            {partes.map((p) => {
              const ativo = p.chave === ativa;
              return (
                <button
                  key={p.chave}
                  type="button"
                  aria-pressed={ativo}
                  aria-controls={PAINEL}
                  onClick={() => escolher(p.chave)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${
                    ativo
                      ? "border-navy bg-navy text-offwhite"
                      : "border-navy/25 text-navy hover:border-navy/60"
                  }`}
                >
                  {p.nome}
                </button>
              );
            })}
          </div>
          <div
            id={PAINEL}
            aria-live={interagiu ? "polite" : "off"}
            className="mt-6 min-h-[12rem]"
          >
            <div key={atual.chave} className="cultura-texto">
              <p className="eyebrow text-caramel-700">{atual.nome}</p>
              <h3 className="mt-2 text-h3 text-navy">{atual.titulo}</h3>
              <p className="mt-3 text-lead text-ink-muted">{atual.texto}</p>
            </div>
          </div>
        </div>
      </InView>
    </div>
  );
}
