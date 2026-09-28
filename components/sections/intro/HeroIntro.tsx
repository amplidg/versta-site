"use client";

import { asset } from "@/lib/paths";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { CLOUD_ASPECT, drawCloud } from "./clouds";

/**
 * Intro da Home: logo à frente de nuvens brancas em aquarela que flutuam
 * devagar. Ao rolar (desktop ou mobile), as nuvens se abrem para as
 * laterais, o logo desliza até o topo do hero e entram headline,
 * subheadline e botões.
 *
 * - Controlado pelo scroll (vai e volta), sem bibliotecas.
 * - O JS só calcula o progresso e grava variáveis CSS (--c, --l, --t…);
 *   os movimentos são transform/opacity, processados pela GPU.
 * - Sem JavaScript ou com "reduzir movimento": o hero aparece direto.
 */

/**
 * Nuvens em imagem (opcional). Para usar nuvens em aquarela reais, salve
 * PNG/WebP com fundo transparente em /public/images/nuvens/ e liste aqui,
 * na mesma ordem de CLOUDS. Com a lista vazia, as nuvens são geradas
 * por código (clouds.ts).
 */
const CLOUD_IMAGES: string[] = [];

type Cloud = {
  side: -1 | 1; // para onde a nuvem sai: esquerda (-1) ou direita (1)
  x: number; // posição horizontal (% da tela)
  y: number; // posição vertical (% da tela)
  w: number; // largura (vw), multiplicada no mobile
  depth: number; // 0 = fundo (lenta), 1 = frente (rápida)
  seed: number; // semente do desenho procedural
  drift: number; // duração da flutuação em repouso (s)
};

const CLOUDS: Cloud[] = [
  // fundo
  { side: -1, x: -12, y: 4, w: 60, depth: 0.15, seed: 11, drift: 27 },
  { side: 1, x: 50, y: 0, w: 62, depth: 0.2, seed: 23, drift: 31 },
  // meio
  { side: -1, x: -22, y: 32, w: 74, depth: 0.45, seed: 37, drift: 23 },
  { side: 1, x: 44, y: 28, w: 76, depth: 0.5, seed: 41, drift: 25 },
  // centro (logo à frente delas)
  { side: -1, x: 6, y: 20, w: 58, depth: 0.7, seed: 53, drift: 21 },
  { side: 1, x: 34, y: 38, w: 60, depth: 0.75, seed: 67, drift: 22 },
  // frente
  { side: -1, x: -28, y: 60, w: 88, depth: 1, seed: 79, drift: 19 },
  { side: 1, x: 36, y: 63, w: 90, depth: 0.95, seed: 83, drift: 20 },
];

/* Fases do scroll (0 → 1 ao longo da intro) */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Props = {
  /** Ilustração de fundo do hero (revelada quando as nuvens abrem). */
  background: ReactNode;
  /** Logo exibido à frente das nuvens e que permanece no hero. */
  logo: ReactNode;
  /** Headline, subheadline e botões (entram em sequência). */
  children: ReactNode;
  labelledBy: string;
};

export function HeroIntro({ background, logo, children, labelledBy }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const ghost = ghostRef.current;
    const content = contentRef.current;
    if (!section || !wrap || !ghost || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let cancelled = false;

    /* Pinta as nuvens. Preferência: Web Worker (fora da thread principal).
       Sem suporte a OffscreenCanvas: uma por vez, nos intervalos ociosos. */
    const canvases = Array.from(section.querySelectorAll<HTMLCanvasElement>("canvas[data-seed]"));
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const sizeOf = (cv: HTMLCanvasElement) => {
      const w = Math.min(Math.round(cv.clientWidth * dpr), 1200);
      return { w, h: Math.round(w / CLOUD_ASPECT) };
    };
    let worker: Worker | null = null;

    const canUseWorker =
      typeof Worker !== "undefined" &&
      typeof OffscreenCanvas !== "undefined" &&
      "transferToImageBitmap" in OffscreenCanvas.prototype;

    if (canUseWorker) {
      worker = new Worker(new URL("./clouds.worker.ts", import.meta.url));
      worker.onmessage = (e: MessageEvent<{ id: number; bitmap: ImageBitmap }>) => {
        const { id, bitmap } = e.data;
        const cv = canvases[id];
        if (!cancelled && cv) {
          cv.width = bitmap.width;
          cv.height = bitmap.height;
          cv.getContext("2d")?.drawImage(bitmap, 0, 0);
          cv.dataset.ready = "";
        }
        bitmap.close();
      };
      canvases.forEach((cv, id) => {
        const { w, h } = sizeOf(cv);
        worker!.postMessage({ id, w, h, seed: Number(cv.dataset.seed) });
      });
    } else {
      let next = 0;
      // Safari antigo não tem requestIdleCallback: usa setTimeout
      const idle = (fn: () => void) =>
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(fn, { timeout: 250 })
          : globalThis.setTimeout(fn, 16);
      const drawNext = () => {
        if (cancelled || next >= canvases.length) return;
        const cv = canvases[next++];
        const { w, h } = sizeOf(cv);
        cv.width = w;
        cv.height = h;
        drawCloud(cv, Number(cv.dataset.seed));
        cv.dataset.ready = "";
        idle(drawNext);
      };
      requestAnimationFrame(drawNext);
    }

    /* Medidas */
    let total = 1;
    const measure = () => {
      const g = ghost.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      const dy = g.top + g.height / 2 - (w.top + w.height / 2);
      section.style.setProperty("--dy", `${dy.toFixed(1)}px`);
      total = Math.max(1, section.offsetHeight - window.innerHeight);
    };

    /* Progresso com suavização (persegue o alvo a cada quadro) */
    let target = 0;
    let current = 0;
    let raf = 0;
    const read = () => {
      target = clamp01(-section.getBoundingClientRect().top / total);
    };
    const apply = (p: number) => {
      const s = section.style;
      s.setProperty("--c", ease(seg(p, 0.02, 0.72)).toFixed(4)); // nuvens abrindo
      s.setProperty("--cf", seg(p, 0.55, 0.9).toFixed(4)); // nuvens esmaecendo
      s.setProperty("--sky", seg(p, 0.2, 0.78).toFixed(4)); // céu revelando a paisagem
      s.setProperty("--l", ease(seg(p, 0.12, 0.66)).toFixed(4)); // logo indo para o hero
      s.setProperty("--t", seg(p, 0.5, 0.95).toFixed(4)); // textos entrando
      s.setProperty("--h", seg(p, 0, 0.06).toFixed(4)); // dica de rolagem sumindo
      root.toggleAttribute("data-intro-done", p > 0.78);
    };
    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply(current);
      raf = current !== target ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    read();
    current = target;
    apply(current);
    section.dataset.introReady = "";

    /* Teclado: ao focar um botão ainda oculto, conclui a intro */
    const onFocusIn = (e: FocusEvent) => {
      if (current < 0.95 && content.contains(e.target as Node)) {
        window.scrollTo({ top: section.offsetTop + total, behavior: "instant" });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    section.addEventListener("focusin", onFocusIn);
    return () => {
      cancelled = true;
      worker?.terminate();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.removeEventListener("focusin", onFocusIn);
      root.removeAttribute("data-intro-done");
    };
  }, []);

  return (
    <section ref={sectionRef} data-home-intro aria-labelledby={labelledBy} className="hero-intro relative -mt-[var(--header-h)]">
      <div className="hero-intro-stage isolate overflow-hidden">
        {background}
        {/* véu claro para leitura sobre a ilustração */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgb(241_244_238/0.85),rgb(241_244_238/0.35)_70%,transparent)]"
        />

        {/* céu + nuvens (só no modo intro) */}
        <div aria-hidden="true" className="intro-sky paper-grain absolute inset-0" />
        <div aria-hidden="true" className="intro-clouds absolute inset-0">
          {CLOUDS.map((c, i) => (
            <div
              key={c.seed}
              className="intro-cloud"
              style={
                {
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  "--w": c.w,
                  "--side": c.side,
                  "--depth": c.depth,
                  zIndex: Math.round(c.depth * 10),
                } as CSSProperties
              }
            >
              {CLOUD_IMAGES[i] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(CLOUD_IMAGES[i])}
                  alt=""
                  className="intro-cloud-art"
                  data-ready=""
                  style={{ animationDuration: `${c.drift}s`, animationDelay: `-${c.seed % c.drift}s` }}
                />
              ) : (
                <canvas
                  data-seed={c.seed}
                  className="intro-cloud-art"
                  style={{ animationDuration: `${c.drift}s`, animationDelay: `-${c.seed % c.drift}s` }}
                />
              )}
            </div>
          ))}
        </div>

        {/* conteúdo: logo à frente das nuvens + textos */}
        <div ref={wrapRef} className="hero-intro-wrap container-site relative z-20 flex h-full flex-col items-center justify-center pt-[var(--header-h)] text-center">
          <div className="intro-logo">{logo}</div>
          <div ref={ghostRef} aria-hidden="true" className="intro-logo-ghost">
            {logo}
          </div>
          <div ref={contentRef} className="intro-content flex flex-col items-center">
            {children}
          </div>
        </div>

        {/* dica de rolagem */}
        <div aria-hidden="true" className="intro-hint absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3">
          <span className="eyebrow text-navy/80">Role para descobrir</span>
          <span className="intro-hint-line" />
        </div>
      </div>
    </section>
  );
}
