"use client";

import { Suspense, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CircleAlert, CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { frentes } from "@/data/frentes";
import { site } from "@/data/site";
import { asset } from "@/lib/paths";

/*
 * Envio por e-mail (pedido do Lucas, 19/11): o formulário manda os dados para
 * public/contato-envio.php, que envia um e-mail para contato@versta.com.br
 * pelo SMTP da Hostinger. Se o envio falhar, a pessoa pode mandar a mesma
 * mensagem pelo WhatsApp (de 16/11 a 19/11 o formulário só abria o WhatsApp).
 */
const ENVIO_URL = "/contato-envio.php";

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

export function ContactForm({ submitLabel = "Enviar mensagem", defaultArea = "" }: Props) {
  const id = useId();
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  /** Quando o envio falha: link do WhatsApp com a mesma mensagem. */
  const [falha, setFalha] = useState<string | null>(null);
  /** Hora em que o formulário apareceu (antispam: robôs enviam na hora). */
  const inicio = useRef(0);
  useEffect(() => {
    inicio.current = Date.now();
  }, []);

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
    setFalha(null);
    const v = (nome: string) => String(data.get(nome) ?? "").trim();
    try {
      const resp = await fetch(asset(ENVIO_URL), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: v("nome"),
          empresa: v("empresa"),
          email: v("email"),
          telefone: v("telefone"),
          area: nomeDaArea(v("area")),
          mensagem: v("mensagem"),
          site_web: v("site_web"),
          tempo: Date.now() - inicio.current,
        }),
      });
      const json = await resp.json().catch(() => null);
      if (!resp.ok || !json?.ok) throw new Error("envio");
      setEnviado(true);
      form.reset();
    } catch {
      setFalha(linkDoWhatsapp(data));
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div role="status" className="rounded-card bg-sage/35 p-8 md:p-10">
        <CircleCheck aria-hidden="true" className="size-8 text-green-900" strokeWidth={1.5} />
        <p className="mt-4 font-display text-2xl font-semibold text-navy">Mensagem enviada</p>
        <p className="mt-2 text-ink-muted">
          Obrigado pelo contato. Em breve a equipe da Versta retorna para
          conversar sobre os próximos passos.
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
      {/* antispam: campo invisível que só robôs preenchem */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={campo("site_web")}>Não preencha este campo</label>
        <input id={campo("site_web")} name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>
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
          <span aria-hidden="true" className="text-caramel-700">*</span> Campos obrigatórios
        </p>
        <Button type="submit" variant="primary" className="shrink-0" disabled={enviando}>
          {enviando ? "Enviando…" : submitLabel}
          <Send aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </Button>
      </div>

      {falha && (
        <div role="alert" className="flex gap-3 rounded-card bg-peach-100 p-5 text-navy sm:col-span-2">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-caramel-700" strokeWidth={1.75} />
          <p>
            Não foi possível enviar agora. Tente de novo em instantes ou{" "}
            <a
              href={falha}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:text-caramel-700"
            >
              envie a mesma mensagem pelo WhatsApp
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <span className="sr-only"> (nova aba)</span>
            </a>
            .
          </p>
        </div>
      )}
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
