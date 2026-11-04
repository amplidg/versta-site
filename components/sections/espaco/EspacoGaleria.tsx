"use client";

import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import { FotoHouseImg, fontesHouse, fotoHouse } from "@/components/sections/espaco/FotoHouseImg";
import { Lightbox, type FotoLightbox } from "@/components/ui/Lightbox";
import { galeriaEspaco } from "@/data/espaco";

/*
 * "Conheça os ambientes" (página do Espaço, especificação do Lucas, 04/11).
 * Computador/tablet: mosaico com as 7 fotos — o espaço de eventos grande, a
 * área externa numa célula larga e as outras em volta (posições em
 * `mosaico`). Hover/foco: zoom leve e o nome do ambiente sobre um gradiente.
 * Celular: carrossel com rolagem lateral (scroll-snap) e indicadores.
 * Clique/toque: abre o visualizador (components/ui/Lightbox.tsx).
 * A ordem das fotos fica em data/espaco.ts (galeriaEspaco).
 */

/** Lugar de cada foto no mosaico de 4 colunas × 3 linhas. */
const fotosLightbox: FotoLightbox[] = galeriaEspaco.map((arquivo) => {
  const foto = fotoHouse(arquivo);
  return { ...fontesHouse(arquivo), alt: foto.alt, legenda: foto.legenda };
});

const mosaico: Record<string, string> = {
  "empresa-01-espaco-de-eventos": "md:col-span-2 md:row-span-2",
  "colaboradores-area-externa": "md:col-span-2",
  "empresa-sala-de-reunioes": "md:row-span-2",
};

export function EspacoGaleria() {
  const carrossel = useRef<HTMLUListElement>(null);
  const [aberta, setAberta] = useState<number | null>(null);
  const [noCarrossel, setNoCarrossel] = useState(0);
  const total = galeriaEspaco.length;


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
                onClick={() => setAberta(i)}
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
      <Lightbox fotos={fotosLightbox} aberta={aberta} onMudar={setAberta} rotulo="Fotos dos ambientes da House" />
    </>
  );
}
