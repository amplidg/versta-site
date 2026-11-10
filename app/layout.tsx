import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IllustrationDefs } from "@/components/ui/Illustration";
import { organizationJsonLd } from "@/lib/seo";
import { SITE_URL, site } from "@/data/site";

/*
 * Fontes da marca (manual de identidade):
 *   títulos → STIX Two Text | textos → Source Sans 3
 * Para trocar, altere aqui; os tokens --font-display/--font-body
 * em globals.css apontam para estas variáveis.
 *
 * Desde 10/11 os arquivos ficam no próprio site (app/fonts/, versões
 * "variáveis" com todos os pesos, só caracteres latinos — inclui acentos do
 * português; licença SIL OFL, pacotes @fontsource-variable). Antes vinham do
 * Google Fonts na hora da publicação, e a publicação falhou algumas vezes
 * quando o GitHub não conseguia baixá-las.
 */
const display = localFont({
  src: "./fonts/stix-two-text.woff2",
  weight: "400 700",
  variable: "--font-stix",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const body = localFont({
  src: "./fonts/source-sans-3.woff2",
  weight: "200 900",
  variable: "--font-source-sans",
  display: "swap",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00294d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-button bg-navy px-4 py-3 text-offwhite focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <IllustrationDefs />
        <Header />
        {/* overflow-x-clip: evita rolagem lateral das animações de entrada sem quebrar o sticky da intro */}
        <main id="conteudo" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
