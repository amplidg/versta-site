import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  Check,
  CheckCheck,
  Copy,
  Database,
  Files,
  FolderCheck,
  Hourglass,
  MousePointerClick,
  RefreshCcw,
  TrendingUp,
  Zap,
  Cog,
} from "lucide-react";

/*
 * Os dois lados do comparador "Do processo travado ao processo que flui"
 * (página da Inova; nova versão pedida pelo Lucas em 03/11): os mesmos 6
 * cartões, nas mesmas posições de uma grade 3 × 2, para que, ao passar a
 * barra, cada problema "se organize" no seu resultado.
 * Hoje: papéis soltos (bege, girados, deslocados, um pouco sobrepostos).
 * Com a Inova: cartões brancos alinhados, borda sálvia e selo de check.
 * No celular: lista dos 6 pares (problema riscado → resultado).
 */

type Par = {
  problema: string;
  resultado: string;
  iconeProblema: LucideIcon;
  iconeResultado: LucideIcon;
  /** Desarrumação do papel no lado "Hoje": giro (graus) e deslocamento (px). */
  giro: number;
  dx: number;
  dy: number;
};

export const pares: Par[] = [
  { problema: "Retrabalho constante", resultado: "Fim do retrabalho", iconeProblema: RefreshCcw, iconeResultado: CheckCheck, giro: -5, dx: 10, dy: 12 },
  { problema: "A mesma informação digitada várias vezes", resultado: "Informação registrada uma vez só", iconeProblema: Copy, iconeResultado: Database, giro: 4, dx: -14, dy: 6 },
  { problema: "Dados espalhados em planilhas e papéis", resultado: "Tudo em um só lugar", iconeProblema: Files, iconeResultado: FolderCheck, giro: -3, dx: -22, dy: 16 },
  { problema: "Decisões e aprovações paradas", resultado: "Processos mais ágeis", iconeProblema: Hourglass, iconeResultado: Zap, giro: 6, dx: 16, dy: -14 },
  { problema: "Horas em tarefas manuais", resultado: "Tarefas automatizadas", iconeProblema: MousePointerClick, iconeResultado: Cog, giro: -6, dx: -10, dy: -8 },
  { problema: "Números só no fim do mês", resultado: "Indicadores em tempo real", iconeProblema: CalendarClock, iconeResultado: TrendingUp, giro: 3, dx: -26, dy: -12 },
];

/** Grade comum aos dois lados (mesmas posições). */
const grade = "absolute inset-0 grid grid-cols-3 content-center gap-x-7 gap-y-12 px-[6%] pt-8 [&>li]:h-32";

export function LadoHoje() {
  return (
    <div role="group" aria-label="Hoje" className="absolute inset-0 bg-[#e9e6df]">
      <ul className={grade}>
        {pares.map(({ problema, iconeProblema: Icone, giro, dx, dy }) => (
          <li
            key={problema}
            className="flex items-center gap-4 rounded-[6px] border border-dashed border-[#c9bfae] bg-[#f3eee4] px-6 shadow-[0_6px_14px_-6px_rgb(60_50_30/0.3)]"
            style={{ transform: `translate(${dx}px, ${dy}px) rotate(${giro}deg)` } as CSSProperties}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-peach-100">
              <Icone aria-hidden="true" className="size-5 text-caramel-700" strokeWidth={1.75} />
            </span>
            <span className="text-[1.0625rem] leading-snug text-[#6b7480]">{problema}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LadoInova() {
  return (
    <div role="group" aria-label="Com a Inova" className="absolute inset-0 bg-[#eaf2f5]">
      <ul className={grade}>
        {pares.map(({ resultado, iconeResultado: Icone }) => (
          <li
            key={resultado}
            className="relative flex items-center gap-4 rounded-card border border-sage bg-white px-6 shadow-[0_6px_16px_-10px_rgb(0_41_77/0.35)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mist/40">
              <Icone aria-hidden="true" className="size-5 text-navy" strokeWidth={1.75} />
            </span>
            <span className="text-[1.0625rem] leading-snug font-semibold text-navy">{resultado}</span>
            <span aria-hidden="true" className="absolute -top-2.5 -right-2.5 flex size-6 items-center justify-center rounded-full bg-sage text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Celular/tablet: os 6 pares em lista (problema riscado → resultado). */
export function ParesEmLista() {
  return (
    <ul className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
      {pares.map(({ problema, resultado, iconeResultado: Icone }) => (
        <li key={problema} className="rounded-card border border-sage/60 bg-white/70 p-5">
          <p className="text-[0.9375rem] text-ink-muted/80 line-through decoration-caramel/70">
            <span className="sr-only">Hoje: </span>
            {problema}
          </p>
          <svg aria-hidden="true" viewBox="0 0 12 16" className="my-2 h-4 w-3 text-caramel">
            <path d="M6 1 V14 M1.5 9.5 L6 14 L10.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="flex items-center gap-3 font-semibold text-navy">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist/40">
              <Icone aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
            </span>
            <span>
              <span className="sr-only">Com a Inova: </span>
              {resultado}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
