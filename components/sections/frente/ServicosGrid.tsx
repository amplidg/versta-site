import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/*
 * Cards de serviços das páginas das frentes (padrão da Semear, 29/10): ícone em
 * círculo pastel, título e uma frase; 3 em cima e 2 embaixo, centralizados, no
 * computador; 2 por linha no tablet; 1 no celular. Hover discreto, sem links.
 */

export type Servico = { titulo: string; texto: string; icone: LucideIcon; fundo: string };

/**
 * `colunas={2}`: grade 2 × 2 no computador (Excelência, pedido do Lucas,
 * 04/11: com 4 cards, 3 em cima e 1 embaixo ficava desequilibrado).
 */
export function ServicosGrid({ servicos, colunas = 3 }: { servicos: Servico[]; colunas?: 2 | 3 }) {
  return (
    <ul className={`mt-12 flex flex-wrap justify-center gap-5 ${colunas === 2 ? "mx-auto max-w-4xl" : ""}`}>
      {servicos.map(({ titulo, texto, icone: Icone, fundo }, i) => (
        <Reveal
          as="li"
          key={titulo}
          delay={i * 80}
          className={`w-full md:w-[calc((100%-1.25rem)/2)] ${colunas === 3 ? "lg:w-[calc((100%-2.5rem)/3)]" : ""}`}
        >
          {/* o hover fica num elemento interno: o <Reveal> já usa a transição de transform */}
          <div className="h-full rounded-card border border-navy/10 bg-white/70 p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-calm)] hover:-translate-y-1 hover:border-caramel hover:shadow-[0_14px_30px_-18px_rgb(0_41_77/0.35)] motion-reduce:transition-none">
            <span className={`flex size-12 items-center justify-center rounded-full ${fundo}`}>
              <Icone aria-hidden="true" className="size-6 text-navy" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-h3 text-navy">{titulo}</h3>
            <p className="mt-2 text-ink-muted">{texto}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
