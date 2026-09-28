import { Fragment } from "react";

const PLACEHOLDER = /(\[PREENCHER[^\]]*\])/g;

/**
 * Renderiza um texto e destaca visualmente qualquer trecho [PREENCHER: ...],
 * para que conteúdo pendente nunca passe despercebido.
 */
export function Texto({ children }: { children: string }) {
  const partes = children.split(PLACEHOLDER);
  if (partes.length === 1) return children;
  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith("[PREENCHER") ? (
          <mark key={i} className="todo-mark">
            {parte}
          </mark>
        ) : (
          <Fragment key={i}>{parte}</Fragment>
        ),
      )}
    </>
  );
}
