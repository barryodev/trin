import type { Metadata } from "next";
import Image from "next/image";
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
export const dynamicParams = true;

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
      <header className="pt-16 pb-8 sm:pt-24 sm:pb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 [text-shadow:0_2px_12px_rgb(0_0_0/0.8)] sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <div
        data-testid="post-card"
        className="space-y-8 rounded-xl bg-zinc-900/90 p-6 backdrop-blur-sm sm:p-8"
      >
        <p className="text-xs uppercase tracking-wide text-zinc-400">
          {formatDate(post.publishedDate ?? "")} · {readingTime} · {siteConfig.author}
        </p>

        {post.coverImage && (
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-zinc-800">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-post max-w-none">
          <DocumentRenderer
            document={content}
            componentBlocks={{
              video: (props) => {
                const width = props.width || "100%";
                return (
                  <div className="flex w-full justify-center my-8">
                    <video
                      src={props.src}
                      controls={!props.autoPlay}
                      autoPlay={!!props.autoPlay}
                      loop={!!props.autoPlay}
                      muted={!!props.autoPlay}
                      playsInline={!!props.autoPlay}
                      className="w-full max-w-full rounded-lg border border-zinc-800 sm:w-[var(--video-width)]"
                      style={{ "--video-width": width } as React.CSSProperties}
                    />
                  </div>
                );
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}
