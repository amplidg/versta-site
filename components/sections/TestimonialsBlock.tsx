import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientesSemear, clientesVersta, depoimentos, type Cliente } from "@/data/depoimentos";
import { asset } from "@/lib/paths";

/**
 * Depoimentos + cartela de clientes (Home, logo após o bloco da fundadora).
 * Conteúdo em `data/depoimentos.ts`. Cada parte só aparece se a sua lista tiver itens; com
 * as duas vazias, o bloco inteiro some.
 */
export function TestimonialsBlock() {
  const temDepoimentos = depoimentos.length > 0;
  const grupos = [
    { titulo: "Empresas atendidas pela Semear", lista: clientesSemear },
    { titulo: "Empresas atendidas pela Versta", lista: clientesVersta },
  ].filter((g) => g.lista.length > 0);
  const temClientes = grupos.length > 0;
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
            {/* dois lados separados por uma linha no meio (no celular, um embaixo do outro) */}
            <div
              className={`grid gap-12 ${
                grupos.length > 1
                  ? "lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-sage lg:[&>*]:px-10 lg:[&>*:first-child]:pl-0 lg:[&>*:last-child]:pr-0"
                  : ""
              }`}
            >
              {grupos.map((g, i) => (
                <div
                  key={g.titulo}
                  className={i > 0 ? "border-t border-sage pt-12 lg:border-t-0 lg:pt-0" : ""}
                >
                  <h3 className="eyebrow text-center text-caramel-700">{g.titulo}</h3>
                  <LogoGrid lista={g.lista} />
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}

/** Grade de logos, pintados de azul-marinho (precisam ter fundo transparente). */
function LogoGrid({ lista }: { lista: Cliente[] }) {
  return (
    <ul className="mt-8 grid grid-cols-3 gap-4 sm:gap-5">
      {lista.map((c, i) => (
        <li key={`${i}-${c.nome}`} className="flex h-16 items-center justify-center">
          {c.logo ? (
            // a imagem vira máscara de um fundo da cor da marca
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
  );
}
