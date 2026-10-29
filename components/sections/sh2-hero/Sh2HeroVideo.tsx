"use client";

import { useEffect, useState } from "react";

/**
 * Vídeo em loop no lugar da imagem do hero do SH2. Só entra em telas a partir
 * de 768px e sem movimento reduzido; nos outros casos fica a imagem estática
 * (que também é o poster do vídeo).
 */
export function Sh2HeroVideo({ src, poster }: { src: string; poster: string }) {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem) and (prefers-reduced-motion: no-preference)");
    const atualizar = () => setAtivo(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  if (!ativo) return null;
  return (
    <video
      aria-hidden="true"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover object-[var(--pos-md)] lg:object-[var(--pos-lg)]"
    />
  );
}
