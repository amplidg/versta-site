"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { frentes } from "@/data/frentes";
import { ctaDiagnostico, navPrincipal } from "@/data/navegacao";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Fecha menus ao trocar de página
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 transition-[opacity,transform] duration-700 ease-[var(--ease-calm)]">
      {/* Fundo em camada própria: backdrop-filter no <header> criaria um
          bloco de contenção e quebraria o painel fixo do menu móvel. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-[background-color,box-shadow] duration-500 ${
          scrolled || mobileOpen
            ? "bg-offwhite/95 shadow-[0_1px_0_rgb(0_52_98/0.08)] backdrop-blur-md"
            : "bg-offwhite/0"
        }`}
      />
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 rounded-sm">
          <Logo />
          <span className="sr-only"> — página inicial</span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navPrincipal.map((item) =>
              item.href === "/consultoria" ? (
                <li key={item.href}>
                  <FrentesDropdown active={isActive(pathname, item.href)} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="relative block px-3.5 py-2 text-[0.9375rem] font-medium text-navy transition-colors hover:text-caramel-700 aria-[current=page]:text-caramel-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={ctaDiagnostico.href} variant="primary" className="px-5! py-2.5!">
              {ctaDiagnostico.label}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-button text-navy lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? "Fechar menu" : "Abrir menu"}</span>
            {mobileOpen ? (
              <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

/* ---------------------------------------------------------------------- */

function FrentesDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 px-3.5 py-2 text-[0.9375rem] font-medium transition-colors hover:text-caramel-700 ${
          active ? "text-caramel-700" : "text-navy"
        }`}
      >
        Consultoria
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3"
      >
        <div className="rounded-card border border-navy/10 bg-offwhite p-3 shadow-[0_24px_60px_-24px_rgb(0_52_98/0.28)]">
          <Link
            href="/consultoria"
            className="mb-2 flex items-center justify-between rounded-button bg-peach-100 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-peach-200"
          >
            Visão geral das 9 frentes
            <span aria-hidden="true">→</span>
          </Link>
          <ul className="grid grid-cols-2 gap-0.5">
            {frentes.map((f) => {
              const Icon = f.icone;
              return (
                <li key={f.slug}>
                  <Link
                    href={`/consultoria/${f.slug}`}
                    aria-current={pathname === `/consultoria/${f.slug}` ? "page" : undefined}
                    className="flex items-start gap-3 rounded-button px-3 py-2.5 transition-colors hover:bg-mist/45 aria-[current=page]:bg-mist/45"
                  >
                    <Icon aria-hidden="true" className="mt-0.5 size-[1.125rem] shrink-0 text-caramel-700" strokeWidth={1.5} />
                    <span className="leading-tight">
                      <span className="block font-display text-[0.9375rem] font-semibold text-navy">
                        {f.nome}
                      </span>
                      <span className="text-[0.8125rem] text-ink-muted">{f.area}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [frentesOpen, setFrentesOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="menu-mobile"
      ref={panelRef}
      hidden={!open}
      className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-offwhite lg:hidden"
    >
      <nav aria-label="Menu móvel" className="container-site py-6">
        <ul className="divide-y divide-navy/10 border-y border-navy/10">
          {navPrincipal.map((item) =>
            item.href === "/consultoria" ? (
              <li key={item.href}>
                <button
                  type="button"
                  aria-expanded={frentesOpen}
                  aria-controls="menu-mobile-frentes"
                  onClick={() => setFrentesOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 font-display text-2xl font-semibold text-navy"
                >
                  Consultoria
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 transition-transform ${frentesOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                  />
                </button>
                <ul id="menu-mobile-frentes" hidden={!frentesOpen} className="pb-4">
                  <li>
                    <Link href="/consultoria" className="block py-2 font-semibold text-caramel-700">
                      Visão geral das frentes
                    </Link>
                  </li>
                  {frentes.map((f) => {
                    const Icon = f.icone;
                    return (
                      <li key={f.slug}>
                        <Link
                          href={`/consultoria/${f.slug}`}
                          className="flex items-center gap-3 py-2 text-navy"
                        >
                          <Icon aria-hidden="true" className="size-4 text-caramel-700" strokeWidth={1.5} />
                          <span className="font-semibold">{f.nome}</span>
                          <span className="text-sm text-ink-muted">{f.area}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-4 font-display text-2xl font-semibold text-navy aria-[current=page]:text-caramel-700"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <Button href={ctaDiagnostico.href} variant="primary" arrow className="mt-8 w-full">
          {ctaDiagnostico.label}
        </Button>
      </nav>
    </div>
  );
}
