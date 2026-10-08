/**
 * Registro das ilustrações do site.
 *
 * Entradas com `pronta: true` exibem o arquivo real; as demais mostram um
 * placeholder (gradiente + legenda). Para ativar uma ilustração nova:
 *   1. salve o arquivo em /public/images com o nome indicado em `arquivo`;
 *   2. mude `pronta` para true.
 *
 * Estilo: aquarela com textura de papel, tons de verde, pêssego e azul claro.
 */
export type Tom = "amanhecer" | "floresta" | "lago" | "neblina" | "pessego";

export type Imagem = {
  arquivo: string;
  alt: string;
  /** O que a ilustração deve mostrar (vira legenda do placeholder). */
  descricao: string;
  tom: Tom;
  pronta: boolean;
  /** Enquadramento (CSS object-position) quando a imagem é recortada. */
  posicao?: string;
  /** Enquadramento específico para telas pequenas (< 768px). */
  posicaoMobile?: string;
};

export const imagens = {
  /* ---------- Home (imagens fornecidas pela Versta) ---------- */
  heroHome: {
    arquivo: "/images/home-hero-trilha-montanhas.webp",
    alt: "Trilha em aquarela serpenteando entre pinheiros em direção às montanhas ao amanhecer",
    descricao: "Hero: trilha até as montanhas ao amanhecer",
    tom: "amanhecer",
    pronta: true,
    // céu livre no alto para o texto; no mobile, mantém a trilha à vista
    posicao: "center 60%",
    posicaoMobile: "38% 60%",
  },
  quemEVersta: {
    arquivo: "/images/home-quem-e-versta.webp",
    alt: "Mulher pensativa analisando um quadro com gráficos e conexões, em aquarela",
    descricao: "Quem é a Versta: análise",
    tom: "pessego",
    pronta: true,
  },
  diagnosticoEmpresarial: {
    arquivo: "/images/home-diagnostico-empresarial.webp",
    alt: "Mulher observando um mapa de territórios conectados entre si, com empresas, pessoas e natureza, em aquarela",
    descricao: "Diagnóstico empresarial: mapa do mercado",
    tom: "pessego",
    pronta: true,
  },
  conexao: {
    arquivo: "/images/home-conexao-desafios-solucoes.webp",
    alt: "Duas pessoas se cumprimentando sobre uma ponte que liga um grupo com desafios a especialistas do outro lado, em aquarela",
    descricao: "Conexão entre desafios e soluções",
    tom: "neblina",
    pronta: true,
  },
  metodo: {
    arquivo: "/images/home-metodo-de-trabalho.webp",
    alt: "Duas pessoas olhando para o alto com confiança entre setas verdes de crescimento, em aquarela",
    descricao: "Método de trabalho: crescimento",
    tom: "floresta",
    pronta: true,
  },
  areasAtuacao: {
    arquivo: "/images/home-areas-de-atuacao.webp",
    alt: "Colagem em aquarela com energia renovável, cidade, equipe reunida, tecnologia, selo de qualidade, bússola e alvo",
    descricao: "Áreas de atuação: as frentes de consultoria",
    tom: "floresta",
    pronta: true,
  },
  ctaHome: {
    arquivo: "/images/cta-chamada-final.webp",
    alt: "Mulher e cão sentados lado a lado no alto de uma colina, olhando um caminho que segue até o horizonte ao pôr do sol, em aquarela",
    descricao: "Chamada final: pessoa e cão olhando o caminho",
    tom: "amanhecer",
    pronta: true,
    posicao: "center 70%",
  },

  /* ---------- Ainda pendentes (placeholders) ---------- */
  sh2Hero: {
    arquivo: "/images/sh2-hero-pessoas.webp",
    alt: "Cena em aquarela de pessoas em conversa acolhedora",
    descricao: "Cena humana em aquarela: pessoas, harmonia, acolhimento",
    tom: "pessego",
    pronta: false,
  },
  houseCoworking: {
    arquivo: "/images/sh2-house-coworking.webp",
    alt: "Ambiente da House Coworking",
    descricao: "Ambiente da House Coworking",
    tom: "lago",
    pronta: false,
  },
  instituto: {
    arquivo: "/images/instituto-projetos-sociais.webp",
    alt: "Cena em aquarela de comunidade reunida ao ar livre",
    descricao: "Cena humana em aquarela: comunidade, projetos sociais",
    tom: "neblina",
    pronta: false,
  },
  sobreCao: {
    arquivo: "/images/sobre-cao-companheiro.webp",
    alt: "Pessoa e cão caminhando juntos em paisagem aquarelada",
    descricao: "Pessoa e cão caminhando juntos em trilha à beira do lago",
    tom: "lago",
    pronta: false,
  },
  institutoHero: {
    arquivo: "/images/instituto-hero-comunidade.webp",
    alt: "Comunidade em aquarela em paisagem aberta",
    descricao: "Cena humana: comunidade em paisagem aberta",
    tom: "floresta",
    pronta: false,
  },
  contatoHero: {
    arquivo: "/images/contato-casa-lago.webp",
    alt: "Casa à beira do lago em aquarela",
    descricao: "Casa de madeira à beira do lago com névoa",
    tom: "lago",
    pronta: false,
  },
} satisfies Record<string, Imagem>;

export type ImagemKey = keyof typeof imagens;
