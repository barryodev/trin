import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { reader } from "@/lib/keystatic";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/format-date";
import { getReadingTime } from "@/lib/reading-time";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    notFound();
  }

  const content = await post.content();
  const readingTime = getReadingTime(content);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-xs uppercase tracking-wide text-zinc-600">
          {formatDate(post.publishedDate)} · {readingTime} · {siteConfig.author}
        </p>
      </header>

      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary
        // author-uploaded aspect ratios; a plain <img> avoids fighting
        // next/image's required width/height for a simple personal blog.
        <img
          src={post.coverImage}
          alt=""
          className="w-full rounded-xl border border-zinc-800 object-cover"
        />
      )}

      <div className="prose prose-invert prose-post max-w-none">
        <DocumentRenderer document={content} />
      </div>
    </article>
  );
}
