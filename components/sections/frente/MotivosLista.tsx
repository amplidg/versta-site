import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/*
 * Três colunas com ícone, título e frase (padrão do "O custo de não estar em
 * dia" da Semear): lado a lado no computador, empilhadas no celular.
 */

export type Motivo = { titulo: string; texto: string; icone: LucideIcon };

export function MotivosLista({ itens }: { itens: Motivo[] }) {
  return (
    <ul className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
      {itens.map(({ titulo, texto, icone: Icone }, i) => (
        <Reveal as="li" key={titulo} delay={i * 100} className="text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-caramel/60">
            <Icone aria-hidden="true" className="size-6 text-caramel-700" strokeWidth={1.5} />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-navy">{titulo}</h3>
          <p className="mx-auto mt-2 max-w-xs text-ink-muted">{texto}</p>
        </Reveal>
      ))}
    </ul>
  );
}
