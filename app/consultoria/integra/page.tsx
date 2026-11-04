import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { IntegraCaminhos } from "@/components/sections/integra/IntegraCaminhos";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Íntegra (especificação e textos do Lucas, 04/11), no
 * padrão das outras frentes (peças em components/sections/frente/). Seguindo as
 * regras do Lucas: só botões de pré-diagnóstico (a especificação trazia "Falar
 * com um especialista" pelo WhatsApp), cartão azul final sem mancha e o
 * título padrão "Sua empresa precisa dessa solução se...". Em 04/11 o Lucas
 * tirou "O que entregamos" e "O que é o olhar sistêmico", pediu o emblema em
 * azul claro e uma frase nova no cartão azul (antes "A melhor disputa é a que
 * nunca precisa acontecer.": nem sempre dá para evitar a disputa).
 * As situações do bloco "Dois caminhos" ficam em data/integra.ts.
 */

export const metadata: Metadata = pageMetadata({
  title: "Íntegra · Estratégia Jurídica Sistêmica para Empresas",
  description:
    "Contratos, trabalhista preventivo, LGPD, societário e mediação de conflitos com um olhar sistêmico. Segurança jurídica que protege o negócio e as relações.",
  path: "/consultoria/integra",
});

const sinais = [
  "Contratos são assinados sem revisão de um profissional.",
  "A empresa tem processos judiciais ou trabalhistas em andamento.",
  "Não há certeza de que as rotinas de RH seguem a legislação trabalhista.",
  "A empresa ainda não se adequou à LGPD, a lei de proteção de dados.",
  "Conflitos com sócios, clientes ou colaboradores costumam terminar na Justiça.",
];

export default function IntegraPage() {
  return (
    <>
      <FrenteHero
        nome="Íntegra"
        slug="integra"
        eyebrow="Íntegra · Estratégia jurídica sistêmica"
        titulo="Segurança jurídica que protege o negócio e as relações"
        texto="Contratos, rotinas trabalhistas, proteção de dados e solução de conflitos com um olhar sistêmico: prevenir problemas, resolver com diálogo sempre que possível e proteger o que a empresa construiu."
        selo={{
          texto: "Prevenção e solução de conflitos",
          icone: Scale,
          fundo: "bg-mist/70",
          cor: "text-navy",
        }}
        emblema={{
          icone: Scale,
          cores: ["var(--color-mist)", "var(--color-mint)"],
        }}
        prediagUrl={PREDIAG_URL}
      />

      {/* SINAIS DE ALERTA */}
      <Section tone="mist" aria-labelledby="sinais-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="sinais-titulo"
              title="Sua empresa precisa dessa solução se..."
              lead="Marque o que acontece hoje na sua empresa."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <SinaisAlerta
              sinais={sinais}
              mensagem="Sua empresa está exposta a riscos jurídicos que podem ser evitados. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* DOIS CAMINHOS */}
      <Section aria-labelledby="caminhos-titulo" className="overflow-hidden">
        <Container>
          <Reveal>
            <SectionHeading
              id="caminhos-titulo"
              title="Dois caminhos para o mesmo conflito"
              lead="Escolha uma situação e compare os caminhos."
              align="center"
            />
          </Reveal>
          <IntegraCaminhos />
          <Reveal className="mx-auto mt-14 max-w-2xl text-center md:mt-16">
            <p className="text-lead text-navy">
              Na Íntegra, o caminho começa pela prevenção e pelo diálogo. Quando
              a disputa é inevitável, a empresa entra preparada.
            </p>
          </Reveal>
          <FrenteChamada
            antes="Cada conflito pede um"
            destaque="caminho."
            prediagUrl={PREDIAG_URL}
            className="mt-12 md:mt-14"
          />
        </Container>
      </Section>
    </>
  );
}
