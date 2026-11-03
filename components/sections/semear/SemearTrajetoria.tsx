import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Hourglass, Layers, Network } from "lucide-react";
import { InView } from "@/components/motion/InView";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientesSemear } from "@/data/depoimentos";
import { asset } from "@/lib/paths";

/*
 * "Quem está à frente desta solução" (página da Semear; o Lucas pediu um bloco sobre a
 * autoridade da Semear em 03/11, com liberdade de criação). Só usa o que já
 * está confirmado no site: a Semear Soluções Ambientais foi fundada por Vivian
 * Prá Philippi, acompanha empresas na gestão ambiental, mais de 20 anos de
 * experiência e os 5 serviços da página. Nenhum número novo.
 *
 * Visual: anéis de crescimento de uma árvore — um anel por ano (20), que se
 * desenham do centro para fora ao entrar na tela (CSS semear-anel, em
 * globals.css; parados e visíveis com movimento reduzido).
 *
 * Logos: aparecem sozinhos quando houver clientes da Semear com logo em
 * data/depoimentos.ts (`clientesSemear`); enquanto não houver, a faixa some.
 */

const ANEIS = 20;

const pilares: { titulo: string; texto: string; icone: LucideIcon }[] = [
  {
    titulo: "Experiência de campo",
    texto: "Mais de 20 anos acompanhando empresas na gestão ambiental, em diferentes setores.",
    icone: Hourglass,
  },
  {
    titulo: "Do licenciamento à Justiça",
    texto: "Licenças, controles, estudos, planos e assessoria técnica em processos judiciais, numa mesma condução.",
    icone: Layers,
  },
  {
    titulo: "Acompanhamento de perto",
    texto: "Prazos, condicionantes e exigências acompanhados para que nada fique para trás.",
    icone: CalendarCheck,
  },
  {
    titulo: "Parte do ecossistema Versta",
    texto: "Quando o diagnóstico mostra outras necessidades, a empresa é conectada às outras frentes.",
    icone: Network,
  },
];

/**
 * Contorno de um anel: círculo levemente irregular, como na madeira. Todos
 * usam quase a mesma irregularidade (só escalada), para ficarem aninhados
 * sem se cruzar; o miolo (raio < 21) fica livre para o "20+".
 */
function anel(k: number) {
  const r = 21 + k * 1.35;
  const cx = 50 + k * 0.06; // o miolo da árvore nunca fica bem no centro
  const cy = 50 - k * 0.04;
  const pontos: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * Math.PI * 2;
    const raio = r * (1 + 0.03 * Math.sin(3 * t + 0.4 + k * 0.03) + 0.018 * Math.sin(5 * t + 1.1 + k * 0.02));
    pontos.push(`${(cx + raio * Math.cos(t)).toFixed(2)} ${(cy + raio * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pontos.join(" L")}Z`;
}

export function SemearTrajetoria() {
  const logos = clientesSemear.filter((c) => c.logo && !c.nome.includes("[PREENCHER"));

  return (
    <Section tone="forest" aria-labelledby="trajetoria-titulo" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* anéis de crescimento */}
          <InView className="semear-aneis relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[22rem] lg:col-span-5 lg:max-w-[28rem]">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
              {Array.from({ length: ANEIS }, (_, k) => (
                <path
                  key={k}
                  d={anel(k)}
                  pathLength={1}
                  fill="none"
                  stroke={k === ANEIS - 1 ? "var(--color-caramel)" : "var(--color-mint)"}
                  strokeOpacity={k === ANEIS - 1 ? 0.9 : 0.18 + (k % 4 === 0 ? 0.22 : 0.08)}
                  strokeWidth={k === ANEIS - 1 ? 0.5 : k % 4 === 0 ? 0.4 : 0.25}
                  className="semear-anel"
                  style={{ "--k": k } as CSSProperties}
                />
              ))}
            </svg>
            <div className="semear-miolo absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-[clamp(3rem,2rem+4vw,4.75rem)] leading-none font-bold text-peach-100">
                20+
              </span>
              <span className="mt-2 max-w-[7rem] text-xs leading-snug text-mint sm:max-w-[9rem] sm:text-sm">
                anos de experiência em gestão ambiental
              </span>
            </div>
          </InView>

          {/* texto e pilares */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                onDark
                id="trajetoria-titulo"
                eyebrow="Quem está à frente desta solução"
                title="Esta solução é conduzida pela Semear Soluções Ambientais"
              />
              <p className="mt-6 text-lead text-offwhite/85">
                A Semear Soluções Ambientais é uma consultoria fundada por Vivian Prá Philippi que, há
                mais de 20 anos, acompanha empresas de diferentes setores na gestão ambiental, com uma
                condução técnica, próxima e completa.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {pilares.map(({ titulo, texto, icone: Icone }, i) => (
                <Reveal as="li" key={titulo} delay={i * 90} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-mint/30 bg-mint/10">
                    <Icone aria-hidden="true" className="size-5 text-peach-100" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-offwhite">{titulo}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-mint">{texto}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* empresas atendidas pela Semear: só aparece quando houver logos */}
        {logos.length > 0 && (
          <Reveal className="mt-16 border-t border-mint/20 pt-10">
            <p className="eyebrow text-center text-mint">Empresas atendidas pela Semear</p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {logos.map((c) => (
                <li key={c.nome}>
                  <span
                    role="img"
                    aria-label={c.nome}
                    className="block h-10 w-32 bg-offwhite/85"
                    style={{
                      maskImage: `url(${asset(c.logo)})`,
                      WebkitMaskImage: `url(${asset(c.logo)})`,
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                    }}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
