import type { ReactNode } from "react";
import { Texto } from "./Texto";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Nível do título. Cada página deve ter um único h1. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  align?: "left" | "center";
  /** Aplica cores para fundos escuros. */
  onDark?: boolean;
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  id,
  align = "left",
  onDark = false,
  children,
  className = "",
}: Props) {
  const center = align === "center";
  const size = Tag === "h1" ? "text-h1" : Tag === "h2" ? "text-h2" : "text-h3";
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-4 flex items-center gap-3 ${center ? "justify-center" : ""} ${
            onDark ? "text-peach-100" : "text-caramel-700"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-8 ${onDark ? "bg-peach-100/70" : "bg-caramel"}`}
          />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={`${size} ${onDark ? "text-offwhite" : "text-navy"}`}>
        <Texto>{title}</Texto>
      </Tag>
      {lead && (
        <p
          className={`mt-5 text-lead ${center ? "mx-auto" : ""} max-w-2xl ${
            onDark ? "text-mist" : "text-ink-muted"
          }`}
        >
          <Texto>{lead}</Texto>
        </p>
      )}
      {children}
    </div>
  );
}
