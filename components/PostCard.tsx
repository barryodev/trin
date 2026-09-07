import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/format-date";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readingTime: string;
};

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block rounded-xl bg-zinc-900 p-6 transition-colors hover:bg-zinc-800/80"
    >
      <h2 className="text-lg font-bold text-zinc-100">{post.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
      <p className="mt-4 text-xs text-zinc-600">
        {formatDate(post.publishedDate)} · {post.readingTime} · {siteConfig.author}
      </p>
    </Link>
  );
}
