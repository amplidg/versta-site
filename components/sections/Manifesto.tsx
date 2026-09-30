import { DogSymbol } from "@/components/brand/DogSymbol";
import { Reveal } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pilares = [
  { nome: "Análise", texto: "O rigor para ler dados e compreender o terreno." },
  { nome: "Experiência", texto: "A jornada acumulada, que ajuda a reconhecer padrões e indicar a direção." },
  { nome: "Percepção", texto: "A atenção aos sinais discretos, antes que fiquem evidentes." },
];

/** Seção do símbolo do cão: a inteligência complementar. */
export function Manifesto({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <Section tone="navy" aria-labelledby="manifesto-titulo" className="overflow-hidden">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <Reveal from="fade" className="flex flex-col items-center lg:col-span-5">
          <DogSymbol tone="branco" label="Símbolo da Versta: um cão atento" className="w-56 md:w-80" />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              as={headingLevel}
              id="manifesto-titulo"
              onDark
              eyebrow="O símbolo"
              title="Um companheiro atento ao terreno"
              lead="O cão representa a inteligência complementar. O rigor da análise se soma à experiência e à intuição para perceber sinais discretos, antecipar riscos e identificar oportunidades antes que fiquem evidentes."
            />
            <p className="mt-5 max-w-2xl text-mist">
              É o companheiro da jornada: atento ao terreno, indica direções,
              evita armadilhas e conduz com segurança.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-8 border-t border-offwhite/15 pt-10 sm:grid-cols-3">
            {pilares.map((p, i) => (
              <Reveal as="li" key={p.nome} delay={i * 120}>
                <p className="font-display text-2xl font-semibold text-peach-100">{p.nome}</p>
                <p className="mt-2 text-[0.9375rem] text-mist">{p.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
