import type { Metadata } from "next";
import { Flag, Funnel, Megaphone, MessagesSquare, Smartphone, Target } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ConexaoOndas } from "@/components/sections/conexao/ConexaoOndas";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Conexão (especificação e textos do Lucas, 03/11), no
 * padrão das outras frentes (peças em components/sections/frente/). Como nas
 * outras, só botões de pré-diagnóstico e cartão final sem mancha (regras do
 * Lucas, 03/11).
 */

export const metadata: Metadata = pageMetadata({
  title: "Conexão · Marketing e Endomarketing",
  description:
    "Posicionamento de marca, presença digital, geração de clientes e comunicação interna integrados. Uma marca que se comunica bem por fora e por dentro.",
  path: "/consultoria/conexao",
});

const sinais = [
  "Os clientes não entendem com clareza o que diferencia a sua empresa.",
  "A empresa é pouco encontrada no Google e nas redes sociais.",
  "Novos clientes dependem quase só de indicações.",
  "Os colaboradores não conhecem a estratégia, os objetivos e as novidades da empresa.",
  "A comunicação interna é feita no improviso, por grupos e conversas soltas.",
];

const servicos: Servico[] = [
  {
    titulo: "Posicionamento de marca",
    texto: "Definimos o que torna sua empresa única e como ela deve ser percebida.",
    icone: Flag,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Presença digital",
    texto: "Site, Google e redes sociais trabalhando para a empresa ser encontrada.",
    icone: Smartphone,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Geração de clientes",
    texto: "Estratégias para atrair e converter clientes de forma previsível.",
    icone: Funnel,
    fundo: "bg-mint",
  },
  {
    titulo: "Comunicação interna",
    texto: "Canais, rituais e conteúdos que mantêm a equipe informada e alinhada.",
    icone: MessagesSquare,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Campanhas de endomarketing",
    texto: "Ações que engajam, reconhecem e fortalecem o orgulho de fazer parte.",
    icone: Megaphone,
    fundo: "bg-peach-200/70",
  },
];

export default function ConexaoPage() {
  return (
    <>
      <FrenteHero
        nome="Conexão"
        slug="conexao"
        eyebrow="Conexão · Marketing e endomarketing"
        titulo="Uma marca que se comunica bem por fora e por dentro"
        texto="Posicionamento, presença digital e comunicação interna trabalhando juntos, para que o mercado conheça o valor da sua empresa e a equipe viva essa mesma mensagem no dia a dia."
        selo={{
          texto: "Marketing e endomarketing integrados",
          icone: Target,
          fundo: "bg-peach-100",
          cor: "text-caramel-700",
        }}
        emblema={{ icone: Target, cores: ["var(--color-caramel)", "var(--color-peach-100)"] }}
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
              mensagem="A mensagem da sua empresa não está chegando onde deveria. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* PARA DENTRO E PARA FORA */}
      <Section aria-labelledby="direcoes-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="direcoes-titulo"
              title="A mesma mensagem, em duas direções"
              lead="Uma marca forte começa dentro da empresa e chega ao mercado com coerência."
              align="center"
            />
          </Reveal>
          <ConexaoOndas />
        </Container>
      </Section>

      {/* O QUE A CONEXÃO FAZ */}
      <Section tone="peach" aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="O que a Conexão faz" align="center" />
          </Reveal>
          <ServicosGrid servicos={servicos} />
        </Container>
      </Section>

      {/* COMUNICAÇÃO DE DENTRO PARA FORA */}
      <Section aria-label="Comunicação de dentro para fora">
        <Container>
          <FrenteChamada
            antes="Quando a equipe acredita na marca,"
            destaque="o mercado também acredita."
            apoio="Na Versta, marketing e endomarketing caminham juntos."
            prediagUrl={PREDIAG_URL}
            className=""
          />
        </Container>
      </Section>
    </>
  );
}
