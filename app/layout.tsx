import type { Metadata, Viewport } from "next";
import { Source_Sans_3, STIX_Two_Text } from "next/font/google";
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
 */
const display = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-stix",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
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
