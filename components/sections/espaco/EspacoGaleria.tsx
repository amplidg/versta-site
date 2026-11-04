"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { FotoHouseImg, fotoHouse } from "@/components/sections/espaco/FotoHouseImg";
import { galeriaEspaco } from "@/data/espaco";

/*
 * "Conheça os ambientes" (página do Espaço, especificação do Lucas, 04/11).
 * Computador/tablet: mosaico com as 7 fotos — o espaço de eventos grande, a
 * área externa numa célula larga e as outras em volta (posições em
 * `mosaico`). Hover/foco: zoom leve e o nome do ambiente sobre um gradiente.
 * Celular: carrossel com rolagem lateral (scroll-snap) e indicadores.
 * Clique/toque: abre o visualizador (dialog nativo: prende o foco, fecha com
 * Esc ou clicando fora; setas do teclado trocam a foto).
 * A ordem das fotos fica em data/espaco.ts (galeriaEspaco).
 */

/** Lugar de cada foto no mosaico de 4 colunas × 3 linhas. */
const mosaico: Record<string, string> = {
  "empresa-01-espaco-de-eventos": "md:col-span-2 md:row-span-2",
  "colaboradores-area-externa": "md:col-span-2",
  "empresa-sala-de-reunioes": "md:row-span-2",
};

export function EspacoGaleria() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const carrossel = useRef<HTMLUListElement>(null);
  const gatilho = useRef<HTMLElement | null>(null);
  const [aberta, setAberta] = useState<number | null>(null);
  const [noCarrossel, setNoCarrossel] = useState(0);
  const total = galeriaEspaco.length;

  const abrir = (i: number, el: HTMLElement) => {
    gatilho.current = el;
    setAberta(i);
  };
  const fechar = () => dialogo.current?.close();
  const passar = (d: number) => setAberta((a) => (a === null ? a : (a + d + total) % total));

  // abre o dialog quando há uma foto escolhida
  useEffect(() => {
    const d = dialogo.current;
    if (aberta !== null && d && !d.open) d.showModal();
  }, [aberta]);

  const posicaoCarrossel = () => {
    const c = carrossel.current;
    if (!c) return;
    const item = c.firstElementChild as HTMLElement | null;
    const passo = item ? item.offsetWidth + 12 : c.clientWidth;
    setNoCarrossel(Math.min(total - 1, Math.round(c.scrollLeft / passo)));
  };

  const irPara = (i: number) => {
    const c = carrossel.current;
    const item = c?.children[i] as HTMLElement | undefined;
    if (!c || !item) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    c.scrollTo({ left: item.offsetLeft - c.offsetLeft, behavior: reduzido ? "auto" : "smooth" });
  };

  const atual = aberta === null ? null : fotoHouse(galeriaEspaco[aberta]);

  return (
    <>
      {/* MOSAICO (computador/tablet) e CARROSSEL (celular) */}
      <ul
        ref={carrossel}
        onScroll={posicaoCarrossel}
        aria-label="Fotos dos ambientes da House"
        className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:snap-none md:auto-rows-[11rem] md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 lg:auto-rows-[14rem] [&::-webkit-scrollbar]:hidden"
      >
        {galeriaEspaco.map((arquivo, i) => {
          const foto = fotoHouse(arquivo);
          return (
            <li
              key={arquivo}
              className={`w-[85%] shrink-0 snap-center md:w-auto ${mosaico[arquivo] ?? ""}`}
            >
              <button
                type="button"
                onClick={(e) => abrir(i, e.currentTarget)}
                aria-label={`Ampliar foto: ${foto.legenda}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-mist/40 outline-none focus-visible:ring-4 focus-visible:ring-navy/60 md:aspect-auto md:size-full"
              >
                <FotoHouseImg
                  arquivo={arquivo}
                  alt=""
                  sizes={
                    mosaico[arquivo]?.includes("col-span-2")
                      ? "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 85vw"
                      : "(min-width: 1280px) 300px, (min-width: 768px) 25vw, 85vw"
                  }
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy/75 via-navy/30 to-transparent px-4 pt-12 pb-3.5 text-left text-sm font-semibold text-offwhite transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 motion-reduce:transition-none"
                >
                  {foto.legenda}
                  <Expand className="size-4 shrink-0" strokeWidth={1.75} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* indicadores do carrossel (só no celular) */}
      <div className="mt-4 flex justify-center gap-1 md:hidden">
        {galeriaEspaco.map((arquivo, i) => (
          <button
            key={arquivo}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para a foto ${i + 1} de ${total}`}
            aria-current={i === noCarrossel ? "true" : undefined}
            className="flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === noCarrossel ? "w-5 bg-navy" : "w-2 bg-navy/25"
              }`}
            />
          </button>
        ))}
      </div>

      {/* VISUALIZADOR */}
      <dialog
        ref={dialogo}
        aria-label="Fotos dos ambientes da House"
        onClose={() => {
          setAberta(null);
          gatilho.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) fechar();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") passar(1);
          if (e.key === "ArrowLeft") passar(-1);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy/85 backdrop:backdrop-blur-sm"
      >
        {atual && aberta !== null && (
          <div className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-4 px-4 py-6 sm:px-20">
            <figure className="flex max-h-full min-h-0 flex-col items-center">
              <FotoHouseImg
                key={atual.arquivo}
                arquivo={atual.arquivo}
                sizes="90vw"
                carregarJa
                className="espaco-lightbox-foto max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-[12px] object-contain shadow-2xl"
              />
              <figcaption className="mt-3 text-center text-offwhite" aria-live="polite">
                <span className="font-semibold">{atual.legenda}</span>
                <span className="ml-2 text-sm text-offwhite/70">
                  {aberta + 1} de {total}
                </span>
              </figcaption>
            </figure>
            <div className="flex gap-3 sm:contents">
              <BotaoVisualizador rotulo="Foto anterior" onClick={() => passar(-1)} lado="esquerda">
                <ChevronLeft className="size-6" strokeWidth={1.75} />
              </BotaoVisualizador>
              <BotaoVisualizador rotulo="Próxima foto" onClick={() => passar(1)} lado="direita">
                <ChevronRight className="size-6" strokeWidth={1.75} />
              </BotaoVisualizador>
            </div>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-offwhite/15 text-offwhite transition-colors hover:bg-offwhite/30 focus-visible:ring-2 focus-visible:ring-offwhite outline-none"
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}

function BotaoVisualizador({
  rotulo,
  onClick,
  lado,
  children,
}: {
  rotulo: string;
  onClick: () => void;
  lado: "esquerda" | "direita";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={rotulo}
      className={`flex size-11 items-center justify-center rounded-full bg-offwhite/15 text-offwhite transition-colors outline-none hover:bg-offwhite/30 focus-visible:ring-2 focus-visible:ring-offwhite sm:absolute sm:top-1/2 sm:-translate-y-1/2 ${
        lado === "esquerda" ? "sm:left-4" : "sm:right-4"
      }`}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
