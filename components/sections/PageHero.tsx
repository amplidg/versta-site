import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Illustration } from "@/components/ui/Illustration";
import { Texto } from "@/components/ui/Texto";
import type { ImagemKey } from "@/data/imagens";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  imagem: ImagemKey;
  children?: ReactNode;
  /** Conteúdo acima do eyebrow (ex.: breadcrumb). */
  top?: ReactNode;
};

/** Topo das páginas internas: texto à esquerda, ilustração à direita. */
export function PageHero({ eyebrow, title, lead, imagem, children, top }: Props) {
  return (
    <section aria-labelledby="page-title" className="pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          {top}
          <p className="eyebrow mb-5 flex items-center gap-3 text-caramel-700">
            <span aria-hidden="true" className="h-px w-8 bg-caramel" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="text-h1 text-navy">
            <Texto>{title}</Texto>
          </h1>
          {lead && (
            <p className="mt-6 max-w-xl text-lead text-ink-muted">
              <Texto>{lead}</Texto>
            </p>
          )}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        <Reveal from="fade" delay={150} className="lg:col-span-6">
          <Illustration
            imagem={imagem}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/10] w-full rounded-card"
          />
        </Reveal>
      </div>
    </section>
  );
}
