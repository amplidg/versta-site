import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { heroProjetos } from "@/data/projetos-sociais";
import { asset } from "@/lib/paths";

/*
 * Topo da página Projetos Sociais (especificação do Lucas, 04/11), no mesmo
 * padrão do topo do Programa SH2: texto à esquerda e, à direita, a ilustração
 * sem moldura, sangrando até a borda da janela e com as bordas dissolvidas no
 * fundo (máscara e entrada suave nas classes sh2-hero-* de globals.css). No
 * celular, a imagem vai para o topo.
 */

const atraso = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function ProjetosHero({
  titulo,
  texto,
  children,
}: {
  titulo: string;
  texto: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden"
    >
      <div className="sh2-hero-midia relative h-[280px] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[50vw] lg:w-[54vw]">
        {/* recuo de 6px: evita um fio da imagem na borda da máscara */}
        <div className="absolute inset-x-0 inset-y-1.5 md:left-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- site estático */}
          <img
            src={asset(heroProjetos.arquivo)}
            alt={heroProjetos.alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="sh2-hero-img absolute inset-0 size-full object-cover"
          />
        </div>
      </div>

      <div className="container-site relative z-10 grid pt-2 pb-16 md:grid-cols-12 md:pt-14 md:pb-24 lg:min-h-[40rem] lg:items-center">
        <div className="md:col-span-7 md:pr-6 lg:col-span-6 lg:pr-0">
          <nav
            aria-label="Trilha de navegação"
            className="sh2-hero-entra mb-6"
            style={atraso(60)}
          >
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="hover:text-navy hover:underline">
                  Início
                </Link>
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-navy">
                Projetos Sociais
              </li>
            </ol>
          </nav>
          <p
            className="sh2-hero-entra eyebrow mb-5 flex items-center gap-3 text-caramel-700"
            style={atraso(120)}
          >
            <span aria-hidden="true" className="h-px w-8 bg-caramel" />
            Projetos Sociais
          </p>
          <h1
            id="page-title"
            className="sh2-hero-entra text-h1 text-balance text-navy"
            style={atraso(200)}
          >
            {titulo}
          </h1>
          <p
            className="sh2-hero-entra mt-6 max-w-xl text-lead text-ink-muted"
            style={atraso(320)}
          >
            {texto}
          </p>
          <div
            className="sh2-hero-entra mt-9 flex flex-col gap-3 md:flex-row md:flex-wrap max-md:[&>*]:w-full"
            style={atraso(440)}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
