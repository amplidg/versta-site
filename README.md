# Versta — site institucional

Site da Versta (Análise, Experiência e Percepção), feito com Next.js,
TypeScript e Tailwind CSS e publicado como site estático no GitHub Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicação

Cada `push` na branch `main` gera e publica o site automaticamente pelo
GitHub Actions (`.github/workflows/deploy.yml`).

Para gerar os arquivos estáticos localmente: `npm run build` (saída em `out/`).

## Onde editar

| O quê | Onde |
|---|---|
| Cores, fontes e escala tipográfica | `app/globals.css` (tokens) e `app/layout.tsx` (fontes) |
| Frentes de consultoria | `data/frentes.ts` |
| Contatos, redes e endereço do site | `data/site.ts` |
| Ilustrações | `data/imagens.ts` + arquivos em `public/images` |
| Logo e símbolo | `public/brand` (veja o README da pasta) |

Conteúdos pendentes aparecem no site destacados como `[PREENCHER: ...]`.
