import { getProjectsData, deleteProject } from "@/lib/actions/projects";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjectsData();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          <Plus size={15} />
          Add
        </Link>
      </div>

      <div className="mt-5 space-y-2">
        {projects.length === 0 ? (
          <p className="text-sm text-gray-500">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-10 w-14 shrink-0 rounded border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={56}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <ImageIcon size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {project.title}
                    {project.featured && (
                      <span className="ml-2 rounded bg-[var(--primary-soft)] px-1.5 py-0.5 text-xs text-[var(--primary)]">
                        Featured
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <Link
                  href={`/admin/projects/edit/${project.id}`}
                  className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
                  title="Edit"
                >
                  <Pencil size={15} />
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteProject(project.id);
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
