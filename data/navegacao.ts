export type NavItem = { label: string; href: string };

/** Menu principal. "Consultoria" recebe o dropdown das frentes no Header. */
export const navPrincipal: NavItem[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Consultoria", href: "/consultoria" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Instituto", href: "/instituto" },
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
