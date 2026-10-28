/* Textos fornecidos pelo Lucas — não reescrever. */
const camadas = [
  {
    id: "pessoas",
    nome: "Pessoas",
    frase: "Onde tudo começa.",
    cor: "var(--color-peach-200)",
    beneficios: [
      "Ambiente mais harmonioso e menos conflitos internos",
      "Colaboradores mais saudáveis, com menos afastamentos e faltas",
      "Equipes mais engajadas e produtivas",
      "Lideranças fortalecidas e comunicação interna mais clara",
      "Cultura organizacional mais forte",
      "Retenção e desenvolvimento de talentos, com menor rotatividade e menos custos com desligamentos, contratações e treinamentos",
    ],
  },
  {
    id: "seguranca",
    nome: "Segurança",
    frase: "A estrutura que sustenta o caminho.",
    cor: "var(--color-sage)",
    beneficios: [
      "Adequação à NR-1 e menor risco de multas",
      "Redução de riscos e processos trabalhistas",
      "Maior segurança jurídica nas operações",
      "Governança e compliance fortalecidos",
      "Melhor desempenho em auditorias",
    ],
  },
  {
    id: "mercado",
    nome: "Mercado",
    frase: "Como a sua empresa é vista lá fora.",
    cor: "var(--color-mist)",
    beneficios: [
      "Imagem institucional fortalecida e menor risco reputacional",
      "Conformidade com as exigências de clientes e grandes marcas, no Brasil e no exterior",
      "Mais competitividade e novas oportunidades de negócio",
      "Práticas ESG e um negócio mais sustentável",
    ],
  },
];

/**
 * Geometria dos anéis (viewBox 400×400, centro em 200,200), de dentro para
 * fora, na mesma ordem de `camadas`. Os anéis não se sobrepõem.
 */
const aneis = [
  { interno: 0, externo: 72, rotuloY: 200 },
  { interno: 72, externo: 132, rotuloY: 98 },
  { interno: 132, externo: 192, rotuloY: 38 },
];

/**
 * Benefícios em três camadas concêntricas (Pessoas → Segurança → Mercado).
 * A ilustração é só um resumo visual: as três listas ficam sempre abertas,
 * lado a lado no computador e empilhadas no celular (pedido do Lucas — a
 * versão anterior, com anéis clicáveis e um painel, escondia o conteúdo).
 * A cor no topo de cada lista é a do anel correspondente.
 */
export function BenefitLayers() {
  return (
    <div>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Três camadas concêntricas: Pessoas no centro, Segurança no meio e Mercado por fora"
        className="mx-auto block w-full max-w-[17rem] overflow-visible sm:max-w-[20rem] lg:max-w-[23rem]"
      >
        {/* Círculos geométricos (o Lucas preferiu ao estilo aquarelado): cada
            anel tem preenchimento translúcido e um contorno nítido na própria
            cor, que faz a divisão entre as camadas. */}
        {[2, 1, 0].map((i) => {
          const anel = aneis[i];
          const raio = (anel.interno + anel.externo) / 2;
          const espessura = anel.externo - anel.interno;
          return (
            <g key={camadas[i].id}>
              {anel.interno === 0 ? (
                <circle cx="200" cy="200" r={anel.externo} fill={camadas[i].cor} opacity="0.4" />
              ) : (
                <circle
                  cx="200"
                  cy="200"
                  r={raio}
                  fill="none"
                  stroke={camadas[i].cor}
                  strokeWidth={espessura}
                  opacity="0.4"
                />
              )}
              <circle cx="200" cy="200" r={anel.externo} fill="none" stroke={camadas[i].cor} strokeWidth="2.5" />
              <text
                x="200"
                y={anel.rotuloY}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--color-navy)"
                className="font-display text-[19px] font-bold"
              >
                {camadas[i].nome}
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-10">
        {camadas.map((camada) => (
          <li key={camada.id}>
            {/* faixa na cor do anel correspondente */}
            <span aria-hidden="true" className="block h-1.5 rounded-full" style={{ background: camada.cor }} />
            <h3 className="mt-6 text-h3 text-navy max-lg:text-center">{camada.nome}</h3>
            <p className="mt-1.5 font-display text-lg text-ink-muted italic max-lg:text-center">{camada.frase}</p>
            <ul className="mt-6 space-y-3.5">
              {camada.beneficios.map((b) => (
                <li key={b} className="flex gap-3.5 text-ink">
                  <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-caramel" />
                  {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
