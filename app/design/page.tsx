import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { FrenteCard } from "@/components/sections/FrentesGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Illustration } from "@/components/ui/Illustration";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Texto } from "@/components/ui/Texto";
import { frentes } from "@/data/frentes";
import { pageMetadata } from "@/lib/seo";

/**
 * Página interna de referência do sistema de design.
 * Não aparece no menu nem no sitemap. TODO: remover antes do lançamento.
 */
export const metadata: Metadata = pageMetadata({
  title: "Sistema de design",
  description: "Referência interna de tokens e componentes.",
  path: "/design",
  noindex: true,
});

/* Cores oficiais ("VERSTA - cores - FINAL.pdf") + apoio. Espelha app/globals.css. */
const cores = [
  { nome: "navy · Azul-marinho", hex: "#00294D", uso: "Pantone P 108-16 C · títulos, texto, rodapé, seções de peso", text: "text-white" },
  { nome: "caramel · Caramelo", hex: "#B46D49", uso: "Pantone P 42-14 C · acento: símbolo, ícones, linhas (não em texto pequeno)", text: "text-white" },
  { nome: "peach-100 · Pêssego claro", hex: "#FCDAC4", uso: "Pantone P 37-2 C · fundos alternados e cards", text: "text-navy" },
  { nome: "peach-200 · Pêssego", hex: "#FAC6AB", uso: "Pantone P 37-3 C · fundos e céu da intro", text: "text-navy" },
  { nome: "green-900 · Verde escuro", hex: "#006955", uso: "Pantone P 135-15 C · seções escuras (texto claro)", text: "text-white" },
  { nome: "green-700 · Verde médio", hex: "#539282", uso: "Pantone P 135-13 C · detalhes (evitar texto claro pequeno)", text: "text-white" },
  { nome: "sage · Verde sálvia", hex: "#9BBBAA", uso: "Pantone P 135-3 C · fundos e cards (texto marinho)", text: "text-navy" },
  { nome: "mint · Verde menta", hex: "#D6E9DF", uso: "Pantone P 127-9 C · fundo do CTA, texto de apoio no escuro", text: "text-navy" },
  { nome: "mist · Azul claro", hex: "#9CCADC", uso: "Pantone P 119-3 C · fundos, texto secundário no marinho", text: "text-navy" },
  { nome: "sky · Azul", hex: "#75BAD4", uso: "Pantone P 119-4 C · fundos (texto marinho)", text: "text-navy" },
  { nome: "offwhite · apoio", hex: "#F1F4EE", uso: "Fora do PDF · fundo principal neutro", text: "text-navy" },
  { nome: "caramel-700 · apoio", hex: "#8C5236", uso: "Fora do PDF · links e botões com texto pequeno (AA)", text: "text-white" },
];

export default function DesignPage() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Referência interna"
            title="Sistema de design Versta"
            lead="Tokens e componentes do site, com as cores oficiais da marca e o logo em vetor."
          />
        </Container>
      </Section>

      <Section tone="offwhite" className="pt-0!">
        <Container className="space-y-20">
          <div>
            <h2 className="text-h2">Cores</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cores.map((c) => (
                <li key={c.nome} className="overflow-hidden rounded-card border border-navy/10">
                  <div className={`flex h-28 items-end p-4 font-semibold ${c.text}`} style={{ background: c.hex }}>
                    {c.nome}
                  </div>
                  <div className="p-4 text-sm">
                    <p className="font-mono text-navy">{c.hex}</p>
                    <p className="mt-1 text-ink-muted">{c.uso}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h2">Tipografia</h2>
            <div className="mt-8 space-y-6 border-l-2 border-caramel pl-6">
              <p className="font-display text-display font-bold">Display · STIX Two Text</p>
              <p className="font-display text-h1 font-bold">H1 · Análise, Experiência e Percepção</p>
              <p className="font-display text-h2 font-bold">H2 · Nove frentes, um mesmo olhar</p>
              <p className="font-display text-h3 font-bold">H3 · Diagnóstico</p>
              <p className="text-lead text-ink-muted">Lead · Source Sans 3. Texto de apoio com leitura confortável.</p>
              <p>Corpo · Source Sans 3 regular, 17px, entrelinha 1,65.</p>
              <p className="eyebrow text-caramel-700">Eyebrow · rótulo de seção</p>
              <p>
                Placeholder: <Texto>[PREENCHER: exemplo de conteúdo pendente]</Texto>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-h2">Botões</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" arrow>Primário</Button>
              <Button variant="accent" arrow>Acento</Button>
              <Button variant="outline">Contorno</Button>
            </div>
            <div className="on-dark mt-4 flex flex-wrap gap-3 rounded-card bg-navy p-6">
              <Button variant="light" arrow>Claro</Button>
              <Button variant="outline-light">Contorno claro</Button>
            </div>
          </div>

          <div>
            <h2 className="text-h2">Logo oficial</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="flex items-center justify-center"><Logo tagline className="w-56" /></Card>
              <Card className="flex items-center justify-center bg-navy!"><Logo tone="branca" tagline className="w-56" /></Card>
              <Card tone="peach" className="flex items-center justify-center"><Logo layout="vertical" className="w-52" /></Card>
            </div>
          </div>

          <div>
            <h2 className="text-h2">Cards</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {(["plain", "peach", "mist", "sage"] as const).map((t) => (
                <Card key={t} tone={t}>
                  <h3 className="text-h3">Card {t}</h3>
                  <p className="mt-2 text-ink-muted">Superfície sem sombra.</p>
                </Card>
              ))}
            </div>
            <div className="mt-6 grid max-w-sm overflow-hidden rounded-card border border-navy/10">
              <FrenteCard frente={frentes[0]} />
            </div>
          </div>

          <div>
            <h2 className="text-h2">Ilustrações (placeholders)</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Illustration imagem="heroHome" className="aspect-[4/3] rounded-card" />
              <Illustration imagem="diagnosticoEmpresarial" className="aspect-[4/3] rounded-card" />
              <Illustration imagem="ctaHome" className="aspect-[4/3] rounded-card" />
              <Illustration imagem="quemEVersta" className="aspect-[4/3] rounded-card" />
              <Illustration imagem="projetoRh2" className="aspect-[4/3] rounded-card" />
              <Illustration imagem="instituto" className="aspect-[4/3] rounded-card" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
