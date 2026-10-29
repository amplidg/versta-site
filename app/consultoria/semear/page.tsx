import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Coins,
  FileBadge,
  FileX,
  Lock,
  Recycle,
  Scale,
  Sprout,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FrenteEmblema } from "@/components/sections/FrenteEmblema";
import { SemearSinais } from "@/components/sections/semear/SemearSinais";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

/*
 * Página própria da frente Semear (especificação e textos do Lucas, 29/10).
 * Substitui, só para a Semear, a página genérica de app/consultoria/[slug].
 */

/** Link do pré-diagnóstico (o Lucas vai passar). */
const PREDIAG_URL = "#";
/** Link do WhatsApp (o Lucas vai passar). Abre em nova aba. */
const WHATSAPP_URL = "#";

export const metadata: Metadata = pageMetadata({
  title: "Semear · Consultoria Ambiental",
  description:
    "Licenciamento, gestão e controle ambiental com mais de 20 anos de experiência. Sua empresa em dia com o meio ambiente, sem sustos.",
  path: "/consultoria/semear",
});

const servicos: { titulo: string; texto: string; icone: LucideIcon; fundo: string }[] = [
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

const custos: { titulo: string; texto: string; icone: LucideIcon }[] = [
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
      {/* HERO — texto à esquerda; à direita, o emblema da frente (no celular, em cima) */}
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden">
        <Container className="grid items-center gap-6 pt-6 pb-16 md:grid-cols-12 md:gap-8 md:pt-14 md:pb-24 lg:min-h-[40rem]">
          <Reveal className="md:col-span-7 md:pr-6 lg:col-span-6 lg:pr-0">
            <nav aria-label="Trilha de navegação" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                <li className="flex items-center gap-1.5">
                  <Link href="/consultoria" className="hover:text-navy hover:underline">
                    Soluções
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5" />
                </li>
                <li aria-current="page" className="font-semibold text-navy">
                  Semear
                </li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 flex items-center gap-3 text-caramel-700">
              <span aria-hidden="true" className="h-px w-8 bg-caramel" />
              Semear · Consultoria ambiental
            </p>
            <h1 id="page-title" className="text-h1 text-balance text-navy">
              Sua empresa em dia com o meio ambiente, sem sustos
            </h1>
            <p className="mt-6 max-w-xl text-lead text-ink-muted">
              Licenças, controles e estudos ambientais conduzidos por quem acompanha empresas há mais
              de 20 anos, para que sua operação siga segura, regular e preparada para o futuro.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="flex size-7 items-center justify-center rounded-full bg-mint">
                <Sprout aria-hidden="true" className="size-4 text-green-900" strokeWidth={1.75} />
              </span>
              Mais de 20 anos de experiência em gestão ambiental
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap max-md:[&>*]:w-full">
              <Button href={PREDIAG_URL} variant="primary" arrow>
                Fazer o pré-diagnóstico
              </Button>
              <Button href={WHATSAPP_URL} variant="outline" target="_blank" rel="noopener noreferrer">
                Falar com um especialista
                <span className="sr-only"> (abre em nova aba)</span>
              </Button>
            </div>
          </Reveal>
          {/* depois do texto no código (leitores de tela leem o título antes);
              no celular, aparece em cima */}
          <div className="order-first flex justify-center md:order-none md:col-span-5 lg:col-span-6">
            <FrenteEmblema
              icon={Sprout}
              color={["var(--color-sage)", "var(--color-mint)"]}
              slug="semear"
              className="w-[180px] md:w-full md:max-w-[22rem] lg:max-w-[30rem]"
            />
          </div>
        </Container>
      </section>

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
            <SemearSinais prediagUrl={PREDIAG_URL} />
          </Reveal>
        </Container>
      </Section>

      {/* O QUE A SEMEAR FAZ */}
      <Section aria-labelledby="faz-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="faz-titulo" title="O que a Semear faz" align="center" />
          </Reveal>
          {/* 3 em cima e 2 embaixo, centralizados, no computador */}
          <ul className="mt-12 flex flex-wrap justify-center gap-5">
            {servicos.map(({ titulo, texto, icone: Icone, fundo }, i) => (
              <Reveal
                as="li"
                key={titulo}
                delay={i * 80}
                className="w-full md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                {/* o hover fica num elemento interno: o <Reveal> já usa a transição de transform */}
                <div className="h-full rounded-card border border-navy/10 bg-white/70 p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-calm)] hover:-translate-y-1 hover:border-caramel hover:shadow-[0_14px_30px_-18px_rgb(0_41_77/0.35)] motion-reduce:transition-none">
                  <span className={`flex size-12 items-center justify-center rounded-full ${fundo}`}>
                    <Icone aria-hidden="true" className="size-6 text-navy" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-h3 text-navy">{titulo}</h3>
                  <p className="mt-2 text-ink-muted">{texto}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* O CUSTO DE NÃO ESTAR EM DIA */}
      <Section tone="peach" aria-labelledby="custo-titulo">
        <Container>
          <Reveal>
            <SectionHeading id="custo-titulo" title="O custo de não estar em dia" align="center" />
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
            {custos.map(({ titulo, texto, icone: Icone }, i) => (
              <Reveal as="li" key={titulo} delay={i * 100} className="text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-caramel/60">
                  <Icone aria-hidden="true" className="size-6 text-caramel-700" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{titulo}</h3>
                <p className="mx-auto mt-2 max-w-xs text-ink-muted">{texto}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-14 flex flex-col items-center gap-6 border-t border-navy/10 pt-10 text-center">
            <p className="text-lead text-navy">Com a Semear, sua empresa cuida disso antes que vire problema.</p>
            <Button href={WHATSAPP_URL} variant="primary" arrow target="_blank" rel="noopener noreferrer">
              Falar com um especialista
              <span className="sr-only"> (abre em nova aba)</span>
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
