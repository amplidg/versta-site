import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { HandHeart, Handshake, Leaf, Lightbulb } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { frentes, type Frente } from "@/data/frentes";

/**
 * Organograma da estrutura de atuação da Versta:
 *   VERSTA → Projetos Sociais · Metodologia (Projeto SH2) ·
 *            Soluções (9 frentes)
 * Os nomes dos ramos são os do organograma (definidos pelo Lucas); os links
 * continuam levando a /instituto, /projetos e /consultoria.
 * Usado na Home (bloco "Quem é a Versta") e na página Sobre.
 *
 * - Desktop (lg): árvore completa, com as 9 frentes lado a lado.
 * - Tablet (md): mesma árvore, frentes em grade 3×3.
 * - Celular: árvore vertical, com linha de conexão à esquerda.
 * - Estrutura em listas aninhadas; cada card leva à página correspondente.
 */

type Ramo = {
  nome: string;
  href: string;
  icone: LucideIcon;
  /** Cor do círculo do ícone (pastel da paleta). */
  tom: string;
  filho?: { nome: string; detalhe?: string; icone: LucideIcon; href: string };
  /** Ramo que se abre nas 9 frentes. */
  frentes?: boolean;
};

const ramos: Ramo[] = [
  { nome: "Projetos Sociais", href: "/instituto", icone: Leaf, tom: "bg-peach-100" },
  {
    nome: "Metodologia",
    href: "/projetos",
    icone: Lightbulb,
    tom: "bg-mist",
    filho: { nome: "Projeto SH2", detalhe: "Ser Humano em Harmonia", icone: HandHeart, href: "/projetos" },
  },
  { nome: "Soluções", href: "/consultoria", icone: Handshake, tom: "bg-sage/60", frentes: true },
];

const linha = "bg-caramel";
const cardBase =
  "rounded-card border border-navy/10 bg-offwhite transition-colors duration-300 hover:border-caramel/60 hover:bg-peach-100/60";

export function OrgChart() {
  return (
    <figure aria-label="Estrutura de atuação da Versta">
      <Desktop />
      <Mobile />
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop e tablet                                                    */
/* ------------------------------------------------------------------ */

function Desktop() {
  return (
    <div className="hidden md:block">
      {/* Topo */}
      <div className="flex flex-col items-center">
        <Link href="/sobre" className="rounded-card bg-navy px-12 py-6 transition-colors hover:bg-green-900">
          <Logo tone="branca" className="w-44" />
          <span className="sr-only"> — sobre a Versta</span>
        </Link>
        <span aria-hidden="true" className={`h-10 w-px ${linha}`} />
      </div>

      {/* Ramos */}
      <div className="relative">
      {/* barra horizontal entre os centros das colunas 1 e 3 (3 colunas, gap 1.25rem) */}
      <span
        aria-hidden="true"
        className={`absolute top-0 h-px ${linha}`}
        style={{ left: "calc((100% - 2.5rem) / 6)", right: "calc((100% - 2.5rem) / 6)" }}
      />
      <ul className="grid grid-cols-3 gap-5">
        {ramos.map((r) => (
          <li key={r.nome} className="flex flex-col items-center">
            <span aria-hidden="true" className={`h-8 w-px ${linha}`} />
            <RamoCard ramo={r} />
            {r.filho && (
              <>
                <span aria-hidden="true" className={`h-8 w-px ${linha}`} />
                <ul className="w-full max-w-60">
                  <li>
                    <FilhoCard filho={r.filho} />
                  </li>
                </ul>
                <span aria-hidden="true" className="h-10" />
              </>
            )}
            {/* Soluções: linha desce até a barra das frentes */}
            {r.frentes && <span aria-hidden="true" className={`w-px flex-1 ${linha}`} />}
          </li>
        ))}
      </ul>
      </div>

      {/* Frentes (ramo Soluções) */}
      <FrentesRow />
    </div>
  );
}

function RamoCard({ ramo }: { ramo: Ramo }) {
  const Icon = ramo.icone;
  return (
    <Link href={ramo.href} className={`${cardBase} flex w-full flex-col items-center gap-3 px-6 py-6 text-center`}>
      <span className={`flex size-12 items-center justify-center rounded-full ${ramo.tom}`}>
        <Icon aria-hidden="true" className="size-6 text-caramel-700" strokeWidth={1.5} />
      </span>
      <span className="font-display text-2xl font-semibold text-navy">{ramo.nome}</span>
    </Link>
  );
}

function FilhoCard({ filho }: { filho: NonNullable<Ramo["filho"]> }) {
  const Icon = filho.icone;
  return (
    <Link href={filho.href} className={`${cardBase} flex flex-col items-center gap-2 px-5 py-5 text-center`}>
      <Icon aria-hidden="true" className="size-6 text-caramel-700" strokeWidth={1.5} />
      <span className="font-display text-lg leading-tight font-semibold text-navy">{filho.nome}</span>
      {filho.detalhe && <span className="text-sm text-ink-muted">{filho.detalhe}</span>}
    </Link>
  );
}

function FrentesRow() {
  return (
    <div className="relative">
      {/* barra horizontal: do centro da 1ª ao centro da 9ª frente (só lg; 9 colunas, gap 0.75rem) */}
      <span
        aria-hidden="true"
        className={`absolute top-0 hidden h-px lg:block ${linha}`}
        style={{ left: "calc((100% - 6rem) / 18)", right: "calc((100% - 6rem) / 18)" }}
      />
      {/* tablet: linha de topo contínua ligando a grade */}
      <span aria-hidden="true" className={`absolute top-0 right-0 left-0 h-px lg:hidden ${linha}`} />
      <ul aria-label="Frentes de consultoria" className="grid grid-cols-3 gap-3 pt-6 lg:grid-cols-9 lg:pt-0">
        {frentes.map((f) => (
          <li key={f.slug} className="flex flex-col items-center">
            {/* haste com ponto até cada frente (só lg) */}
            <span aria-hidden="true" className="hidden flex-col items-center lg:flex">
              <span className={`h-6 w-px ${linha}`} />
              <span className="-mt-1 size-2 rounded-full bg-caramel" />
              <span className="h-2" />
            </span>
            <FrenteCard frente={f} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FrenteCard({ frente }: { frente: Frente }) {
  const Icon = frente.icone;
  return (
    <Link
      href={`/consultoria/${frente.slug}`}
      className={`${cardBase} flex h-full w-full flex-col items-center gap-2 px-3 py-5 text-center`}
    >
      <Icon aria-hidden="true" className="size-7 text-caramel-700" strokeWidth={1.25} />
      <span className="mt-1 font-display text-base leading-tight font-semibold text-navy">{frente.nome}</span>
      <span className="text-[0.8125rem] leading-snug text-ink-muted">{frente.area}</span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Celular: árvore vertical                                            */
/* ------------------------------------------------------------------ */

function Mobile() {
  return (
    <div className="md:hidden">
      <Link href="/sobre" className="flex justify-center rounded-card bg-navy px-6 py-5">
        <Logo tone="branca" className="w-40" />
        <span className="sr-only"> — sobre a Versta</span>
      </Link>

      {/* trecho entre o topo e o primeiro ramo */}
      <div aria-hidden="true" className={`ml-5 h-5 w-px ${linha}`} />
      <ul className="relative ml-5">
        {ramos.map((r, i) => {
          const Icon = r.icone;
          const ultimo = i === ramos.length - 1;
          return (
            <li key={r.nome} className={`relative pl-6 ${ultimo ? "" : "pb-6"}`}>
              {/* linha vertical: no último ramo, para no conector */}
              <span aria-hidden="true" className={`absolute top-0 left-0 w-px ${linha} ${ultimo ? "h-7" : "bottom-0"}`} />
              {/* conector horizontal até o card */}
              <span aria-hidden="true" className={`absolute top-7 left-0 h-px w-6 ${linha}`} />
              <Link href={r.href} className={`${cardBase} flex items-center gap-4 px-4 py-3`}>
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${r.tom}`}>
                  <Icon aria-hidden="true" className="size-5 text-caramel-700" strokeWidth={1.5} />
                </span>
                <span className="font-display text-xl font-semibold text-navy">{r.nome}</span>
              </Link>

              {/* filhos */}
              {(r.filho || r.frentes) && (
              <ul className="relative mt-3 ml-5">
                {(r.filho
                  ? [{ key: r.filho.nome, href: r.filho.href, icon: r.filho.icone, nome: r.filho.nome, sub: r.filho.detalhe }]
                  : frentes.map((f) => ({ key: f.slug, href: `/consultoria/${f.slug}`, icon: f.icone, nome: f.nome, sub: f.area }))
                ).map((item, j, lista) => {
                  const ItemIcon = item.icon;
                  const ultimoItem = j === lista.length - 1;
                  return (
                    <li key={item.key} className="relative pt-2 pl-5">
                      <span
                        aria-hidden="true"
                        className={`absolute top-0 left-0 w-px bg-caramel/70 ${ultimoItem ? "h-[1.9rem]" : "bottom-0"}`}
                      />
                      <span aria-hidden="true" className="absolute top-[1.9rem] left-0 h-px w-5 bg-caramel/70" />
                      <Link href={item.href} className={`${cardBase} flex items-center gap-3 px-3 py-2.5`}>
                        <ItemIcon aria-hidden="true" className="size-5 shrink-0 text-caramel-700" strokeWidth={1.5} />
                        <span className="leading-tight">
                          <span className="block font-display font-semibold text-navy">{item.nome}</span>
                          {item.sub && <span className="text-[0.8125rem] text-ink-muted">{item.sub}</span>}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
