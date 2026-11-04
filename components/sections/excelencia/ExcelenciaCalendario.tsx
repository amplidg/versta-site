"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Hourglass, RefreshCcw, Search, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

/*
 * "Quantos dias por mês sua empresa trabalha só para corrigir?" (página da
 * Excelência, especificação do Lucas, 04/11 — 3ª versão do bloco, no lugar da
 * calculadora e dos dominós). Quatro perguntas de frequência (grupos de rádio
 * de verdade) e um calendário de 22 dias úteis em que os dias perdidos são
 * pintados com uma mancha caramelo. Nada é salvo nem enviado.
 * Cálculo (regra do Lucas, 04/11): cada resposta soma direto um número de dias
 * perdidos no mês (DIAS_POR_RESPOSTA, vezes o peso da pergunta), até o limite
 * de 22 dias úteis; uma linha do calendário é uma semana. Animação de "tinta se
 * espalhando" em globals.css (excelencia-dia-*); com movimento reduzido, tudo
 * muda direto.
 */

/** Dias de trabalho perdidos por mês conforme a resposta (fácil de editar). */
const DIAS_POR_RESPOSTA = { nunca: 0, asVezes: 1, comFrequencia: 3, todoDia: 5 };
const DIAS_UTEIS_NO_MES = 22;

const frequencias: { rotulo: string; chave: keyof typeof DIAS_POR_RESPOSTA }[] = [
  { rotulo: "Nunca", chave: "nunca" },
  { rotulo: "Às vezes", chave: "asVezes" },
  { rotulo: "Com frequência", chave: "comFrequencia" },
  { rotulo: "Todo dia", chave: "todoDia" },
];

/** O peso multiplica os dias de cada pergunta (hoje todos iguais a 1). */
const perguntas: { texto: string; peso: number; icone: LucideIcon }[] = [
  { texto: "Um trabalho precisa ser refeito.", peso: 1, icone: RefreshCcw },
  { texto: "Alguém fica parado esperando uma informação ou aprovação.", peso: 1, icone: Hourglass },
  { texto: "Alguém perde tempo procurando um arquivo, material ou informação.", peso: 1, icone: Search },
  { texto: "Um erro chega ao cliente e precisa ser corrigido.", peso: 1, icone: TriangleAlert },
];

const SEMANA = ["S", "T", "Q", "Q", "S"];
const SEMANA_NOMES = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

/** Número que desliza até o novo valor (~0,5 s); direto com movimento reduzido. */
function useNumeroAnimado(alvo: number) {
  const [valor, setValor] = useState(alvo);
  const atual = useRef(alvo);
  useEffect(() => {
    const duracao = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500;
    const de = atual.current;
    const inicio = performance.now();
    let quadro = 0;
    const passo = (agora: number) => {
      const k = duracao ? Math.min(1, (agora - inicio) / duracao) : 1;
      atual.current = de + (alvo - de) * (1 - (1 - k) ** 3);
      setValor(atual.current);
      if (k < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [alvo]);
  return valor;
}

export function ExcelenciaCalendario({ prediagUrl }: { prediagUrl: string }) {
  const [respostas, setRespostas] = useState<(number | null)[]>(() => perguntas.map(() => null));
  const [verConta, setVerConta] = useState(false);

  const respondidas = respostas.filter((r) => r !== null).length;
  const soma = perguntas.reduce((total, p, i) => {
    const r = respostas[i];
    return total + (r === null ? 0 : DIAS_POR_RESPOSTA[frequencias[r].chave] * p.peso);
  }, 0);
  const dias = Math.min(DIAS_UTEIS_NO_MES, Math.round(soma));
  const pintados = dias;

  // os dias recém-pintados entram um após o outro, a partir de quantos já
  // estavam pintados antes (guardado no estado, como manda o React)
  const [ultimo, setUltimo] = useState(pintados);
  const [jaPintados, setJaPintados] = useState(0);
  if (pintados !== ultimo) {
    setJaPintados(ultimo);
    setUltimo(pintados);
  }

  const diasAnim = useNumeroAnimado(dias);

  return (
    <div className="relative mt-12 md:mt-16">
      {/* mancha de aquarela pêssego atrás do card */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+3rem)] opacity-70"
      >
        <defs>
          <filter id="excelencia-mancha" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="21" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="5" xChannelSelector="R" yChannelSelector="G" result="borda" />
            <feGaussianBlur in="borda" stdDeviation="1.5" />
          </filter>
          {/* borda irregular das manchas dos dias */}
          <filter id="excelencia-tinta" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter="url(#excelencia-mancha)">
          <ellipse cx="72" cy="40" rx="34" ry="44" fill="var(--color-peach-100)" />
          <ellipse cx="20" cy="70" rx="22" ry="26" fill="var(--color-peach-200)" opacity="0.5" />
        </g>
      </svg>

      <div className="grid overflow-hidden rounded-[20px] border border-navy/10 bg-white/85 shadow-[0_24px_50px_-30px_rgb(0_41_77/0.45)] lg:grid-cols-12">
        {/* PERGUNTAS */}
        <div className="space-y-7 p-6 sm:p-10 lg:col-span-7 lg:self-center">
          {perguntas.map(({ texto, icone: Icone }, i) => (
            <fieldset key={texto}>
              <legend className="flex items-start gap-3 text-[0.9375rem] leading-snug font-semibold text-navy">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-peach-100">
                  <Icone aria-hidden="true" className="size-4 text-caramel-700" strokeWidth={1.75} />
                </span>
                <span className="pt-1.5">{texto}</span>
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {frequencias.map((f, k) => (
                  <label
                    key={f.rotulo}
                    className="relative flex cursor-pointer items-center justify-center rounded-button border border-navy/20 bg-white px-2 py-2.5 text-center text-sm font-semibold text-navy transition-colors duration-200 hover:border-navy/50 has-checked:border-navy has-checked:bg-navy has-checked:text-offwhite has-focus-visible:ring-2 has-focus-visible:ring-navy has-focus-visible:ring-offset-2"
                  >
                    <input
                      type="radio"
                      name={`excelencia-p${i}`}
                      value={k}
                      checked={respostas[i] === k}
                      onChange={() => setRespostas((r) => r.map((v, j) => (j === i ? k : v)))}
                      className="sr-only"
                    />
                    {f.rotulo}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {/* CALENDÁRIO E RESULTADO */}
        <div className="flex flex-col bg-mint/50 p-6 sm:p-10 lg:col-span-5">
          <div
            role="img"
            aria-label={`Calendário de ${DIAS_UTEIS_NO_MES} dias úteis, com ${pintados} ${pintados === 1 ? "dia marcado" : "dias marcados"} como perdidos.`}
            className="relative mx-auto w-full max-w-sm rounded-card border border-navy/15 bg-[#f7f3ea] p-4"
          >
            <div className="grid grid-cols-5 gap-2">
              {SEMANA.map((d, k) => (
                <span key={SEMANA_NOMES[k]} aria-hidden="true" className="text-center text-xs font-semibold text-ink-muted">
                  {d}
                </span>
              ))}
              {Array.from({ length: DIAS_UTEIS_NO_MES }, (_, i) => {
                const pintado = i < pintados;
                const atraso = pintado ? Math.max(0, i - jaPintados) * 70 : 0;
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="relative flex aspect-square items-start justify-end rounded-[6px] border border-navy/10 bg-[#fbf8f1] p-1 text-[0.625rem] text-ink-muted"
                  >
                    <svg
                      viewBox="0 0 40 40"
                      className={`excelencia-dia absolute inset-0.5 size-[calc(100%-4px)] ${pintado ? "excelencia-dia-pintado" : ""}`}
                      style={{ transitionDelay: `${atraso}ms` } as CSSProperties}
                    >
                      <path
                        d="M8 12 C 12 4, 28 3, 33 10 C 38 17, 36 30, 27 34 C 18 38, 6 33, 5 24 C 4 18, 5 15, 8 12 Z"
                        fill="var(--color-caramel)"
                        filter="url(#excelencia-tinta)"
                      />
                    </svg>
                    <span className="relative">{i + 1}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div aria-live="polite" className="mt-7">
            {dias > 0 ? (
              <>
                <p>
                  <span className="font-display text-[clamp(2.75rem,2rem+2.5vw,3.75rem)] leading-none font-bold text-navy tabular-nums">
                    {Math.round(diasAnim)} {dias === 1 ? "dia" : "dias"}
                  </span>
                  <span className="mt-1 block text-ink-muted">de trabalho por mês</span>
                </p>
                <p className="mt-4 text-navy">
                  Sua empresa perde cerca de {dias} {dias === 1 ? "dia" : "dias"} de trabalho por mês com retrabalho,
                  espera e correções. São {dias * 12} dias por ano.
                </p>
              </>
            ) : respondidas === perguntas.length ? (
              <p className="text-navy">
                Ótimo sinal! Sua operação parece bem organizada. O pré-diagnóstico confirma os pontos fortes e mostra
                onde ainda dá para evoluir.
              </p>
            ) : (
              <p className="text-ink-muted">Responda às perguntas para ver o resultado.</p>
            )}
          </div>

          <p className="mt-6 text-[0.9375rem] text-ink-muted">
            Com processos padronizados e qualidade controlada, boa parte desse tempo volta para o que gera valor.
          </p>
          <div className="mt-5">
            <Button href={prediagUrl} variant="primary" arrow className="max-sm:w-full">
              Fazer o pré-diagnóstico
            </Button>
          </div>
          <div className="mt-5">
            <button
              type="button"
              aria-expanded={verConta}
              aria-controls="excelencia-conta"
              onClick={() => setVerConta((v) => !v)}
              className="text-sm font-semibold text-ink-muted underline underline-offset-4 outline-none hover:text-navy focus-visible:ring-2 focus-visible:ring-navy"
            >
              Como calculamos
            </button>
            {verConta && (
              <p id="excelencia-conta" className="mt-2 text-xs leading-relaxed text-ink-muted">
                Estimativa simples, a partir das suas respostas: cada situação que acontece “Às vezes” representa cerca
                de 1 dia de trabalho perdido por mês; “Com frequência”, cerca de 3 dias; e “Todo dia”, cerca de 5 dias,
                uma semana inteira. O total é a soma das quatro situações.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
