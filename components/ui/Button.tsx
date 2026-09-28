import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "primary" | "accent" | "outline" | "light" | "outline-light";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-button px-6 py-3.5 text-[0.9375rem] font-semibold tracking-[0.01em] transition-colors duration-300 ease-[var(--ease-calm)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  /** Ação principal sobre fundo claro. */
  primary: "bg-navy text-offwhite hover:bg-green-900",
  /** CTA pontual em caramelo (tom -700 para manter contraste AA). */
  accent: "bg-caramel-700 text-white hover:bg-navy",
  /** Ação secundária sobre fundo claro. */
  outline: "border border-navy/70 text-navy hover:bg-navy hover:text-offwhite",
  /** Ação principal sobre fundo escuro. */
  light: "bg-offwhite text-navy hover:bg-peach-100",
  /** Ação secundária sobre fundo escuro. */
  "outline-light":
    "border border-offwhite/70 text-offwhite hover:bg-offwhite hover:text-navy",
};

type Common = {
  variant?: ButtonVariant;
  /** Exibe a seta de direção ao final. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = Common & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;
type AsButton = Common & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", arrow = false, children, className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, arrow: _a, className: _c, children: _ch, ...rest } = props;
    return (
      <Link {...rest} className={classes}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, arrow: _a, className: _c, children: _ch, ...rest } = props;
  return (
    <button type="button" {...rest} className={classes}>
      {content}
    </button>
  );
}
