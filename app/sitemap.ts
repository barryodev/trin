import type { MetadataRoute } from "next";
import { reader } from "@/lib/keystatic";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await reader.collections.posts.all();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.entry.publishedDate ?? undefined,
  }));

  return [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/projects` },
    { url: `${siteConfig.url}/playlists` },
    { url: `${siteConfig.url}/posts` },
    ...postEntries,
  ];
}
