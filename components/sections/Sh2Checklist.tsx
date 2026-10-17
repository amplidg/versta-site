"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

/* Textos fornecidos pelo Lucas — não reescrever. */
const perguntas = [
  "Mapeou os riscos psicossociais no seu Programa de Gerenciamento de Riscos (PGR)?",
  "Tem um plano de ação para lidar com esses riscos?",
  "Cuida da saúde mental das equipes de forma contínua?",
  "Consegue comprovar essas ações em uma fiscalização?",
];

type Resposta = "sim" | "nao" | null;

const opcoes: { valor: Exclude<Resposta, null>; rotulo: string; ativo: string }[] = [
  { valor: "sim", rotulo: "Sim", ativo: "border-sage bg-sage text-navy" },
  // caramelo de apoio (-700): mantém o texto branco com contraste AA
  { valor: "nao", rotulo: "Não", ativo: "border-caramel-700 bg-caramel-700 text-white" },
];

/**
 * Card de checklist da NR-1 (bloco do Programa SH2 na Home).
 * O estado fica só em memória; ao responder as quatro perguntas, a mensagem
 * final aparece no rodapé do card (anunciada por aria-live).
 */
export function Sh2Checklist() {
  const [respostas, setRespostas] = useState<Resposta[]>(perguntas.map(() => null));

  const completo = respostas.every((r) => r !== null);
  const temNao = respostas.includes("nao");

  function responder(i: number, valor: Exclude<Resposta, null>) {
    setRespostas((atual) => atual.map((r, j) => (j === i ? valor : r)));
  }

  return (
    // no computador o card estica até a altura da coluna da imagem; o espaço
    // extra é dividido entre as perguntas (cada linha cresce por igual)
    <div className="flex flex-col rounded-xl bg-offwhite p-7 text-ink shadow-[0_30px_70px_-30px_rgb(0_0_0/0.55)] md:p-9 lg:flex-1">
      <h3 className="text-h3 text-navy">Sua empresa já...</h3>
      <p className="mt-2 text-ink-muted">
        Responda e descubra em que ponto do caminho sua empresa está.
      </p>

      <ol className="mt-6 flex flex-col lg:flex-1">
        {perguntas.map((pergunta, i) => (
          <li
            key={pergunta}
            className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-navy/10 py-4 lg:flex-1"
          >
            <p id={`sh2-pergunta-${i}`} className="min-w-48 flex-1 font-semibold text-navy">
              <span className="sr-only">Sua empresa já </span>
              {pergunta}
            </p>
            <div role="group" aria-labelledby={`sh2-pergunta-${i}`} className="flex gap-2">
              {opcoes.map((o) => {
                const marcado = respostas[i] === o.valor;
                return (
                  <button
                    key={o.valor}
                    type="button"
                    aria-pressed={marcado}
                    onClick={() => responder(i, o.valor)}
                    className={`min-h-11 min-w-16 rounded-button border px-4 text-[0.9375rem] font-semibold transition-colors duration-300 ease-[var(--ease-calm)] motion-reduce:transition-none ${
                      marcado ? o.ativo : "border-navy/25 text-navy hover:border-navy/60"
                    }`}
                  >
                    {o.rotulo}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div aria-live="polite">
        {completo && (
          <div className="sh2-resultado border-t border-navy/10 pt-5">
            <p className="text-navy">
              {temNao
                ? "Sua empresa ainda tem pontos de atenção na NR-1. O Programa SH2 começa justamente por eles."
                : "Ótimo caminho. O Programa SH2 pode ajudar a manter essas ações vivas e fortalecer o ambiente de trabalho."}
            </p>
            <Link
              href="/metodologia/sh2"
              className="group mt-3 inline-flex items-center gap-2 font-semibold text-caramel-700 underline-offset-4 hover:underline"
            >
              Conheça o Programa SH2
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
