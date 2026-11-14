/**
 * Gera o "site de redirecionamento" publicado no GitHub Pages
 * (amplidg.github.io/versta-site), a pedido do Lucas em 14/11/2026:
 * desde que o site oficial foi para versta.com.br (Hostinger), o link antigo
 * só leva cada página para a mesma página no domínio novo.
 *
 * Cria, em redirect-out/, um index.html para cada página do app/ e um
 * 404.html para qualquer outro endereço. Cada arquivo tem endereço canônico,
 * meta refresh imediato (o Google entende como redirecionamento) e
 * location.replace (mantém ?parâmetros e #âncoras).
 */
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DESTINO = "https://versta.com.br";
const SAIDA = "redirect-out";

function rotas(dir, base = dir) {
  const lista = [];
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) lista.push(...rotas(caminho, base));
    else if (nome === "page.tsx") {
      const rel = relative(base, dir).split(sep).filter(Boolean).join("/");
      lista.push(rel ? `/${rel}/` : "/");
    }
  }
  return lista;
}

function pagina(alvo) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Versta: novo endereço</title>
<link rel="canonical" href="${alvo}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${alvo}">
<script>
(function () {
  var p = location.pathname;
  if (p.indexOf("/versta-site") === 0) p = p.slice(12) || "/";
  location.replace("${DESTINO}" + p + location.search + location.hash);
})();
</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F1F4EE;color:#00294D;font:18px/1.5 system-ui,sans-serif;text-align:center;padding:16px}a{color:#8C5236;font-weight:600}</style>
</head>
<body>
<p>O site da Versta agora está em <a href="${alvo}">versta.com.br</a>.</p>
</body>
</html>
`;
}

rmSync(SAIDA, { recursive: true, force: true });
const lista = rotas("app");
for (const rota of lista) {
  const pasta = join(SAIDA, ...rota.split("/").filter(Boolean));
  mkdirSync(pasta, { recursive: true });
  writeFileSync(join(pasta, "index.html"), pagina(DESTINO + rota));
}
writeFileSync(join(SAIDA, "404.html"), pagina(DESTINO + "/"));
writeFileSync(join(SAIDA, ".nojekyll"), "");
console.log(`redirect-site: ${lista.length} páginas + 404 -> ${DESTINO}`);
