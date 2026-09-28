import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FrentesGrid } from "@/components/sections/FrentesGrid";
import { PageHero } from "@/components/sections/PageHero";
import { TrailSteps } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { frentes, getFrente } from "@/data/frentes";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return frentes.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/consultoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const frente = getFrente(slug);
  if (!frente) return {};
  return pageMetadata({
    title: `${frente.nome} — ${frente.area}`,
    description: `${frente.descricaoCurta} A Versta diagnostica sua empresa e conecta você às soluções especializadas de ${frente.area.toLowerCase()}.`,
    path: `/consultoria/${frente.slug}`,
  });
}

export default async function FrentePage({ params }: PageProps<"/consultoria/[slug]">) {
  const { slug } = await params;
  const frente = getFrente(slug);
  if (!frente) notFound();

  const Icon = frente.icone;
  const outras = frentes.filter((f) => f.slug !== frente.slug);

  return (
    <>
      <PageHero
        eyebrow={frente.area}
        title={frente.nome}
        lead={frente.descricaoCurta}
        imagem="conexao"
        top={
          <nav aria-label="Trilha de navegação" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="hover:text-navy hover:underline">Início</Link>
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/consultoria" className="hover:text-navy hover:underline">Consultoria</Link>
                <ChevronRight aria-hidden="true" className="size-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-navy">{frente.nome}</li>
            </ol>
          </nav>
        }
      >
        <Button href={`/diagnostico?frente=${frente.slug}`} variant="primary" arrow>
          Solicitar diagnóstico
        </Button>
      </PageHero>

      {/* Descrição */}
      <Section tone="offwhite" aria-labelledby="sobre-frente" className="pt-0!">
        <Container className="grid gap-10 border-t border-navy/10 pt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Icon aria-hidden="true" className="size-12 text-caramel-700" strokeWidth={1} />
            <h2 id="sobre-frente" className="mt-6 text-h2 text-navy">
              Sobre a frente {frente.nome}
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lead text-ink-muted lg:col-span-8">
            {frente.descricaoLonga.map((p) => (
              <p key={p}>
                <Texto>{p}</Texto>
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Dores */}
      <Section tone="peach" aria-labelledby="dores-titulo">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="dores-titulo"
              eyebrow="Indicações"
              title="Para quais dores essa frente é indicada"
            />
          </Reveal>
          <ul className="divide-y divide-navy/15 border-y border-navy/15 lg:col-span-7">
            {frente.dores.map((dor, i) => (
              <Reveal as="li" key={dor} delay={i * 100} className="flex gap-5 py-6">
                <span aria-hidden="true" className="font-display text-lg font-semibold text-caramel-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-navy">
                  <Texto>{dor}</Texto>
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Como a Versta conecta */}
      <Section aria-labelledby="conecta-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="conecta-titulo"
              eyebrow="O caminho"
              title="Como a Versta conecta essa solução"
              lead={`A frente ${frente.nome} faz parte do ecossistema de parceiros da Versta. O acesso a ela parte sempre do diagnóstico.`}
            />
          </Reveal>
          <div className="mt-16">
            <TrailSteps
              etapas={[
                {
                  titulo: "Diagnóstico",
                  texto: "A Versta analisa a empresa e compreende o contexto em que ela atua.",
                },
                {
                  titulo: "Indicação",
                  texto: `Quando o diagnóstico aponta necessidades de ${frente.area.toLowerCase()}, a frente ${frente.nome} é indicada.`,
                },
                {
                  titulo: "Conexão",
                  texto: `A empresa é conectada à solução especializada. [PREENCHER: parceiros ou formato de atuação da frente ${frente.nome}]`,
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={`Sua empresa precisa de ${frente.area.toLowerCase()}?`}
        text="Comece pelo diagnóstico. Ele confirma se esta é a frente certa e mostra quais outras áreas podem fazer parte do caminho."
      />

      {/* Outras frentes */}
      <Section aria-labelledby="outras-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="outras-titulo" eyebrow="Consultoria" title="Conheça outras frentes" />
          </Reveal>
          <div className="mt-12">
            <FrentesGrid itens={outras} />
          </div>
        </Container>
      </Section>
    </>
  );
}
