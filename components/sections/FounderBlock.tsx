import Image from "next/image";
import { User } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { InView } from "@/components/motion/InView";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Texto } from "@/components/ui/Texto";
import { fundadora } from "@/data/fundadora";
import { asset } from "@/lib/paths";
import { seixo } from "@/lib/seixo";

/**
 * Curvas de nível (estilo mapa topográfico) atrás da foto: anéis orgânicos
 * concêntricos gerados por uma fórmula fixa, sempre iguais a cada build.
 */
const CURVAS = Array.from({ length: 6 }, (_, k) => {
  const base = 150 + k * 22;
  const pontos = Array.from({ length: 72 }, (_, j) => {
    const t = (j / 72) * Math.PI * 2;
    const r = base * (1 + 0.11 * Math.sin(3 * t + k * 0.55) + 0.06 * Math.sin(5 * t + 1.3 + k * 0.3));
    const x = 250 + k * 5 + r * Math.cos(t);
    const y = 300 - k * 4 + r * 1.18 * Math.sin(t);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return `M${pontos.join(" L")} Z`;
});

function CurvasDeNivel() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 600"
      className="pointer-events-none absolute -inset-x-[22%] -inset-y-[14%] -z-20 h-[128%] w-[144%] overflow-visible"
      fill="none"
    >
      <g stroke="var(--color-navy)" strokeWidth="1.25" opacity="0.13" strokeLinejoin="round">
        {CURVAS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Pedra arredondada que marca cada ponto da trilha (o último, preenchido). */
function Pedra({ atual = false }: { atual?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 40" className="h-10 w-12 shrink-0">
      <path
        d="M10 35 C3 35 1 27 4 19 C7 10 15 4 25 4 C36 4 45 11 46 21 C47 30 42 35 34 35 Z"
        fill={atual ? "var(--color-navy)" : "var(--color-offwhite)"}
        stroke={atual ? "var(--color-navy)" : "var(--color-green-900)"}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Apresentação da fundadora (Home): do mais pessoal ao mais concreto —
 * apresentação, números e marcos da trajetória, estes como uma trilha de
 * marcos de pedra (o sentido do nome Versta).
 * Todo o conteúdo vem de `data/fundadora.ts`.
 * Sobre o verde sálvia, todo texto é azul-marinho (contraste AA); o caramelo
 * aparece só em elementos decorativos.
 */
export function FounderBlock() {
  const marcos = [
    ...fundadora.marcos,
    { ano: fundadora.anoFundacao, descricao: "Fundação da Versta" },
  ];
  const ultimo = marcos.length - 1;

  return (
    <Section tone="sage-strong" aria-labelledby="fundadora-titulo" className="relative isolate overflow-hidden">
      {/* textura sutil de aquarela nas bordas (decorativa) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-mint opacity-45 blur-3xl" />
        <div className="absolute -right-48 -bottom-48 size-[40rem] rounded-full bg-peach-100 opacity-35 blur-3xl" />
      </div>

      <Container>
        {/* 1. Apresentação */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal from="fade" className="lg:col-span-5">
            {/* Foto recortada em forma de seixo (pedra de rio), com um contorno
                orgânico em caramelo e curvas de nível ao fundo */}
            <InView className="relative isolate mx-auto w-4/5 max-w-[20rem] lg:w-full lg:max-w-[22rem]">
              <CurvasDeNivel />
              {/* recorte da foto (coordenadas de 0 a 1, relativas à caixa) */}
              <svg aria-hidden="true" width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="seixo-fundadora" clipPathUnits="objectBoundingBox">
                    <path d={seixo(1, 1)} />
                  </clipPath>
                </defs>
              </svg>
              <div className="relative aspect-[4/5] bg-offwhite" style={{ clipPath: "url(#seixo-fundadora)" }}>
                {fundadora.foto.pronta ? (
                  <Image
                    src={asset(fundadora.foto.arquivo)}
                    alt={fundadora.foto.alt}
                    fill
                    sizes="(min-width: 1024px) 22rem, 20rem"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
                    <User aria-hidden="true" className="size-16 text-green-700" strokeWidth={1.25} />
                    <p className="text-sm">
                      <mark className="todo-mark">[PREENCHER: foto da fundadora]</mark>
                    </p>
                  </div>
                )}
              </div>
              {/* Contorno em caramelo: a mesma forma do recorte, um pouco maior,
                  levemente girada e deslocada. Dá a volta inteira por fora da
                  foto e passa por cima dela só no canto inferior esquerdo
                  (uns 10px para dentro), para dar profundidade — por isso
                  fica NA FRENTE da foto. Pedido do Lucas. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 125"
                preserveAspectRatio="none"
                fill="none"
                className="contorno-trilha pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              >
                <path
                  d={seixo(100, 125)}
                  transform="translate(2.3 -2.3) rotate(-12 50 62.5) translate(50 62.5) scale(1.05) translate(-50 -62.5)"
                  pathLength={100}
                  stroke="#B46D49"
                  strokeWidth="0.41"
                  strokeLinecap="round"
                />
              </svg>
            </InView>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-navy max-lg:justify-center">
              <span aria-hidden="true" className="h-px w-8 bg-caramel" />
              Quem conduz a Versta
            </p>
            <h2 id="fundadora-titulo" className="mt-4 text-h2 text-navy max-lg:text-center">
              <Texto>{fundadora.nome}</Texto>
            </h2>

            <div className="mt-7 space-y-4 text-lead text-navy">
              {fundadora.apresentacao.map((p) => (
                <p key={p}>
                  <Texto>{p}</Texto>
                </p>
              ))}
            </div>

          </Reveal>
        </div>

        {/* 2. O caminho até aqui (números) */}
        <Reveal className="mt-16 lg:mt-24">
          <h3 className="eyebrow text-center text-navy">O caminho até aqui</h3>
          <dl className="mt-8 grid divide-y divide-navy/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {fundadora.numeros.map((n) => (
              <div key={n.legenda} className="flex flex-col-reverse items-center gap-2 px-6 py-7 text-center sm:py-3">
                <dt className="text-navy">
                  <Texto>{n.legenda}</Texto>
                </dt>
                <dd className="font-display text-[clamp(2.75rem,2rem+3vw,4.25rem)] leading-none font-bold text-navy">
                  {typeof n.valor === "number" ? <CountUp valor={n.valor} /> : n.valor}
                  {n.sufixo}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* 3. Marcos da trajetória */}
        <div className="mt-16 lg:mt-24">
          <h3 className="eyebrow text-center text-navy">Marcos da trajetória</h3>
          <InView className="trilha-marcos relative mt-10">
            {/* linha tracejada: vertical e no centro no celular (passa por trás dos textos, que
                têm o fundo do bloco), horizontal no computador */}
            <span
              aria-hidden="true"
              className="trilha-linha absolute top-5 bottom-5 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-caramel lg:top-5 lg:right-[calc(50%/var(--n))] lg:bottom-auto lg:left-[calc(50%/var(--n))] lg:translate-x-0 lg:border-t-2 lg:border-l-0"
              style={{ "--n": marcos.length } as React.CSSProperties}
            />
            <ol
              className="relative grid gap-9 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-6"
              style={{ "--n": marcos.length } as React.CSSProperties}
            >
              {marcos.map((m, i) => (
                <li
                  key={`${i}-${m.descricao}`}
                  className="trilha-marco flex flex-col items-center text-center lg:gap-4"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Pedra atual={i === ultimo} />
                  <div className="relative rounded-button bg-sage px-3 py-2 lg:bg-transparent lg:p-0">
                    <p className="font-display text-xl font-bold text-navy">
                      <Texto>{m.ano}</Texto>
                    </p>
                    <p className="mt-1 text-navy">
                      <Texto>{m.descricao}</Texto>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </InView>
        </div>
      </Container>
    </Section>
  );
}
