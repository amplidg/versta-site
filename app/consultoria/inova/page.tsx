import type { Metadata } from "next";
import { AppWindow, ChartColumnIncreasing, Network, RefreshCw, ScanSearch, SlidersHorizontal, Sparkles, UserCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { MotivosLista, type Motivo } from "@/components/sections/frente/MotivosLista";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { InovaComparador } from "@/components/sections/inova/InovaComparador";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Inova (especificação e textos do Lucas, 03/11), no
 * padrão da Semear, ESG e Turismo (peças em components/sections/frente/). Como
 * nas outras frentes, só botões de pré-diagnóstico (regra do Lucas, 03/11).
 */

export const metadata: Metadata = pageMetadata({
  title: "Inova · Tecnologia e Inovação para Empresas",
  description:
    "Diagnóstico e redesenho de processos, automação, inteligência artificial, sistemas de gestão e indicadores. Processos mais ágeis e eficientes, do tamanho da sua empresa.",
  path: "/consultoria/inova",
});

const sinais = [
  "Os principais processos ainda dependem de planilhas, papel ou tarefas manuais.",
  "A mesma informação é digitada várias vezes, em lugares diferentes.",
  "Há retrabalho frequente ou informações que se perdem entre as áreas.",
  "Os resultados só aparecem no fim do mês, e nem sempre são confiáveis.",
  "A empresa já tentou implantar um sistema que não deu certo.",
];

const servicos: Servico[] = [
  {
    titulo: "Diagnóstico de processos",
    texto: "Mapeamos como a empresa funciona hoje e onde estão os gargalos.",
    icone: ScanSearch,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Redesenho de processos",
    texto: "Simplificamos etapas, eliminamos retrabalho e definimos responsáveis.",
    icone: RefreshCw,
    fundo: "bg-mint",
  },
  {
    titulo: "Automação e inteligência artificial",
    texto: "Automatizamos tarefas repetitivas para a equipe focar no que importa.",
    icone: Sparkles,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Sistemas de gestão",
    texto: "Escolhemos e implantamos o sistema certo, como ERP e CRM, integrado à rotina.",
    icone: AppWindow,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Indicadores e painéis",
    texto: "Criamos painéis com os números da empresa atualizados para decidir melhor.",
    icone: ChartColumnIncreasing,
    fundo: "bg-peach-200/70",
  },
];

const principios: Motivo[] = [
  {
    titulo: "Processo antes da ferramenta",
    texto: "Primeiro organizamos como o trabalho deve acontecer. Depois escolhemos a tecnologia.",
    icone: Workflow,
  },
  {
    titulo: "Do tamanho da sua empresa",
    texto: "Soluções proporcionais à sua realidade e ao seu orçamento, sem exageros.",
    icone: SlidersHorizontal,
  },
  {
    titulo: "Equipe preparada",
    texto: "Treinamos e acompanhamos a equipe para que a tecnologia seja usada de verdade.",
    icone: UserCheck,
  },
];

export default function InovaPage() {
  return (
    <>
      <FrenteHero
        nome="Inova"
        slug="inova"
        eyebrow="Inova · Tecnologia e inovação"
        titulo="Processos mais ágeis, equipes mais livres"
        texto="A Versta aplica tecnologia e inovação para eliminar retrabalho, organizar as informações e deixar a operação mais ágil e eficiente, com soluções do tamanho da sua empresa."
        selo={{
          texto: "Tecnologia aplicada à realidade da sua empresa",
          icone: Network,
          fundo: "bg-mist/60",
          cor: "text-navy",
        }}
        emblema={{ icone: Network, cores: ["var(--color-sky)", "var(--color-mist)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* SINAIS DE ALERTA */}
      <Section tone="mint" aria-labelledby="sinais-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="sinais-titulo"
              title="Sua empresa precisa inovar se..."
              lead="Marque o que acontece hoje na sua empresa."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <SinaisAlerta
              sinais={sinais}
              mensagem="Sua operação está perdendo tempo com tarefas que a tecnologia pode resolver. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* ANTES E DEPOIS */}
      <Section aria-labelledby="comparador-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="comparador-titulo"
              title="Do processo travado ao processo que flui"
              lead="Arraste para ver a diferença."
              align="center"
              className="[&_p]:max-lg:hidden"
            />
          </Reveal>
          <InovaComparador />
        </Container>
      </Section>

      {/* O QUE A INOVA FAZ */}
      <Section tone="peach" aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="O que a Inova faz" align="center" />
          </Reveal>
          <ServicosGrid servicos={servicos} />
        </Container>
      </Section>

      {/* TECNOLOGIA A SERVIÇO DAS PESSOAS */}
      <Section tone="mist" aria-labelledby="pessoas-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="pessoas-titulo"
              title="Tecnologia a serviço das pessoas"
              lead="Muitos projetos de tecnologia falham porque começam pela ferramenta. Na Versta, começamos pelas pessoas e pelo processo."
              align="center"
            />
          </Reveal>
          <MotivosLista itens={principios} />
          <FrenteChamada antes="Inovar é fazer melhor" destaque="o que sua empresa já faz." prediagUrl={PREDIAG_URL} />
        </Container>
      </Section>
    </>
  );
}
