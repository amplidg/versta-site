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

  contato: {
    telefone: "[PREENCHER: telefone]",
    whatsapp: "[PREENCHER: WhatsApp]",
    email: "[PREENCHER: e-mail]",
    endereco: "[PREENCHER: endereço completo]",
    cidade: "[PREENCHER: cidade/UF]",
    horario: "[PREENCHER: horário de atendimento]",
  },

  redes: [
    { nome: "Instagram", url: "[PREENCHER: link do Instagram]" },
    { nome: "LinkedIn", url: "[PREENCHER: link do LinkedIn]" },
  ],
} as const;

/** Retorna true se o valor ainda é um placeholder [PREENCHER]. */
export function isPlaceholder(value: string) {
  return value.trim().startsWith("[PREENCHER");
}
