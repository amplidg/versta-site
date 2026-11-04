import { fotosHouse, type FotoHouse } from "@/data/house";
import { asset } from "@/lib/paths";

/*
 * Foto da House (página do Espaço), a partir do nome do arquivo em
 * data/house.ts: monta o srcset com a versão "-800" e a original, usa a
 * legenda/alt de lá e o recorte (`posicao`). Mesmas fotos do bloco da House na
 * página do SH2, sem duplicar arquivos.
 */

export function fotoHouse(arquivo: string): FotoHouse {
  const foto = fotosHouse.find((f) => f.arquivo === arquivo);
  if (!foto) throw new Error(`Foto da House não encontrada: ${arquivo}`);
  return foto;
}

/** Larguras reais dos arquivos [versão -800, original]. */
function larguras(foto: FotoHouse): [number, number] {
  return foto.horizontal ? [800, 1200] : foto.destaque ? [600, 1200] : [600, 900];
}

export function FotoHouseImg({
  arquivo,
  sizes,
  className = "",
  carregarJa = false,
  alt,
}: {
  arquivo: string;
  sizes: string;
  className?: string;
  /** true para fotos acima da dobra (sem lazy-load). */
  carregarJa?: boolean;
  /** Texto alternativo no lugar do de data/house.ts ("" = decorativa). */
  alt?: string;
}) {
  const foto = fotoHouse(arquivo);
  const base = asset(`/images/house/${foto.arquivo}`);
  const [menor, maior] = larguras(foto);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- site estático: srcset feito à mão
    <img
      src={`${base}.webp`}
      srcSet={`${base}-800.webp ${menor}w, ${base}.webp ${maior}w`}
      sizes={sizes}
      alt={alt ?? foto.alt}
      loading={carregarJa ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{ objectPosition: foto.posicao ?? "center" }}
    />
  );
}
