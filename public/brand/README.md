# Arquivos da marca

| Arquivo | Situação |
|---|---|
| `versta-logo-vertical-azul.svg` | **Oficial** — logo vertical (cão acima do nome + tagline), cores oficiais |

Como o logo é usado no site:

- Os vetores do arquivo oficial foram extraídos para `components/brand/logoPaths.ts`
  e são desenhados inline por `components/brand/Logo.tsx` e `DogSymbol.tsx`.
- **Vertical** (hero da Home): idêntica ao arquivo oficial.
- **Horizontal** (header, rodapé, organograma): montada com as peças oficiais,
  com o cão à direita do nome, como no manual. Se chegar o SVG horizontal
  oficial, substitua a composição em `Logo.tsx`.
- **Versão para fundo azul**: nome e tagline em branco, cão em caramelo.
- Ícone do navegador (`app/icon.svg`): cão oficial em caramelo sobre azul-marinho.

Se o arquivo oficial mudar, regenere `logoPaths.ts` a partir do novo SVG.
