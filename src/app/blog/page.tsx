import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/post-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Posts about web development, technology, and other interesting things.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mt-2 text-sm sm:text-base text-muted">
        Posts about web development, technology, and other interesting things.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-center text-muted">
          No posts yet. Stay tuned!
        </p>
      ) : (
        <div className="mt-8 space-y-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
