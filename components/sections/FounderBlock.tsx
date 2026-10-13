import { DogSymbol } from "@/components/brand/DogSymbol";
import { CountUp } from "@/components/motion/CountUp";
import { InView } from "@/components/motion/InView";
import { Reveal } from "@/components/motion/Reveal";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { Texto } from "@/components/ui/Texto";
import { fundadora } from "@/data/fundadora";

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
            <div className="relative mx-auto max-w-[17rem] sm:max-w-xs lg:max-w-[22rem]">
              {/* moldura orgânica, como manchas de aquarela por trás da foto */}
              <div
                aria-hidden="true"
                className="absolute -inset-5 -rotate-3 rounded-[34%_30%_36%_28%/28%_34%_30%_36%] bg-peach-100 opacity-80 blur-[2px]"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-3 translate-x-4 translate-y-3 rotate-2 rounded-[30%_36%_28%_34%/34%_28%_36%_30%] bg-mint opacity-75 blur-[2px]"
              />
              <Illustration
                imagem="fundadora"
                legenda={false}
                sizes="(min-width: 1024px) 22rem, 20rem"
                className="aspect-[4/5] w-full rounded-[30%_26%_32%_24%/24%_30%_26%_32%]"
              />
              {!fundadora.foto.pronta && (
                <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-sm">
                  <mark className="todo-mark">[PREENCHER: foto da fundadora]</mark>
                </p>
              )}
              <DogSymbol className="absolute -right-3 -bottom-4 w-14 sm:-right-6" />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-navy">
              <span aria-hidden="true" className="h-px w-8 bg-caramel" />
              Quem conduz a Versta
            </p>
            <h2 id="fundadora-titulo" className="mt-4 text-h2 text-navy">
              <Texto>{fundadora.nome}</Texto>
            </h2>
            <p className="mt-2 text-lead text-navy">{fundadora.cargo}</p>

            <blockquote className="relative mt-8 pl-12">
              <span
                aria-hidden="true"
                className="absolute -top-5 left-0 font-display text-[5.5rem] leading-none text-caramel select-none"
              >
                “
              </span>
              <p className="font-display text-h3 text-navy italic">
                <Texto>{fundadora.citacao}</Texto>
              </p>
            </blockquote>

            <div className="mt-8 space-y-4 text-navy">
              {fundadora.apresentacao.map((p) => (
                <p key={p}>
                  <Texto>{p}</Texto>
                </p>
              ))}
            </div>

            <p className="mt-8 border-t border-navy/20 pt-5 text-sm text-navy">
              <Texto>{fundadora.formacoes}</Texto>
            </p>
          </Reveal>
        </div>

        {/* 2. O caminho em números */}
        <Reveal className="mt-16 lg:mt-24">
          <h3 className="eyebrow text-center text-navy">O caminho em números</h3>
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
            {/* linha tracejada: vertical no celular, horizontal no computador */}
            <span
              aria-hidden="true"
              className="trilha-linha absolute top-5 bottom-5 left-6 border-l-2 border-dashed border-caramel lg:top-5 lg:right-[calc(50%/var(--n))] lg:bottom-auto lg:left-[calc(50%/var(--n))] lg:border-t-2 lg:border-l-0"
              style={{ "--n": marcos.length } as React.CSSProperties}
            />
            <ol
              className="relative grid gap-9 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-6"
              style={{ "--n": marcos.length } as React.CSSProperties}
            >
              {marcos.map((m, i) => (
                <li
                  key={`${i}-${m.descricao}`}
                  className="trilha-marco flex items-start gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Pedra atual={i === ultimo} />
                  <div className="pt-1.5 lg:pt-0">
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
