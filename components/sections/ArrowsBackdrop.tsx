/**
 * Fundo decorativo de flechas apontando para cima (crescimento), em estilo
 * aquarela, cobrindo o bloco inteiro. Usado na seção "Método de trabalho".
 *
 * - Duas composições: horizontal (desktop) e vertical (celular), ambas
 *   escalam proporcionalmente e cobrem a seção (preserveAspectRatio slice).
 * - As flechas nascem da base do bloco; alturas crescem, com ritmo
 *   irregular, da esquerda para a direita.
 * - Opacidade baixa para não prejudicar a leitura. Decorativo (aria-hidden).
 * - O filtro de borda aquarelada (#aquarela-seta) está em IllustrationDefs.
 */

type Seta = { x: number; h: number; w: number };

/** Caminho de uma flecha: haste + ponta triangular, com a base em `base`. */
function setaPath({ x, h, w }: Seta, base: number) {
  const haste = w * 0.42;
  const ponta = w * 0.95;
  const topo = base - h;
  const pescoco = topo + ponta;
  return [
    `M${x - haste / 2} ${base}`,
    `L${x - haste / 2} ${pescoco}`,
    `L${x - w / 2} ${pescoco}`,
    `L${x} ${topo}`,
    `L${x + w / 2} ${pescoco}`,
    `L${x + haste / 2} ${pescoco}`,
    `L${x + haste / 2} ${base}`,
    "Z",
  ].join(" ");
}

/* Desktop: viewBox 1440 × 1000. Flechas mais baixas à esquerda (onde fica a
   headline) e mais altas à direita (onde ficava a imagem). */
const DESKTOP: Seta[] = [
  { x: 40, h: 300, w: 80 },
  { x: 170, h: 470, w: 110 },
  { x: 300, h: 250, w: 70 },
  { x: 430, h: 560, w: 120 },
  { x: 575, h: 380, w: 90 },
  { x: 720, h: 690, w: 150 },
  { x: 865, h: 450, w: 100 },
  { x: 1000, h: 820, w: 170 },
  { x: 1140, h: 560, w: 115 },
  { x: 1280, h: 930, w: 190 },
  { x: 1420, h: 700, w: 140 },
];

/* Celular: viewBox 400 × 1600 (tela vertical). */
const MOBILE: Seta[] = [
  { x: 20, h: 520, w: 55 },
  { x: 95, h: 860, w: 75 },
  { x: 160, h: 380, w: 45 },
  { x: 225, h: 1100, w: 90 },
  { x: 300, h: 700, w: 60 },
  { x: 380, h: 1420, w: 105 },
];

function Composicao({
  setas,
  width,
  height,
  className,
}: {
  setas: Seta[];
  width: number;
  height: number;
  className: string;
}) {
  const base = height + 40; // base abaixo da borda: as hastes "continuam"
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMax slice"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <g filter="url(#aquarela-seta)" fill="var(--color-peach-100)">
        {setas.map((s) => (
          <g key={`${s.x}-${s.h}`}>
            {/* duas demãos levemente deslocadas = sobreposição de aguada */}
            <path d={setaPath(s, base)} />
            <path d={setaPath({ ...s, w: s.w * 0.9 }, base)} transform={`translate(${s.w * 0.06} ${-s.w * 0.12})`} opacity="0.55" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function ArrowsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]">
      <Composicao setas={DESKTOP} width={1440} height={1000} className="hidden md:block" />
      <Composicao setas={MOBILE} width={400} height={1600} className="md:hidden" />
    </div>
  );
}
