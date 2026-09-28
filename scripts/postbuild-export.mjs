/**
 * Ajustes na exportação estática (pasta /out), rodado após `next build`.
 *
 * 1. Segmentos de pré-carregamento: o exportador grava
 *      sobre/__next.sobre/__PAGE__.txt
 *    mas o navegador pede
 *      sobre/__next.sobre.__PAGE__.txt
 *    Sem o arquivo com esse nome, cada link visível gera um 404 no console
 *    (a navegação funciona, mas com requisições desperdiçadas). Aqui criamos
 *    uma cópia "achatada" de cada segmento com o nome esperado.
 *
 * 2. .nojekyll: sem ele o GitHub Pages ignora pastas que começam com "_",
 *    como a /_next, e o site fica sem CSS e JavaScript.
 */
import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
if (!existsSync(OUT)) process.exit(0);

let copias = 0;

function walk(dir) {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (!statSync(caminho).isDirectory()) continue;
    if (nome.startsWith("__next.")) flatten(caminho, dir);
    else walk(caminho);
  }
}

/** Copia cada arquivo dentro de `segDir` para `parent/<segmento>.<resto>`. */
function flatten(segDir, parent) {
  const stack = [segDir];
  while (stack.length) {
    const atual = stack.pop();
    for (const nome of readdirSync(atual)) {
      const caminho = join(atual, nome);
      if (statSync(caminho).isDirectory()) {
        stack.push(caminho);
        continue;
      }
      const achatado = relative(parent, caminho).split(sep).join(".");
      const destino = join(parent, achatado);
      if (!existsSync(destino)) {
        copyFileSync(caminho, destino);
        copias++;
      }
    }
  }
}

walk(OUT);
writeFileSync(join(OUT, ".nojekyll"), "");
console.log(`postbuild: ${copias} segmentos achatados, .nojekyll criado`);
