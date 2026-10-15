export type NavItem = { label: string; href: string };

/**
 * Menu principal (também usado no rodapé e no sitemap). "Soluções" recebe o
 * dropdown das frentes no Header. Os rótulos seguem o organograma (pedido do
 * Lucas, 15/10); os endereços /consultoria e /instituto não mudaram.
 */
export const navPrincipal: NavItem[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Soluções", href: "/consultoria" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Projetos Sociais", href: "/instituto" },
  { label: "Contato", href: "/contato" },
];

export const ctaDiagnostico: NavItem = {
  label: "Solicitar diagnóstico",
  href: "/diagnostico",
};

/** Mapa do site usado no rodapé e no sitemap.xml. */
export const mapaDoSite: NavItem[] = [
  { label: "Início", href: "/" },
  ...navPrincipal,
  ctaDiagnostico,
];
