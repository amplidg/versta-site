import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FrentesGrid } from "@/components/sections/FrentesGrid";
import { PageHero } from "@/components/sections/PageHero";
import { TrailSteps } from "@/components/sections/TrailSteps";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaDiagnostico } from "@/data/navegacao";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Consultoria",
  description:
    "Nove frentes de consultoria, da consultoria ambiental ao marketing. A Versta diagnostica sua empresa e conecta cada área à solução especializada certa.",
  path: "/consultoria",
});

export default function ConsultoriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultoria"
        title="Um diagnóstico, nove caminhos possíveis"
        lead="A Versta funciona como um hub: analisa a empresa, aponta as áreas que precisam se desenvolver e conecta cada uma à solução especializada do seu ecossistema de parceiros."
        imagem="areasAtuacao"
      >
        <Button href={ctaDiagnostico.href} variant="primary" arrow>
          {ctaDiagnostico.label}
        </Button>
        <Button href="#frentes" variant="outline">
          Ver as frentes
        </Button>
      </PageHero>

      <Section tone="peach" aria-labelledby="modelo-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="modelo-titulo"
              eyebrow="O modelo"
              title="Quem chega com um problema sai com um caminho"
              lead="Nem sempre está claro por onde começar. Por isso, o trabalho parte sempre de um diagnóstico."
            />
          </Reveal>
          <div className="mt-16">
            <TrailSteps
              etapas={[
                {
                  titulo: "A empresa chega",
                  texto: "Com um problema, uma dúvida ou a vontade de crescer.",
                },
                {
                  titulo: "A Versta analisa",
                  texto: "Diagnostica a empresa e identifica as dores e as áreas a desenvolver.",
                },
                {
                  titulo: "Aponta o caminho",
                  texto: "Indica quais frentes respondem a cada necessidade.",
                },
                {
                  titulo: "Conecta com quem resolve",
                  texto: "Aproxima a empresa das soluções especializadas do ecossistema.",
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section id="frentes" aria-labelledby="frentes-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="frentes-titulo"
              eyebrow="As frentes"
              title="Nove frentes de consultoria"
              lead="Cada frente reúne soluções especializadas para uma área da empresa. Escolha uma para saber mais."
            />
          </Reveal>
          <div className="mt-14">
            <FrentesGrid />
          </div>
        </Container>
      </Section>

      <CtaBanner
        title="Não sabe por qual frente começar?"
        text="É para isso que existe o diagnóstico. Ele mostra quais áreas precisam de atenção e qual caminho seguir."
      />
    </>
  );
}
