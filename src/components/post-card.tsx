import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

export function PostCard({ post }: Readonly<{ post: PostMeta }>) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="card-hover surface-card rounded-lg p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-[var(--primary)] transition-colors">
            {post.title}
          </h2>
          <p className="mt-2 text-sm text-muted line-clamp-2">
            {post.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="pill-tag rounded-full px-2.5 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
