"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/Button";

/*
 * "Quanto tempo sua empresa perde corrigindo erros?" (página da Excelência,
 * especificação do Lucas, 03/11): calculadora simples. Controles à esquerda
 * (sliders de verdade, com campo numérico sincronizado) e resultado à direita,
 * que se atualiza na hora, com os números deslizando até o novo valor (sem
 * animação com movimento reduzido). Nada é salvo nem enviado.
 *
 * Contas: horas/mês = pessoas × horas por semana × 4,33 (inteiro);
 * equivalência = horas/mês ÷ 176 (uma casa); em reais = horas/mês × custo da
 * hora (e × 12 por ano), só quando a pessoa abre "Quer ver em reais?".
 */

const SEMANAS_POR_MES = 4.33;
const HORAS_POR_MES_DE_UMA_PESSOA = 176;

const reais = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Número que desliza até o novo valor (~0,5 s); direto com movimento reduzido. */
function useNumeroAnimado(alvo: number) {
  const [valor, setValor] = useState(alvo);
  const atual = useRef(alvo);
  useEffect(() => {
    // com movimento reduzido, a duração é zero: o número pula direto para o valor
    const duracao = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500;
    const de = atual.current;
    const inicio = performance.now();
    let quadro = 0;
    const passo = (agora: number) => {
      const k = duracao ? Math.min(1, (agora - inicio) / duracao) : 1;
      const suave = 1 - (1 - k) ** 3;
      atual.current = de + (alvo - de) * suave;
      setValor(atual.current);
      if (k < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [alvo]);
  return valor;
}

type Campo = { id: string; rotulo: string; min: number; max: number; passo: number; valor: number; mudar: (v: number) => void; prefixo?: string };

function Controle({ id, rotulo, min, max, passo, valor, mudar, prefixo }: Campo) {
  const limitar = (v: number) => Math.min(max, Math.max(min, Math.round(v / passo) * passo));
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={`${id}-faixa`} className="text-[0.9375rem] leading-snug font-semibold text-navy">
          {rotulo}
        </label>
        <span className="flex shrink-0 items-center gap-1 text-navy">
          {prefixo && <span className="text-sm text-ink-muted">{prefixo}</span>}
          <input
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={passo}
            value={valor}
            aria-label={rotulo}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v) && e.target.value !== "") mudar(Math.min(max, Math.max(min, v)));
            }}
            onBlur={(e) => mudar(limitar(Number(e.target.value) || min))}
            className="w-20 rounded-button border border-navy/20 bg-white px-2 py-1 text-right font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-navy"
          />
        </span>
      </div>
      <input
        id={`${id}-faixa`}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => mudar(Number(e.target.value))}
        className="excelencia-faixa mt-3 w-full"
        style={{ "--p": `${((valor - min) / (max - min)) * 100}%` } as CSSProperties}
      />
      <div aria-hidden="true" className="mt-1 flex justify-between text-xs text-ink-muted">
        <span>{prefixo ? `${prefixo} ${min}` : min.toLocaleString("pt-BR")}</span>
        <span>{prefixo ? `${prefixo} ${max}` : max.toLocaleString("pt-BR")}</span>
      </div>
    </div>
  );
}

export function ExcelenciaCalculadora({ prediagUrl }: { prediagUrl: string }) {
  const [pessoas, setPessoas] = useState(20);
  const [horas, setHoras] = useState(3);
  const [verReais, setVerReais] = useState(false);
  const [custo, setCusto] = useState(40);

  const horasMes = Math.round(pessoas * horas * SEMANAS_POR_MES);
  const equivalente = Math.round((horasMes / HORAS_POR_MES_DE_UMA_PESSOA) * 10) / 10;
  const porMes = horasMes * custo;

  const horasAnim = useNumeroAnimado(horasMes);
  const mesAnim = useNumeroAnimado(porMes);
  const anoAnim = useNumeroAnimado(porMes * 12);

  const quem =
    equivalente >= 1
      ? `${equivalente.toLocaleString("pt-BR")} ${equivalente === 1 ? "pessoa" : "pessoas"}`
      : equivalente >= 0.9
        ? "quase 1 pessoa"
        : "parte do tempo de 1 pessoa";

  return (
    <div className="relative mt-12 md:mt-16">
      {/* mancha de aquarela pêssego atrás do card */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+3rem)] opacity-70">
        <defs>
          <filter id="excelencia-mancha" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="21" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="5" xChannelSelector="R" yChannelSelector="G" result="borda" />
            <feGaussianBlur in="borda" stdDeviation="1.5" />
          </filter>
        </defs>
        <g filter="url(#excelencia-mancha)">
          <ellipse cx="72" cy="40" rx="34" ry="44" fill="var(--color-peach-100)" />
          <ellipse cx="20" cy="70" rx="22" ry="26" fill="var(--color-peach-200)" opacity="0.5" />
        </g>
      </svg>

      <div className="grid overflow-hidden rounded-[20px] border border-navy/10 bg-white/85 shadow-[0_24px_50px_-30px_rgb(0_41_77/0.45)] lg:grid-cols-2">
        {/* CONTROLES */}
        <div className="space-y-8 p-7 sm:p-10">
          <Controle id="exc-pessoas" rotulo="Pessoas na operação" min={1} max={500} passo={1} valor={pessoas} mudar={setPessoas} />
          <Controle
            id="exc-horas"
            rotulo="Horas perdidas por pessoa, por semana, com retrabalho, espera e correção de erros"
            min={0.5}
            max={15}
            passo={0.5}
            valor={horas}
            mudar={setHoras}
          />
          {verReais ? (
            <Controle id="exc-custo" rotulo="Custo médio da hora de trabalho" min={10} max={300} passo={1} valor={custo} mudar={setCusto} prefixo="R$" />
          ) : (
            <button
              type="button"
              onClick={() => setVerReais(true)}
              className="text-[0.9375rem] font-semibold text-caramel-700 underline underline-offset-4 outline-none hover:text-navy focus-visible:ring-2 focus-visible:ring-navy"
            >
              Quer ver em reais?
            </button>
          )}
        </div>

        {/* RESULTADO */}
        <div className="flex flex-col justify-center bg-mint/50 p-7 sm:p-10">
          <div aria-live="polite" aria-atomic="true">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/80">
                <Hourglass aria-hidden="true" className="size-7 text-caramel-700" strokeWidth={1.6} />
              </span>
              <p>
                <span className="block font-display text-[clamp(3rem,2rem+3.5vw,4.5rem)] leading-none font-bold text-navy tabular-nums">
                  {Math.round(horasAnim).toLocaleString("pt-BR")}
                </span>
                <span className="mt-1 block text-ink-muted">horas por mês</span>
              </p>
            </div>
            <p className="mt-6 text-lead text-navy">
              É como ter <strong className="font-semibold">{quem}</strong> trabalhando o mês inteiro só para corrigir falhas.
            </p>
            {verReais && (
              <p className="mt-4 text-navy">
                Cerca de <strong className="font-semibold tabular-nums">{reais(mesAnim)}</strong> por mês e{" "}
                <strong className="font-semibold tabular-nums">{reais(anoAnim)}</strong> por ano.
              </p>
            )}
          </div>
          <p className="mt-8 text-ink-muted">
            Com processos padronizados e qualidade medida, boa parte desse tempo volta para o que gera valor.
          </p>
          <div className="mt-6">
            <Button href={prediagUrl} variant="primary" arrow className="max-sm:w-full">
              Fazer o pré-diagnóstico
            </Button>
          </div>
          <p className="mt-5 text-xs text-ink-muted">Estimativa simples, feita a partir dos números que você informou.</p>
        </div>
      </div>
    </div>
  );
}
