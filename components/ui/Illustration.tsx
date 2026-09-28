import { asset } from "@/lib/paths";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { imagens, type Imagem, type ImagemKey, type Tom } from "@/data/imagens";

/**
 * Paletas dos placeholders: céu (gradiente) + 3 camadas de montanha.
 * Todas as cores vêm dos tokens da marca.
 */
const paletas: Record<Tom, { ceu: string; camadas: [string, string, string] }> = {
  amanhecer: {
    ceu: "linear-gradient(180deg, var(--color-peach-100) 0%, #f7eadb 45%, var(--color-offwhite) 100%)",
    camadas: ["var(--color-peach-200)", "var(--color-mist)", "var(--color-sage)"],
  },
  floresta: {
    ceu: "linear-gradient(180deg, var(--color-offwhite) 0%, var(--color-mist) 100%)",
    camadas: ["var(--color-sage)", "var(--color-green-700)", "var(--color-green-900)"],
  },
  lago: {
    ceu: "linear-gradient(180deg, var(--color-peach-100) 0%, var(--color-offwhite) 60%, var(--color-mist) 100%)",
    camadas: ["var(--color-mist)", "var(--color-sky)", "var(--color-sage)"],
  },
  neblina: {
    ceu: "linear-gradient(180deg, var(--color-mist) 0%, var(--color-offwhite) 100%)",
    camadas: ["var(--color-sky)", "var(--color-mist)", "var(--color-sage)"],
  },
  pessego: {
    ceu: "linear-gradient(180deg, var(--color-peach-200) 0%, var(--color-peach-100) 55%, var(--color-offwhite) 100%)",
    camadas: ["var(--color-peach-200)", "var(--color-sage)", "var(--color-green-700)"],
  },
};

const montanhas = [
  "M0 250 L110 185 L220 225 L350 125 L470 200 L590 145 L720 215 L860 105 L990 185 L1100 140 L1200 195 L1200 400 L0 400Z",
  "M0 300 L150 238 L280 282 L420 205 L560 268 L700 226 L850 290 L980 218 L1120 272 L1200 248 L1200 400 L0 400Z",
  "M0 345 L100 322 L220 352 L380 300 L520 346 L680 312 L820 356 L960 318 L1100 350 L1200 328 L1200 400 L0 400Z",
];

type Props = {
  imagem: ImagemKey;
  className?: string;
  /** Carregamento prioritário (use apenas no hero). */
  priority?: boolean;
  /** Mostra a legenda do placeholder. */
  legenda?: boolean;
  sizes?: string;
};

/**
 * Ilustração em aquarela. Enquanto o arquivo não existir, exibe um
 * placeholder com gradiente da paleta, montanhas em camadas, textura de
 * papel e uma legenda dizendo qual ilustração vai ali.
 * O elemento pai precisa ter posição e tamanho definidos.
 */
export function Illustration({
  imagem,
  className = "",
  priority = false,
  legenda = true,
  sizes = "100vw",
}: Props) {
  const img: Imagem = imagens[imagem];

  if (img.pronta) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={asset(img.arquivo)}
          alt={img.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-[var(--pos-m)] md:object-[var(--pos)]"
          style={
            {
              "--pos": img.posicao ?? "center",
              "--pos-m": img.posicaoMobile ?? img.posicao ?? "center",
            } as React.CSSProperties
          }
        />
      </div>
    );
  }

  const p = paletas[img.tom];
  return (
    <div
      role="img"
      aria-label={`${img.alt} (ilustração provisória)`}
      className={`paper-grain relative overflow-hidden ${className}`}
      style={{ background: p.ceu }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[72%] w-full"
      >
        <g filter="url(#aquarela)">
          {montanhas.map((d, i) => (
            <path key={i} d={d} fill={p.camadas[i]} opacity={[0.55, 0.62, 0.7][i]} />
          ))}
        </g>
        {/* faixas de névoa entre as camadas */}
        <rect y="215" width="1200" height="70" fill="url(#nevoa)" />
        <rect y="300" width="1200" height="60" fill="url(#nevoa)" />
      </svg>

      {legenda && (
        <p className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] items-start gap-2 rounded-button bg-offwhite/85 px-3 py-2 text-xs leading-snug text-ink-muted backdrop-blur-sm">
          <ImageIcon aria-hidden="true" className="mt-px size-3.5 shrink-0" strokeWidth={1.5} />
          <span>
            <strong className="font-semibold text-navy">Ilustração:</strong> {img.descricao}
            <span className="block font-mono text-[0.6875rem] opacity-80">{img.arquivo}</span>
          </span>
        </p>
      )}
    </div>
  );
}

/** Definições SVG compartilhadas (filtro de borda aquarelada e névoa). */
export function IllustrationDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <filter id="aquarela" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="22" />
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        {/* borda aquarelada das flechas decorativas (ArrowsBackdrop) */}
        <filter id="aquarela-seta" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="3" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <linearGradient id="nevoa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1f4ee" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f1f4ee" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f1f4ee" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
