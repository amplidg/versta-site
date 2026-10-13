"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { DogSymbol } from "@/components/brand/DogSymbol";
import { frentes, type Frente } from "@/data/frentes";

/* Textos e conexões fornecidos pelo Lucas — não reescrever. */

/** Sinais que o diagnóstico pode revelar, cada um ligado a uma frente. */
const sinais: { texto: string; frente: string }[] = [
  { texto: "Lideranças sobrecarregadas, conflitos recorrentes e dificuldade em reter pessoas", frente: "cultura" },
  { texto: "Contratos frágeis e risco de processos e disputas", frente: "integra" },
  { texto: "Licenças, estudos ou exigências ambientais pendentes", frente: "semear" },
  { texto: "Clientes e parceiros cobrando práticas sustentáveis e de governança", frente: "esg" },
  { texto: "Equipe desalinhada com a estratégia e uma marca pouco percebida no mercado", frente: "conexao" },
  { texto: "Processos manuais, retrabalho e pouca tecnologia", frente: "inova" },
  { texto: "Falhas de qualidade, desperdícios e baixa produtividade na operação", frente: "excelencia" },
  { texto: "Falta de um espaço para o bem-estar da equipe e para os encontros da empresa", frente: "espaco" },
  { texto: "Falta de experiências que fortaleçam o vínculo com a equipe e com os clientes", frente: "turismo" },
];

/** Ordem da coluna de frentes: diferente da dos sinais, para as linhas se cruzarem de leve. */
const ordemFrentes = ["semear", "cultura", "esg", "integra", "inova", "conexao", "espaco", "excelencia", "turismo"];

function frentePorSlug(slug: string): Frente {
  const f = frentes.find((x) => x.slug === slug);
  if (!f) throw new Error(`Frente não encontrada: ${slug}`);
  return f;
}

const colunaFrentes = ordemFrentes.map(frentePorSlug);
const frenteDoSinal = sinais.map((s) => frentePorSlug(s.frente));

type Linhas = { largura: number; altura: number; caminhos: string[] };

const itemBase =
  "flex min-h-[4.25rem] items-center rounded-button px-3 py-2 transition-[background-color,color,opacity] duration-300 ease-[var(--ease-calm)] motion-reduce:transition-none";

/**
 * "Além do Programa SH2": sinais (esquerda) ligados por linhas tracejadas às
 * frentes (direita). No celular, sem linhas: os sinais viram um acordeão que
 * revela a frente correspondente. Estado só em memória.
 */
export function ConnectionMap() {
  /** Índice do sinal em destaque (o par sinal + frente); null = nenhum. */
  const [ativo, setAtivo] = useState<number | null>(null);
  const [aberto, setAberto] = useState<number | null>(null);
  const [linhas, setLinhas] = useState<Linhas | null>(null);
  const [visivel, setVisivel] = useState(false);

  const areaRef = useRef<HTMLDivElement>(null);
  const pontosSinal = useRef<(HTMLSpanElement | null)[]>([]);
  const pontosFrente = useRef<(HTMLSpanElement | null)[]>([]);

  // Recalcula as curvas sempre que a área muda de tamanho (inclui a 1ª medida).
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const medir = () => {
      const caixa = area.getBoundingClientRect();
      if (caixa.width === 0) return; // escondida (celular)
      const centro = (el: HTMLElement | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - caixa.left, y: r.top + r.height / 2 - caixa.top };
      };
      const caminhos = sinais.map((s, i) => {
        const a = centro(pontosSinal.current[i]);
        const b = centro(pontosFrente.current[ordemFrentes.indexOf(s.frente)]);
        if (!a || !b) return "";
        const dx = (b.x - a.x) * 0.5;
        const n = (v: number) => v.toFixed(1);
        return `M${n(a.x)} ${n(a.y)} C${n(a.x + dx)} ${n(a.y)} ${n(b.x - dx)} ${n(b.y)} ${n(b.x)} ${n(b.y)}`;
      });
      setLinhas({ largura: caixa.width, altura: caixa.height, caminhos });
    };

    const ro = new ResizeObserver(medir);
    ro.observe(area);
    document.fonts?.ready.then(medir).catch(() => {});
    return () => ro.disconnect();
  }, []);

  // Dispara o desenho das linhas quando o bloco entra na tela.
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(area);
    return () => io.disconnect();
  }, []);

  const destaque = (i: number) => ({
    onMouseEnter: () => setAtivo(i),
    onMouseLeave: () => setAtivo(null),
    onFocus: () => setAtivo(i),
    onBlur: () => setAtivo(null),
  });

  const estado = (i: number) =>
    ativo === null ? "text-ink" : ativo === i ? "bg-peach-100 text-navy" : "text-ink opacity-40";

  return (
    <>
      {/* ---------- Computador: duas colunas ligadas por linhas ---------- */}
      <div
        ref={areaRef}
        className={`relative mx-auto hidden max-w-5xl grid-cols-[minmax(0,5fr)_minmax(0,2.4fr)_minmax(0,4fr)] lg:grid ${
          visivel ? "conexoes-visivel" : ""
        }`}
      >
        {/* Linhas (decorativas) */}
        {linhas && (
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${linhas.largura} ${linhas.altura}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              {linhas.caminhos.map((d, i) => (
                // máscara que "desenha" a linha tracejada do início ao fim
                <mask
                  key={i}
                  id={`conexao-mascara-${i}`}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={linhas.largura}
                  height={linhas.altura}
                >
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="8"
                    className="conexao-linha-mascara"
                    style={{ transitionDelay: `${i * 90}ms` }}
                  />
                </mask>
              ))}
            </defs>
            {linhas.caminhos.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--color-caramel)"
                strokeLinecap="round"
                strokeDasharray="1.5 7"
                mask={`url(#conexao-mascara-${i})`}
                strokeWidth={ativo === i ? 2.25 : 1.5}
                opacity={ativo === null ? 0.55 : ativo === i ? 1 : 0.18}
                className="transition-[opacity,stroke-width] duration-300 motion-reduce:transition-none"
              />
            ))}
          </svg>
        )}

        {/* Sinais */}
        <div>
          <div className="flex h-24 flex-col justify-end px-3 pb-4">
            <DogSymbol className="w-11" />
            <p className="eyebrow mt-3 text-caramel-700">O que o diagnóstico pode revelar</p>
          </div>
          <ul>
            {sinais.map((s, i) => (
              <li key={s.texto}>
                <Link
                  href={`/consultoria/${s.frente}`}
                  {...destaque(i)}
                  className={`${itemBase} justify-between gap-4 text-[0.9375rem] leading-snug ${estado(i)}`}
                >
                  <span>
                    {s.texto}
                    <span className="sr-only">
                      {" "}
                      — frente correspondente: {frenteDoSinal[i].nome}, {frenteDoSinal[i].area}
                    </span>
                  </span>
                  <span
                    ref={(el) => {
                      pontosSinal.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-caramel"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Área das linhas */}
        <div aria-hidden="true" />

        {/* Frentes */}
        <div>
          <div className="flex h-24 flex-col justify-end px-3 pb-4">
            <p className="eyebrow pl-5 text-caramel-700">Onde a Versta atua</p>
          </div>
          <ul>
            {colunaFrentes.map((f, j) => {
              const Icon = f.icone;
              const i = sinais.findIndex((s) => s.frente === f.slug);
              return (
                <li key={f.slug}>
                  <Link
                    href={`/consultoria/${f.slug}`}
                    {...destaque(i)}
                    className={`${itemBase} gap-3 ${estado(i)}`}
                  >
                    <span
                      ref={(el) => {
                        pontosFrente.current[j] = el;
                      }}
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-caramel"
                    />
                    <Icon aria-hidden="true" className="size-6 shrink-0 text-navy" strokeWidth={1.5} />
                    <span className="leading-tight">
                      <span className="block font-display font-bold text-navy">{f.nome}</span>
                      <span className="text-[0.8125rem] text-ink-muted">{f.area}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---------- Celular e tablet: acordeão, sem linhas ---------- */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3">
          <DogSymbol className="w-10" />
          <p className="eyebrow text-caramel-700">O que o diagnóstico pode revelar</p>
        </div>
        <ul className="mt-5 border-b border-navy/15">
          {sinais.map((s, i) => {
            const f = frenteDoSinal[i];
            const Icon = f.icone;
            const expandido = aberto === i;
            return (
              <li key={s.texto} className="border-t border-navy/15">
                <button
                  type="button"
                  aria-expanded={expandido}
                  aria-controls={`conexao-painel-${i}`}
                  onClick={() => setAberto(expandido ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-semibold text-navy"
                >
                  <span>
                    {s.texto}
                    <span className="sr-only">
                      {" "}
                      — frente correspondente: {f.nome}, {f.area}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 shrink-0 text-caramel-700 transition-transform duration-300 motion-reduce:transition-none ${
                      expandido ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.75}
                  />
                </button>
                <div id={`conexao-painel-${i}`} hidden={!expandido} className="sh2-resultado pb-5">
                  <div className="flex items-center gap-3">
                    {/* pequena seta tracejada: do sinal para a frente */}
                    <svg aria-hidden="true" viewBox="0 0 34 30" className="h-8 w-9 shrink-0" fill="none">
                      <path
                        d="M5 1 V18 Q5 22 9 22 H28"
                        stroke="var(--color-caramel)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeDasharray="1.5 5"
                      />
                      <path
                        d="M23 16.5 L29 22 L23 27.5"
                        stroke="var(--color-caramel)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <Link
                      href={`/consultoria/${f.slug}`}
                      className="flex min-h-11 flex-1 items-center gap-3 rounded-button bg-peach-100 px-3.5 py-2.5"
                    >
                      <Icon aria-hidden="true" className="size-6 shrink-0 text-navy" strokeWidth={1.5} />
                      <span className="leading-tight">
                        <span className="block font-display font-bold text-navy">{f.nome}</span>
                        <span className="text-[0.8125rem] text-ink-muted">{f.area}</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
