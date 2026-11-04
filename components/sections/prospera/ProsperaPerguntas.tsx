"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

/*
 * "5 perguntas que todo empresário deveria saber responder" (página da
 * Próspera, especificação e textos do Lucas, 04/11). Cinco cartões com frente
 * e verso: ao responder "Sei responder" ou "Não tenho certeza", o cartão vira
 * (rotateY) e mostra por que a pergunta importa; "Mudar resposta" desvira.
 * Com as 5 respondidas, aparece o resultado em azul-marinho.
 *
 * Acessibilidade: botões de verdade; a face escondida fica "inert" (fora do
 * teclado e dos leitores de tela); ao virar, o foco vai para o texto do verso
 * e, ao desvirar, para o primeiro botão da frente. Placar e resultado com
 * aria-live. Com movimento reduzido, sem 3D: a face troca com um fade
 * (globals.css, prospera-*).
 *
 * Celular: carrossel com rolagem lateral (scroll-snap) e indicadores; depois
 * de responder, passa sozinho para o próximo cartão em ~1,2 s (não com
 * movimento reduzido). Nada é salvo nem enviado.
 */

type Resposta = "sei" | "nao" | null;

const perguntas: { pergunta: string; verso: string }[] = [
  {
    pergunta: "Quanto sua empresa tem em caixa hoje?",
    verso:
      "Sem saber o caixa de hoje, não dá para planejar o de amanhã. O fluxo de caixa é o painel de controle da empresa.",
  },
  {
    pergunta: "Qual produto ou serviço dá mais lucro?",
    verso:
      "Vender mais nem sempre é lucrar mais. Conhecer a margem de cada produto mostra onde vale a pena investir.",
  },
  {
    pergunta: "Sua empresa paga o mínimo de impostos que a lei permite?",
    verso:
      "Um regime tributário desatualizado pode fazer a empresa pagar mais do que deveria, todos os meses.",
  },
  {
    pergunta: "Quanto você pode retirar da empresa sem comprometer o caixa?",
    verso:
      "Misturar as finanças pessoais com as da empresa é uma das causas mais comuns de aperto no caixa.",
  },
  {
    pergunta: "Se as vendas parassem por 3 meses, o caixa aguentaria?",
    verso:
      "Uma reserva planejada dá tranquilidade para atravessar meses difíceis sem decisões no desespero.",
  },
];

function mensagem(n: number) {
  if (n === 5)
    return "Ótimo sinal! Sua gestão financeira parece estar no caminho certo. O pré-diagnóstico ajuda a confirmar os pontos fortes e encontrar oportunidades.";
  if (n >= 3)
    return "Bom começo, mas ainda há pontos cegos nas finanças da sua empresa. Eles costumam esconder dinheiro perdido.";
  return "As finanças da sua empresa merecem atenção. A boa notícia: com organização, essas respostas ficam na palma da mão.";
}

const reduzido = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ProsperaPerguntas({ prediagUrl }: { prediagUrl: string }) {
  const id = useId().replace(/:/g, "");
  const [respostas, setRespostas] = useState<Resposta[]>(() =>
    perguntas.map(() => null),
  );
  const [noCarrossel, setNoCarrossel] = useState(0);
  const carrossel = useRef<HTMLUListElement>(null);
  const versos = useRef<(HTMLParagraphElement | null)[]>([]);
  const frentes = useRef<(HTMLButtonElement | null)[]>([]);
  const focoPendente = useRef<HTMLElement | null>(null);
  const avanco = useRef<number | undefined>(undefined);

  // aplica o foco depois que o cartão mudou de face (a face nova deixa de
  // ser "inert" só depois da renderização)
  useEffect(() => {
    if (focoPendente.current) {
      focoPendente.current.focus({ preventScroll: true });
      focoPendente.current = null;
    }
  });
  useEffect(() => () => window.clearTimeout(avanco.current), []);

  const respondidas = respostas.filter((r) => r !== null).length;
  const sei = respostas.filter((r) => r === "sei").length;
  const completo = respondidas === perguntas.length;

  const irPara = (i: number) => {
    const c = carrossel.current;
    const item = c?.children[i] as HTMLElement | undefined;
    if (!c || !item) return;
    c.scrollTo({
      left: item.offsetLeft - c.offsetLeft - 16,
      behavior: reduzido() ? "auto" : "smooth",
    });
  };

  const responder = (i: number, r: Exclude<Resposta, null>) => {
    setRespostas((atual) => atual.map((v, j) => (j === i ? r : v)));
    focoPendente.current = versos.current[i];
    // no celular (carrossel rolável), passa para o próximo cartão
    const c = carrossel.current;
    window.clearTimeout(avanco.current);
    if (
      c &&
      c.scrollWidth > c.clientWidth &&
      !reduzido() &&
      i < perguntas.length - 1
    ) {
      avanco.current = window.setTimeout(() => irPara(i + 1), 1200);
    }
  };

  const mudar = (i: number) => {
    window.clearTimeout(avanco.current);
    setRespostas((atual) => atual.map((v, j) => (j === i ? null : v)));
    focoPendente.current = frentes.current[i];
  };

  const refazer = () => {
    window.clearTimeout(avanco.current);
    setRespostas(perguntas.map(() => null));
    focoPendente.current = frentes.current[0];
    irPara(0);
  };

  const posicao = () => {
    const c = carrossel.current;
    if (!c) return;
    const item = c.firstElementChild as HTMLElement | null;
    const passo = item ? item.offsetWidth + 16 : c.clientWidth;
    setNoCarrossel(
      Math.min(perguntas.length - 1, Math.round(c.scrollLeft / passo)),
    );
  };

  return (
    <div className="mt-10 md:mt-12">
      <ul
        ref={carrossel}
        onScroll={posicao}
        aria-label="Perguntas"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0 lg:flex-nowrap [&::-webkit-scrollbar]:hidden"
      >
        {perguntas.map((p, i) => {
          const r = respostas[i];
          const virada = r !== null;
          return (
            <li
              key={p.pergunta}
              className="prospera-carta h-[24rem] w-[85%] shrink-0 snap-center md:w-[calc((100%-2rem)/3)] lg:w-auto lg:flex-1"
              data-virada={virada ? "" : undefined}
            >
              <div className="prospera-miolo">
                {/* FRENTE */}
                <div
                  className="prospera-face prospera-frente"
                  aria-hidden={virada}
                  inert={virada}
                >
                  <Mancha id={`${id}-f${i}`} />
                  <span className="relative font-display text-5xl leading-none font-bold text-caramel">
                    {i + 1}
                  </span>
                  <h3 className="relative mt-5 text-lg leading-snug font-semibold text-navy">
                    {p.pergunta}
                  </h3>
                  <div className="relative mt-auto flex flex-col gap-2.5">
                    <button
                      ref={(el) => {
                        frentes.current[i] = el;
                      }}
                      type="button"
                      onClick={() => responder(i, "sei")}
                      className="rounded-button bg-navy px-4 py-2.5 text-sm font-semibold text-offwhite transition-colors outline-none hover:bg-green-900 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                    >
                      Sei responder
                    </button>
                    <button
                      type="button"
                      onClick={() => responder(i, "nao")}
                      className="rounded-button border border-navy/40 px-4 py-2.5 text-sm font-semibold text-navy transition-colors outline-none hover:border-navy hover:bg-navy/5 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                    >
                      Não tenho certeza
                    </button>
                  </div>
                </div>

                {/* VERSO */}
                <div
                  className="prospera-face prospera-verso"
                  aria-hidden={!virada}
                  inert={!virada}
                >
                  <Mancha id={`${id}-v${i}`} />
                  <span
                    className={`relative flex size-11 items-center justify-center rounded-full ${
                      r === "sei" ? "bg-sage" : "bg-caramel-700"
                    }`}
                  >
                    {r === "sei" ? (
                      <Check
                        aria-hidden="true"
                        className="size-5 text-navy"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="font-display text-xl font-bold text-white"
                      >
                        ?
                      </span>
                    )}
                    <span className="sr-only">
                      {r === "sei"
                        ? "Você respondeu: sei responder."
                        : "Você respondeu: não tenho certeza."}
                    </span>
                  </span>
                  <p className="relative mt-3 text-sm font-semibold text-ink-muted">
                    {i + 1}. {p.pergunta}
                  </p>
                  <p
                    ref={(el) => {
                      versos.current[i] = el;
                    }}
                    tabIndex={-1}
                    className="relative mt-3 text-navy outline-none"
                  >
                    {p.verso}
                  </p>
                  <button
                    type="button"
                    onClick={() => mudar(i)}
                    className="relative mt-auto self-start text-sm font-semibold text-ink-muted underline underline-offset-4 outline-none hover:text-navy focus-visible:ring-2 focus-visible:ring-navy"
                  >
                    Mudar resposta
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* indicadores do carrossel (só no celular) */}
      <div className="mt-2 flex justify-center gap-1 md:hidden">
        {perguntas.map((p, i) => (
          <button
            key={p.pergunta}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para a pergunta ${i + 1} de ${perguntas.length}`}
            aria-current={i === noCarrossel ? "true" : undefined}
            className="flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === noCarrossel
                  ? "w-5 bg-navy"
                  : respostas[i]
                    ? "w-2 bg-sage"
                    : "w-2 bg-navy/25"
              }`}
            />
          </button>
        ))}
      </div>

      <div aria-live="polite">
        <p className="mt-6 text-center text-sm font-semibold text-ink-muted md:mt-10">
          Respondidas: {respondidas} de {perguntas.length}
        </p>

        {completo && (
          <div className="prospera-resultado mx-auto mt-8 max-w-3xl rounded-card bg-navy px-7 py-9 text-center text-offwhite shadow-[0_24px_50px_-28px_rgb(0_41_77/0.7)] sm:px-12 md:py-11">
            <p className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight font-bold">
              Você sabe responder{" "}
              <span className="text-peach-200">{sei} de 5</span>
            </p>
            <p className="mx-auto mt-4 max-w-xl text-lead text-offwhite/80">
              {mensagem(sei)}
            </p>
            <div className="mt-8 flex flex-col items-center gap-5">
              <Button
                href={prediagUrl}
                variant="light"
                arrow
                className="max-sm:w-full"
              >
                Fazer o pré-diagnóstico
              </Button>
              <button
                type="button"
                onClick={refazer}
                className="text-sm font-semibold text-offwhite/75 underline underline-offset-4 outline-none hover:text-offwhite focus-visible:ring-2 focus-visible:ring-offwhite"
              >
                Refazer o teste
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Pequena mancha de aquarela verde-sálvia no canto superior do cartão. */
function Mancha({ id }: { id: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -top-8 -right-8 size-32 opacity-70"
    >
      <defs>
        <filter id={id} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            seed="6"
            result="ruido"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="ruido"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
            result="borda"
          />
          <feGaussianBlur in="borda" stdDeviation="2" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <ellipse
          cx="55"
          cy="45"
          rx="34"
          ry="30"
          fill="var(--color-sage)"
          opacity="0.85"
        />
        <ellipse cx="40" cy="58" rx="20" ry="16" fill="var(--color-mint)" />
      </g>
    </svg>
  );
}
