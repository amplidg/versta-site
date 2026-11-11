"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { asset } from "@/lib/paths";

/*
 * Vídeo do manifesto da Versta, logo abaixo da hero da Home (pedido do Lucas,
 * 11/11): fica parado na capa, com um play grande em caramelo; ao clicar, toca
 * com som e controles normais. O arquivo (≈ 19 MB) só é baixado nesse clique,
 * para a Home continuar leve. Título e moldura ficam em app/page.tsx.
 */

const VIDEO = "/videos/versta-manifesto-1080.mp4";
const CAPA = "/images/hero-video-capa.webp";

export function ManifestoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const tocar = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.getAttribute("src")) v.src = asset(VIDEO);
    setTocando(true);
    v.play().catch(() => {});
    requestAnimationFrame(() => v.focus());
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-navy shadow-[0_24px_60px_-28px_rgb(0_41_77/0.45)]">
      <video
        ref={ref}
        poster={asset(CAPA)}
        controls={tocando}
        playsInline
        preload="none"
        aria-label="Vídeo manifesto da Versta"
        className="size-full object-cover"
      />
      {!tocando && (
        <button
          type="button"
          onClick={tocar}
          className="group absolute inset-0 flex items-center justify-center bg-navy/25 transition-colors hover:bg-navy/10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-offwhite"
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-caramel text-offwhite shadow-[0_10px_30px_-8px_rgb(0_41_77/0.6)] ring-8 ring-offwhite/25 transition-transform duration-300 group-hover:scale-105 md:size-24">
            <Play aria-hidden="true" className="size-8 translate-x-0.5 fill-current md:size-9" strokeWidth={1.5} />
          </span>
          <span className="sr-only">Assistir ao manifesto da Versta (com som)</span>
        </button>
      )}
    </div>
  );
}
