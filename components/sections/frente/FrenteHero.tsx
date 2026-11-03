import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteEmblema } from "@/components/sections/FrenteEmblema";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/*
 * Topo das páginas próprias das frentes (padrão criado na Semear, 29/10):
 * trilha "Soluções > Frente", linha pequena, título, texto, selo discreto e
 * botão do pré-diagnóstico (ou outros botões, via `botoes`) à esquerda; à
 * direita, o emblema da frente (no celular, em cima).
 */

type Props = {
  nome: string;
  slug: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  selo: { texto: string; icone: LucideIcon; fundo: string; cor: string };
  /** Ícone e cores da mancha do emblema ([tom mais forte, tom mais claro]). */
  emblema: { icone: LucideIcon; cores: [string, string] };
  prediagUrl: string;
  /** Botões no lugar do padrão (só "Fazer o pré-diagnóstico"). */
  botoes?: ReactNode;
};

export function FrenteHero({ nome, slug, eyebrow, titulo, texto, selo, emblema, prediagUrl, botoes }: Props) {
  const SeloIcone = selo.icone;
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
      <Container className="grid items-center gap-6 pt-6 pb-16 md:grid-cols-12 md:gap-8 md:pt-14 md:pb-24 lg:min-h-[40rem]">
        <Reveal className="md:col-span-7 md:pr-6 lg:col-span-6 lg:pr-0">
          <nav aria-label="Trilha de navegação" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              <li className="flex items-center gap-1.5">
                <Link href="/consultoria" className="hover:text-navy hover:underline">
                  Soluções
                </Link>
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-navy">
                {nome}
              </li>
            </ol>
          </nav>
          <p className="eyebrow mb-5 flex items-center gap-3 text-caramel-700">
            <span aria-hidden="true" className="h-px w-8 bg-caramel" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="text-h1 text-balance text-navy">
            {titulo}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-ink-muted">{texto}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${selo.fundo}`}>
              <SeloIcone aria-hidden="true" className={`size-4 ${selo.cor}`} strokeWidth={1.75} />
            </span>
            {selo.texto}
          </p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap max-md:[&>*]:w-full">
            {botoes ?? (
              <Button href={prediagUrl} variant="primary" arrow>
                Fazer o pré-diagnóstico
              </Button>
            )}
          </div>
        </Reveal>
        {/* depois do texto no código (leitores de tela leem o título antes);
            no celular, aparece em cima */}
        <div className="order-first flex justify-center md:order-none md:col-span-5 lg:col-span-6">
          <FrenteEmblema
            icon={emblema.icone}
            color={emblema.cores}
            slug={slug}
            className="w-[180px] md:w-full md:max-w-[22rem] lg:max-w-[30rem]"
          />
        </div>
      </Container>
    </section>
  );
}
