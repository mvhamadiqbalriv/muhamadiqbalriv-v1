import readingTime from "reading-time";
import { supabase } from "@/lib/supabase";

export interface PostMeta {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  slug: string;
  readingTime: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, description, date, tags, published, content")
    .eq("published", true)
    .order("date", { ascending: false });

  if (!data) return [];

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    tags: row.tags ?? [],
    published: row.published,
    slug: row.slug,
    readingTime: readingTime(row.content).text,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) return null;

  return {
    meta: {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags ?? [],
      published: data.published,
      slug: data.slug,
      readingTime: readingTime(data.content).text,
    },
    content: data.content,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const { data } = await supabase.from("posts").select("slug");
  return (data ?? []).map((row) => row.slug);
}
