"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play, X } from "lucide-react";
import { asset } from "@/lib/paths";

/*
 * Hero da Home com vídeo (pedido do Lucas, 11/11), no lugar da intro com
 * nuvens (que segue guardada em components/sections/intro/HeroIntro.tsx;
 * interruptor HERO_COM_VIDEO em app/page.tsx).
 *
 * - Fundo: os 18 primeiros segundos do "Versta Manifesto" (eram 12 até 11/11), sem som, em loop,
 *   escurecidos por um véu azul-marinho (de 12 a 18 s aparecem as legendas
 *   gravadas do vídeo; o Lucas preferiu o trecho maior). Versão leve no celular. Enquanto carrega, ou com
 *   "reduzir movimento", fica a imagem de capa parada.
 * - "Assistir ao manifesto": o logo, a headline e os botões somem e o vídeo
 *   completo (com som e controles) toca do início. Fechar (X ou Esc) ou o
 *   fim do vídeo voltam ao fundo mudo. O vídeo completo só é baixado nesse
 *   clique.
 * Arquivos em public/videos/ (originais na pasta do projeto).
 */

const FUNDO_GRANDE = "/videos/hero-fundo-18s-1600.mp4";
const FUNDO_LEVE = "/videos/hero-fundo-18s-854.mp4";
const COMPLETO = "/videos/versta-manifesto-1080.mp4";
const CAPA = "/images/hero-video-capa.webp";

type Props = {
  labelledBy: string;
  logo: ReactNode;
  /** Headline e botões. */
  children: ReactNode;
};

export function HeroVideo({ labelledBy, logo, children }: Props) {
  const fundoRef = useRef<HTMLVideoElement>(null);
  const completoRef = useRef<HTMLVideoElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const assistirRef = useRef<HTMLButtonElement>(null);
  const [assistindo, setAssistindo] = useState(false);

  // fundo: escolhe a versão pelo tamanho da tela e só toca sem "reduzir movimento"
  useEffect(() => {
    const v = fundoRef.current;
    if (!v) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    v.src = asset(window.matchMedia("(min-width: 768px)").matches ? FUNDO_GRANDE : FUNDO_LEVE);
    const aplicar = () => {
      if (reduzir.matches) v.pause();
      else v.play().catch(() => {});
    };
    aplicar();
    reduzir.addEventListener("change", aplicar);
    return () => reduzir.removeEventListener("change", aplicar);
  }, []);

  const abrir = () => {
    setAssistindo(true);
    fundoRef.current?.pause();
    const v = completoRef.current;
    if (v) {
      // o vídeo completo só é baixado agora
      if (!v.src) v.src = asset(COMPLETO);
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {});
    }
    requestAnimationFrame(() => fecharRef.current?.focus());
  };

  const fechar = () => {
    const v = completoRef.current;
    v?.pause();
    setAssistindo(false);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fundoRef.current?.play().catch(() => {});
    }
    requestAnimationFrame(() => assistirRef.current?.focus());
  };

  useEffect(() => {
    if (!assistindo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section
      aria-labelledby={labelledBy}
      data-assistindo={assistindo || undefined}
      className="hero-video relative isolate flex min-h-[max(36rem,calc(100svh-var(--header-h)))] items-center overflow-hidden bg-navy"
    >
      {/* vídeo de fundo, mudo e decorativo */}
      <video
        ref={fundoRef}
        aria-hidden="true"
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="auto"
        poster={asset(CAPA)}
        className="hero-video-fundo absolute inset-0 -z-20 size-full object-cover"
      />
      {/* véu escuro para leitura */}
      <div
        aria-hidden="true"
        className="hero-video-veu absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_41_77/0.55),rgb(0_41_77/0.35)_45%,rgb(0_41_77/0.6))]"
      />

      {/* conteúdo */}
      <div
        inert={assistindo}
        className="hero-video-conteudo container-site flex flex-col items-center py-20 text-center"
      >
        <div className="sh2-hero-entra">{logo}</div>
        <div className="sh2-hero-entra flex flex-col items-center" style={{ "--d": "150ms" } as React.CSSProperties}>
          {children}
        </div>
        <button
          ref={assistirRef}
          type="button"
          onClick={abrir}
          className="sh2-hero-entra group mt-9 inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-[0.9375rem] font-semibold text-offwhite transition-colors hover:bg-offwhite/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-offwhite/60 bg-offwhite/10 transition-colors group-hover:bg-offwhite group-hover:text-navy">
            <Play aria-hidden="true" className="size-4 translate-x-px fill-current" strokeWidth={1.75} />
          </span>
          Assistir ao manifesto <span className="font-normal text-offwhite/75">(com som)</span>
        </button>
      </div>

      {/* vídeo completo, com som */}
      <div
        aria-hidden={!assistindo}
        inert={!assistindo}
        className="hero-video-player absolute inset-0 z-10 bg-navy"
      >
        <video
          ref={completoRef}
          poster={asset(CAPA)}
          controls
          playsInline
          preload="none"
          onEnded={fechar}
          aria-label="Vídeo manifesto da Versta"
          className="size-full object-contain"
        />
        <button
          ref={fecharRef}
          type="button"
          onClick={fechar}
          className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-navy/70 text-offwhite backdrop-blur transition-colors hover:bg-offwhite hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite"
        >
          <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
          <span className="sr-only">Fechar o vídeo e voltar</span>
        </button>
      </div>
    </section>
  );
}
