import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/mdx";
import { MdxContent } from "@/components/mdx-content";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post?.meta.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        href="/blog"
        className="text-sm text-muted hover:text-[var(--primary)]"
      >
        ← Back to Blog
      </Link>

      <header className="mt-6 mb-8 sm:mt-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {post.meta.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.meta.date}>
            {new Date(post.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.meta.readingTime}</span>
        </div>
        {post.meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="pill-tag rounded-full px-2.5 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <MdxContent source={post.content} />
    </article>
  );
}
