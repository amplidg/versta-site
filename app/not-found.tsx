import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="section-y">
      <Container className="max-w-2xl text-center">
        <p className="eyebrow text-caramel-700">Página não encontrada</p>
        <h1 className="mt-4 text-h1 text-navy">Este caminho não leva a lugar nenhum</h1>
        <p className="mt-5 text-lead text-ink-muted">
          A página que você procura não existe ou mudou de endereço.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" arrow>
            Voltar ao início
          </Button>
          <Button href="/consultoria" variant="outline">
            Ver as frentes
          </Button>
        </div>
      </Container>
    </section>
  );
}
