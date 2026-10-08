import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

/**
 * Página PROVISÓRIA do SH2 (pedido do Lucas, 08/10/2026): existe para o botão
 * "Conheça o SH2" da Metodologia ter destino. O conteúdo definitivo ainda
 * será enviado — só o parágrafo de apresentação é texto real.
 */

export const metadata: Metadata = pageMetadata({
  title: "SH2: Ser Humano em Harmonia",
  description:
    "O SH2 é o programa que coloca em prática a metodologia da Versta para saúde mental nas empresas, com apoio à conformidade com a NR-1.",
  path: "/metodologia/sh2",
});

const blocos = [
  { titulo: "O que o programa inclui", texto: "[PREENCHER: ações e profissionais que fazem parte do SH2.]" },
  { titulo: "Para quem é", texto: "[PREENCHER: perfil das empresas atendidas pelo SH2.]" },
  { titulo: "Como funciona", texto: "[PREENCHER: etapas, duração e formato do programa.]" },
];

export default function Sh2Page() {
  return (
    <>
      <PageHero
        top={
          <nav aria-label="Você está em" className="mb-6 flex items-center gap-1.5 text-sm text-ink-muted">
            <Link href="/metodologia" className="underline-offset-4 hover:underline">
              Metodologia
            </Link>
            <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
            <span aria-current="page">SH2</span>
          </nav>
        }
        eyebrow="A aplicação da metodologia"
        title="SH2: Ser Humano em Harmonia"
        lead="O SH2 é a forma como colocamos essa metodologia em prática dentro das empresas. Ele reúne, em um só programa, as ações e os profissionais necessários para cuidar da saúde mental dos colaboradores e apoiar a empresa na conformidade com a NR-1."
        imagem="sh2Hero"
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
        <Button href="/metodologia" variant="outline">
          Ver a metodologia
        </Button>
      </PageHero>

      <Section tone="peach" aria-labelledby="sh2-sobre-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="sh2-sobre-titulo" eyebrow="O programa" title="Página em construção" />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {blocos.map((b, i) => (
              <Reveal as="li" key={b.titulo} delay={i * 120} className="rounded-card bg-offwhite p-7 md:p-8">
                <h3 className="text-h3 text-navy">{b.titulo}</h3>
                <p className="mt-3 text-ink-muted">
                  <Texto>{b.texto}</Texto>
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
