import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// gerado no build (exportação estática)
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
