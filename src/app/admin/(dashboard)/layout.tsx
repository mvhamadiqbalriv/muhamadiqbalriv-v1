import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderKanban,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await verifySession();
  if (!isAuth) redirect("/admin/login");

  return (
    <div className="mx-auto flex max-w-5xl min-h-[calc(100vh-130px)]">
      <aside className="w-48 shrink-0 border-r border-gray-200 dark:border-gray-800 py-6 pr-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 px-3">
          CMS
        </p>
        <nav className="space-y-0.5">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-foreground dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-foreground"
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-foreground dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-foreground"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1 py-6 pl-6">{children}</div>
    </div>
  );
}
