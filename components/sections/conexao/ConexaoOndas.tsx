import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Store, Users } from "lucide-react";
import { InView } from "@/components/motion/InView";
import { H_DOG_PATH } from "@/components/brand/logoPaths";

/*
 * "A mesma mensagem, em duas direções" (página da Conexão, especificação do
 * Lucas, 03/11): no centro, a marca (círculo azul-marinho com o cão); dela
 * saem ondas de comunicação para os dois lados — sálvia para dentro (equipe),
 * caramelo para fora (mercado). Cada lado tem ícone, rótulo e uma lista curta.
 * Ao entrar na tela, o círculo aparece, as ondas pulsam devagar e os lados
 * surgem em seguida. Mouse/foco num lado: as ondas dele ficam mais fortes e o
 * outro lado se apaga. No celular, tudo fica na vertical (equipe em cima,
 * mercado embaixo). Animações em globals.css (classes conexao-*).
 */

type Lado = {
  chave: "dentro" | "fora";
  rotulo: string;
  icone: LucideIcon;
  cor: string;
  fundo: string;
  itens: string[];
};

const lados: Lado[] = [
  {
    chave: "dentro",
    rotulo: "Para dentro · Equipe",
    icone: Users,
    cor: "text-green-900",
    fundo: "bg-mint",
    itens: [
      "Comunicação interna clara e constante",
      "Equipe alinhada à estratégia e aos objetivos",
      "Campanhas que engajam e valorizam as pessoas",
    ],
  },
  {
    chave: "fora",
    rotulo: "Para fora · Mercado",
    icone: Store,
    cor: "text-caramel-700",
    fundo: "bg-peach-100",
    itens: [
      "Posicionamento de marca claro e consistente",
      "Presença digital no Google e nas redes",
      "Geração previsível de novos clientes",
    ],
  },
];

const ONDAS = 4;

/** Arco de círculo em volta de (cx, cy), do ângulo a1 ao a2 (graus; 0° = direita). */
function arco(cx: number, cy: number, r: number, a1: number, a2: number) {
  const p = (a: number) => {
    const rad = (a * Math.PI) / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(1)} ${(cy + r * Math.sin(rad)).toFixed(1)}`;
  };
  return `M${p(a1)} A${r} ${r} 0 0 1 ${p(a2)}`;
}

/** Desenho central: a marca e as ondas, na horizontal ou na vertical. */
function Marca({ vertical }: { vertical: boolean }) {
  const w = vertical ? 420 : 700;
  const h = vertical ? 620 : 420;
  const cx = w / 2;
  const cy = h / 2;
  const r = 84;
  // ângulos de cada lado: dentro (esquerda / em cima) e fora (direita / embaixo)
  const faixas = vertical ? { dentro: [235, 305], fora: [55, 125] } : { dentro: [145, 215], fora: [-35, 35] };
  const passo = vertical ? 46 : 58;
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${w} ${h}`}
      className="h-auto w-full overflow-visible"
      style={{ "--cx": `${cx}px`, "--cy": `${cy}px` } as CSSProperties}
    >
      {(["dentro", "fora"] as const).map((lado) => (
        <g
          key={lado}
          className={`conexao-ondas conexao-ondas-${lado}`}
          fill="none"
          stroke={lado === "dentro" ? "var(--color-sage)" : "var(--color-caramel)"}
          strokeWidth={3}
          strokeLinecap="round"
        >
          {Array.from({ length: ONDAS }, (_, k) => (
            <path
              key={k}
              d={arco(cx, cy, r + 34 + k * passo, faixas[lado][0], faixas[lado][1])}
              className="conexao-onda"
              style={{ "--k": k } as CSSProperties}
            />
          ))}
        </g>
      ))}
      <g className="conexao-centro">
        <circle cx={cx} cy={cy} r={r} fill="var(--color-navy)" />
        {/* cão da Versta (vetor oficial), em caramelo */}
        <svg x={cx - 38} y={cy - 46} width={76} height={52} viewBox="416 69.5 85 58.5">
          <path d={H_DOG_PATH} fill="var(--color-caramel)" />
        </svg>
        <text x={cx} y={cy + 34} textAnchor="middle" fontSize={22} fontWeight={700} fill="#fff" style={{ fontFamily: "var(--font-display)" }}>
          Sua marca
        </text>
      </g>
    </svg>
  );
}

function LadoBloco({ lado }: { lado: Lado }) {
  const Icone = lado.icone;
  return (
    <article
      tabIndex={0}
      aria-labelledby={`conexao-${lado.chave}`}
      className={`conexao-lado conexao-lado-${lado.chave} rounded-card p-2 outline-none focus-visible:ring-2 focus-visible:ring-navy`}
    >
      <div className="flex flex-col items-center text-center">
        <span className={`flex size-20 items-center justify-center rounded-full ${lado.fundo}`}>
          <Icone aria-hidden="true" className={`size-9 ${lado.cor}`} strokeWidth={1.5} />
        </span>
        <h3 id={`conexao-${lado.chave}`} className="mt-4 font-display text-xl font-bold text-navy">
          {lado.rotulo}
        </h3>
      </div>
      <ul className="mx-auto mt-4 max-w-xs space-y-2.5">
        {lado.itens.map((item) => (
          <li key={item} className="flex gap-3 text-ink-muted">
            <span
              aria-hidden="true"
              className={`mt-2.5 size-1.5 shrink-0 rounded-full ${lado.chave === "dentro" ? "bg-sage" : "bg-caramel"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ConexaoOndas() {
  const [dentro, fora] = lados;
  return (
    <InView className="conexao mt-12 md:mt-16">
      {/* COMPUTADOR — na horizontal */}
      <div className="hidden grid-cols-[1fr_1.5fr_1fr] items-start gap-6 lg:grid">
        <LadoBloco lado={dentro} />
        <div className="self-center">
          <Marca vertical={false} />
        </div>
        <LadoBloco lado={fora} />
      </div>
      {/* CELULAR / TABLET — na vertical */}
      <div className="mx-auto flex max-w-md flex-col items-center gap-2 lg:hidden">
        <LadoBloco lado={dentro} />
        <div className="w-64 sm:w-72">
          <Marca vertical />
        </div>
        <LadoBloco lado={fora} />
      </div>
    </InView>
  );
}
