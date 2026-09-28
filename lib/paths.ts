/** Subpasta de publicação (ver next.config.ts). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixa arquivos de /public com a subpasta de publicação.
 * Necessário em next/image e <img>: o Next.js não aplica o basePath
 * automaticamente nesses casos (links do next/link já recebem).
 */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
