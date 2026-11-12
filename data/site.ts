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
    "A Versta diagnostica empresas, identifica as áreas que precisam se desenvolver e conecta cada uma às soluções especializadas do seu ecossistema de parceiros.",
  locale: "pt_BR",

  // Contatos enviados pelo Lucas em 15/10/2026. Sem e-mail, por decisão dele.
  // Telefone trocado em 10/11: o número é também o WhatsApp, e clicar nele
  // abre a conversa no WhatsApp (pedido do Lucas).
  contato: {
    telefone: "(48) 99170-1463",
    /** Mesmo telefone, no formato internacional (dados para o Google). */
    telefoneLink: "+5548991701463",
    /** Link que abre a conversa no WhatsApp com esse número. */
    whatsappLink: "https://wa.me/5548991701463",
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

  // Links enviados pelo Lucas em 12/11.

  redes: [
    { nome: "Instagram", url: "https://www.instagram.com/verstahub/" },
    { nome: "LinkedIn", url: "https://www.linkedin.com/in/versta-solu%C3%A7%C3%B5es-para-empresas-52226144b/" },
  ],
} as const;

/** Retorna true se o valor ainda é um placeholder [PREENCHER]. */
export function isPlaceholder(value: string) {
  return value.trim().startsWith("[PREENCHER");
}
