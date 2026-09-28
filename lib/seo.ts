import type { Metadata } from "next";
import { SITE_URL, site } from "@/data/site";

/** Imagem de compartilhamento (arquivo app/opengraph-image.png, 1200×630). */
const OG_IMAGE = `${SITE_URL}/opengraph-image.png`;

/**
 * URL absoluta de uma página. Absoluta de propósito: com o site numa
 * subpasta (GitHub Pages), caminhos relativos ao metadataBase perderiam o
 * prefixo. Termina em "/" como as páginas exportadas (trailingSlash).
 */
export function pageUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}/`;
}

type PageMeta = {
  title: string;
  description: string;
  /** Caminho da página, ex.: "/sobre". */
  path: string;
  noindex?: boolean;
};

/** Metadata padrão de cada página: title, description, canonical e Open Graph. */
export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pageUrl(path) },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: pageUrl(path),
      siteName: site.name,
      locale: site.locale,
      type: "website",
      // Declarado explicitamente: um openGraph definido na página não herda
      // a imagem do arquivo app/opengraph-image.png.
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** JSON-LD schema.org Organization. Campos de contato ainda como placeholder. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: SITE_URL,
    // TODO [PREENCHER]: trocar pelo arquivo oficial do logo (PNG/SVG) quando disponível
    logo: `${SITE_URL}/brand/versta-logo-vertical-azul.svg`,
    email: site.contato.email,
    telephone: site.contato.telefone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contato.endereco,
      addressLocality: site.contato.cidade,
      addressCountry: "BR",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.contato.telefone,
        email: site.contato.email,
        availableLanguage: ["Portuguese"],
      },
    ],
    // TODO [PREENCHER]: links oficiais das redes sociais
    sameAs: site.redes.map((r) => r.url).filter((u) => u.startsWith("http")),
  };
}
