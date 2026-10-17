import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientes, depoimentos } from "@/data/depoimentos";
import { asset } from "@/lib/paths";

/**
 * Depoimentos + cartela de clientes (Home, logo após o bloco da fundadora).
 * Conteúdo em `data/depoimentos.ts`. Cada parte só aparece se a sua lista tiver itens; com
 * as duas vazias, o bloco inteiro some.
 */
export function TestimonialsBlock() {
  const temDepoimentos = depoimentos.length > 0;
  const temClientes = clientes.length > 0;
  if (!temDepoimentos && !temClientes) return null;

  return (
    <Section aria-labelledby="depoimentos-titulo">
      <Container>
        <Reveal>
          <SectionHeading
            id="depoimentos-titulo"
            eyebrow="Depoimentos"
            // neutro de propósito: os depoimentos são de clientes da Semear, outra
            // empresa da fundadora — a Versta ainda não atendeu clientes (16/10)
            title="Empresas que já estão seguindo esse caminho"
            align="center"
          />
        </Reveal>

        {temDepoimentos && (
          <Reveal delay={120} className="mt-12 lg:mt-14">
            <TestimonialCarousel depoimentos={depoimentos} />
          </Reveal>
        )}

        {/* PARTE 3 — cartela de clientes */}
        {temClientes && (
          <Reveal
            className={temDepoimentos ? "mt-20 border-t border-sage pt-16 lg:mt-24 lg:pt-20" : "mt-12 lg:mt-14"}
          >
            <h3 className="eyebrow text-center text-caramel-700">Empresas atendidas</h3>
            <ul className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-6">
              {clientes.map((c, i) => (
                <li key={`${i}-${c.nome}`} className="flex h-16 items-center justify-center">
                  {c.logo ? (
                    // Logo pintado de azul-marinho: a imagem vira máscara de um
                    // fundo da cor da marca (precisa ter fundo transparente).
                    <span
                      role="img"
                      aria-label={c.nome}
                      className="block h-10 w-full bg-navy opacity-60 transition-opacity duration-300 hover:opacity-100 motion-reduce:transition-none"
                      style={{
                        maskImage: `url(${asset(c.logo)})`,
                        WebkitMaskImage: `url(${asset(c.logo)})`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center rounded-button bg-navy/[0.07] px-2 text-center text-xs">
                      <mark className="todo-mark">[PREENCHER: logo]</mark>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
