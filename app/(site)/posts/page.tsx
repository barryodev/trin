import type { Metadata } from "next";
import { reader } from "@/lib/keystatic";
import { PostCard, type PostSummary } from "@/components/PostCard";
import { getReadingTime } from "@/lib/reading-time";

export const metadata: Metadata = {
  title: "Posts",
  description: "Notes on things I'm building, breaking, and learning.",
};

// Revalidate periodically so edits made in the Keystatic admin UI (which,
// in production, commit straight to GitHub) show up without a full redeploy.
export const revalidate = 60;

export default async function PostsPage() {
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
      })
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Posts</h1>
        <p className="text-zinc-400">
          Notes on things I&apos;m building, breaking, and learning.
        </p>
      </div>

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
