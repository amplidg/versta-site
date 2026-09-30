import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Texto } from "@/components/ui/Texto";
import { frentes } from "@/data/frentes";
import { mapaDoSite } from "@/data/navegacao";
import { isPlaceholder, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const contatos = [
    { icon: Phone, label: "Telefone", value: site.contato.telefone },
    { icon: Mail, label: "E-mail", value: site.contato.email },
    { icon: MapPin, label: "Endereço", value: site.contato.endereco },
    { icon: Clock, label: "Horário", value: site.contato.horario },
  ];

  return (
    <footer className="on-dark bg-navy text-offwhite">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block rounded-sm">
            <Logo tone="branca" tagline className="w-64" />
            <span className="sr-only"> — página inicial</span>
          </Link>
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-mist">
            Diagnóstico e conexão com soluções especializadas para empresas que
            querem crescer com direção.
          </p>
        </div>

        <nav aria-labelledby="rodape-mapa" className="lg:col-span-2">
          <h2 id="rodape-mapa" className="eyebrow mb-5 font-body text-peach-100">
            Mapa do site
          </h2>
          <ul className="space-y-2.5 text-[0.9375rem]">
            {mapaDoSite.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-offwhite/90 transition-colors hover:text-peach-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-frentes" className="lg:col-span-3">
          <h2 id="rodape-frentes" className="eyebrow mb-5 font-body text-peach-100">
            Frentes de consultoria
          </h2>
          <ul className="space-y-2.5 text-[0.9375rem]">
            {frentes.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/consultoria/${f.slug}`}
                  className="text-offwhite/90 transition-colors hover:text-peach-100"
                >
                  {f.nome} <span className="text-mist/80">· {f.area}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-5 font-body text-peach-100">Contato</h2>
          <ul className="space-y-3 text-[0.9375rem]">
            {contatos.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-peach-100" strokeWidth={1.5} />
                <span>
                  <span className="sr-only">{label}: </span>
                  <Texto>{value}</Texto>
                </span>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-8 mb-4 font-body text-peach-100">Redes</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
            {site.redes.map((rede) => (
              <li key={rede.nome}>
                {isPlaceholder(rede.url) ? (
                  <span>
                    {rede.nome}: <Texto>{rede.url}</Texto>
                  </span>
                ) : (
                  <a href={rede.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {rede.nome}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-offwhite/15">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Versta. Todos os direitos reservados.</p>
          <p className="tracking-[0.14em] uppercase">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
