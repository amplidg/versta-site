"use client";

import { Suspense, useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CircleCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { frentes } from "@/data/frentes";
import { site } from "@/data/site";

/*
 * Envio pelo WhatsApp (pedido do Lucas, 16/11): ao enviar, o formulário abre a
 * conversa com a Versta numa nova aba, com tudo o que a pessoa preencheu já
 * escrito; ela só confirma o envio no WhatsApp. Para trocar por e-mail no
 * futuro, basta mudar o que acontece em onSubmit.
 */

/** Nome legível de cada opção de "Área de interesse". */
function nomeDaArea(valor: string) {
  if (valor === "ainda-nao-sei") return "Ainda não sei";
  if (valor === "programa-sh2") return "Programa SH2";
  const f = frentes.find((x) => x.slug === valor);
  return f ? `${f.nome} (${f.area})` : valor;
}

/** Link do WhatsApp da Versta com a mensagem montada a partir do formulário. */
function linkDoWhatsapp(data: FormData) {
  const v = (nome: string) => String(data.get(nome) ?? "").trim();
  const opcional = (rotulo: string, nome: string) => (v(nome) ? [`*${rotulo}:* ${v(nome)}`] : []);
  const texto = [
    "Olá! Vim pelo site da *Versta* e gostaria de conversar.",
    "",
    `*Nome:* ${v("nome")}`,
    ...opcional("Empresa", "empresa"),
    `*E-mail:* ${v("email")}`,
    ...opcional("Telefone", "telefone"),
    `*Área de interesse:* ${nomeDaArea(v("area"))}`,
    "",
    "*Mensagem:*",
    v("mensagem"),
  ].join("\n");
  return `${site.contato.whatsappLink}?text=${encodeURIComponent(texto)}`;
}

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

export function ContactForm({ submitLabel = "Enviar pelo WhatsApp", defaultArea = "" }: Props) {
  const id = useId();
  const [erros, setErros] = useState<Erros>({});
  /** Link do WhatsApp da última mensagem enviada (para abrir de novo). */
  const [enviado, setEnviado] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
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

    // Abre já, no próprio clique, para o navegador não bloquear a nova aba.
    const link = linkDoWhatsapp(data);
    const aba = window.open(link, "_blank", "noopener");
    if (!aba) window.location.href = link;
    setEnviado(link);
    form.reset();
  }

  if (enviado) {
    return (
      <div role="status" className="rounded-card bg-sage/35 p-8 md:p-10">
        <CircleCheck aria-hidden="true" className="size-8 text-green-900" strokeWidth={1.5} />
        <p className="mt-4 font-display text-2xl font-semibold text-navy">Falta só confirmar no WhatsApp</p>
        <p className="mt-2 text-ink-muted">
          Sua mensagem abriu no WhatsApp da Versta, já escrita. Toque em enviar
          por lá para ela chegar até nós. Obrigado pelo contato!
        </p>
        <a
          href={enviado}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-navy underline underline-offset-4 hover:text-caramel-700"
        >
          O WhatsApp não abriu? Abrir de novo
          <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          <span className="sr-only"> (nova aba)</span>
        </a>
        <br />
        <button
          type="button"
          onClick={() => setEnviado(null)}
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
          {/* pedido do Lucas, 11/11 */}
          <option value="programa-sh2">Programa SH2</option>
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
          <span aria-hidden="true" className="text-caramel-700">*</span> Campos obrigatórios.
          {" "}A mensagem abre no WhatsApp da Versta, pronta para enviar.
        </p>
        <Button type="submit" variant="primary" className="shrink-0">
          {submitLabel}
          <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.5} />
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
