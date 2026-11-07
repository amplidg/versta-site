"use client";

import { useId, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { camadas, type CamadaId } from "@/data/espaco";

/*
 * "O que torna um espaço sustentável" (página do Espaço, especificação do
 * Lucas, 07/11): planta baixa de um pequeno escritório em SVG, com seis
 * camadas que se ligam e desligam (interruptores reais, role="switch").
 * A primeira (luz natural) começa ligada. O texto mostrado é sempre o da
 * última camada ligada (aria-live); com as seis ligadas aparece o selo
 * "Espaço sustentável completo".
 * Nomes, ícones e textos das camadas ficam em data/espaco.ts. Animações no
 * CSS (classes planta-*, em globals.css): as camadas aparecem com fade e as
 * linhas se desenham; com movimento reduzido, tudo aparece direto e as setas
 * do vento ficam paradas.
 */

const NAVY = "#00294D";
const CARAMELO = "#B46D49";
const PESSEGO = "#FAC6AB";
const AZUL = "#75BAD4";
const AZUL_CLARO = "#9CCADC";
const SALVIA = "#9BBBAA";
const VERDE = "#539282";

/* ---------- planta: paredes, aberturas e móveis ---------- */

// Paredes externas, já com os vãos das janelas e da porta de entrada.
const paredesExternas = [
  "M57 90H100M200 90H230M300 90H380M460 90H503", // em cima
  "M60 90V140M60 230V310M60 380V420", // esquerda
  "M500 90V130M500 220V330M500 380V420", // direita
  "M57 420H110M160 420H260M360 420H503", // embaixo
];

// Paredes internas, com os vãos das portas.
const paredesInternas = [
  "M330 90V200M330 240V270",
  "M60 270H150M190 270H260M300 270H430M465 270H500",
  "M230 270V330M230 370V420",
  "M400 270V420",
];

// Janelas: duas linhas finas no vão.
const janelas: { x1: number; y1: number; x2: number; y2: number }[] = [
  { x1: 100, y1: 90, x2: 200, y2: 90 },
  { x1: 230, y1: 90, x2: 300, y2: 90 },
  { x1: 380, y1: 90, x2: 460, y2: 90 },
  { x1: 60, y1: 140, x2: 60, y2: 230 },
  { x1: 60, y1: 310, x2: 60, y2: 380 },
  { x1: 500, y1: 130, x2: 500, y2: 220 },
  { x1: 500, y1: 330, x2: 500, y2: 380 },
  { x1: 260, y1: 420, x2: 360, y2: 420 },
];

// Portas: folha + arco de abertura.
const portas = [
  "M110 420V370A50 50 0 0 1 160 420",
  "M150 270V230A40 40 0 0 1 190 270",
  "M330 200H370A40 40 0 0 1 330 240",
  "M300 270V310A40 40 0 0 1 260 270",
  "M465 270V305A35 35 0 0 1 430 270",
  "M230 330H270A40 40 0 0 1 230 370",
];

const rotulos = [
  { x: 195, y: 172, texto: "Área de trabalho" },
  { x: 415, y: 246, texto: "Reunião" },
  { x: 150, y: 352, texto: "Recepção" },
  { x: 305, y: 404, texto: "Copa" },
  { x: 450, y: 320, texto: "Banheiro" },
];

function Moveis() {
  const cadeiras = [110, 150, 190, 230, 270];
  return (
    <g fill="none" stroke={NAVY} strokeWidth={1.2} strokeOpacity={0.55}>
      {/* área de trabalho: duas bancadas */}
      <rect x={90} y={122} width={210} height={26} rx={3} />
      <rect x={90} y={188} width={210} height={26} rx={3} />
      {cadeiras.map((x) => (
        <g key={x}>
          <circle cx={x} cy={110} r={7} />
          <circle cx={x} cy={226} r={7} />
        </g>
      ))}
      {/* reunião */}
      <ellipse cx={420} cy={160} rx={46} ry={24} />
      {[
        [382, 126],
        [420, 122],
        [458, 126],
        [382, 194],
        [420, 198],
        [458, 194],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={7} />
      ))}
      {/* recepção: sofá e balcão */}
      <rect x={70} y={290} width={22} height={70} rx={5} />
      <path d="M78 296V354" />
      <path d="M160 300H215V322" />
      <circle cx={200} cy={398} r={9} />
      {/* copa: bancada com pia e mesa */}
      <rect x={374} y={282} width={20} height={124} rx={2} />
      <circle cx={384} cy={318} r={6} />
      <circle cx={300} cy={358} r={18} />
      <circle cx={272} cy={358} r={7} />
      <circle cx={328} cy={358} r={7} />
      {/* banheiro: pia e vaso */}
      <rect x={404} y={334} width={18} height={26} rx={3} />
      <circle cx={413} cy={347} r={5} />
      <ellipse cx={472} cy={388} rx={10} ry={13} />
      <rect x={461} y={402} width={22} height={10} rx={2} />
    </g>
  );
}

/* ---------- traço que se desenha (com máscara) ---------- */

function Traco({
  id,
  d,
  ligada,
  children,
}: {
  id: string;
  d: string;
  ligada: boolean;
  /** O traço visível (pode ser tracejado); a máscara revela o desenho. */
  children: ReactNode;
}) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={640} height={480}>
        <path
          d={d}
          className="planta-mascara"
          fill="none"
          stroke="white"
          strokeWidth={16}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{ strokeDashoffset: ligada ? 0 : 1 }}
        />
      </mask>
      <g mask={`url(#${id})`}>{children}</g>
    </>
  );
}

/* ---------- desenhos das camadas ---------- */

const fachosLuz: { pontos: string; grad: string }[] = [
  { pontos: "100,93 200,93 240,215 60,215", grad: "baixo" },
  { pontos: "230,93 300,93 330,205 200,205", grad: "baixo" },
  { pontos: "380,93 460,93 492,210 350,210", grad: "baixo" },
  { pontos: "63,140 63,230 205,255 205,115", grad: "direita" },
  { pontos: "63,310 63,380 185,405 185,285", grad: "direita" },
  { pontos: "497,130 497,220 370,245 370,105", grad: "esquerda" },
  { pontos: "497,330 497,380 420,398 420,312", grad: "esquerda" },
  { pontos: "260,417 360,417 385,318 235,318", grad: "cima" },
];

const ventos = [
  "M18 186C120 150 230 232 340 196S470 160 556 176",
  "M312 466C300 392 238 318 280 236S262 110 262 34",
];

const lampadas = [
  [100, 168],
  [290, 168],
  [420, 160],
  [118, 322],
  [322, 314],
  [452, 360],
];

const canosAgua = ["M548 300C522 302 500 350 482 378", "M548 288C500 252 430 268 390 314", "M548 294C500 300 450 318 420 342"];

function desenharCamadas({ ligadas, uid }: { ligadas: Set<CamadaId>; uid: string }) {
  const on = (id: CamadaId) => ligadas.has(id);
  const estilo = (id: CamadaId) => ({ opacity: on(id) ? 1 : 0 });

  return {
    fundo: (
      <>
        {/* conforto: áreas em sálvia translúcida */}
        <g className="planta-camada" style={estilo("conforto")}>
          <rect x={66} y={96} width={258} height={168} rx={6} fill={SALVIA} fillOpacity={0.3} />
          <rect x={336} y={96} width={158} height={168} rx={6} fill={SALVIA} fillOpacity={0.3} />
        </g>
        {/* materiais: pisos com hachura caramelo */}
        <g className="planta-camada" style={estilo("materiais")}>
          <rect x={63} y={273} width={164} height={144} fill={`url(#${uid}-hachura)`} />
          <rect x={233} y={273} width={164} height={144} fill={`url(#${uid}-tabuas)`} />
        </g>
        {/* luz natural */}
        <g className="planta-camada" style={estilo("luz")} clipPath={`url(#${uid}-interior)`}>
          {fachosLuz.map(({ pontos, grad }) => (
            <polygon key={pontos} points={pontos} fill={`url(#${uid}-luz-${grad})`} />
          ))}
        </g>
      </>
    ),
    frente: (
      <>
        {/* materiais: paredes revestidas */}
        <g className="planta-camada" style={estilo("materiais")}>
          <path
            d="M60 270V420M60 90V140"
            stroke={CARAMELO}
            strokeOpacity={0.55}
            strokeWidth={12}
            fill="none"
          />
          <path d="M60 270V420M60 90V140" stroke={`url(#${uid}-hachura-forte)`} strokeWidth={12} fill="none" />
        </g>

        {/* luz: o sol, fora da planta */}
        <g className="planta-camada" style={estilo("luz")} stroke={CARAMELO} strokeWidth={1.5} strokeLinecap="round">
          <circle cx={30} cy={44} r={11} fill={PESSEGO} />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={30 + Math.cos(a) * 16}
                y1={44 + Math.sin(a) * 16}
                x2={30 + Math.cos(a) * 22}
                y2={44 + Math.sin(a) * 22}
              />
            );
          })}
        </g>

        {/* conforto: plantas e painéis acústicos */}
        <g className="planta-camada" style={estilo("conforto")}>
          {[
            [80, 252],
            [312, 252],
            [484, 252],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`} fill={VERDE} fillOpacity={0.75}>
              <ellipse cx={x} cy={y - 6} rx={4} ry={7} />
              <ellipse cx={x - 6} cy={y + 1} rx={4} ry={7} transform={`rotate(-60 ${x - 6} ${y + 1})`} />
              <ellipse cx={x + 6} cy={y + 1} rx={4} ry={7} transform={`rotate(60 ${x + 6} ${y + 1})`} />
            </g>
          ))}
          <g fill={VERDE} fillOpacity={0.7}>
            <rect x={336} y={104} width={5} height={84} rx={2} />
            <rect x={489} y={226} width={5} height={36} rx={2} />
            <rect x={346} y={96} width={26} height={5} rx={2} />
          </g>
        </g>

        {/* energia: painéis no telhado, fiação pontilhada e lâmpadas LED */}
        <g className="planta-camada" style={estilo("energia")}>
          {[120, 205, 290].map((x) => (
            <g key={x}>
              <rect x={x} y={40} width={75} height={34} rx={2} fill={NAVY} fillOpacity={0.14} stroke={NAVY} strokeWidth={1.4} />
              <path
                d={`M${x + 25} 40V74M${x + 50} 40V74M${x} 57H${x + 75}`}
                stroke={NAVY}
                strokeWidth={0.8}
                strokeOpacity={0.6}
              />
            </g>
          ))}
          {lampadas.map(([x, y]) => (
            <g key={`l-${x}-${y}`}>
              <circle cx={x} cy={y} r={9} fill="#FCDAC4" fillOpacity={0.9} />
              <circle cx={x} cy={y} r={4.5} fill={CARAMELO} />
            </g>
          ))}
          <text x={132} y={326} textAnchor="start" className="planta-rotulo" fill={CARAMELO} fontSize={10} fontWeight={700}>
            LED
          </text>
        </g>
        {lampadas.map(([x, y], i) => (
          <Traco key={`f-${x}-${y}`} id={`${uid}-fio-${i}`} d={`M242 76L${x} ${y}`} ligada={on("energia")}>
            <path
              d={`M242 76L${x} ${y}`}
              className="planta-camada"
              style={estilo("energia")}
              stroke={CARAMELO}
              strokeWidth={1.6}
              strokeDasharray="1 5"
              strokeLinecap="round"
              fill="none"
            />
          </Traco>
        ))}

        {/* água: cisterna fora da planta, canos tracejados e torneiras */}
        <g className="planta-camada" style={estilo("agua")}>
          <g stroke={AZUL} strokeWidth={1.5} strokeLinecap="round">
            {[552, 568, 584, 600].map((x, i) => (
              <line key={x} x1={x} y1={208 + (i % 2) * 6} x2={x - 4} y2={220 + (i % 2) * 6} />
            ))}
          </g>
          <path d="M548 246V318A20 7 0 0 0 588 318V246" fill={AZUL_CLARO} fillOpacity={0.45} stroke={NAVY} strokeWidth={1.4} />
          <ellipse cx={568} cy={246} rx={20} ry={7} fill="#FBF8F1" stroke={NAVY} strokeWidth={1.4} />
          <path d="M548 280A20 7 0 0 0 588 280" fill="none" stroke={AZUL} strokeWidth={1.2} />
          <text x={568} y={344} textAnchor="middle" className="planta-rotulo" fill={NAVY} fillOpacity={0.7} fontSize={10}>
            Cisterna
          </text>
          {[
            [384, 318],
            [413, 347],
            [472, 384],
          ].map(([x, y]) => (
            <path
              key={`t-${x}`}
              d={`M${x} ${y - 7}C${x - 4} ${y - 1} ${x - 4} ${y + 4} ${x} ${y + 4}S${x + 4} ${y - 1} ${x} ${y - 7}Z`}
              fill={AZUL}
              stroke="white"
              strokeWidth={0.8}
            />
          ))}
        </g>
        {canosAgua.map((d, i) => (
          <Traco key={d} id={`${uid}-cano-${i}`} d={d} ligada={on("agua")}>
            <path
              d={d}
              className="planta-camada"
              style={estilo("agua")}
              stroke={AZUL}
              strokeWidth={2.4}
              strokeDasharray="7 5"
              strokeLinecap="round"
              fill="none"
            />
          </Traco>
        ))}

        {/* ventilação cruzada: setas que atravessam a planta */}
        {ventos.map((d, i) => (
          <Traco key={d} id={`${uid}-vento-${i}`} d={d} ligada={on("ventilacao")}>
            <g className="planta-camada" style={estilo("ventilacao")}>
              <path d={d} stroke={AZUL_CLARO} strokeWidth={7} strokeOpacity={0.35} strokeLinecap="round" fill="none" />
              <path
                d={d}
                className="planta-vento"
                stroke={AZUL}
                strokeWidth={2.6}
                strokeDasharray="12 9"
                strokeLinecap="round"
                fill="none"
                markerEnd={`url(#${uid}-seta)`}
              />
            </g>
          </Traco>
        ))}
      </>
    ),
  };
}

/* ---------- componente ---------- */

export function EspacoPlanta() {
  const uid = useId().replace(/:/g, "");
  // ordem em que foram ligadas: a última define o texto mostrado
  const [ordem, setOrdem] = useState<CamadaId[]>(["luz"]);
  const ligadas = new Set(ordem);
  const todas = ordem.length === camadas.length;
  const ultima = camadas.find((c) => c.id === ordem[ordem.length - 1]);

  const alternar = (id: CamadaId) =>
    setOrdem((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));
  const alternarTodas = () => setOrdem(todas ? [] : camadas.map((c) => c.id));

  const desenho = desenharCamadas({ ligadas, uid });
  const descricao =
    ordem.length === 0
      ? "Nenhuma camada ligada."
      : `Camadas ligadas: ${camadas
          .filter((c) => ligadas.has(c.id))
          .map((c) => c.nome.toLowerCase())
          .join(", ")}.`;

  return (
    <div className="planta-papel mt-12 grid overflow-hidden rounded-card border border-navy/10 shadow-[0_24px_50px_-34px_rgb(0_41_77/0.45)] lg:grid-cols-[3fr_2fr]">
      {/* PLANTA */}
      <div className="relative isolate px-3 pt-6 pb-2 sm:px-6 md:px-10 md:pt-10 lg:py-10 lg:pr-4">
        {/* mancha de aquarela sálvia, como papel de projeto pintado */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-[6%] -z-10 h-[88%] w-[88%] opacity-70"
        >
          <defs>
            <filter id={`${uid}-mancha`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="11" result="ruido" />
              <feDisplacementMap in="SourceGraphic" in2="ruido" scale="9" xChannelSelector="R" yChannelSelector="G" result="borda" />
              <feGaussianBlur in="borda" stdDeviation="1.6" />
            </filter>
          </defs>
          <ellipse cx="50" cy="52" rx="46" ry="42" fill="#D6E9DF" filter={`url(#${uid}-mancha)`} />
          <ellipse cx="44" cy="48" rx="30" ry="28" fill={SALVIA} fillOpacity="0.35" filter={`url(#${uid}-mancha)`} />
        </svg>

        <svg
          viewBox="0 0 640 480"
          role="img"
          aria-labelledby={`${uid}-titulo ${uid}-desc`}
          className="block h-auto w-full"
        >
          <title id={`${uid}-titulo`}>Planta baixa de um pequeno escritório</title>
          <desc id={`${uid}-desc`}>
            Escritório com área de trabalho, sala de reunião, recepção, copa e banheiro. {descricao}
          </desc>
          <defs>
            <clipPath id={`${uid}-interior`}>
              <rect x={63} y={93} width={434} height={324} />
            </clipPath>
            <linearGradient id={`${uid}-luz-baixo`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={PESSEGO} stopOpacity="0.85" />
              <stop offset="1" stopColor={PESSEGO} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-luz-cima`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={PESSEGO} stopOpacity="0.85" />
              <stop offset="1" stopColor={PESSEGO} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-luz-direita`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={PESSEGO} stopOpacity="0.85" />
              <stop offset="1" stopColor={PESSEGO} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-luz-esquerda`} x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor={PESSEGO} stopOpacity="0.85" />
              <stop offset="1" stopColor={PESSEGO} stopOpacity="0" />
            </linearGradient>
            <pattern id={`${uid}-hachura`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke={CARAMELO} strokeWidth="1.3" strokeOpacity="0.4" />
            </pattern>
            <pattern id={`${uid}-hachura-forte`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#8C5236" strokeWidth="1.4" />
            </pattern>
            <pattern id={`${uid}-tabuas`} width="40" height="14" patternUnits="userSpaceOnUse">
              <rect width="40" height="14" fill={CARAMELO} fillOpacity="0.1" />
              <path d="M0 13.5H40M28 0V14" stroke={CARAMELO} strokeWidth="1" strokeOpacity="0.45" />
            </pattern>
            <marker
              id={`${uid}-seta`}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10Z" fill={AZUL} />
            </marker>
          </defs>

          <g aria-hidden="true">
            {desenho.fundo}

            {/* paredes, janelas, portas e móveis */}
            <g fill="none" stroke={NAVY} strokeLinecap="square">
              {paredesExternas.map((d) => (
                <path key={d} d={d} strokeWidth={6} />
              ))}
              {paredesInternas.map((d) => (
                <path key={d} d={d} strokeWidth={3} />
              ))}
            </g>
            <g stroke={NAVY} strokeWidth={1.2}>
              {janelas.map(({ x1, y1, x2, y2 }) => {
                const horizontal = y1 === y2;
                const dx = horizontal ? 0 : 3;
                const dy = horizontal ? 3 : 0;
                return (
                  <g key={`${x1}-${y1}`}>
                    <line x1={x1 - dx} y1={y1 - dy} x2={x2 - dx} y2={y2 - dy} />
                    <line x1={x1 + dx} y1={y1 + dy} x2={x2 + dx} y2={y2 + dy} />
                    <line x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={0.4} />
                  </g>
                );
              })}
            </g>
            <g fill="none" stroke={NAVY} strokeWidth={1.2} strokeOpacity={0.7}>
              {portas.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <Moveis />
            <g fill={NAVY} fillOpacity={0.6}>
              {rotulos.map(({ x, y, texto }) => (
                <text key={texto} x={x} y={y} textAnchor="middle" className="planta-rotulo" fontSize={12}>
                  {texto}
                </text>
              ))}
            </g>

            {/* norte */}
            <g transform="translate(600 446)">
              <circle r={16} fill="none" stroke={NAVY} strokeWidth={1} strokeOpacity={0.5} />
              <path d="M0 -12L5 4L0 1L-5 4Z" fill={CARAMELO} />
              <text y={-20} textAnchor="middle" className="planta-rotulo" fill={NAVY} fontSize={11} fontWeight={700}>
                N
              </text>
            </g>

            {desenho.frente}
          </g>
        </svg>
      </div>

      {/* CAMADAS */}
      <div className="border-t border-navy/10 px-5 py-8 sm:px-8 md:px-10 lg:border-t-0 lg:border-l lg:py-10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-navy">Camadas</h3>
          <button
            type="button"
            onClick={alternarTodas}
            className="text-sm font-semibold text-caramel-700 underline decoration-caramel/50 underline-offset-4 hover:decoration-caramel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {todas ? "Desligar todas" : "Ligar todas"}
          </button>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-1">
          {camadas.map(({ id, nome, icone: Icone, cor }) => {
            const ativa = ligadas.has(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={ativa}
                  onClick={() => alternar(id)}
                  className={`flex h-full w-full items-center gap-2 rounded-xl border px-2.5 py-2.5 sm:gap-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:px-4 ${
                    ativa ? "border-navy/25 bg-white" : "border-navy/10 bg-white/40 hover:bg-white/70"
                  }`}
                >
                  <span className={`flex size-8 shrink-0 items-center sm:size-9 justify-center rounded-full ${cor}`}>
                    <Icone aria-hidden="true" className="size-[18px] text-navy" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1 text-sm leading-snug font-semibold text-navy sm:text-[0.9375rem]">{nome}</span>
                  <span
                    aria-hidden="true"
                    className={`relative hidden h-6 w-10 shrink-0 rounded-full transition-colors duration-300 sm:block ${
                      ativa ? "bg-green-700" : "bg-navy/20"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform duration-300 motion-reduce:transition-none ${
                        ativa ? "translate-x-4" : ""
                      }`}
                    />
                  </span>
                  {/* no celular, um check pequeno no lugar do interruptor */}
                  <span
                    aria-hidden="true"
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border sm:hidden ${
                      ativa ? "border-green-700 bg-green-700 text-white" : "border-navy/30"
                    }`}
                  >
                    {ativa && <Check className="size-3" strokeWidth={3} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="mt-6 min-h-[8.5rem]">
          {ultima ? (
            <div key={ultima.id} className="planta-texto rounded-xl border-l-[3px] border-caramel bg-white/70 px-5 py-4">
              <p className="font-semibold text-navy">{ultima.nome}</p>
              <p className="mt-1 text-ink-muted">{ultima.texto}</p>
            </div>
          ) : (
            <p className="px-1 text-ink-muted">Ligue uma camada para ver o que muda no ambiente.</p>
          )}
          {todas && (
            <p className="planta-texto mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-offwhite">
              <span className="flex size-5 items-center justify-center rounded-full bg-caramel">
                <Check aria-hidden="true" className="size-3.5 text-white" strokeWidth={3} />
              </span>
              Espaço sustentável completo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
