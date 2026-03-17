"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { saveProject } from "@/lib/actions/projects";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/data";

interface Props {
  project?: Project;
  id?: string;
}

export function ProjectForm({ project, id }: Readonly<Props>) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<string>(project?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "images");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setImage(data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    try {
      await saveProject(formData);
      router.push("/admin/projects");
    } catch {
      setSaving(false);
    }
  }

  let saveLabel = "Create";
  if (saving) {
    saveLabel = "Saving...";
  } else if (project) {
    saveLabel = "Update";
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
      {id && <input type="hidden" name="id" value={id} />}
      <input type="hidden" name="image" value={image} />
      <div>
        <label
          htmlFor="proj-title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title
        </label>
        <input
          id="proj-title"
          name="title"
          required
          defaultValue={project?.title}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>
      <div>
        <label
          htmlFor="proj-desc"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="proj-desc"
          name="description"
          required
          rows={3}
          defaultValue={project?.description}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>
      <div>
        <label
          htmlFor="proj-image"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Project Image (optional)
        </label>
        {image ? (
          <div className="relative w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Image
              src={image}
              alt="Project"
              width={320}
              height={180}
              className="w-full h-auto object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImage("");
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="absolute top-1.5 right-1.5 rounded-full bg-gray-800/70 p-1 text-white hover:bg-gray-800"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-20 w-32 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <Upload size={16} className="text-gray-400" />
            </div>
            <div>
              <input
                id="proj-image"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-500 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-xs file:font-medium dark:file:bg-gray-800"
              />
              {uploading && (
                <p className="text-xs text-gray-400 mt-1">Uploading...</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="proj-tech"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Technologies (comma separated)
        </label>
        <input
          id="proj-tech"
          name="technologies"
          defaultValue={project?.technologies.join(", ")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="proj-url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Live URL (optional)
          </label>
          <input
            id="proj-url"
            name="url"
            type="url"
            defaultValue={project?.url ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="proj-github"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            GitHub URL (optional)
          </label>
          <input
            id="proj-github"
            name="github"
            type="url"
            defaultValue={project?.github ?? ""}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          name="featured"
          type="checkbox"
          id="featured"
          defaultChecked={project?.featured}
        />
        <label
          htmlFor="featured"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Featured Project
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {saveLabel}
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
