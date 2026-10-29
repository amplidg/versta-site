import Link from "next/link";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { frentes } from "@/data/frentes";

/*
 * Emblema da frente (topo das páginas das frentes; especificação do Lucas,
 * 29/10). Feito só em código, sem imagem:
 * 1. mancha de aquarela na cor da frente;
 * 2. o ícone da frente, grande, no centro;
 * 3. órbita com 10 pontos, um por frente, na ordem da página Soluções; o da
 *    frente atual é maior e caramelo. Cada ponto leva à página da frente.
 *
 * Animações em globals.css (classes emblema-*): entrada em sequência, ícone
 * flutuando e órbita girando devagar (pausa com o mouse/foco). Com movimento
 * reduzido, tudo fica parado e visível; no celular, a órbita não gira.
 */

type Props = {
  /** Ícone da frente (o mesmo do card em data/frentes.ts). */
  icon: LucideIcon;
  /** Cores da mancha: [tom mais forte, tom mais claro]. */
  color: [string, string];
  /** Slug da frente atual, ex.: "semear". */
  slug: string;
  /** Frentes que já têm página (as outras aparecem sem link). Padrão: todas. */
  comPagina?: string[];
  className?: string;
};

// em % do quadrado do emblema
const RAIO_ORBITA = 43;

export function FrenteEmblema({
  icon: Icone,
  color: [forte, clara],
  slug,
  comPagina = frentes.map((f) => f.slug),
  className = "",
}: Props) {
  const id = `emblema-${slug}`;
  const total = frentes.length;

  return (
    <div className={`emblema @container relative aspect-square ${className}`}>
      {/* 1. mancha de aquarela */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="emblema-mancha absolute inset-[-6%] size-[112%] overflow-visible"
      >
        <defs>
          <radialGradient id={`${id}-g`} cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor={clara} stopOpacity="0.95" />
            <stop offset="55%" stopColor={clara} stopOpacity="0.8" />
            <stop offset="85%" stopColor={forte} stopOpacity="0.45" />
            <stop offset="100%" stopColor={forte} stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-f`} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="5" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="22" xChannelSelector="R" yChannelSelector="G" result="borda" />
            <feGaussianBlur in="borda" stdDeviation="2.2" />
          </filter>
        </defs>
        <g filter={`url(#${id}-f)`}>
          <circle cx="100" cy="100" r="86" fill={`url(#${id}-g)`} />
          <ellipse cx="78" cy="118" rx="48" ry="40" fill={forte} opacity="0.22" />
          <ellipse cx="128" cy="76" rx="38" ry="32" fill={clara} opacity="0.7" />
          <ellipse cx="136" cy="134" rx="26" ry="20" fill={forte} opacity="0.18" />
        </g>
      </svg>

      {/* 3a. anel tracejado da órbita */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="emblema-anel absolute inset-0 size-full overflow-visible">
        <circle
          cx="50"
          cy="50"
          r={RAIO_ORBITA}
          fill="none"
          stroke="var(--color-sage)"
          strokeOpacity="0.85"
          strokeWidth="0.35"
          strokeDasharray="0.6 1.6"
          strokeLinecap="round"
        />
      </svg>

      {/* 2. ícone, flutuando; o traço se desenha na entrada */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="emblema-flutua">
          <Icone aria-hidden="true" className="emblema-icone size-[38cqw] text-navy" strokeWidth={1.25} />
        </div>
      </div>

      {/* 3b. os 10 pontos, girando juntos (cada um gira ao contrário para o
          rótulo ficar em pé) */}
      <nav aria-label="Outras frentes de soluções" className="emblema-gira absolute inset-0">
        <ul>
          {frentes.map((f, i) => {
            const ang = (-90 + (360 / total) * i) * (Math.PI / 180);
            const atual = f.slug === slug;
            const ponto = (
              <span
                aria-hidden="true"
                className={`block rounded-full transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125 ${
                  atual ? "size-3.5 bg-caramel ring-4 ring-caramel/20" : "size-2.5 bg-navy/45"
                }`}
              />
            );
            const rotulo = (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded-button bg-navy px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {f.nome}
              </span>
            );
            const alvo = "group relative flex size-7 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-navy";
            return (
              <li
                key={f.slug}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${50 + Math.cos(ang) * RAIO_ORBITA}%`,
                  top: `${50 + Math.sin(ang) * RAIO_ORBITA}%`,
                }}
              >
                <div className="emblema-contra">
                  <div className="emblema-ponto" style={{ "--i": i } as CSSProperties}>
                    {comPagina.includes(f.slug) && !atual ? (
                      <Link href={`/consultoria/${f.slug}`} aria-label={f.nome} className={alvo}>
                        {ponto}
                        {rotulo}
                      </Link>
                    ) : (
                      <span
                        role="img"
                        className={alvo}
                        aria-label={atual ? `${f.nome} (esta página)` : f.nome}
                      >
                        {ponto}
                        {rotulo}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
