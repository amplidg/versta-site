import { Reveal } from "@/components/motion/Reveal";
import { Texto } from "@/components/ui/Texto";

export type Etapa = { titulo: string; texto: string };

const colunas: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Jornada em etapas ligadas por uma linha de trilha tracejada.
 * Horizontal no desktop (trilha sinuosa), vertical no mobile.
 */
export function TrailSteps({ etapas, onDark = false }: { etapas: Etapa[]; onDark?: boolean }) {
  // Cores para fundo claro (padrão) ou escuro (ex.: seção verde)
  const c = onDark
    ? {
        trail: "var(--color-peach-100)",
        line: "border-peach-100/70",
        marker: "border-peach-100 bg-offwhite text-green-900",
        title: "text-peach-100",
        body: "text-offwhite",
      }
    : {
        trail: "var(--color-caramel)",
        line: "border-caramel",
        marker: "border-caramel bg-offwhite text-caramel-700",
        title: "text-navy",
        body: "text-ink-muted",
      };
  return (
    <div className="relative">
      {/* Trilha sinuosa (desktop) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        className="absolute top-7 left-7 hidden h-10 -translate-y-1/2 overflow-visible lg:block"
        // do centro do primeiro marco ao centro do último (colunas com gap de 2rem)
        style={{
          width: `calc(${(etapas.length - 1) / etapas.length} * (100% - ${etapas.length - 1} * 2rem) + ${etapas.length - 1} * 2rem)`,
        }}
      >
        <path
          d="M0 20 C 110 -4, 190 44, 333 20 S 560 -4, 666 20 S 890 44, 1000 20"
          fill="none"
          stroke={c.trail}
          strokeWidth="1.5"
          strokeDasharray="2 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className={`relative grid gap-10 lg:gap-8 ${colunas[etapas.length] ?? "lg:grid-cols-4"}`}>
        {etapas.map((etapa, i) => (
          <Reveal
            as="li"
            key={etapa.titulo}
            delay={i * 120}
            className="relative flex gap-5 lg:flex-col lg:items-start lg:gap-6 lg:text-left"
          >
            {/* Trilha vertical (mobile) */}
            {i < etapas.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute top-14 bottom-[-2.5rem] left-7 border-l-[1.5px] border-dotted lg:hidden ${c.line}`}
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border font-display text-xl font-semibold ${c.marker}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-2 lg:pt-0">
              <p className="sr-only">Etapa {i + 1}:</p>
              <h3 className={`text-h3 ${c.title}`}>
                <Texto>{etapa.titulo}</Texto>
              </h3>
              <p className={`mt-3 ${c.body}`}>
                <Texto>{etapa.texto}</Texto>
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
