import type { MetadataRoute } from "next";
import { frentes } from "@/data/frentes";
import { mapaDoSite } from "@/data/navegacao";
import { pageUrl } from "@/lib/seo";

// gerado no build (exportação estática)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paginas = mapaDoSite.map((item) => ({
    url: pageUrl(item.href),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const paginasFrentes = frentes.map((f) => ({
    url: pageUrl(`/consultoria/${f.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...paginas, ...paginasFrentes];
}
