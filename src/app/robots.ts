import type { MetadataRoute } from "next";

// Ensure this metadata route is treated as static when using `output: 'export'`
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"],
    },
    sitemap: "https://areyouready.uom.lk/sitemap.xml",
  };
}
