import type { Metadata } from "next";
import { CalendarDays, Compass, HeartHandshake, Mountain, Plane, Trophy, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { TurismoTrilha } from "@/components/sections/turismo/TurismoTrilha";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Turismo (especificação e textos do Lucas, 03/11), no
 * padrão da Semear e da ESG (peças em components/sections/frente/). Como nas
 * outras frentes, só botões de pré-diagnóstico (o Lucas tirou o "Planejar uma
 * experiência" pelo WhatsApp, 03/11).
 */

export const metadata: Metadata = pageMetadata({
  title: "Turismo de Experiência · Viagens Corporativas",
  description:
    "Viagens de incentivo, vivências de integração e convenções para a equipe, planejadas de ponta a ponta. Experiências que aproximam pessoas e fortalecem a empresa.",
  path: "/consultoria/turismo",
});

const propositos: Servico[] = [
  {
    titulo: "Integrar",
    texto: "Aproximar equipes, criar vínculos e melhorar a convivência no dia a dia.",
    icone: Users,
    fundo: "bg-mint",
  },
  {
    titulo: "Reconhecer",
    texto: "Premiar resultados e valorizar quem faz o negócio acontecer.",
    icone: Trophy,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Fidelizar",
    texto: "Criar momentos marcantes com clientes e parceiros, que fortalecem a relação.",
    icone: HeartHandshake,
    fundo: "bg-mist/70",
  },
];

const experiencias: Servico[] = [
  {
    titulo: "Viagens de incentivo",
    texto: "Viagens de premiação para equipes e parceiros que bateram metas.",
    icone: Plane,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Vivências de integração",
    texto: "Experiências fora do escritório que unem equipes, como imersões na natureza e atividades em grupo.",
    icone: Mountain,
    fundo: "bg-mint",
  },
  {
    titulo: "Encontros e convenções",
    texto: "Eventos corporativos, convenções e reuniões fora da empresa, com toda a estrutura.",
    icone: CalendarDays,
    fundo: "bg-peach-100",
  },
];

export default function TurismoPage() {
  return (
    <>
      <FrenteHero
        nome="Turismo"
        slug="turismo"
        eyebrow="Turismo · Viagens e vivências corporativas"
        titulo="Experiências que aproximam pessoas e fortalecem a empresa"
        texto="Viagens de incentivo e vivências de integração para a equipe, planejadas de ponta a ponta, com um objetivo claro: transformar momentos fora da rotina em resultados para a empresa."
        selo={{
          texto: "Planejamento completo, do roteiro à volta para casa",
          icone: Compass,
          fundo: "bg-peach-100",
          cor: "text-caramel-700",
        }}
        emblema={{ icone: Compass, cores: ["var(--color-peach-200)", "var(--color-peach-100)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* PARA QUE SERVE — mesmo fundo do topo, separado por uma linha fina */}
      <Section aria-labelledby="proposito-titulo" className="pt-0!">
        <Container className="border-t border-navy/10 pt-16 md:pt-20">
          <Reveal>
            <SectionHeading id="proposito-titulo" title="Toda experiência começa com um propósito" align="center" />
          </Reveal>
          <ServicosGrid servicos={propositos} />
        </Container>
      </Section>

      {/* EXPERIÊNCIAS QUE CRIAMOS */}
      {/* verde menta da marca (pedido do Lucas, 03/11) */}
      <Section tone="mint" aria-labelledby="experiencias-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="experiencias-titulo" title="Experiências que criamos" align="center" />
          </Reveal>
          <ServicosGrid servicos={experiencias} />
        </Container>
      </Section>

      {/* DO OBJETIVO À EXPERIÊNCIA — mapa de viagem */}
      <Section aria-labelledby="trilha-titulo" className="relative isolate overflow-hidden">
        {/* papel e manchas suaves de aquarela, sugerindo um mapa */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] mix-blend-multiply"
          style={{ backgroundImage: "var(--paper-grain)" }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 size-full opacity-60"
        >
          <defs>
            <filter id="turismo-mapa-f" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="12" result="ruido" />
              <feDisplacementMap in="SourceGraphic" in2="ruido" scale="6" xChannelSelector="R" yChannelSelector="G" result="borda" />
              <feGaussianBlur in="borda" stdDeviation="2" />
            </filter>
          </defs>
          <g filter="url(#turismo-mapa-f)">
            <ellipse cx="12" cy="30" rx="16" ry="20" fill="var(--color-mint)" />
            <ellipse cx="88" cy="72" rx="18" ry="22" fill="var(--color-mist)" opacity="0.6" />
            <ellipse cx="55" cy="90" rx="22" ry="10" fill="var(--color-sage)" opacity="0.35" />
            <ellipse cx="70" cy="12" rx="14" ry="9" fill="var(--color-mist)" opacity="0.4" />
          </g>
        </svg>
        <Container>
          <Reveal>
            <SectionHeading
              id="trilha-titulo"
              title="Do objetivo à experiência"
              lead="Cada viagem é desenhada a partir do que a sua empresa quer alcançar."
              align="center"
            />
          </Reveal>
          <TurismoTrilha />

          {/* CHAMADA FINAL — dentro do mesmo bloco, para o fundo do mapa continuar */}
          <FrenteChamada
            antes="Qual experiência sua equipe"
            destaque="merece viver?"
            prediagUrl={PREDIAG_URL}
            mancha
            className="mt-20 md:mt-24"
          />
        </Container>
      </Section>
    </>
  );
}
