import type { LucideIcon } from "lucide-react";
import {
  CircleCheck,
  Clock,
  Cog,
  FileSpreadsheet,
  FileText,
  Folder,
  Mail,
  Phone,
  TriangleAlert,
} from "lucide-react";

/*
 * As duas cenas do comparador "Do processo travado ao processo que flui"
 * (página da Inova, 03/11), desenhadas em SVG. Cada uma tem dois formatos:
 * "largo" (computador, 16:7) e "compacto" (celular, empilhadas).
 * Hoje: fluxo confuso, em tons apagados com toque de caramelo.
 * Com a Inova: 4 etapas em linha, em azul-marinho, azul claro e sálvia.
 */

export type Formato = "largo" | "compacto";

const QUADRO: Record<Formato, { w: number; h: number }> = {
  largo: { w: 1600, h: 700 },
  compacto: { w: 600, h: 560 },
};

const fonte = { fontFamily: "var(--font-body)" };

/** Etiqueta em pílula, centralizada no ponto (x, y). */
function Etiqueta({ x, y, texto, tam, fundo, cor }: { x: number; y: number; texto: string; tam: number; fundo: string; cor: string }) {
  const w = texto.length * tam * 0.56 + tam * 1.6;
  const h = tam * 1.9;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill={fundo} />
      <text x={x} y={y + tam * 0.36} textAnchor="middle" fontSize={tam} fontWeight={600} fill={cor} style={fonte}>
        {texto}
      </text>
    </g>
  );
}

/** Ícone Lucide dentro do SVG, centralizado no ponto (x, y). */
function Icone({ icone: I, x, y, tam, cor, fundo }: { icone: LucideIcon; x: number; y: number; tam: number; cor: string; fundo?: string }) {
  return (
    <g>
      {fundo && <circle cx={x} cy={y} r={tam * 0.85} fill={fundo} />}
      <I x={x - tam / 2} y={y - tam / 2} width={tam} height={tam} color={cor} strokeWidth={1.6} />
    </g>
  );
}

// ---------------------------------------------------------------- HOJE

const HOJE = {
  largo: {
    tamIcone: 64,
    tamTexto: 24,
    icones: [
      { icone: FileText, x: 190, y: 180 },
      { icone: FileSpreadsheet, x: 520, y: 460 },
      { icone: Folder, x: 840, y: 170 },
      { icone: Mail, x: 1140, y: 420 },
      { icone: Phone, x: 1420, y: 190 },
    ],
    alertas: [
      { icone: Clock, x: 690, y: 330 },
      { icone: TriangleAlert, x: 1010, y: 560 },
      { icone: Clock, x: 1300, y: 600 },
    ],
    setas: [
      "M240 210 C 420 120, 600 560, 480 440",
      "M560 430 C 760 360, 560 120, 790 170",
      "M880 200 C 1000 300, 880 520, 1090 420",
      "M1180 390 C 1300 260, 1220 120, 1370 180",
      "M1400 230 C 1380 420, 900 260, 980 520",
      "M960 560 C 700 640, 380 600, 240 260",
      "M500 500 c -120 70 -40 160 60 110 c 100 -50 -10 -170 -60 -90",
    ],
    etiquetas: [
      { x: 330, y: 360, texto: "retrabalho" },
      { x: 980, y: 290, texto: "digitação dupla" },
      { x: 1350, y: 480, texto: "informação perdida" },
      { x: 720, y: 600, texto: "aprovação parada" },
    ],
  },
  compacto: {
    tamIcone: 46,
    tamTexto: 22,
    icones: [
      { icone: FileText, x: 80, y: 90 },
      { icone: FileSpreadsheet, x: 300, y: 220 },
      { icone: Folder, x: 510, y: 90 },
      { icone: Mail, x: 110, y: 400 },
      { icone: Phone, x: 490, y: 380 },
    ],
    alertas: [
      { icone: Clock, x: 300, y: 70 },
      { icone: TriangleAlert, x: 320, y: 420 },
    ],
    setas: [
      "M110 110 C 240 60, 160 260, 270 220",
      "M330 200 C 420 60, 380 150, 480 100",
      "M500 125 C 560 260, 380 300, 470 360",
      "M460 400 C 300 520, 260 300, 140 380",
      "M90 370 C 30 260, 160 220, 90 125",
      "M290 250 c -60 60 20 120 60 70 c 40 -50 -40 -110 -60 -60",
    ],
    etiquetas: [
      { x: 150, y: 250, texto: "retrabalho" },
      { x: 440, y: 245, texto: "digitação dupla" },
      { x: 175, y: 505, texto: "informação perdida" },
      { x: 465, y: 505, texto: "aprovação parada" },
    ],
  },
};

export function CenaHoje({ formato, className = "" }: { formato: Formato; className?: string }) {
  const { w, h } = QUADRO[formato];
  const c = HOJE[formato];
  const id = `hoje-${formato}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        Hoje: papéis, planilhas, e-mails e telefonemas ligados por setas que se cruzam e voltam, com retrabalho,
        digitação dupla, informação perdida e aprovação parada.
      </title>
      <defs>
        <marker id={`${id}-seta`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" fill="#9aa0a6" />
        </marker>
      </defs>
      <rect width={w} height={h} fill="#e6e8e3" />
      {c.setas.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="#9aa0a6"
          strokeWidth={formato === "largo" ? 3 : 2.5}
          strokeDasharray="10 8"
          strokeLinecap="round"
          markerEnd={`url(#${id}-seta)`}
        />
      ))}
      {c.icones.map((i) => (
        <Icone key={`${i.x}-${i.y}`} icone={i.icone} x={i.x} y={i.y} tam={c.tamIcone} cor="#6f7680" fundo="#f2f3ef" />
      ))}
      {c.alertas.map((i) => (
        <Icone key={`${i.x}-${i.y}`} icone={i.icone} x={i.x} y={i.y} tam={c.tamIcone * 0.75} cor="var(--color-caramel)" fundo="#f7e4d8" />
      ))}
      {c.etiquetas.map((e) => (
        <Etiqueta key={e.texto} {...e} tam={c.tamTexto} fundo="#f7e4d8" cor="var(--color-caramel-700)" />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------- COM A INOVA

const ETAPAS: { nome: string; icone: LucideIcon | null }[] = [
  { nome: "Pedido", icone: FileText },
  { nome: "Aprovação", icone: CircleCheck },
  { nome: "Execução", icone: Cog },
  { nome: "Indicadores", icone: null }, // mini gráfico de barras
];

const INOVA = {
  largo: { xs: [260, 620, 980, 1340], y: 360, r: 72, tamIcone: 60, tamNome: 32, tamTexto: 24, yEtiquetas: 170 },
  compacto: { xs: [80, 225, 375, 520], y: 250, r: 54, tamIcone: 44, tamNome: 22, tamTexto: 20, yEtiquetas: 110 },
};

export function CenaInova({ formato, className = "" }: { formato: Formato; className?: string }) {
  const { w } = QUADRO[formato];
  // no celular, esta cena é mais baixa que a de "Hoje" (não precisa de tanto espaço)
  const h = formato === "largo" ? QUADRO.largo.h : 400;
  const c = INOVA[formato];
  const id = `inova-${formato}`;
  const meio = (a: number, b: number) => (a + b) / 2;
  const etiquetas =
    formato === "largo"
      ? [
          { x: meio(c.xs[0], c.xs[1]), y: c.yEtiquetas, texto: "automático" },
          { x: meio(c.xs[1], c.xs[2]), y: c.yEtiquetas, texto: "integrado" },
          { x: meio(c.xs[2], c.xs[3]), y: c.yEtiquetas, texto: "em tempo real" },
        ]
      : [
          { x: 150, y: c.yEtiquetas - 40, texto: "automático" },
          { x: 300, y: c.yEtiquetas + 10, texto: "integrado" },
          { x: 450, y: c.yEtiquetas - 40, texto: "em tempo real" },
        ];
  const ultimo = c.xs[3];
  const barra = c.r * 0.22;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        Com a Inova: um fluxo limpo e em linha reta — pedido, aprovação, execução e indicadores — automático,
        integrado e em tempo real.
      </title>
      <rect width={w} height={h} fill="#edf4f1" />
      {/* linha contínua ligando as etapas */}
      <line x1={c.xs[0]} y1={c.y} x2={ultimo} y2={c.y} stroke="var(--color-navy)" strokeWidth={formato === "largo" ? 5 : 4} strokeLinecap="round" />
      {etiquetas.map((e) => (
        <Etiqueta key={e.texto} {...e} tam={c.tamTexto} fundo="var(--color-mist)" cor="var(--color-navy)" />
      ))}
      {ETAPAS.map((etapa, i) => {
        const x = c.xs[i];
        return (
          <g key={etapa.nome}>
            <circle cx={x} cy={c.y} r={c.r} fill="#fff" stroke="var(--color-sage)" strokeWidth={formato === "largo" ? 6 : 5} />
            {etapa.icone ? (
              <Icone icone={etapa.icone} x={x} y={c.y} tam={c.tamIcone} cor="var(--color-navy)" />
            ) : (
              // mini gráfico de barras subindo
              <g>
                {[0.35, 0.6, 0.9].map((alt, k) => (
                  <rect
                    key={alt}
                    x={x - barra * 1.7 + k * barra * 1.25}
                    y={c.y + c.r * 0.42 - c.r * alt}
                    width={barra}
                    height={c.r * alt}
                    rx={barra * 0.25}
                    fill={k === 2 ? "var(--color-navy)" : "var(--color-mist)"}
                  />
                ))}
              </g>
            )}
            {/* selo de concluído */}
            {i < 3 && (
              <g>
                <circle cx={x + c.r * 0.72} cy={c.y - c.r * 0.72} r={c.r * 0.28} fill="var(--color-sage)" />
                <path
                  d={`M${x + c.r * 0.6} ${c.y - c.r * 0.72} l${c.r * 0.09} ${c.r * 0.1} l${c.r * 0.17} -${c.r * 0.2}`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={formato === "largo" ? 4 : 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
            <text x={x} y={c.y + c.r + c.tamNome * 1.5} textAnchor="middle" fontSize={c.tamNome} fontWeight={700} fill="var(--color-navy)" style={fonte}>
              {etapa.nome}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
