"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updatePost } from "@/lib/actions/blog";
import { MdxEditor } from "@/components/mdx-editor";
import type { Post } from "@/lib/mdx";

export function EditPostForm({
  slug,
  post,
}: Readonly<{ slug: string; post: Post }>) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updatePost(slug, formData);
      router.push("/admin/blog");
    } catch {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
      <div>
        <label
          htmlFor="edit-title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title
        </label>
        <input
          id="edit-title"
          name="title"
          required
          defaultValue={post.meta.title}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>
      <div>
        <label
          htmlFor="edit-desc"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Description
        </label>
        <input
          id="edit-desc"
          name="description"
          required
          defaultValue={post.meta.description}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="edit-date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Date
          </label>
          <input
            id="edit-date"
            name="date"
            type="date"
            defaultValue={post.meta.date}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="edit-tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Tags (comma separated)
          </label>
          <input
            id="edit-tags"
            name="tags"
            defaultValue={post.meta.tags.join(", ")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          name="published"
          type="checkbox"
          id="published"
          defaultChecked={post.meta.published}
        />
        <label
          htmlFor="published"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Published
        </label>
      </div>
      <MdxEditor defaultValue={post.content} />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
