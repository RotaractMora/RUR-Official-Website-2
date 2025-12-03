import type { MetadataRoute } from "next";

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


// Ensure this metadata route is static for `next export`
export const revalidate = false;
