import type { Metadata } from "next";
import { CalendarCheck, ClipboardList, Coins, FileBadge, FileX, Lock, Recycle, Scale, Sprout } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteChamada } from "@/components/sections/frente/FrenteChamada";
import { FrenteHero } from "@/components/sections/frente/FrenteHero";
import { MotivosLista, type Motivo } from "@/components/sections/frente/MotivosLista";
import { ServicosGrid, type Servico } from "@/components/sections/frente/ServicosGrid";
import { SinaisAlerta } from "@/components/sections/frente/SinaisAlerta";
import { SemearTrajetoria } from "@/components/sections/semear/SemearTrajetoria";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PREDIAG_URL } from "@/data/links";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Semear (especificação e textos do Lucas, 29/10).
 * Foi a primeira página própria de uma frente (a página genérica saiu em 04/11).
 * As peças (topo, sinais, cards, motivos, fechamento) ficam em
 * components/sections/frente/ e são as mesmas da página da ESG.
 */

export const metadata: Metadata = pageMetadata({
  title: "Semear · Consultoria Ambiental",
  description:
    "Licenciamento, gestão e controle ambiental com mais de 17 anos de experiência. Sua empresa em dia com o meio ambiente, sem sustos.",
  path: "/consultoria/semear",
});

const sinais = [
  "A licença ambiental está perto de vencer, ou você não sabe quando vence.",
  "Recebeu notificação, autuação ou exigência de um órgão ambiental.",
  "Vai abrir, ampliar ou mudar a operação da empresa.",
  "Clientes ou parceiros passaram a exigir comprovação ambiental.",
  "Não tem como comprovar a destinação correta dos resíduos.",
];

const servicos: Servico[] = [
  {
    titulo: "Licenciamento ambiental",
    texto: "Conduzimos todo o processo para sua empresa obter e renovar as licenças e operar dentro da lei.",
    icone: FileBadge,
    fundo: "bg-mint",
  },
  {
    titulo: "Gestão e controle ambiental",
    texto: "Acompanhamos prazos, condicionantes e exigências para que nada fique para trás.",
    icone: CalendarCheck,
    fundo: "bg-peach-100",
  },
  {
    titulo: "Estudos ambientais e projetos",
    texto: "Elaboramos os estudos técnicos que órgãos e investidores exigem.",
    icone: ClipboardList,
    fundo: "bg-mist/70",
  },
  {
    titulo: "Planos e programas ambientais",
    texto: "Estruturamos planos de resíduos, monitoramento e outros programas que a operação precisa.",
    icone: Recycle,
    fundo: "bg-sage/50",
  },
  {
    titulo: "Assessoria técnica em processos judiciais",
    texto: "Damos suporte técnico quando a questão ambiental chega à Justiça.",
    icone: Scale,
    fundo: "bg-peach-200/70",
  },
];

const custos: Motivo[] = [
  {
    titulo: "Multas",
    texto: "As multas por infração ambiental podem chegar a R$ 50 milhões, segundo a legislação federal.",
    icone: Coins,
  },
  {
    titulo: "Paralisação",
    texto: "A atividade pode ser embargada até a regularização.",
    icone: Lock,
  },
  {
    titulo: "Perda de negócios",
    texto: "Cada vez mais clientes e parceiros exigem comprovação ambiental para fechar contratos.",
    icone: FileX,
  },
];

export default function SemearPage() {
  return (
    <>
      <FrenteHero
        nome="Semear"
        slug="semear"
        eyebrow="Semear · Consultoria ambiental"
        titulo="Sua empresa em dia com o meio ambiente, sem sustos"
        texto="Licenças, controles e estudos ambientais conduzidos por quem acompanha empresas há mais de 17 anos, para que sua operação siga segura, regular e preparada para o futuro."
        selo={{
          texto: "Mais de 17 anos de experiência em gestão ambiental",
          icone: Sprout,
          fundo: "bg-mint",
          cor: "text-green-900",
        }}
        emblema={{ icone: Sprout, cores: ["var(--color-sage)", "var(--color-mint)"] }}
        prediagUrl={PREDIAG_URL}
      />

      {/* SINAIS DE ALERTA */}
      <Section tone="mint" aria-labelledby="sinais-titulo">
        <Container>
          <Reveal>
            <SectionHeading
              id="sinais-titulo"
              title="Sua empresa precisa da Semear se..."
              lead="Marque o que acontece hoje na sua empresa."
              align="center"
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <SinaisAlerta
              sinais={sinais}
              mensagem="Sua empresa tem sinais de atenção na área ambiental. Faça o pré-diagnóstico gratuito e descubra por onde começar."
              prediagUrl={PREDIAG_URL}
            />
          </Reveal>
        </Container>
      </Section>

      {/* O QUE A SEMEAR FAZ */}
      <Section aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="O que a Semear faz" align="center" />
          </Reveal>
          <ServicosGrid servicos={servicos} />
        </Container>
      </Section>

      {/* QUEM CONDUZ A SEMEAR — trajetória e autoridade */}
      <SemearTrajetoria />

      {/* O CUSTO DE NÃO ESTAR EM DIA */}
      <Section tone="peach" aria-labelledby="custo-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="custo-titulo" title="O custo de não estar em dia" align="center" />
          </Reveal>
          <MotivosLista itens={custos} />
          <FrenteChamada
            antes="Com a Semear, sua empresa cuida disso"
            destaque="antes que vire problema."
            prediagUrl={PREDIAG_URL}
          />
        </Container>
      </Section>
    </>
  );
}
