import { HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Sh2Checklist } from "@/components/sections/Sh2Checklist";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { ctaDiagnostico } from "@/data/navegacao";

/* Textos fornecidos pelo Lucas — não reescrever. */
const pilares = [
  {
    titulo: "Segurança",
    texto: "Uma base técnica e legal para a adequação à NR-1.",
    icone: ShieldCheck,
  },
  {
    titulo: "Cuidado",
    texto: "Saúde mental, corpo e bem-estar integrados em um só programa.",
    icone: HeartHandshake,
  },
  {
    titulo: "Harmonia",
    texto: "Pessoas mais saudáveis, engajadas e uma cultura mais forte.",
    icone: Users,
  },
];

/**
 * Bloco de destaque do Programa SH2 na Home: fundo azul-marinho, texto à
 * esquerda e checklist interativo da NR-1 à direita (empilhados no celular).
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

      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <p className="inline-block rounded-button bg-caramel-700 px-3.5 py-2 text-sm leading-snug font-semibold text-white">
            NR-1 · Fiscalização dos riscos psicossociais em vigor desde maio de 2026
          </p>
          <p className="eyebrow mt-7 text-peach-100">Programa SH2 · Ser Humano em Harmonia</p>
          <h2 id="sh2-destaque-titulo" className="mt-4 text-h2 text-offwhite">
            A NR-1 mudou. Sua empresa já está preparada?
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-offwhite/90">
            A NR-1 já exige que as empresas cuidem dos riscos psicossociais, com fiscalização e
            multas. O Programa SH2 une diagnóstico, saúde mental e ações contínuas para sua empresa
            cumprir a norma e cuidar das pessoas.
          </p>

          <ul className="mt-10 grid gap-7 sm:grid-cols-3 sm:gap-6">
            {pilares.map((p) => {
              const Icon = p.icone;
              return (
                <li key={p.titulo} className="flex gap-4 sm:block">
                  <Icon aria-hidden="true" className="size-7 shrink-0 text-caramel" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-display text-xl font-bold text-offwhite sm:mt-4">{p.titulo}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mint">{p.texto}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/metodologia/sh2" variant="light" arrow>
              Conheça o Programa SH2
            </Button>
            <Button href={ctaDiagnostico.href} variant="outline-light">
              {ctaDiagnostico.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-5">
          <Sh2Checklist />
        </Reveal>
      </Container>
    </Section>
  );
}
