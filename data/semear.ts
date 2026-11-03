/**
 * Fotos do trabalho de campo da Semear (bloco "Esta solução é conduzida pela
 * Semear..." da página da Semear, components/sections/semear/SemearTrajetoria.tsx).
 * Fotos enviadas pelo Lucas em 03/11; originais em Versta/Imagens/Semear - trabalho externo/.
 *
 * Para mudar a ordem ou a descrição, edite esta lista. As fotos passam em
 * loop: no computador, em duas colunas que sobem e descem; no celular, numa
 * faixa que corre para o lado.
 * - `arquivo`: nome em /public/images/semear/, sem o ".webp" (cada foto tem
 *   também uma versão menor com "-640" no fim do nome).
 * - `posicao`: qual parte da foto fica visível no recorte (horizontal vertical).
 */

export type FotoSemear = { arquivo: string; alt: string; posicao: string };

export const fotosSemear: FotoSemear[] = [
  {
    arquivo: "semear-posto-combustiveis",
    alt: "Consultora da Semear em vistoria num posto de combustíveis",
    posicao: "32% 50%",
  },
  {
    arquivo: "semear-oficina-residuos",
    alt: "Equipe da Semear verificando o armazenamento de resíduos numa oficina",
    posicao: "55% 50%",
  },
  {
    arquivo: "semear-area-eucaliptal",
    alt: "Equipe da Semear registrando uma área de terraplenagem ao lado de um eucaliptal",
    posicao: "42% 65%",
  },
  {
    arquivo: "semear-tratamento-agua",
    alt: "Equipe da Semear inspecionando um sistema de tratamento de água",
    posicao: "50% 55%",
  },
  {
    arquivo: "semear-lagoa-efluentes",
    alt: "Equipe da Semear acompanhando uma lagoa de tratamento de efluentes",
    posicao: "58% 50%",
  },
  {
    arquivo: "semear-industria-granulado",
    alt: "Consultora da Semear conferindo material granulado numa indústria",
    posicao: "60% 55%",
  },
  {
    arquivo: "semear-reciclagem",
    alt: "Material plástico triturado numa unidade de reciclagem visitada pela Semear",
    posicao: "50% 50%",
  },
];
