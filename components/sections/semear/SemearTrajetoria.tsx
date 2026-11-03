import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Hourglass, Layers, Network } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientesSemear } from "@/data/depoimentos";
import { fotosSemear, type FotoSemear } from "@/data/semear";
import { asset } from "@/lib/paths";

/*
 * "Esta solução é conduzida pela Semear..." (página da Semear; o Lucas pediu um
 * bloco sobre a autoridade da Semear em 03/11, com liberdade de criação). Só
 * usa o que já está confirmado no site: a Semear Soluções Ambientais foi
 * fundada por Vivian Prá Philippi, acompanha empresas na gestão ambiental, mais
 * de 20 anos de experiência e os 5 serviços da página. Nenhum número novo.
 *
 * Visual (03/11, pedido do Lucas): fotos reais do trabalho de campo passando
 * em loop — no computador, duas colunas que sobem e descem em sentidos
 * opostos; no celular/tablet, uma faixa que corre para o lado. Pausa com o
 * mouse; com movimento reduzido fica parado (no celular, a faixa rola com o
 * dedo). Logo completo da Semear acima do título e, no fundo do bloco, o
 * símbolo repetido em baixa opacidade (pedido do Lucas, 03/11).
 * Fotos e descrições em data/semear.ts; animação em globals.css (semear-*).
 *
 * Logos: aparecem sozinhos quando houver clientes da Semear com logo em
 * data/depoimentos.ts (`clientesSemear`); enquanto não houver, a faixa some.
 */

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

// formatos alternados (retrato e quadrado) dão ritmo às colunas
const formatos = ["aspect-[4/5]", "aspect-square"];

/** Uma foto do loop. A segunda cópia da lista (para emendar o loop) não é lida. */
function Foto({ foto, formato, copia, sizes }: { foto: FotoSemear; formato: string; copia: boolean; sizes: string }) {
  const base = asset(`/images/semear/${foto.arquivo}`);
  return (
    <div className={`relative overflow-hidden rounded-[16px] bg-green-700/40 ${formato}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- site estático: srcset feito à mão */}
      <img
        src={`${base}.webp`}
        srcSet={`${base}-640.webp 640w, ${base}.webp 1200w`}
        sizes={sizes}
        alt={copia ? "" : foto.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: foto.posicao }}
      />
    </div>
  );
}

/** Lista repetida duas vezes: a animação anda metade do trilho e recomeça sem emenda. */
function Trilho({
  fotos,
  inicio,
  direcao,
  item,
  sizes,
}: {
  fotos: FotoSemear[];
  inicio: number;
  direcao: "vertical" | "horizontal";
  item: string;
  sizes: string;
}) {
  return (
    <ul className={`semear-trilho flex ${direcao === "vertical" ? "flex-col" : "w-max flex-row items-center"}`}>
      {[false, true].flatMap((copia) =>
        fotos.map((f, i) => (
          <li key={`${f.arquivo}-${copia}`} aria-hidden={copia || undefined} className={item}>
            <Foto foto={f} formato={formatos[(i + inicio) % 2]} copia={copia} sizes={sizes} />
          </li>
        )),
      )}
    </ul>
  );
}

export function SemearTrajetoria() {
  const logos = clientesSemear.filter((c) => c.logo && !c.nome.includes("[PREENCHER"));
  const colunaA = fotosSemear.filter((_, i) => i % 2 === 0);
  const colunaB = fotosSemear.filter((_, i) => i % 2 === 1);

  return (
    <Section tone="forest" aria-labelledby="trajetoria-titulo" className="relative isolate overflow-hidden">
      {/* fundo: símbolo da Semear repetido, bem suave (CSS semear-padrao) */}
      <div
        aria-hidden="true"
        className="semear-padrao pointer-events-none absolute inset-0 -z-10 bg-mint opacity-[0.07]"
        style={{ "--padrao": `url(${asset("/images/semear/semear-simbolo-padrao.png")})` } as CSSProperties}
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* FOTOS — computador: duas colunas em sentidos opostos */}
          <div
            role="group"
            aria-label="Fotos da Semear em trabalho de campo"
            className="semear-fotos semear-fotos-v relative hidden h-[40rem] grid-cols-2 gap-3 overflow-hidden lg:col-span-5 lg:grid"
          >
            <div style={{ "--dur": "46s" } as CSSProperties}>
              <Trilho fotos={colunaA} inicio={0} direcao="vertical" item="pb-3" sizes="18vw" />
            </div>
            <div className="semear-desce" style={{ "--dur": "40s" } as CSSProperties}>
              <Trilho fotos={colunaB} inicio={1} direcao="vertical" item="pb-3" sizes="18vw" />
            </div>
          </div>

          {/* texto e pilares */}
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              {/* logo completo da Semear, sobre fundo claro (o verde do logo some no verde escuro) */}
              <span className="mb-7 inline-flex rounded-card bg-offwhite px-5 py-4 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo pequeno, sem otimização */}
                <img
                  src={asset("/images/semear/semear-logo.png")}
                  alt="Semear Soluções Ambientais"
                  width={615}
                  height={177}
                  className="h-auto w-44 sm:w-52"
                />
              </span>
              <SectionHeading
                onDark
                id="trajetoria-titulo"
                title="Esta solução é conduzida pela Semear Soluções Ambientais"
              />
              <p className="mt-6 text-lead text-offwhite/85">
                Fundada por Vivian Prá Philippi, a Semear presta consultoria ambiental há mais de 20
                anos. Nesse caminho, acompanha empresas de diferentes setores com uma condução técnica,
                próxima e completa.
              </p>
            </Reveal>

            {/* FOTOS — celular/tablet: faixa que corre para o lado */}
            <div
              role="group"
              aria-label="Fotos da Semear em trabalho de campo"
              className="semear-fotos semear-fotos-h relative -mx-[var(--gutter)] mt-10 overflow-hidden lg:hidden"
              style={{ "--dur": "55s" } as CSSProperties}
            >
              <Trilho
                fotos={fotosSemear}
                inicio={0}
                direcao="horizontal"
                item="w-44 shrink-0 pr-3 sm:w-56"
                sizes="(min-width: 640px) 224px, 176px"
              />
            </div>

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
