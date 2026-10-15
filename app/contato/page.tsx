import type { Metadata } from "next";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
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

const busca = encodeURIComponent(site.mapaBusca);
/** Mapa do Google incorporado (sem chave de API) e link para abrir no app. */
const mapaEmbed = `https://www.google.com/maps?q=${busca}&output=embed`;
const mapaLink = `https://www.google.com/maps/search/?api=1&query=${busca}`;

export default function ContatoPage() {
  const canais = [
    { icon: Phone, label: "Telefone", value: site.contato.telefone, href: `tel:${site.contato.telefoneLink}` },
    { icon: MessageCircle, label: "WhatsApp", value: site.contato.whatsapp },
    { icon: MapPin, label: "Endereço", value: `${site.contato.endereco}, ${site.contato.cidade}` },
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
                {canais.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-caramel-700" strokeWidth={1.5} />
                    <div>
                      <dt className="text-sm font-semibold tracking-wide text-navy uppercase">{label}</dt>
                      <dd className="mt-1 text-ink-muted">
                        {href ? (
                          <a href={href} className="underline-offset-4 hover:text-navy hover:underline">
                            {value}
                          </a>
                        ) : (
                          <Texto>{value}</Texto>
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={150} className="rounded-card bg-offwhite p-6 md:p-10 lg:col-span-8">
            <h2 className="sr-only">Formulário de contato</h2>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>

      {/* Mapa do endereço */}
      <Section aria-labelledby="mapa-titulo">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="mapa-titulo" eyebrow="Como chegar" title="Onde estamos" />
            <a
              href={mapaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-semibold text-caramel-700 underline-offset-4 hover:underline"
            >
              Abrir no Google Maps
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <p className="mb-4 flex items-start gap-3 text-ink-muted">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-caramel-700" strokeWidth={1.5} />
              {site.contato.endereco}, {site.contato.cidade}
            </p>
            <div className="overflow-hidden rounded-card border border-navy/10 bg-mist/40">
              <iframe
                src={mapaEmbed}
                title={`Mapa: ${site.contato.endereco}, ${site.contato.cidade}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full border-0 md:h-[28rem]"
                allowFullScreen
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
