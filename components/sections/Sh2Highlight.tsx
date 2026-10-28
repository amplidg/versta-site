import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Sh2Checklist } from "@/components/sections/Sh2Checklist";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { ctaDiagnostico } from "@/data/navegacao";
import { asset } from "@/lib/paths";

/*
 * Imagem enviada pelo Lucas (17/10): equipe em reunião, com os três pilares
 * (Segurança, Cuidado, Harmonia) já desenhados nela. Substituiu a lista de
 * pilares com ícones. Como os textos estão na imagem, o alt os repete.
 */
const IMAGEM_PILARES = {
  src: "/images/sh2-seguranca-cuidado-harmonia.webp",
  largura: 1600,
  altura: 900,
  alt: "Ilustração em aquarela de uma equipe conversando em uma sala de reunião, com os três pilares do Programa SH2: Segurança — uma base técnica e legal para a adequação à NR-1; Cuidado — saúde mental, corpo e bem-estar integrados em um só programa; Harmonia — pessoas mais saudáveis, engajadas e uma cultura mais forte.",
};

/**
 * Bloco de destaque do Programa SH2 na Home: fundo azul-marinho. À esquerda,
 * texto e a imagem dos pilares; à direita, o checklist da NR-1 e os botões —
 * os botões ficam embaixo do card para as duas colunas terminarem juntas.
 * No celular: texto, imagem, checklist e botões, nessa ordem.
 */
export function Sh2Highlight() {
  return (
    <Section tone="navy" aria-labelledby="sh2-destaque-titulo" className="relative isolate overflow-hidden">
      {/* manchas suaves de aquarela nas bordas (decorativas) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[34rem] rounded-full bg-green-700 opacity-25 blur-3xl" />
        <div className="absolute -right-48 -bottom-48 size-[38rem] rounded-full bg-sky opacity-15 blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-72 rounded-full bg-green-900 opacity-30 blur-3xl" />
      </div>

      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          {/* no celular/tablet: selo, linha pequena, título e botões centralizados (pedido do Lucas, 28/10) */}
          <p className="w-fit rounded-button bg-caramel-700 max-lg:mx-auto max-lg:text-center px-3.5 py-2 text-sm leading-snug font-semibold text-white">
            NR-1 · Fiscalização dos riscos psicossociais em vigor desde maio de 2026
          </p>
          <p className="eyebrow mt-7 text-peach-100 max-lg:text-center">Programa SH2 · Ser Humano em Harmonia</p>
          <h2 id="sh2-destaque-titulo" className="mt-4 text-h2 text-offwhite max-lg:text-center max-lg:text-[length:min(var(--text-h2),calc(7.2vw_-_0.2rem))]">
            {/* no celular, em duas linhas: a fonte encolhe só o necessário para a 1ª linha caber */}
            A NR-1 mudou. Sua empresa<br className="lg:hidden" /> já está preparada?
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-offwhite/90">
            A NR-1 já exige que as empresas cuidem dos riscos psicossociais, com fiscalização e
            multas. O Programa SH2 une diagnóstico, saúde mental e ações contínuas para sua empresa
            cumprir a norma e cuidar das pessoas.
          </p>

          <Image
            src={asset(IMAGEM_PILARES.src)}
            alt={IMAGEM_PILARES.alt}
            width={IMAGEM_PILARES.largura}
            height={IMAGEM_PILARES.altura}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="mt-10 h-auto w-full rounded-card"
          />
        </Reveal>

        <Reveal delay={150} className="flex flex-col gap-8 lg:col-span-5 lg:justify-between">
          <Sh2Checklist />
          <div className="flex flex-wrap gap-3 max-lg:justify-center">
            <Button href="/metodologia/sh2" variant="light" arrow>
              Conheça o Programa SH2
            </Button>
            <Button href={ctaDiagnostico.href} variant="outline-light">
              {ctaDiagnostico.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
