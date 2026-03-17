"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPost } from "@/lib/actions/blog";
import { MdxEditor } from "@/components/mdx-editor";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createPost(formData);
      router.push("/admin/blog");
    } catch {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label
            htmlFor="new-title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            id="new-title"
            name="title"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="new-desc"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <input
            id="new-desc"
            name="description"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="new-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Date
            </label>
            <input
              id="new-date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="new-tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tags (comma separated)
            </label>
            <input
              id="new-tags"
              name="tags"
              placeholder="nextjs, react, tutorial"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            name="published"
            type="checkbox"
            id="published"
            defaultChecked
          />
          <label
            htmlFor="published"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Published
          </label>
        </div>
        <MdxEditor />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Post"}
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
    </div>
  );
}
