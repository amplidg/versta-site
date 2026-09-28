import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Manifesto } from "@/components/sections/Manifesto";
import { OrgChart } from "@/components/sections/OrgChart";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre a Versta",
  description:
    "Conheça a Versta: o significado do nome, o símbolo do cão e a forma de atuar que une análise, experiência e percepção para indicar o caminho mais seguro.",
  path: "/sobre",
});

/* Os arquétipos (Sábio e Explorador) traduzidos em forma de atuar,
   sem citar a palavra no texto público. */
const formaDeAtuar = [
  {
    titulo: "Análise antes da direção",
    texto:
      "Toda indicação parte de uma leitura cuidadosa da empresa. Compreender o cenário com clareza vem antes de apontar qualquer caminho.",
  },
  {
    titulo: "Abertura para novos caminhos",
    texto:
      "A análise se completa com a experiência e a percepção. Olhar além do óbvio ajuda a antecipar riscos e reconhecer oportunidades.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a Versta"
        title="Experiência acumulada ao longo da jornada"
        lead="A Versta diagnostica empresas, identifica o que precisa se desenvolver para crescer e as conecta às soluções especializadas do seu ecossistema de parceiros."
        imagem="quemEVersta"
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
      </PageHero>

      {/* O nome */}
      <Section tone="forest" aria-labelledby="nome-titulo">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-peach-100">O nome</p>
            <h2 id="nome-titulo" className="mt-4 font-display text-[clamp(3.5rem,2rem+6vw,6rem)] leading-none font-bold text-peach-100">
              Versta
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lead text-offwhite lg:col-span-7 lg:col-start-6">
            <p>
              Versta é uma palavra que remete à ideia de caminho e de distância
              percorrida. Mais do que medir quilômetros, representa a experiência
              acumulada ao longo da jornada.
            </p>
            <p>
              Cada desafio enfrentado amplia a capacidade de compreender o terreno,
              reconhecer padrões e indicar a direção mais segura para seguir adiante.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* O símbolo */}
      <Manifesto />

      {/* Forma de atuar */}
      <Section aria-labelledby="atuar-titulo">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                id="atuar-titulo"
                eyebrow="Forma de atuar"
                title="Rigor para analisar, disposição para explorar"
                lead="A forma de atuar da Versta combina a profundidade da análise com a atenção a cada trecho do caminho."
              />
            </Reveal>
            <Reveal delay={120}>
              <Illustration
                imagem="sobreCao"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="mt-10 aspect-[4/3] rounded-card"
              />
            </Reveal>
          </div>
          <ul className="space-y-6 lg:col-span-7 lg:pt-8">
            {formaDeAtuar.map((item, i) => (
              <Reveal
                as="li"
                key={item.titulo}
                delay={i * 120}
                className={`rounded-card p-8 md:p-10 ${i === 0 ? "bg-peach-100" : "bg-mist/55"}`}
              >
                <h3 className="text-h3 text-navy">{item.titulo}</h3>
                <p className="mt-3 text-ink-muted">{item.texto}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Estrutura de atuação */}
      <Section tone="peach" aria-labelledby="estrutura-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="estrutura-titulo"
              eyebrow="Estrutura"
              title="Como a Versta se organiza"
              lead="A atuação se divide em três frentes: o Instituto, os Projetos e a Consultoria."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <OrgChart />
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
