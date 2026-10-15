/**
 * Configuração central do site.
 * Tudo marcado com [PREENCHER] ainda precisa ser fornecido pela Versta.
 * Os componentes leem daqui: ao preencher, o site inteiro é atualizado.
 */

// TODO [PREENCHER]: definir o domínio oficial em NEXT_PUBLIC_SITE_URL (.env)
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  name: "Versta",
  tagline: "Análise, Experiência e Percepção",
  description:
    "A Versta diagnostica empresas, identifica as áreas que precisam se desenvolver para crescer e conecta cada uma às soluções especializadas do seu ecossistema de parceiros.",
  locale: "pt_BR",

  // Contatos enviados pelo Lucas em 15/10/2026. Sem e-mail, por decisão dele.
  contato: {
    telefone: "(48) 9.9944-0674",
    /** Mesmo telefone, no formato usado no link "ligar" (tel:). */
    telefoneLink: "+5548999440674",
    whatsapp: "[PREENCHER: WhatsApp]",
    endereco: "Av. Marcolino Martins Cabral, 3108, ETR Business, sala 603 – Vila Moema",
    cidade: "Tubarão – SC, 88701-000",
    horario: "Segunda a sexta, das 8h às 12h e das 13h30 às 18h",
  },

  /** O mesmo endereço e horário, separados para o Google (schema.org). */
  enderecoEstruturado: {
    rua: "Av. Marcolino Martins Cabral, 3108, ETR Business, sala 603",
    bairro: "Vila Moema",
    cidade: "Tubarão",
    estado: "SC",
    cep: "88701-000",
  },
  /**
   * Busca usada no mapa da página Contato e no link "Abrir no Google Maps".
   * Com o nome do prédio, o Google acha o ponto exato; só pelo endereço ele
   * caía no bairro e CEP errados.
   */
  mapaBusca: "ETR Business, Av. Marcolino Martins Cabral, 3108, Tubarão - SC",
  horarioEstruturado: { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], turnos: [["08:00", "12:00"], ["13:30", "18:00"]] },

  redes: [
    { nome: "Instagram", url: "[PREENCHER: link do Instagram]" },
    { nome: "LinkedIn", url: "[PREENCHER: link do LinkedIn]" },
  ],
} as const;

/** Retorna true se o valor ainda é um placeholder [PREENCHER]. */
export function isPlaceholder(value: string) {
  return value.trim().startsWith("[PREENCHER");
}
