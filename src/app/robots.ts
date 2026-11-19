import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url || "https://movimentonarotina.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
