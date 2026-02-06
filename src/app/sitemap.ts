import type { MetadataRoute } from "next";

const baseUrl = "https://areyouready.uom.lk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/registered-companies",
    "/blogs",
  ];

  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
