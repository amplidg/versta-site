import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { HeartHandshake, ShieldCheck, Sprout } from "lucide-react";
import { asset } from "@/lib/paths";
import { imagens } from "@/data/imagens";
import { Sh2HeroVideo } from "./Sh2HeroVideo";

/*
 * Topo da página do Programa SH2 (especificação do Lucas, 29/10).
 * Texto à esquerda; à direita, a ilustração da mulher com o cão sangrando até
 * a borda da janela, com as bordas dissolvidas no fundo (máscara no CSS,
 * classe sh2-hero-midia). No celular (< 768px) a imagem vai para o topo.
 * Entrada suave no carregamento (classes sh2-hero-*, em globals.css), que
 * respeita prefers-reduced-motion.
 *
 * Vídeo em loop (opcional): basta salvar public/videos/sh2-hero-loop.mp4 e
 * publicar — o site passa a usá-lo no computador/tablet, com a imagem de poster.
 */

const VIDEO = "/videos/sh2-hero-loop.mp4";
const temVideo = existsSync(join(process.cwd(), "public", VIDEO));

const pilares: { titulo: string; texto: string; icone: LucideIcon; fundo: string }[] = [
  { titulo: "Proteger", texto: "Adequação à NR-1 e segurança para a empresa.", icone: ShieldCheck, fundo: "bg-mint" },
  { titulo: "Cuidar", texto: "Atendimento e bem-estar para os colaboradores.", icone: HeartHandshake, fundo: "bg-peach-100" },
  { titulo: "Construir", texto: "Lideranças e cultura mais saudáveis.", icone: Sprout, fundo: "bg-mist" },
];

/** Enquadramento da imagem: os personagens ficam no lado esquerdo dela. */
const enquadramento = {
  "--pos-m": "22% 78%",
  "--pos-md": "11% 60%",
  "--pos-lg": "0% 60%",
} as CSSProperties;

/** Atraso da entrada em sequência. */
const atraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Props = {
  lead: string;
  /** Botões (primário e secundário). */
  children: ReactNode;
};

export function Sh2Hero({ lead, children }: Props) {
  const img = imagens.sh2Hero;
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
      {/* imagem (ou vídeo): no topo no celular; metade direita a partir do tablet */}
      <div
        className="sh2-hero-midia relative h-[300px] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[52vw] lg:w-[58vw]"
        style={enquadramento}
      >
        {/* recuo de 6px nas bordas que se dissolvem: sem ele, o navegador deixa
            um fio de 1px da imagem visível na borda da máscara */}
        <div className="absolute inset-x-0 inset-y-1.5 md:left-1.5">
          <Image
            src={asset(img.arquivo)}
            alt={img.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 52vw, 100vw"
            className="sh2-hero-img object-cover object-[var(--pos-m)] md:object-[var(--pos-md)] lg:object-[var(--pos-lg)]"
          />
          {temVideo && <Sh2HeroVideo src={asset(VIDEO)} poster={asset(img.arquivo)} />}
        </div>
      </div>

      <div className="container-site relative z-10 grid pt-2 pb-16 md:grid-cols-12 md:pt-14 md:pb-24 lg:min-h-[44rem] lg:items-center">
        <div className="md:col-span-7 md:pr-6 lg:col-span-6 lg:pr-0">
          {/* selo de urgência da NR-1 */}
          <p
            className="sh2-hero-entra mb-6 inline-flex items-center gap-2.5 rounded-[1.25rem] bg-peach-100 px-4 py-1.5 text-sm font-semibold text-navy max-md:gap-2 max-md:px-3 max-md:text-[0.78rem]"
            style={atraso(100)}
          >
            <span aria-hidden="true" className="relative flex size-2.5 shrink-0">
              <span className="sh2-pulso absolute inset-0 rounded-full bg-caramel" />
              <span className="relative size-2.5 rounded-full bg-caramel" />
            </span>
            NR-1 em vigor · fiscalização desde maio de 2026
          </p>

          <h1 id="page-title" className="sh2-hero-entra font-display text-display font-bold text-navy" style={atraso(200)}>
            Programa SH2
            {/* ~45% da linha de cima; mínimo de 20px em negrito para o caramelo manter o contraste */}
            <span className="mt-2 block text-[length:max(1.25rem,calc(var(--text-display)*0.45))] leading-tight text-caramel">
              Ser Humano em Harmonia
            </span>
          </h1>

          <p className="sh2-hero-entra mt-6 max-w-xl text-lead text-ink-muted" style={atraso(320)}>
            {lead}
          </p>

          {/* no celular, botões em largura total */}
          <div
            className="sh2-hero-entra mt-9 flex flex-col gap-3 md:flex-row md:flex-wrap max-md:[&>*]:w-full"
            style={atraso(440)}
          >
            {children}
          </div>

          {/* três pilares */}
          <ul
            className="sh2-hero-entra mt-12 grid gap-5 border-t border-[#e2dccf] pt-8 lg:grid-cols-3 lg:gap-6"
            style={atraso(560)}
          >
            {pilares.map(({ titulo, texto, icone: Icone, fundo }) => (
              <li key={titulo} className="flex items-start gap-4 lg:flex-col lg:gap-3">
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${fundo}`}>
                  <Icone aria-hidden="true" className="size-[22px] text-navy" strokeWidth={1.75} />
                </span>
                <span>
                  <strong className="block font-semibold text-navy">{titulo}</strong>
                  <span className="mt-1 block text-sm leading-snug text-ink-muted">{texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
