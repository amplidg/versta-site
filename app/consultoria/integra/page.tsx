import type { Metadata } from "next";
import {
  FilePenLine,
  Handshake,
  HeartHandshake,
  Lock,
  MessagesSquare,
  Network,
  Scale,
  Shield,
  ShieldUser,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { MotivosLista, type Motivo } from "@/components/sections/frente/MotivosLista";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { IntegraCaminhos } from "@/components/sections/integra/IntegraCaminhos";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Íntegra (especificação e textos do Lucas, 04/11), no
 * padrão das outras frentes (peças em components/sections/frente/). Seguindo as
 * regras do Lucas: só botões de pré-diagnóstico (a especificação trazia "Falar
 * com um especialista" pelo WhatsApp), cartão azul final sem mancha e os
 * títulos padrão "Sua empresa precisa dessa solução se..." e "O que entregamos".
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

const servicos: Servico[] = [
  {
    titulo: "Contratos",
    texto: "Elaboração e revisão de contratos com clientes, fornecedores e parceiros.",
    icone: FilePenLine,
    fundo: "bg-mint",
  },
  {
    titulo: "Trabalhista preventivo",
    texto: "Rotinas de RH, contratos de trabalho e políticas internas dentro da lei.",
    icone: ShieldUser,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Proteção de dados (LGPD)",
    texto: "Adequação da empresa à lei de proteção de dados, com políticas e controles.",
    icone: Lock,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Societário",
    texto: "Acordos de sócios, estrutura societária e planejamento de sucessão.",
    icone: Network,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Mediação e negociação",
    texto: "Solução de conflitos pelo diálogo, antes que cheguem à Justiça.",
    icone: Handshake,
    fundo: "bg-peach-200/70",
  },
  {
    titulo: "Acompanhamento de processos",
    texto: "Estratégia e acompanhamento quando a disputa judicial é inevitável.",
    icone: Scale,
    fundo: "bg-mint",
  },
];

const olhar: Motivo[] = [
  { titulo: "Prevenir", texto: "Organizar antes que vire problema.", icone: Shield },
  { titulo: "Dialogar", texto: "Buscar o acordo antes da disputa.", icone: MessagesSquare },
  { titulo: "Proteger", texto: "Preservar o negócio e as relações.", icone: HeartHandshake },
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
          fundo: "bg-peach-100",
          cor: "text-caramel-700",
        }}
        emblema={{ icone: Scale, cores: ["var(--color-peach-200)", "var(--color-peach-100)"] }}
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
              Na Íntegra, o caminho começa pela prevenção e pelo diálogo. Quando a disputa é inevitável, a empresa
              entra preparada.
            </p>
            <Button href={PREDIAG_URL} variant="primary" arrow className="mt-7 max-sm:w-full">
              Fazer o pré-diagnóstico
            </Button>
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

      {/* O OLHAR SISTÊMICO */}
      <Section aria-labelledby="olhar-titulo">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionHeading id="olhar-titulo" title="O que é o olhar sistêmico" align="center" />
            <p className="mt-6 text-lead text-ink-muted">
              Por trás de cada conflito existem relações: entre sócios, equipes, clientes e parceiros. A Íntegra olha
              para a lei e também para essas relações, para encontrar soluções que resolvam o problema de verdade e
              protejam o futuro da empresa.
            </p>
          </Reveal>
          <MotivosLista itens={olhar} />
          <FrenteChamada
            antes="A melhor disputa é a que"
            destaque="nunca precisa acontecer."
            prediagUrl={PREDIAG_URL}
          />
        </Container>
      </Section>
    </>
  );
}
