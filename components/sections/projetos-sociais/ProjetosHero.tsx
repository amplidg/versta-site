import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import { colagemProjetos } from "@/data/projetos-sociais";
import { asset } from "@/lib/paths";

/*
 * Topo da página Projetos Sociais (especificação do Lucas, 04/11): texto à
 * esquerda e, à direita, uma colagem com as três ilustrações dos projetos,
 * como fotos espalhadas sobre uma mesa — o mural no centro, maior e à frente;
 * o plantio atrás, à esquerda e acima; a horta atrás, à direita e abaixo.
 * Atrás, uma mancha de aquarela; sobre a borda do quadro central, um selo.
 *
 * Ao carregar, os quadros são "colocados" em sequência (plantio, horta,
 * mural) e o selo aparece por último; no hover, o quadro vem para a frente,
 * endireita e cresce um pouco. CSS em globals.css (colagem-*). Com movimento
 * reduzido, tudo já aparece no lugar. Texto: classes sh2-hero-entra.
 * No celular, a colagem vai para cima do texto e o selo fica abaixo dela.
 */

const atraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Quadro = {
  foto: { arquivo: string; alt: string };
  /** Posição e tamanho, em % da área da colagem. */
  className: string;
  rotacao: number;
  atraso: number;
  prioridade?: boolean;
  sizes: string;
};

const quadros: Quadro[] = [
  {
    foto: colagemProjetos.plantio,
    className: "top-[4%] left-0 z-[1] w-[45%]",
    rotacao: -6,
    atraso: 150,
    sizes: "(min-width: 1024px) 260px, (min-width: 768px) 20vw, 45vw",
  },
  {
    foto: colagemProjetos.horta,
    className: "top-[40%] right-0 z-[2] w-[45%]",
    rotacao: 5,
    atraso: 400,
    sizes: "(min-width: 1024px) 260px, (min-width: 768px) 20vw, 45vw",
  },
  {
    foto: colagemProjetos.mural,
    className: "top-[17%] left-[19%] z-[3] w-[60%]",
    rotacao: -2,
    atraso: 650,
    prioridade: true,
    sizes: "(min-width: 1024px) 340px, (min-width: 768px) 27vw, 60vw",
  },
];

function Selo({ className = "" }: { className?: string }) {
  return (
    <p
      className={`colagem-selo flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm leading-snug font-semibold text-navy shadow-[0_10px_24px_-12px_rgb(0_41_77/0.45)] ${className}`}
    >
      <Heart aria-hidden="true" className="size-4 shrink-0 fill-caramel/20 text-caramel" strokeWidth={2} />
      Projetos que já fizeram a diferença
    </p>
  );
}

function Colagem() {
  return (
    <div className="colagem relative mx-auto w-full max-w-[21rem] sm:max-w-[26rem] md:max-w-none">
      {/* mancha de aquarela atrás, maior que a colagem */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-[14%] size-[128%] overflow-visible opacity-90"
      >
        <defs>
          <filter id="colagem-aq" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="15" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="12" xChannelSelector="R" yChannelSelector="G" result="borda" />
            <feGaussianBlur in="borda" stdDeviation="3" />
          </filter>
        </defs>
        <g filter="url(#colagem-aq)">
          <ellipse cx="50" cy="52" rx="42" ry="38" fill="var(--color-mint)" />
          <ellipse cx="66" cy="40" rx="26" ry="22" fill="var(--color-mist)" opacity="0.6" />
          <ellipse cx="30" cy="70" rx="18" ry="14" fill="var(--color-peach-100)" opacity="0.9" />
        </g>
      </svg>

      {/* área dos quadros */}
      <div className="relative aspect-[6/5]">
        {quadros.map((q) => (
          <figure
            key={q.foto.arquivo}
            className={`colagem-quadro absolute rounded-[14px] bg-white p-[7px] shadow-[0_18px_36px_-18px_rgb(0_41_77/0.5)] ${q.className}`}
            style={{ "--r": `${q.rotacao}deg`, ...atraso(q.atraso) } as CSSProperties}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[9px] bg-mint">
              {/* eslint-disable-next-line @next/next/no-img-element -- site estático */}
              <img
                src={asset(q.foto.arquivo)}
                alt={q.foto.alt}
                width={1200}
                height={900}
                decoding="async"
                {...(q.prioridade ? { fetchPriority: "high" as const } : {})}
                sizes={q.sizes}
                className="size-full object-cover"
              />
            </div>
          </figure>
        ))}

        {/* selo sobre a borda inferior esquerda do quadro central (tablet/computador) */}
        <Selo className="absolute top-[72%] left-[8%] z-[4] hidden max-w-[17rem] md:flex lg:max-w-[19rem]" />
      </div>

      {/* no celular, o selo fica abaixo da colagem */}
      <Selo className="relative mx-auto mt-4 w-fit md:hidden" />
    </div>
  );
}

export function ProjetosHero({
  titulo,
  texto,
  children,
}: {
  titulo: string;
  texto: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
      <div className="container-site grid items-center gap-10 pt-6 pb-16 md:grid-cols-12 md:gap-8 md:pt-14 md:pb-24 lg:min-h-[40rem]">
        <div className="md:col-span-7 md:pr-6 lg:col-span-6 lg:pr-0">
          <nav aria-label="Trilha de navegação" className="sh2-hero-entra mb-6" style={atraso(60)}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="hover:text-navy hover:underline">
                  Início
                </Link>
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-navy">
                Projetos Sociais
              </li>
            </ol>
          </nav>
          <p className="sh2-hero-entra eyebrow mb-5 flex items-center gap-3 text-caramel-700" style={atraso(120)}>
            <span aria-hidden="true" className="h-px w-8 bg-caramel" />
            Projetos Sociais
          </p>
          <h1 id="page-title" className="sh2-hero-entra text-h1 text-balance text-navy" style={atraso(200)}>
            {titulo}
          </h1>
          <p className="sh2-hero-entra mt-6 max-w-xl text-lead text-ink-muted" style={atraso(320)}>
            {texto}
          </p>
          <div
            className="sh2-hero-entra mt-9 flex flex-col gap-3 md:flex-row md:flex-wrap max-md:[&>*]:w-full"
            style={atraso(440)}
          >
            {children}
          </div>
        </div>

        {/* colagem: depois do texto no código; no celular, aparece em cima */}
        <div className="order-first md:order-none md:col-span-5 lg:col-span-6 lg:pl-6">
          <Colagem />
        </div>
      </div>
    </section>
  );
}
