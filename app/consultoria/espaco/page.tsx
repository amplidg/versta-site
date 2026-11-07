import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Droplets, Earth, FileCheck2, Hammer, PiggyBank, Ruler, Sun, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EspacoPlanta } from "@/components/sections/espaco/EspacoPlanta";
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
 * Página própria da frente Espaço · Arquitetura Sustentável (especificação e
 * textos do Lucas, 07/11). Substitui a versão de 04/11, feita por engano como
 * página da House Business Coworking: a frente Espaço é a arquitetura
 * sustentável para reformas e novos ambientes das empresas clientes.
 * Regras do Lucas para as frentes: só botões de pré-diagnóstico (a
 * especificação trazia "Falar com um especialista" pelo WhatsApp), cartão
 * final sem mancha e os títulos padrão "Sua empresa precisa dessa solução
 * se..." e "O que entregamos". Camadas da planta em data/espaco.ts.
 */

export const metadata: Metadata = pageMetadata({
  title: "Espaço · Arquitetura Sustentável para Empresas",
  description:
    "Reformas e novos ambientes com arquitetura sustentável: eficiência de energia e água, conforto, bem-estar e projetos de acordo com a legislação. Ambientes que cuidam das pessoas e do planeta.",
  path: "/consultoria/espaco",
});

const sinais = [
  "A empresa vai reformar, ampliar ou mudar de espaço.",
  "O ambiente atual não atende mais ao trabalho e à equipe.",
  "Os colaboradores reclamam de calor, frio, barulho, pouca luz ou desconforto.",
  "As contas de energia e água são altas ou difíceis de controlar.",
  "O espaço não transmite a imagem que a empresa quer passar.",
];

const servicos: Servico[] = [
  {
    titulo: "Reformas sustentáveis",
    texto: "Transformamos o espaço atual da empresa com soluções que reduzem impacto e custo.",
    icone: Hammer,
    fundo: "bg-mint",
  },
  {
    titulo: "Novos ambientes",
    texto: "Projetos de novos espaços pensados desde o início para serem eficientes e confortáveis.",
    icone: Ruler,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Eficiência de energia e água",
    texto: "Soluções para reduzir o consumo e o gasto com energia e água.",
    icone: Droplets,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Conforto e bem-estar",
    texto: "Iluminação, ventilação, acústica e ergonomia a favor de quem trabalha no espaço.",
    icone: Sun,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Projetos dentro da lei",
    texto: "Projetos de acordo com a legislação e as normas, incluindo acessibilidade e aprovações necessárias.",
    icone: FileCheck2,
    fundo: "bg-peach-200/70",
  },
];

const motivos: Motivo[] = [
  { titulo: "Economia", texto: "Menos gasto com energia, água e manutenção ao longo dos anos.", icone: PiggyBank },
  { titulo: "Pessoas", texto: "Ambientes mais confortáveis e saudáveis para a equipe.", icone: Users },
  {
    titulo: "Imagem e ESG",
    texto: "Um espaço que mostra, na prática, o compromisso da empresa com o meio ambiente.",
    icone: Earth,
  },
];

const linkInterno =
  "font-semibold text-navy underline decoration-caramel/60 underline-offset-4 hover:decoration-caramel";

export default function EspacoPage() {
  return (
    <>
      <FrenteHero
        nome="Espaço"
        slug="espaco"
        eyebrow="Espaço · Arquitetura sustentável"
        titulo="Ambientes que cuidam das pessoas e do planeta"
        texto="Reformas e novos ambientes projetados com arquitetura sustentável."
        selo={{
          texto: "Projetos sustentáveis para empresas",
          icone: Building2,
          fundo: "bg-mint",
          cor: "text-green-900",
        }}
        emblema={{ icone: Building2, cores: ["var(--color-sage)", "var(--color-mint)"] }}
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
              mensagem="Seu espaço pode trabalhar a favor da empresa, das pessoas e do meio ambiente. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* A PLANTA SUSTENTÁVEL */}
      <Section aria-labelledby="planta-titulo" className="overflow-hidden">
        <Container>
          <Reveal>
            <SectionHeading
              id="planta-titulo"
              title="O que torna um espaço sustentável"
              lead="Ligue as camadas e veja o que muda no ambiente."
              align="center"
            />
          </Reveal>
          <Reveal delay={120}>
            <EspacoPlanta />
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

      {/* POR QUE CONSTRUIR SUSTENTÁVEL */}
      <Section aria-labelledby="porque-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="porque-titulo" title="Por que construir sustentável" align="center" />
          </Reveal>
          <MotivosLista itens={motivos} />
          <Reveal>
            <p className="mt-12 text-center text-ink-muted">
              O Espaço conversa com as frentes{" "}
              <Link href="/consultoria/semear" className={linkInterno}>
                Semear
              </Link>{" "}
              e{" "}
              <Link href="/consultoria/esg" className={linkInterno}>
                ESG
              </Link>
              .
            </p>
          </Reveal>
          <FrenteChamada
            antes="Antes da obra começar,"
            destaque="a sustentabilidade já pode estar no projeto."
            prediagUrl={PREDIAG_URL}
          />
        </Container>
      </Section>
    </>
  );
}
