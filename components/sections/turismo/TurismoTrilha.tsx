import type { CSSProperties } from "react";
import { Flag } from "lucide-react";
import { InView } from "@/components/motion/InView";

/*
 * "Do objetivo à experiência" (página do Turismo, especificação do Lucas,
 * 03/11): um mapa de viagem. Uma trilha tracejada em caramelo atravessa o bloco
 * em S, com 5 paradas (pins azul-marinho numerados) e uma bandeira no fim.
 * Ao entrar na tela, a trilha se desenha da esquerda para a direita e cada pin
 * cai no lugar quando a trilha passa por ele. Mouse/foco numa parada: o pin
 * cresce e ganha um anel caramelo. Computador: trilha horizontal, textos
 * alternando acima e abaixo. Celular/tablet: trilha vertical à esquerda.
 * Animações em globals.css (classes turismo-*), com movimento reduzido tudo
 * aparece pronto.
 */

const paradas = [
  {
    titulo: "Objetivo",
    texto:
      "Entendemos o que a empresa quer alcançar: integrar, reconhecer ou fidelizar.",
  },
  {
    titulo: "Roteiro",
    texto:
      "Desenhamos a experiência ideal para o grupo, o perfil e o orçamento.",
  },
  // 3 e 4 reescritas a pedido do Lucas (03/11): a logística fica com parceiros
  // e não há acompanhamento dos participantes durante a viagem
  {
    titulo: "Conexão",
    texto:
      "Conectamos a empresa a parceiros especializados, que cuidam da logística da viagem.",
  },
  {
    titulo: "Vivência",
    texto:
      "A equipe vive a viagem com tudo definido antes: destino, dinâmicas e o propósito de cada momento.",
  },
  {
    titulo: "Resultado",
    texto: "Avaliamos a experiência com a empresa e com os participantes.",
  },
];

// Mapa no computador: coordenadas no quadro 1000 × 360 (início, 5 paradas, destino)
const LARGURA = 1000;
const ALTURA = 360;
const pontos: [number, number][] = [
  [20, 180],
  [100, 235],
  [300, 125],
  [500, 235],
  [700, 125],
  [900, 235],
  [975, 175],
];
const DESENHO_S = 2.5; // duração do desenho da trilha, em segundos

/** Curvas suaves entre os pontos (tangentes horizontais), formando o S. */
function trilha() {
  let d = `M${pontos[0][0]} ${pontos[0][1]}`;
  for (let i = 1; i < pontos.length; i++) {
    const [x0, y0] = pontos[i - 1];
    const [x1, y1] = pontos[i];
    const meio = (x1 - x0) / 2;
    d += ` C${x0 + meio} ${y0} ${x1 - meio} ${y1} ${x1} ${y1}`;
  }
  return d;
}

/** Pin numerado. A queda (entrada) fica no invólucro, para não brigar com o hover. */
function Pin({ n }: { n: number }) {
  return (
    <span className="turismo-cai shrink-0">
      <span className="turismo-pin relative flex size-11 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white shadow-[0_8px_18px_-8px_rgb(0_41_77/0.6)] ring-0 ring-caramel/60 transition-[transform,box-shadow] duration-300 ease-[var(--ease-calm)] motion-reduce:transition-none">
        {n}
      </span>
    </span>
  );
}

export function TurismoTrilha() {
  const d = trilha();
  return (
    <InView className="turismo-trilha mt-12 md:mt-16">
      {/* COMPUTADOR — mapa horizontal */}
      <div
        className="relative hidden lg:block"
        style={{ aspectRatio: `${LARGURA} / ${ALTURA}` }}
      >
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${LARGURA} ${ALTURA}`}
          className="absolute inset-0 size-full overflow-visible"
        >
          <defs>
            {/* a trilha se revela por uma máscara que se desenha da esquerda para a direita */}
            <mask
              id="turismo-mascara"
              maskUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width={LARGURA + 40}
              height={ALTURA + 40}
            >
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth="14"
                className="turismo-revelar"
              />
            </mask>
          </defs>
          <path
            d={d}
            fill="none"
            stroke="var(--color-caramel)"
            strokeWidth="3"
            strokeDasharray="2 11"
            strokeLinecap="round"
            mask="url(#turismo-mascara)"
          />
        </svg>
        {/* destino */}
        <span
          aria-hidden="true"
          className="turismo-destino absolute -translate-x-[17%] -translate-y-[92%]"
          style={
            {
              left: `${(pontos[6][0] / LARGURA) * 100}%`,
              top: `${(pontos[6][1] / ALTURA) * 100}%`,
              "--t": `${DESENHO_S}s`,
            } as CSSProperties
          }
        >
          <Flag className="size-8 text-caramel" strokeWidth={1.75} />
        </span>
        <ol>
          {paradas.map((p, i) => {
            const [x, y] = pontos[i + 1];
            const acima = y < ALTURA / 2;
            return (
              <li
                key={p.titulo}
                tabIndex={0}
                aria-label={`${i + 1}. ${p.titulo}: ${p.texto}`}
                className="turismo-parada group absolute w-56 -translate-x-1/2 -translate-y-1/2 rounded-card outline-none"
                style={
                  {
                    left: `${(x / LARGURA) * 100}%`,
                    top: `${(y / ALTURA) * 100}%`,
                    "--t": `${(x / LARGURA) * DESENHO_S}s`,
                  } as CSSProperties
                }
              >
                <div className="flex justify-center">
                  <Pin n={i + 1} />
                </div>
                <div
                  aria-hidden="true"
                  className={`turismo-texto absolute left-0 w-56 text-center ${
                    acima ? "bottom-full mb-3" : "top-full mt-3"
                  }`}
                >
                  <p className="font-display text-xl font-bold text-navy">
                    {p.titulo}
                  </p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-ink-muted">
                    {p.texto}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* CELULAR / TABLET — trilha vertical à esquerda */}
      <div className="relative mx-auto max-w-xl lg:hidden">
        <svg
          aria-hidden="true"
          className="turismo-linha-v absolute top-5 bottom-5 left-[1.375rem] h-[calc(100%-2.5rem)] w-px -translate-x-1/2 overflow-visible"
        >
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke="var(--color-caramel)"
            strokeWidth="3"
            strokeDasharray="2 11"
            strokeLinecap="round"
          />
        </svg>
        <ol className="relative space-y-9">
          {paradas.map((p, i) => (
            <li
              key={p.titulo}
              tabIndex={0}
              className="turismo-parada group flex gap-5 rounded-card outline-none"
              style={{ "--t": `${0.3 + i * 0.45}s` } as CSSProperties}
            >
              <Pin n={i + 1} />
              <div className="turismo-texto pt-1.5">
                <p className="font-display text-xl font-bold text-navy">
                  {p.titulo}
                </p>
                <p className="mt-1 leading-snug text-ink-muted">{p.texto}</p>
              </div>
            </li>
          ))}
          <li
            aria-hidden="true"
            className="turismo-parada flex w-11 justify-center"
            style={{ "--t": "2.6s" } as CSSProperties}
          >
            <Flag className="size-7 text-caramel" strokeWidth={1.75} />
          </li>
        </ol>
      </div>
    </InView>
  );
}
