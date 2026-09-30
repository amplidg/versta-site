import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { Texto } from "@/components/ui/Texto";
import type { ImagemKey } from "@/data/imagens";
import { ctaDiagnostico } from "@/data/navegacao";

type Props = {
  title?: string;
  text?: string;
  imagem?: ImagemKey;
  headingLevel?: "h2" | "h3";
};

/** Chamada final para o diagnóstico, em fundo pastel com ilustração. */
export function CtaBanner({
  title = "Vamos entender o seu terreno?",
  text = "O primeiro passo é um diagnóstico. A partir dele, a Versta aponta as áreas que precisam se desenvolver e indica o caminho, com as soluções certas para cada uma.",
  imagem = "ctaHome",
  headingLevel: H = "h2",
}: Props) {
  return (
    <Section tone="mint" aria-labelledby="cta-titulo">
      <Container>
        <div className="grid overflow-hidden rounded-card bg-offwhite/60 lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center p-8 md:p-14">
            <p className="eyebrow mb-4 flex items-center gap-3 text-caramel-700">
              <span aria-hidden="true" className="h-px w-8 bg-caramel" />
              Diagnóstico
            </p>
            <H id="cta-titulo" className="text-h2 text-navy">
              <Texto>{title}</Texto>
            </H>
            <p className="mt-5 max-w-lg text-lead text-ink-muted">
              <Texto>{text}</Texto>
            </p>
            <div className="mt-9">
              <Button href={ctaDiagnostico.href} variant="accent" arrow>
                {ctaDiagnostico.label}
              </Button>
            </div>
          </Reveal>
          <Illustration
            imagem={imagem}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="min-h-72 lg:min-h-[28rem]"
          />
        </div>
      </Container>
    </Section>
  );
}
