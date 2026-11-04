import type { Metadata } from "next";
import { BadgeCheck, Funnel, Gauge, ListChecks, Medal, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ExcelenciaCalculadora } from "@/components/sections/excelencia/ExcelenciaCalculadora";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Excelência (especificação e textos do Lucas, 04/11),
 * no padrão das outras frentes (peças em components/sections/frente/), com as
 * regras do Lucas: só botões de pré-diagnóstico, cartão final sem mancha e os
 * títulos padrão "Sua empresa precisa dessa solução se..." e "O que entregamos".
 */

export const metadata: Metadata = pageMetadata({
  title: "Excelência · Qualidade e Produção",
  description:
    "Padronização de processos, gestão da qualidade, indicadores de produtividade, redução de desperdícios e preparação para ISO 9001. Fazer certo da primeira vez, todas as vezes.",
  path: "/consultoria/excelencia",
});

const sinais = [
  "Cada pessoa faz o mesmo trabalho de um jeito diferente.",
  "Retrabalho, desperdício ou reclamações de qualidade são frequentes.",
  "Prazos de entrega costumam atrasar.",
  "A empresa não mede produtividade nem qualidade com indicadores.",
  "Clientes ou o mercado exigem uma certificação de qualidade, como a ISO 9001, que a empresa ainda não tem.",
];

const servicos: Servico[] = [
  {
    titulo: "Padronização de processos",
    texto: "Documentamos o jeito certo de fazer, para que todos trabalhem da mesma forma.",
    icone: ListChecks,
    fundo: "bg-mint",
  },
  {
    titulo: "Gestão da qualidade",
    texto: "Controles e rotinas para prevenir erros antes que cheguem ao cliente.",
    icone: ShieldCheck,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Indicadores de produtividade",
    texto: "Medimos o que importa na operação para decidir com base em números.",
    icone: Gauge,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Redução de desperdícios",
    texto: "Identificamos e eliminamos perdas de tempo, material e retrabalho.",
    icone: Funnel,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Preparação para certificação",
    texto: "Preparamos a empresa para conquistar certificações como a ISO 9001.",
    icone: Medal,
    fundo: "bg-peach-200/70",
  },
];

export default function ExcelenciaPage() {
  return (
    <>
      <FrenteHero
        nome="Excelência"
        slug="excelencia"
        eyebrow="Excelência · Qualidade e produção"
        titulo="Fazer certo da primeira vez, todas as vezes"
        texto="Processos padronizados, qualidade medida e menos desperdício. A Versta estrutura a gestão da qualidade e da produção para sua empresa entregar mais, com menos erros e dentro do prazo."
        selo={{
          texto: "Qualidade, produtividade e certificação",
          icone: BadgeCheck,
          fundo: "bg-peach-100",
          cor: "text-caramel-700",
        }}
        emblema={{ icone: BadgeCheck, cores: ["var(--color-sky)", "var(--color-peach-100)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* SINAIS DE ALERTA */}
      <Section tone="mint" aria-labelledby="sinais-titulo">
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
              mensagem="Sua operação está perdendo qualidade e eficiência. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* QUANTO CUSTA O RETRABALHO */}
      <Section aria-labelledby="calculadora-titulo" className="overflow-hidden">
        <Container>
          <Reveal>
            <SectionHeading
              id="calculadora-titulo"
              title="Quanto tempo sua empresa perde corrigindo erros?"
              lead="Faça uma estimativa rápida com os números da sua empresa."
              align="center"
            />
          </Reveal>
          <Reveal delay={120}>
            <ExcelenciaCalculadora prediagUrl={PREDIAG_URL} />
          </Reveal>
        </Container>
      </Section>

      {/* O QUE ENTREGAMOS */}
      <Section tone="peach" aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="O que entregamos" align="center" />
          </Reveal>
          <ServicosGrid servicos={servicos} />
        </Container>
      </Section>

      {/* MELHORIA CONTÍNUA */}
      <Section aria-label="Melhoria contínua">
        <Container>
          <FrenteChamada
            antes="Excelência não é um ponto de chegada."
            destaque="É um jeito de trabalhar."
            apoio="Implantamos a melhoria contínua para que a qualidade evolua todos os dias."
            prediagUrl={PREDIAG_URL}
            className=""
          />
        </Container>
      </Section>
    </>
  );
}
