"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/*
 * Visualizador de fotos ampliadas (criado em 04/11 para a antiga galeria da
 * House; hoje usado nos Projetos Sociais). É um <dialog> nativo: prende o foco, fecha com
 * Esc, no X ou clicando fora; as setas do teclado e os botões trocam a foto.
 * Ao fechar, o foco volta para o que estava focado antes de abrir.
 * Quem usa controla qual foto está aberta (`aberta`, ou null = fechado).
 */

export type FotoLightbox = {
  src: string;
  srcSet?: string;
  alt: string;
  legenda: string;
};

export function Lightbox({
  fotos,
  aberta,
  onMudar,
  rotulo,
}: {
  fotos: FotoLightbox[];
  aberta: number | null;
  onMudar: (i: number | null) => void;
  /** Nome do visualizador para leitores de tela. */
  rotulo: string;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const gatilho = useRef<HTMLElement | null>(null);
  const total = fotos.length;

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberta !== null && !d.open) {
      gatilho.current = document.activeElement as HTMLElement | null;
      d.showModal();
    } else if (aberta === null && d.open) {
      d.close();
    }
  }, [aberta]);

  const fechar = () => dialogo.current?.close();
  const passar = (d: number) => {
    if (aberta !== null) onMudar((aberta + d + total) % total);
  };
  const atual = aberta === null ? null : fotos[aberta];

  return (
    <dialog
      ref={dialogo}
      aria-label={rotulo}
      onClose={() => {
        onMudar(null);
        gatilho.current?.focus();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === "ArrowRight") passar(1);
        if (e.key === "ArrowLeft") passar(-1);
      }}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy/85 backdrop:backdrop-blur-sm"
    >
      {atual && aberta !== null && (
        <div className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-4 px-4 py-6 sm:px-20">
          <figure className="flex max-h-full min-h-0 flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- site estático */}
            <img
              key={atual.src}
              src={atual.src}
              srcSet={atual.srcSet}
              sizes="90vw"
              alt={atual.alt}
              decoding="async"
              className="espaco-lightbox-foto max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-[12px] object-contain shadow-2xl"
            />
            <figcaption
              className="mt-3 text-center text-offwhite"
              aria-live="polite"
            >
              <span className="font-semibold">{atual.legenda}</span>
              {total > 1 && (
                <span className="ml-2 text-sm text-offwhite/70">
                  {aberta + 1} de {total}
                </span>
              )}
            </figcaption>
          </figure>
          {total > 1 && (
            <div className="flex gap-3 sm:contents">
              <BotaoVisualizador
                rotulo="Foto anterior"
                onClick={() => passar(-1)}
                lado="esquerda"
              >
                <ChevronLeft className="size-6" strokeWidth={1.75} />
              </BotaoVisualizador>
              <BotaoVisualizador
                rotulo="Próxima foto"
                onClick={() => passar(1)}
                lado="direita"
              >
                <ChevronRight className="size-6" strokeWidth={1.75} />
              </BotaoVisualizador>
            </div>
          )}
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-offwhite/15 text-offwhite transition-colors outline-none hover:bg-offwhite/30 focus-visible:ring-2 focus-visible:ring-offwhite"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </button>
        </div>
      )}
    </dialog>
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
