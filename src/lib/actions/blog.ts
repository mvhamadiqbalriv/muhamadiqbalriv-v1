"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { deleteUploadedFiles, extractUploadUrls } from "@/lib/uploads";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

export async function createPost(formData: FormData) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";
  const content = (formData.get("content") as string) || "";
  const date =
    (formData.get("date") as string) || new Date().toISOString().split("T")[0];

  const slug = slugify(title);

  const { error } = await supabase.from("posts").insert({
    slug,
    title,
    description,
    date,
    tags,
    published,
    content,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true, slug };
}

export async function updatePost(slug: string, formData: FormData) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";
  const content = (formData.get("content") as string) || "";
  const date =
    (formData.get("date") as string) || new Date().toISOString().split("T")[0];

  const { error } = await supabase
    .from("posts")
    .update({ title, description, date, tags, published, content })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true };
}

export async function deletePost(slug: string) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  // Fetch content first to clean up uploaded images
  const { data } = await supabase
    .from("posts")
    .select("content")
    .eq("slug", slug)
    .single();

  if (data?.content) {
    await deleteUploadedFiles(extractUploadUrls(data.content));
  }

  await supabase.from("posts").delete().eq("slug", slug);

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true };
}
