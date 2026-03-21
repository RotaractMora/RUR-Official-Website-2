import type { MetadataRoute } from "next";

// Ensure this metadata route is treated as static when using `output: 'export'`
export const dynamic = "force-static";

const baseUrl = "https://areyouready.uom.lk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/registered-companies",
    "/info",
  ];

  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
