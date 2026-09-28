import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ContactFormWithParams } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solicitar diagnóstico",
  description:
    "Solicite um diagnóstico da sua empresa. A Versta identifica as áreas que precisam se desenvolver e indica o caminho, conectando você às soluções certas.",
  path: "/diagnostico",
});

const passos = [
  "Você envia o formulário contando um pouco sobre a sua empresa.",
  "[PREENCHER: o que acontece após o envio — prazo de retorno, primeira conversa etc.]",
  "[PREENCHER: como é feito o diagnóstico e o que a empresa recebe ao final.]",
];

export default function DiagnosticoPage() {
  return (
    <>
      <PageHero
        eyebrow="Diagnóstico"
        title="O primeiro passo é entender onde você está"
        lead="O diagnóstico mostra as dores da empresa e as áreas que precisam se desenvolver. A partir dele, a Versta indica o caminho e as soluções mais adequadas."
        imagem="diagnosticoEmpresarial"
      />

      <Section tone="peach" aria-labelledby="form-titulo">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading id="form-titulo" eyebrow="Solicitação" title="Conte sobre a sua empresa" />
            </Reveal>
            <Reveal delay={120}>
              <h3 className="mt-10 font-display text-xl font-semibold text-navy">O que acontece depois</h3>
              <ol className="mt-5 space-y-5">
                {passos.map((passo, i) => (
                  <li key={passo} className="flex gap-4">
                    <span aria-hidden="true" className="font-display font-semibold text-caramel-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink-muted">
                      <Texto>{passo}</Texto>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={150} className="rounded-card bg-offwhite p-6 md:p-10 lg:col-span-8">
            <ContactFormWithParams submitLabel="Solicitar diagnóstico" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
