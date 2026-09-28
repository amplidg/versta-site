"use client";

import { Suspense, useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { frentes } from "@/data/frentes";

type Props = {
  /** Texto do botão de envio. */
  submitLabel?: string;
  /** Slug da frente pré-selecionada no campo "Área de interesse". */
  defaultArea?: string;
};

type Erros = Partial<Record<"nome" | "email" | "mensagem", string>>;

const inputBase =
  "w-full rounded-button border border-navy/25 bg-white/70 px-4 py-3 text-base text-navy placeholder:text-ink-muted/70 transition-colors focus:border-navy focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel-700 aria-[invalid=true]:border-caramel-700";

function validar(data: FormData): Erros {
  const erros: Erros = {};
  if (!String(data.get("nome") ?? "").trim()) erros.nome = "Informe seu nome.";
  const email = String(data.get("email") ?? "").trim();
  if (!email) erros.email = "Informe seu e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erros.email = "Informe um e-mail válido.";
  if (!String(data.get("mensagem") ?? "").trim())
    erros.mensagem = "Conte um pouco sobre o que sua empresa precisa.";
  return erros;
}

export function ContactForm({ submitLabel = "Enviar mensagem", defaultArea = "" }: Props) {
  const id = useId();
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const novosErros = validar(data);
    setErros(novosErros);
    const primeiroErro = Object.keys(novosErros)[0];
    if (primeiroErro) {
      (form.elements.namedItem(primeiroErro) as HTMLElement | null)?.focus();
      return;
    }

    setEnviando(true);
    // TODO: integrar o envio do formulário.
    // Opções: Route Handler em app/api/contato/route.ts enviando e-mail
    // (ex.: Resend, SMTP), ou serviço externo (Formspree, RD Station, CRM).
    // Payload: Object.fromEntries(data) → { nome, empresa, email, telefone, area, mensagem }
    await new Promise((r) => setTimeout(r, 600));
    setEnviando(false);
    setEnviado(true);
    form.reset();
  }

  if (enviado) {
    return (
      <div role="status" className="rounded-card bg-sage/35 p-8 md:p-10">
        <CircleCheck aria-hidden="true" className="size-8 text-green-900" strokeWidth={1.5} />
        <p className="mt-4 font-display text-2xl font-semibold text-navy">Mensagem registrada</p>
        <p className="mt-2 text-ink-muted">
          Obrigado pelo contato. Em breve a equipe da Versta retorna para
          conversar sobre os próximos passos.
        </p>
        <p className="mt-4 text-sm">
          <mark className="todo-mark">
            [PREENCHER: envio ainda não integrado — esta mensagem é apenas visual]
          </mark>
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-6 text-sm font-semibold text-caramel-700 underline underline-offset-4"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const campo = (name: string) => `${id}-${name}`;
  const erroProps = (name: keyof Erros) =>
    erros[name]
      ? { "aria-invalid": true as const, "aria-describedby": campo(`${name}-erro`) }
      : {};

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field id={campo("nome")} label="Nome" required erro={erros.nome}>
        <input id={campo("nome")} name="nome" type="text" autoComplete="name" required className={inputBase} {...erroProps("nome")} />
      </Field>
      <Field id={campo("empresa")} label="Empresa">
        <input id={campo("empresa")} name="empresa" type="text" autoComplete="organization" className={inputBase} />
      </Field>
      <Field id={campo("email")} label="E-mail" required erro={erros.email}>
        <input id={campo("email")} name="email" type="email" autoComplete="email" inputMode="email" required className={inputBase} {...erroProps("email")} />
      </Field>
      <Field id={campo("telefone")} label="Telefone">
        <input id={campo("telefone")} name="telefone" type="tel" autoComplete="tel" inputMode="tel" className={inputBase} />
      </Field>
      <Field id={campo("area")} label="Área de interesse" className="sm:col-span-2">
        <select id={campo("area")} name="area" defaultValue={defaultArea || "ainda-nao-sei"} className={`${inputBase} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20fill=%22none%22%20stroke=%22%23003462%22%20stroke-width=%221.5%22%3E%3Cpath%20d=%22m4%206%204%204%204-4%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
          <option value="ainda-nao-sei">Ainda não sei</option>
          {frentes.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.nome} — {f.area}
            </option>
          ))}
        </select>
      </Field>
      <Field id={campo("mensagem")} label="Mensagem" required erro={erros.mensagem} className="sm:col-span-2">
        <textarea id={campo("mensagem")} name="mensagem" rows={5} required className={`${inputBase} resize-y`} {...erroProps("mensagem")} />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          <span aria-hidden="true" className="text-caramel-700">*</span> Campos obrigatórios
        </p>
        <Button type="submit" variant="primary" disabled={enviando}>
          {enviando ? "Enviando…" : submitLabel}
          <Send aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  erro,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  erro?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-semibold text-navy">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-caramel-700"> *</span>
            <span className="sr-only"> (obrigatório)</span>
          </>
        )}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="mt-2 text-sm font-medium text-caramel-700">
          {erro}
        </p>
      )}
    </div>
  );
}

/** Lê ?frente=slug da URL para pré-selecionar a área (ex.: vindo de uma frente). */
function ContactFormFromParams(props: Omit<Props, "defaultArea">) {
  const params = useSearchParams();
  const frente = params.get("frente") ?? "";
  const valida = frentes.some((f) => f.slug === frente) ? frente : "";
  return <ContactForm key={valida} {...props} defaultArea={valida} />;
}

export function ContactFormWithParams(props: Omit<Props, "defaultArea">) {
  return (
    <Suspense fallback={<ContactForm {...props} />}>
      <ContactFormFromParams {...props} />
    </Suspense>
  );
}
