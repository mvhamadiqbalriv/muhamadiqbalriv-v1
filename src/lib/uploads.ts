import { supabase } from "@/lib/supabase";

/**
 * Delete uploaded files from Supabase Storage.
 * Accepts full public URLs or storage paths like "images/xxx.png"
 */
export async function deleteUploadedFiles(urls: (string | null | undefined)[]) {
  const paths: string[] = [];
  for (const url of urls) {
    if (!url) continue;
    const storagePath = extractStoragePath(url);
    if (storagePath) paths.push(storagePath);
  }
  if (paths.length > 0) {
    await supabase.storage.from("uploads").remove(paths);
  }
}

/**
 * Extract storage path from a Supabase public URL or a relative path.
 */
function extractStoragePath(url: string): string | null {
  // Handle full Supabase URL: .../storage/v1/object/public/uploads/images/file.jpg
  const match = /\/storage\/v1\/object\/public\/uploads\/(.+)/.exec(url);
  if (match) return match[1];
  // Handle relative /uploads/ paths (legacy compatibility)
  if (url.startsWith("/uploads/")) return url.replace("/uploads/", "");
  return null;
}

/**
 * Extract all image URLs from markdown content
 */
export function extractUploadUrls(content: string): string[] {
  const regex = /!\[.*?\]\(([^\s)]+)\)/g;
  const urls: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}
