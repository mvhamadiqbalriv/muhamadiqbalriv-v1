"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { deleteUploadedFiles } from "@/lib/uploads";
import type { Project } from "@/lib/data";

export async function saveProject(formData: FormData) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const id = (formData.get("id") as string) || null;
  const project = {
    title: (formData.get("title") as string).trim(),
    description: (formData.get("description") as string).trim(),
    image: (formData.get("image") as string)?.trim() || null,
    technologies: (formData.get("technologies") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    url: (formData.get("url") as string)?.trim() || null,
    github: (formData.get("github") as string)?.trim() || null,
    featured: formData.get("featured") === "on",
  };

  if (id) {
    const { error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    try {
      await supabase.rpc("increment_project_sort_order");
    } catch {
      /* ignore */
    }
    const { error } = await supabase
      .from("projects")
      .insert({ ...project, sort_order: 0 });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const { data } = await supabase
    .from("projects")
    .select("image")
    .eq("id", id)
    .single();

  if (data?.image) {
    await deleteUploadedFiles([data.image]);
  }

  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function getProjectsData(): Promise<Project[]> {
  if (!(await verifySession())) throw new Error("Unauthorized");
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}
