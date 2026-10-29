"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/*
 * "Sua empresa precisa da Semear se..." (página da Semear, especificação do
 * Lucas, 29/10): checkboxes de verdade, estilizados como cards. Com 2 ou mais
 * marcados, aparece a faixa azul-marinho com o convite ao pré-diagnóstico.
 * Nada é salvo nem enviado.
 */

const sinais = [
  "A licença ambiental está perto de vencer, ou você não sabe quando vence.",
  "Recebeu notificação, autuação ou exigência de um órgão ambiental.",
  "Vai abrir, ampliar ou mudar a operação da empresa.",
  "Clientes ou parceiros passaram a exigir comprovação ambiental.",
  "Não tem como comprovar a destinação correta dos resíduos.",
];

export function SemearSinais({ prediagUrl }: { prediagUrl: string }) {
  const [marcados, setMarcados] = useState<boolean[]>(() => sinais.map(() => false));
  const total = marcados.filter(Boolean).length;

  return (
    <div className="mx-auto max-w-[45rem]">
      <ul className="grid gap-3">
        {sinais.map((texto, i) => (
          <li key={texto}>
            <label className="group flex cursor-pointer items-start gap-4 rounded-card border border-navy/15 bg-white/70 px-5 py-4 text-navy transition-[border-color,background-color] duration-300 ease-[var(--ease-calm)] hover:border-navy/40 has-checked:border-caramel has-checked:bg-peach-100/70 has-focus-visible:ring-2 has-focus-visible:ring-navy has-focus-visible:ring-offset-2 motion-reduce:transition-none">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={marcados[i]}
                onChange={(e) =>
                  setMarcados((m) => m.map((v, k) => (k === i ? e.target.checked : v)))
                }
              />
              {/* caixa de seleção desenhada; o check se desenha ao marcar */}
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[5px] border-2 border-navy/40 bg-white transition-colors duration-300 peer-checked:border-caramel peer-checked:bg-caramel motion-reduce:transition-none [&>svg>path]:[stroke-dashoffset:1] peer-checked:[&>svg>path]:[stroke-dashoffset:0]"
              >
                <svg viewBox="0 0 24 24" className="size-4">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray="1"
                    className="transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:transition-none"
                  />
                </svg>
              </span>
              <span className="text-[1.0625rem] leading-snug">{texto}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* anunciado a leitores de tela quando muda */}
      <div aria-live="polite" className="mt-6 min-h-6">
        {total === 1 && <p className="text-center text-sm text-ink-muted">Marque tudo o que se aplica.</p>}
        {total >= 2 && (
          <div className="semear-alerta flex flex-col items-start gap-5 rounded-card bg-navy p-6 text-offwhite sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="text-[1.0625rem] leading-snug">
              Sua empresa tem sinais de atenção na área ambiental. Faça o pré-diagnóstico gratuito e
              descubra por onde começar.
            </p>
            <Button href={prediagUrl} variant="light" arrow className="shrink-0 max-sm:w-full">
              Fazer o pré-diagnóstico
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
