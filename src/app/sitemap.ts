import type { MetadataRoute } from "next";

const baseUrl = "https://areyouready.uom.lk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/companies",
  ];

  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}


// Ensure this metadata route is static for `next export`
export const revalidate = false;
