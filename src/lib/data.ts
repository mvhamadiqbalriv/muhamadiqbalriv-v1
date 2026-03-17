import { supabase } from "@/lib/supabase";

export interface Experience {
  id: string;
  company: string;
  position: string;
  employment_type: string | null;
  location: string | null;
  logo: string | null;
  start_date: string;
  end_date: string | null;
  description: string;
  technologies: string[];
  sort_order: number;
}

export interface ExperienceGroup {
  company: string;
  company_logo: string | null;
  roles: Experience[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  url: string | null;
  github: string | null;
  featured: boolean;
  sort_order: number;
}

export async function getExperiences(): Promise<Experience[]> {
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Experience[];
}

export function groupExperiencesByCompany(
  experiences: Experience[],
): ExperienceGroup[] {
  const grouped = new Map<string, ExperienceGroup>();

  for (const experience of experiences) {
    const key = experience.company.trim().toLowerCase();
    const existing = grouped.get(key);

    if (!existing) {
      grouped.set(key, {
        company: experience.company,
        company_logo: experience.logo,
        roles: [experience],
      });
      continue;
    }

    existing.roles.push(experience);
    if (!existing.company_logo && experience.logo) {
      existing.company_logo = experience.logo;
    }
  }

  return [...grouped.values()];
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}
