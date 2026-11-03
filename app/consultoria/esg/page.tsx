import type { Metadata } from "next";
import { BookOpen, ChartColumn, ClipboardCheck, Earth, FileLock, Handshake, Landmark, Scale, Search } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EsgPratica } from "@/components/sections/esg/EsgPratica";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { MotivosLista, type Motivo } from "@/components/sections/frente/MotivosLista";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente ESG (especificação e textos do Lucas, 03/11), no
 * mesmo padrão da Semear (peças em components/sections/frente/). Substitui, só
 * para a ESG, a página genérica de app/consultoria/[slug].
 */

export const metadata: Metadata = pageMetadata({
  title: "ESG · Ambiental, Social e Governança",
  description:
    "Diagnóstico ESG, indicadores, políticas de governança e relatório de sustentabilidade sob medida para a sua empresa. ESG que sai do papel e vira prática.",
  path: "/consultoria/esg",
});

const sinais = [
  "Um cliente ou parceiro enviou questionário ou pediu indicadores de sustentabilidade.",
  "Sua empresa participa de concorrências ou cadastros de fornecedores que avaliam práticas ESG.",
  "Investidores, bancos ou parceiros perguntaram sobre impacto ambiental, social ou governança.",
  "A empresa tem ações sustentáveis, mas não mede nem comunica os resultados.",
  "Não existem políticas formais de ética, conduta ou integridade.",
];

const servicos: Servico[] = [
  {
    titulo: "Diagnóstico ESG",
    texto: "Avaliamos o ponto de partida da empresa nas três dimensões e definimos as prioridades.",
    icone: Search,
    fundo: "bg-mint",
  },
  {
    titulo: "Indicadores e metas",
    texto: "Escolhemos os indicadores certos para medir e acompanhar a evolução.",
    icone: ChartColumn,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Políticas e governança",
    texto: "Estruturamos códigos de conduta, políticas e controles internos.",
    icone: FileLock,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Relatório de sustentabilidade",
    texto: "Transformamos as ações e os números da empresa em um relatório claro para o mercado.",
    icone: BookOpen,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Preparação para avaliações",
    texto: "Preparamos a empresa para questionários de clientes, auditorias e cadastros de fornecedores.",
    icone: ClipboardCheck,
    fundo: "bg-peach-200/70",
  },
];

const motivos: Motivo[] = [
  {
    titulo: "Clientes cobram",
    texto: "Grandes empresas avaliam práticas ESG na hora de escolher seus fornecedores.",
    icone: Handshake,
  },
  {
    titulo: "Mercado e crédito",
    texto: "Investidores e instituições financeiras consideram critérios ESG em suas decisões.",
    icone: Landmark,
  },
  {
    titulo: "Novas regras",
    texto: "As exigências de relato de sustentabilidade estão avançando no Brasil e no mundo.",
    icone: Scale,
  },
];

export default function EsgPage() {
  return (
    <>
      <FrenteHero
        nome="ESG"
        slug="esg"
        eyebrow="ESG · Ambiental, social e governança"
        titulo="ESG que sai do papel e vira prática"
        texto="Clientes, parceiros e investidores querem saber como sua empresa cuida do meio ambiente, das pessoas e da gestão. A Versta estrutura o ESG da sua empresa de forma simples, mensurável e alinhada à sua realidade."
        selo={{
          texto: "ESG sob medida para empresas de todos os portes",
          icone: Earth,
          fundo: "bg-mist/60",
          cor: "text-navy",
        }}
        emblema={{ icone: Earth, cores: ["var(--color-mist)", "var(--color-mint)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* ESG NA PRÁTICA — mesmo fundo do topo, separado por uma linha fina */}
      <Section aria-labelledby="pratica-titulo" className="pt-0!">
        <Container className="border-t border-navy/10 pt-16 md:pt-20">
          <Reveal>
            <SectionHeading
              id="pratica-titulo"
              title="O que é ESG, na prática"
              lead="Três letras, três frentes de cuidado. Veja o que cada uma significa no dia a dia de uma empresa."
              align="center"
            />
          </Reveal>
          <EsgPratica />
        </Container>
      </Section>

      {/* SINAIS DE ALERTA */}
      {/* azul claro da marca (pedido do Lucas, 03/11) */}
      <Section tone="mist" aria-labelledby="sinais-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="sinais-titulo"
              title="O ESG já chegou à sua empresa se..."
              lead="Marque o que acontece hoje na sua empresa."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <SinaisAlerta
              sinais={sinais}
              mensagem="Sua empresa já está sendo cobrada por ESG. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* COMO ESTRUTURAMOS O ESG */}
      <Section aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="Como estruturamos o ESG da sua empresa" align="center" />
          </Reveal>
          <ServicosGrid servicos={servicos} />
        </Container>
      </Section>

      {/* POR QUE AGORA */}
      <Section tone="peach" aria-labelledby="agora-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="agora-titulo" title="Por que agora" align="center" />
          </Reveal>
          <MotivosLista itens={motivos} />
          <FrenteChamada
            antes="Quem começa antes transforma exigência"
            destaque="em diferencial."
            prediagUrl={PREDIAG_URL}
          />
        </Container>
      </Section>
    </>
  );
}
