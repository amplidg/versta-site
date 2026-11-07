import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteEmblema } from "@/components/sections/FrenteEmblema";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { breadcrumbJsonLd } from "@/lib/seo";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { nome: "Início", path: "/" },
              { nome: "Soluções", path: "/consultoria" },
              { nome, path: `/consultoria/${slug}` },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      {/* Celular (pedido do Lucas, 07/11): tudo centralizado, na ordem título,
          emblema, texto, selo e botão. Tablet/computador: texto, selo e botão
          à esquerda e o emblema à direita, ocupando as três linhas. */}
      <Container className="grid gap-7 pt-6 pb-16 max-md:text-center md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:pt-14 md:pb-24 lg:min-h-[40rem] lg:content-center">
        <Reveal className="md:col-span-7 md:row-start-1 md:pr-6 lg:col-span-6 lg:pr-0">
          <nav aria-label="Trilha de navegação" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted max-md:justify-center">
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
          <p className="eyebrow mb-5 flex items-center gap-3 text-caramel-700 max-md:justify-center">
            <span aria-hidden="true" className="h-px w-8 bg-caramel" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="text-h1 text-balance text-navy">
            {titulo}
          </h1>
        </Reveal>

        <div className="flex justify-center md:col-span-5 md:col-start-8 md:row-span-3 md:row-start-1 md:self-center lg:col-span-6 lg:col-start-7">
          <FrenteEmblema
            icon={emblema.icone}
            color={emblema.cores}
            slug={slug}
            className="w-[180px] md:w-full md:max-w-[22rem] lg:max-w-[30rem]"
          />
        </div>

        <Reveal delay={100} className="md:col-span-7 md:row-start-2 md:mt-6 md:pr-6 lg:col-span-6 lg:pr-0">
          <p className="max-w-xl text-lead text-ink-muted max-md:mx-auto">{texto}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy max-md:flex max-md:flex-col">
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${selo.fundo}`}>
              <SeloIcone aria-hidden="true" className={`size-4 ${selo.cor}`} strokeWidth={1.75} />
            </span>
            {/* no celular, em duas linhas equilibradas (pedido do Lucas, 07/11) */}
            <span className="max-md:max-w-[16rem] max-md:text-balance">{selo.texto}</span>
          </p>
        </Reveal>

        <Reveal
          delay={160}
          className="flex flex-col gap-3 md:col-span-7 md:row-start-3 md:mt-8 md:flex-row md:flex-wrap md:self-start lg:col-span-6 max-md:[&>*]:w-full"
        >
          {botoes ?? (
            <Button href={prediagUrl} variant="primary" arrow>
              Fazer o pré-diagnóstico
            </Button>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
