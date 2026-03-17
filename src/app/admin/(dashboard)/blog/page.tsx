import Link from "next/link";
import { deletePost } from "@/lib/actions/blog";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, date, published")
    .order("date", { ascending: false });

  const allPosts = posts ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          <Plus size={15} />
          New Post
        </Link>
      </div>

      <div className="mt-5 space-y-2">
        {allPosts.length === 0 ? (
          <p className="text-sm text-gray-500">No blog posts yet.</p>
        ) : (
          allPosts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {post.date}
                  {!post.published && (
                    <span className="ml-2 rounded bg-yellow-100 px-1.5 py-0.5 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      Draft
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <Link
                  href={`/admin/blog/edit/${post.slug}`}
                  className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
                  title="Edit"
                >
                  <Pencil size={15} />
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deletePost(post.slug);
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
