"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { User } from "lucide-react";
import { Texto } from "@/components/ui/Texto";
import type { Depoimento } from "@/data/depoimentos";
import { asset } from "@/lib/paths";
import { seixo } from "@/lib/seixo";

const INTERVALO = 30_000;
const PAINEL_ID = "depoimento-painel";

/**
 * Depoimento em destaque + trilha de fotos (os "marcos") que serve de
 * navegação. As fotos são abas (role="tab"); o depoimento é o painel.
 * Avança sozinho a cada 30s, pausando com o mouse em cima, com foco pelo
 * teclado e quando o visitante pede movimento reduzido. Estado só em memória.
 */
export function TestimonialCarousel({ depoimentos }: { depoimentos: Depoimento[] }) {
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const trilha = useRef<HTMLDivElement>(null);
  const toqueX = useRef<number | null>(null);
  const total = depoimentos.length;

  // Avanço automático
  useEffect(() => {
    if (pausado || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAtivo((a) => (a + 1) % total), INTERVALO);
    return () => window.clearInterval(id);
  }, [pausado, total]);

  // No celular, mantém a foto ativa à vista na trilha (sem mexer na página).
  useEffect(() => {
    const caixa = trilha.current;
    const aba = abas.current[ativo];
    if (!caixa || !aba || caixa.scrollWidth <= caixa.clientWidth) return;
    const alvo = aba.offsetLeft - (caixa.clientWidth - aba.offsetWidth) / 2;
    caixa.scrollTo({ left: alvo, behavior: "smooth" });
  }, [ativo]);

  function aoTeclar(e: KeyboardEvent, i: number) {
    let proxima: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") proxima = (i + 1) % total;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") proxima = (i - 1 + total) % total;
    else if (e.key === "Home") proxima = 0;
    else if (e.key === "End") proxima = total - 1;
    if (proxima === null) return;
    e.preventDefault();
    setAtivo(proxima);
    abas.current[proxima]?.focus();
  }

  // Deslizar o depoimento para os lados (toque)
  function aoSoltarToque(e: TouchEvent) {
    const inicio = toqueX.current;
    toqueX.current = null;
    if (inicio === null || total < 2) return;
    const dx = e.changedTouches[0].clientX - inicio;
    if (Math.abs(dx) < 45) return;
    setAtivo((a) => (dx < 0 ? (a + 1) % total : (a - 1 + total) % total));
  }

  const pausa = {
    onMouseEnter: () => setPausado(true),
    onMouseLeave: () => setPausado(false),
    onFocus: () => setPausado(true),
    onBlur: () => setPausado(false),
  };

  return (
    <div {...pausa}>
      {/* recorte em seixo das fotos (o mesmo formato do retrato da fundadora) */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id="seixo-depoimento" clipPathUnits="objectBoundingBox">
            <path d={seixo(1, 1)} />
          </clipPath>
        </defs>
      </svg>

      {/* PARTE 1 — depoimento em destaque */}
      <div
        id={PAINEL_ID}
        role="tabpanel"
        aria-labelledby={`depoimento-aba-${ativo}`}
        // com o avanço automático ligado, não interrompe o leitor de tela
        aria-live={pausado ? "polite" : "off"}
        onTouchStart={(e) => {
          toqueX.current = e.touches[0].clientX;
        }}
        onTouchEnd={aoSoltarToque}
        className="mx-auto grid max-w-[45rem] text-center"
      >
        {depoimentos.map((d, i) => {
          const visivel = i === ativo;
          return (
            // todos na mesma célula: a altura é a do maior, e a troca é um fade
            <figure
              key={i}
              aria-hidden={!visivel}
              className={`[grid-area:1/1] transition-opacity duration-700 ease-[var(--ease-calm)] motion-reduce:transition-none ${
                visivel ? "opacity-100" : "invisible opacity-0"
              }`}
            >
              <span aria-hidden="true" className="block h-14 font-display text-[5.5rem] leading-none text-caramel select-none">
                “
              </span>
              <blockquote className="mt-4 font-display text-[clamp(1.375rem,1.15rem+1vw,1.875rem)] leading-snug text-navy">
                <p>
                  <Texto>{d.texto}</Texto>
                </p>
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold text-navy">
                  <Texto>{d.nome}</Texto>
                </p>
                <p className="mt-1 text-ink-muted">
                  <Texto>{d.cargo}</Texto> · <Texto>{d.empresa}</Texto>
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* PARTE 2 — trilha de marcos: as fotos navegam entre os depoimentos */}
      <div ref={trilha} className="mt-9 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative mx-auto w-max min-w-full px-4 sm:min-w-0 sm:px-10">
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-caramel/70" />
          <div role="tablist" aria-label="Depoimentos" className="relative flex justify-center gap-5 sm:gap-10">
            {depoimentos.map((d, i) => {
              const selecionada = i === ativo;
              return (
                <button
                  key={i}
                  ref={(el) => {
                    abas.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`depoimento-aba-${i}`}
                  aria-selected={selecionada}
                  aria-controls={PAINEL_ID}
                  aria-label={`Depoimento ${i + 1} de ${total}: ${d.nome}, ${d.empresa}`}
                  tabIndex={selecionada ? 0 : -1}
                  onClick={() => setAtivo(i)}
                  onFocus={() => setAtivo(i)}
                  onKeyDown={(e) => aoTeclar(e, i)}
                  className="relative flex size-[5.75rem] shrink-0 items-center justify-center"
                >
                  {/* a foto: 64px, cresce para 80px quando ativa */}
                  <span
                    className={`relative block size-16 transition-transform duration-500 ease-[var(--ease-calm)] motion-reduce:transition-none ${
                      selecionada ? "scale-125" : ""
                    }`}
                  >
                    {/* anel fino em caramelo ao redor da foto ativa */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 100 100"
                      fill="none"
                      className={`absolute -inset-[5px] h-[calc(100%+10px)] w-[calc(100%+10px)] overflow-visible transition-opacity duration-500 motion-reduce:transition-none ${
                        selecionada ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <path d={seixo(100, 100)} stroke="var(--color-caramel)" strokeWidth="2" />
                    </svg>
                    {/* fundo opaco: esconde a linha tracejada atrás da foto */}
                    <span className="absolute inset-0 bg-offwhite" style={{ clipPath: "url(#seixo-depoimento)" }}>
                      <span
                        className={`absolute inset-0 flex items-center justify-center bg-navy/10 bg-cover bg-center transition-opacity duration-500 motion-reduce:transition-none ${
                          selecionada ? "opacity-100" : "opacity-60"
                        }`}
                        style={d.foto ? { backgroundImage: `url(${asset(d.foto)})` } : undefined}
                      >
                        {!d.foto && <User aria-hidden="true" className="size-7 text-green-700" strokeWidth={1.5} />}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
