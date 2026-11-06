export type NavItem = { label: string; href: string };

/**
 * Menu principal (também usado no rodapé e no sitemap). "Soluções" recebe o
 * dropdown das frentes no Header. Ordem e rótulos definidos pelo Lucas
 * (16/10), na mesma linha do organograma; a página Metodologia saiu do menu
 * (segue acessível pela Home e pela página do Programa SH2). Os endereços
 * /consultoria e /instituto não mudaram. Em 06/11 o Lucas pediu a aba
 * "Início" na frente e "Sobre" por último.
 */
export const navPrincipal: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Projetos Sociais", href: "/instituto" },
  { label: "Soluções", href: "/consultoria" },
  { label: "Programa SH2", href: "/metodologia/sh2" },
  { label: "Contato", href: "/contato" },
  { label: "Sobre", href: "/sobre" },
];

export const ctaDiagnostico: NavItem = {
  label: "Solicitar diagnóstico",
  href: "/diagnostico",
};

/** Mapa do site usado no rodapé e no sitemap.xml. */
export const mapaDoSite: NavItem[] = [
  ...navPrincipal,
  ctaDiagnostico,
];
