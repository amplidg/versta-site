import type { NextConfig } from "next";

/**
 * Site gerado como arquivos estáticos (pasta /out), pronto para GitHub Pages
 * ou qualquer hospedagem estática.
 *
 * NEXT_PUBLIC_BASE_PATH: subpasta onde o site é publicado. No GitHub Pages de
 * projeto é "/nome-do-repositorio"; em domínio próprio fica vazio.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // gera /sobre/index.html, o formato que o GitHub Pages serve
  trailingSlash: true,
  images: {
    // sem servidor não há otimização sob demanda; as imagens já estão em WebP
    unoptimized: true,
  },
};

export default nextConfig;
