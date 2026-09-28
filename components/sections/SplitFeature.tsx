import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section, type SectionTone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import type { ImagemKey } from "@/data/imagens";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  paragrafos: string[];
  imagem: ImagemKey;
  /** Imagem à esquerda (padrão: à direita). */
  reverse?: boolean;
  tone?: SectionTone;
  /** Conteúdo extra abaixo do texto (links, botões). */
  children?: ReactNode;
};

/** Seção em duas colunas: texto de um lado, ilustração do outro. */
export function SplitFeature({
  id,
  eyebrow,
  title,
  paragrafos,
  imagem,
  reverse = false,
  tone = "offwhite",
  children,
}: Props) {
  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal
          from={reverse ? "left" : "right"}
          className={`lg:col-span-6 ${reverse ? "lg:order-1" : "lg:order-2"}`}
        >
          <Illustration
            imagem={imagem}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/9] w-full rounded-card"
          />
        </Reveal>
        <Reveal
          delay={120}
          className={`lg:col-span-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}
        >
          <SectionHeading id={id} eyebrow={eyebrow} title={title} />
          <div className="mt-6 space-y-5 text-lead text-ink-muted">
            {paragrafos.map((p) => (
              <p key={p}>
                <Texto>{p}</Texto>
              </p>
            ))}
          </div>
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </Section>
  );
}
