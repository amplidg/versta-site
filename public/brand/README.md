# Arquivos da marca

Salve aqui os arquivos oficiais (preferencialmente SVG) com estes nomes:

| Arquivo | Uso |
|---|---|
| `versta-logo-horizontal-azul.svg` | Header (fundo claro): "VERSTA" azul + cão caramelo à direita |
| `versta-logo-horizontal-branca.svg` | Rodapé (fundo azul): "VERSTA" branco + cão caramelo |
| `versta-logo-vertical-azul.svg` | Hero: cão acima do nome, com tagline |
| `versta-logo-vertical-branca.svg` | Versão vertical para fundo azul |
| `versta-simbolo-cao.svg` | Símbolo do cão isolado, caramelo |
| `versta-simbolo-cao-branco.svg` | Símbolo do cão isolado, branco (seção manifesto) |

Depois de salvar:

- logos → em `components/brand/Logo.tsx`, mude `marca.pronta` para `true`;
- símbolo → em `components/brand/DogSymbol.tsx`, mude `simbolo.pronto` para `true`;
- ícone do navegador → substitua `app/icon.svg` pelo símbolo.
