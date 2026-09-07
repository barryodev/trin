import { siteConfig } from "@/lib/site-config";
import { reader } from "@/lib/keystatic";
import { PostCard, type PostSummary } from "@/components/PostCard";
import { getReadingTime } from "@/lib/reading-time";

export default async function HomePage() {
  const posts = await reader.collections.posts.all();

  const summaries: PostSummary[] = await Promise.all(
    posts
      .slice()
      .sort((a, b) =>
        (a.entry.publishedDate ?? "") < (b.entry.publishedDate ?? "") ? 1 : -1,
      )
      .map(async (post) => {
        const content = await post.entry.content();
        return {
          slug: post.slug,
          title: post.entry.title,
          excerpt: post.entry.excerpt,
          publishedDate: post.entry.publishedDate ?? "",
          readingTime: getReadingTime(content),
        };
      }),
  );

  return (
    <div>
      <p className="mb-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        {siteConfig.bio}
      </p>

      <hr className="mb-8 border-zinc-800" />

      {summaries.length === 0 ? (
        <p className="text-zinc-500">No posts yet — check back soon.</p>
      ) : (
        <div className="space-y-4">
          {summaries.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
