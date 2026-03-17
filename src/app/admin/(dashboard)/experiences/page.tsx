import {
  getExperiencesData,
  deleteExperience,
} from "@/lib/actions/experiences";
import { groupExperiencesByCompany } from "@/lib/data";
import Link from "next/link";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminExperiencesPage() {
  const experiences = await getExperiencesData();
  const groups = groupExperiencesByCompany(experiences);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Experiences</h1>
        <Link
          href="/admin/experiences/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          <Plus size={15} />
          Add
        </Link>
      </div>

      <div className="mt-5 space-y-4">
        {groups.length === 0 ? (
          <p className="text-sm text-gray-500">No experiences yet.</p>
        ) : (
          groups.map((group) => (
            <div
              key={`${group.company}-${group.roles[0]?.id ?? "g"}`}
              className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                <Building2 size={16} className="text-gray-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {group.company}
                  </p>
                  <p className="text-xs text-gray-500">
                    {group.roles.length} positions
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {group.roles.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center gap-3 px-4 py-2.5 pl-10"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {exp.position}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {exp.start_date} – {exp.end_date ?? "Present"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Link
                        href={`/admin/experiences/edit/${exp.id}`}
                        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteExperience(exp.id);
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
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
