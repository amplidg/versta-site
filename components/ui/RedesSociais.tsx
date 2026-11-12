import { isPlaceholder, site } from "@/data/site";

/*
 * Ícones clicáveis das redes da Versta (Instagram e LinkedIn), pedido do
 * Lucas em 12/11. Aparecem no rodapé (tom "escuro") e na página Contato
 * (tom "claro"). Os links ficam em data/site.ts; rede com [PREENCHER] some.
 * Desenhos no mesmo traço fino dos ícones Lucide (que não trazem mais
 * logos de marcas).
 */

function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function IconeLinkedin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const icones: Record<string, () => React.JSX.Element> = {
  Instagram: IconeInstagram,
  LinkedIn: IconeLinkedin,
};

export function redesProntas() {
  return site.redes.filter((rede) => !isPlaceholder(rede.url));
}

export function RedesSociais({ tom, className = "" }: { tom: "escuro" | "claro"; className?: string }) {
  const redes = redesProntas();
  if (redes.length === 0) return null;
  const estilo =
    tom === "escuro"
      ? "border-offwhite/30 text-offwhite hover:border-peach-100 hover:bg-peach-100 hover:text-navy"
      : "border-navy/20 bg-offwhite text-navy hover:border-navy hover:bg-navy hover:text-offwhite";
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {redes.map((rede) => {
        const Icone = icones[rede.nome];
        return (
          <li key={rede.nome}>
            <a
              href={rede.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${rede.nome} da Versta`}
              className={`flex size-11 items-center justify-center rounded-full border transition-colors ${estilo}`}
            >
              {Icone ? <Icone /> : <span className="text-xs font-semibold">{rede.nome}</span>}
              <span className="sr-only">{rede.nome} da Versta (abre em nova aba)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
