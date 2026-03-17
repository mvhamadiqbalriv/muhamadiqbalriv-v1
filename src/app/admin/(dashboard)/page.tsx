import Link from "next/link";
import { FileText, Briefcase, FolderKanban } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [{ count: blogCount }, { count: expCount }, { count: projCount }] =
    await Promise.all([
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase.from("experiences").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    {
      label: "Blog Posts",
      count: blogCount ?? 0,
      href: "/admin/blog",
      icon: FileText,
    },
    {
      label: "Experiences",
      count: expCount ?? 0,
      href: "/admin/experiences",
      icon: Briefcase,
    },
    {
      label: "Projects",
      count: projCount ?? 0,
      href: "/admin/projects",
      icon: FolderKanban,
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Welcome to Admin CMS.
      </p>
      <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-foreground">{s.count}</p>
              <s.icon size={18} className="text-gray-400" />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {s.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
