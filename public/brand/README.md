# Arquivos da marca (oficiais)

| Arquivo | Versão | Uso no site |
|---|---|---|
| `versta-logo-vertical-azul.svg` | Vertical: cão acima do nome + tagline | Hero da Home, imagem de compartilhamento |
| `versta-logo-horizontal-azul.svg` | Horizontal 5: nome/tagline azul, cão caramelo | Header (sem tagline) |
| `versta-logo-horizontal-branca.svg` | Horizontal 6: nome/tagline branco, cão caramelo | Rodapé (com tagline) e topo do organograma (sem tagline) |
| `versta-logo-horizontal-mono-azul.svg` | Horizontal 7: tudo azul (para fundo caramelo) | Reserva |
| `versta-logo-horizontal-mono-branca.svg` | Horizontal 8: tudo branco | Reserva |

Como o logo é usado no site:

- Os vetores dos arquivos oficiais foram extraídos para
  `components/brand/logoPaths.ts` e são desenhados inline por
  `components/brand/Logo.tsx` e `DogSymbol.tsx`, sem redesenho.
- Ícone do navegador (`app/icon.svg`): cão oficial em caramelo sobre azul-marinho.

Se algum arquivo oficial mudar, regenere `logoPaths.ts` a partir do novo SVG.
