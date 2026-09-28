import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { frentes, type Frente } from "@/data/frentes";

type Props = {
  /** Frentes a exibir (padrão: todas). */
  itens?: Frente[];
  /** Nível dos títulos dos cards, conforme a hierarquia da página. */
  headingLevel?: "h3" | "h4";
};

export function FrentesGrid({ itens = frentes, headingLevel = "h3" }: Props) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-card border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
      {itens.map((f, i) => (
        <Reveal as="li" key={f.slug} from="fade" delay={(i % 3) * 90} className="bg-offwhite">
          <FrenteCard frente={f} headingLevel={headingLevel} />
        </Reveal>
      ))}
      {/* Lista parcial (ex.: "outras frentes"): completa a última linha do
          grid com um atalho para a visão geral, só onde sobra célula. */}
      {itens.length < frentes.length && (
        <li
          className={`hidden bg-peach-100 ${itens.length % 2 !== 0 ? "sm:block" : ""} ${
            itens.length % 3 === 0 ? "lg:hidden" : "lg:block"
          } ${itens.length % 3 === 1 ? "lg:col-span-2" : ""}`}
        >
          <Link
            href="/consultoria"
            className="group flex h-full min-h-40 items-end justify-between gap-4 p-7 font-semibold text-navy transition-colors hover:bg-peach-200 md:p-9"
          >
            Ver todas as frentes
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </li>
      )}
    </ul>
  );
}

export function FrenteCard({
  frente,
  headingLevel: H = "h3",
}: {
  frente: Frente;
  headingLevel?: "h3" | "h4";
}) {
  const Icon = frente.icone;
  return (
    <Link
      href={`/consultoria/${frente.slug}`}
      className="group relative flex h-full flex-col gap-10 p-7 transition-colors duration-500 hover:bg-peach-100 focus-visible:bg-peach-100 md:p-9"
    >
      <span className="flex items-start justify-between">
        <Icon aria-hidden="true" className="size-8 text-caramel-700" strokeWidth={1.25} />
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-navy/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
          strokeWidth={1.5}
        />
      </span>
      <span className="mt-auto">
        <H className="font-display text-2xl font-semibold text-navy">{frente.nome}</H>
        <span className="mt-1.5 block text-[0.9375rem] text-ink-muted">{frente.area}</span>
      </span>
    </Link>
  );
}
