"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Experience } from "@/lib/data";

export async function saveExperience(formData: FormData) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  const id = (formData.get("id") as string) || null;
  const experience = {
    company: (formData.get("company") as string).trim(),
    position: (formData.get("position") as string).trim(),
    employment_type: (formData.get("employmentType") as string)?.trim() || null,
    location: (formData.get("location") as string)?.trim() || null,
    start_date: (formData.get("startDate") as string).trim(),
    end_date: (formData.get("endDate") as string)?.trim() || null,
    description: (formData.get("description") as string).trim(),
    technologies: (formData.get("technologies") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };

  if (id) {
    const { error } = await supabase
      .from("experiences")
      .update(experience)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    // New entry gets sort_order = 0 (top), push others down
    try {
      await supabase.rpc("increment_experience_sort_order");
    } catch {
      /* ignore */
    }
    const { error } = await supabase
      .from("experiences")
      .insert({ ...experience, sort_order: 0 });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/about");
  revalidatePath("/admin/experiences");
  revalidatePath("/");
  return { success: true };
}

export async function saveExperienceGroup(
  company: string,
  positions: Array<{
    position: string;
    employment_type: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
    description: string;
    technologies: string[];
  }>,
) {
  if (!(await verifySession())) throw new Error("Unauthorized");
  if (!company || positions.length === 0) throw new Error("Invalid data");

  // Push existing sort_orders down by the number of new positions
  try {
    for (const _ of positions) {
      await supabase.rpc("increment_experience_sort_order");
    }
  } catch {
    /* ignore */
  }

  const rows = positions.map((p, idx) => ({
    company,
    position: p.position,
    employment_type: p.employment_type,
    location: p.location,
    start_date: p.start_date,
    end_date: p.end_date,
    description: p.description,
    technologies: p.technologies,
    sort_order: idx,
  }));

  const { error } = await supabase.from("experiences").insert(rows);
  if (error) throw new Error(error.message);

  revalidatePath("/about");
  revalidatePath("/admin/experiences");
  revalidatePath("/");
  return { success: true };
}

export async function deleteExperience(id: string) {
  if (!(await verifySession())) throw new Error("Unauthorized");

  await supabase.from("experiences").delete().eq("id", id);

  revalidatePath("/about");
  revalidatePath("/admin/experiences");
  revalidatePath("/");
  return { success: true };
}

export async function getExperiencesData(): Promise<Experience[]> {
  if (!(await verifySession())) throw new Error("Unauthorized");
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Experience[];
}
