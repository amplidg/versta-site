"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projetos, type ProjetoSocial } from "@/data/projetos-sociais";
import { asset } from "@/lib/paths";

/*
 * "Projetos realizados" (página Projetos Sociais, 04/11). Só aparece quando
 * a lista `projetos` de data/projetos-sociais.ts tiver algum projeto (hoje está
 * vazia). Cada card mostra a primeira foto, a causa como etiqueta, o título, a
 * empresa parceira, a data, a descrição e o resultado; clicando na foto, abre o
 * visualizador com todas as fotos do projeto (components/ui/Lightbox.tsx).
 */

export function ProjetosRealizados() {
  if (projetos.length === 0) return null;
  return (
    <Section aria-labelledby="realizados-titulo">
      <Container>
        <Reveal>
          <SectionHeading
            id="realizados-titulo"
            title="Projetos realizados"
            align="center"
          />
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <Reveal as="li" key={p.titulo} delay={i * 80}>
              <CardProjeto projeto={p} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function CardProjeto({ projeto: p }: { projeto: ProjetoSocial }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const capa = p.imagens[0];
  const fotos = p.imagens.map((img) => ({
    src: asset(img.arquivo),
    alt: img.alt,
    legenda: p.titulo,
  }));
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-navy/10 bg-white/70">
      {capa && (
        <button
          type="button"
          onClick={() => setAberta(0)}
          aria-label={`Ver fotos do projeto ${p.titulo}`}
          className="group relative block aspect-[4/3] overflow-hidden bg-mist/40 outline-none focus-visible:ring-4 focus-visible:ring-navy/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- site estático */}
          <img
            src={asset(capa.arquivo)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          {p.imagens.length > 1 && (
            <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-offwhite/90 px-3 py-1 text-xs font-semibold text-navy">
              <Expand aria-hidden="true" className="size-3.5" />
              {p.imagens.length} fotos
            </span>
          )}
        </button>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="self-start rounded-full bg-mint px-3 py-1 text-xs font-semibold text-green-900">
          {p.causa}
        </p>
        <h3 className="mt-4 text-h3 text-navy">{p.titulo}</h3>
        <p className="mt-1 text-sm text-ink-muted">
          {p.empresa ? `${p.empresa} · ` : ""}
          {p.data}
        </p>
        <p className="mt-3 text-ink-muted">{p.descricao}</p>
        {p.resultado && (
          <p className="mt-4 border-t border-navy/10 pt-4 font-semibold text-navy">
            {p.resultado}
          </p>
        )}
      </div>
      <Lightbox
        fotos={fotos}
        aberta={aberta}
        onMudar={setAberta}
        rotulo={`Fotos do projeto ${p.titulo}`}
      />
    </article>
  );
}
