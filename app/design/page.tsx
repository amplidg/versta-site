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

const cores = [
  { nome: "navy", hex: "#003462", uso: "Títulos, texto, rodapé, seções de peso", text: "text-white" },
  { nome: "caramel", hex: "#B36E4A", uso: "Acento: símbolo e detalhes (não usar em texto pequeno)", text: "text-white" },
  { nome: "caramel-700", hex: "#95583A", uso: "Derivado AA: links e botões de acento", text: "text-white" },
  { nome: "offwhite", hex: "#F1F4EE", uso: "Fundo principal", text: "text-navy" },
  { nome: "peach-100", hex: "#FCDDBC", uso: "Fundos alternados e cards", text: "text-navy" },
  { nome: "peach-200", hex: "#FDCCA2", uso: "Fundos alternados e cards", text: "text-navy" },
  { nome: "green-900", hex: "#315B50", uso: "Fundos escuros alternativos", text: "text-white" },
  { nome: "green-700", hex: "#467566", uso: "Seções de destaque (texto branco)", text: "text-white" },
  { nome: "sage", hex: "#8FB19C", uso: "Fundos e cards (texto marinho)", text: "text-navy" },
  { nome: "mist", hex: "#B8D1D6", uso: "Fundos e texto secundário no azul", text: "text-navy" },
  { nome: "sky", hex: "#96BAD0", uso: "Fundos (texto marinho)", text: "text-navy" },
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
            lead="Tokens e componentes do site. Os valores de cor são aproximados e devem ser confirmados com o manual da marca."
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
            <h2 className="text-h2">Logo (placeholder)</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="flex items-center justify-center"><Logo tagline /></Card>
              <Card className="flex items-center justify-center bg-navy!"><Logo tone="branca" tagline /></Card>
              <Card tone="peach" className="flex items-center justify-center"><Logo layout="vertical" tagline className="text-5xl" /></Card>
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
