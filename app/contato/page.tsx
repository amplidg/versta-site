import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: "Fale com a Versta. Envie sua mensagem ou use os nossos canais de atendimento.",
  path: "/contato",
});

export default function ContatoPage() {
  const canais = [
    { icon: Phone, label: "Telefone", value: site.contato.telefone },
    { icon: MessageCircle, label: "WhatsApp", value: site.contato.whatsapp },
    { icon: Mail, label: "E-mail", value: site.contato.email },
    { icon: MapPin, label: "Endereço", value: `${site.contato.endereco} — ${site.contato.cidade}` },
    { icon: Clock, label: "Horário", value: site.contato.horario },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar"
        lead="Envie sua mensagem pelo formulário ou use um dos canais abaixo."
        imagem="contatoHero"
      />

      <Section tone="peach" aria-labelledby="canais-titulo">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading id="canais-titulo" eyebrow="Canais" title="Onde encontrar a Versta" />
            </Reveal>
            <Reveal delay={120}>
              <dl className="mt-10 space-y-6">
                {canais.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-caramel-700" strokeWidth={1.5} />
                    <div>
                      <dt className="text-sm font-semibold tracking-wide text-navy uppercase">{label}</dt>
                      <dd className="mt-1 text-ink-muted">
                        <Texto>{value}</Texto>
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              {/* TODO [PREENCHER]: incorporar mapa (Google Maps embed) quando o endereço estiver definido */}
            </Reveal>
          </div>
          <Reveal delay={150} className="rounded-card bg-offwhite p-6 md:p-10 lg:col-span-8">
            <h2 className="sr-only">Formulário de contato</h2>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
