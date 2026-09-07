import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

// Server-only reader used by the blog pages to pull content out of
// /content/posts (local mode) or the configured GitHub repo (production).
export const reader = createReader(process.cwd(), keystaticConfig);

export type PostEntry = Awaited<
  ReturnType<typeof reader.collections.posts.read>
>;
