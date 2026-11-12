import type { Metadata } from "next";
import { ArrowUpRight, Clock, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { RedesSociais, redesProntas } from "@/components/ui/RedesSociais";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com a Versta pelo telefone e WhatsApp (48) 99170-1463 ou envie sua mensagem. Atendimento de segunda a sexta, em Tubarão – SC.",
  path: "/contato",
});

const busca = encodeURIComponent(site.mapaBusca);
/** Mapa do Google incorporado (sem chave de API) e link para abrir no app. */
const mapaEmbed = `https://www.google.com/maps?q=${busca}&output=embed`;
const mapaLink = `https://www.google.com/maps/search/?api=1&query=${busca}`;

export default function ContatoPage() {
  const canais = [
    { icon: MessageCircle, label: "Telefone e WhatsApp", value: site.contato.telefone, href: site.contato.whatsappLink },
    { icon: MapPin, label: "Endereço", value: `${site.contato.endereco}, ${site.contato.cidade}` },
    { icon: Clock, label: "Horário", value: site.contato.horario },
  ];

  return (
    <>
      {/* O topo "Vamos conversar" saiu a pedido do Lucas (11/11): a página
          começa nos canais, que ganharam o título principal (h1) e o fundo
          azul claro da marca. */}
      <Section tone="mist" aria-labelledby="canais-titulo">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading as="h1" tamanho="h2" id="canais-titulo" eyebrow="Canais" title="Onde encontrar a Versta" />
            </Reveal>
            <Reveal delay={120}>
              <dl className="mt-10 space-y-6">
                {canais.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="relative pl-9">
                    {/* o ícone fica dentro do <dt>: um <dl> só aceita <dt> e <dd> nos grupos */}
                    <dt className="text-sm font-semibold tracking-wide text-navy uppercase">
                      <Icon aria-hidden="true" className="absolute top-1 left-0 size-5 text-caramel-700" strokeWidth={1.5} />
                      {label}
                    </dt>
                      <dd className="mt-1 text-ink-muted">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-4 hover:text-navy hover:underline"
                          >
                            {value}
                            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                          </a>
                        ) : (
                          <Texto>{value}</Texto>
                        )}
                      </dd>
                  </div>
                ))}
              </dl>
              {redesProntas().length > 0 && (
                <div className="mt-8 border-t border-navy/10 pt-6">
                  <p className="mb-3 text-sm font-semibold tracking-wide text-navy uppercase">Redes sociais</p>
                  <RedesSociais tom="claro" />
                </div>
              )}
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
