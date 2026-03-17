import type { Metadata } from "next";
import Image from "next/image";
import { getExperiences, groupExperiencesByCompany } from "@/lib/data";
import type { ExperienceGroup } from "@/lib/data";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About me and what I do.",
};

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function calcDuration(startStr: string, endStr: string | null): string {
  const [sy, sm] = startStr.split("-").map(Number);
  const end = endStr
    ? endStr.split("-").map(Number)
    : [new Date().getFullYear(), new Date().getMonth() + 1];
  const totalMonths = (end[0] - sy) * 12 + (end[1] - sm);
  if (totalMonths < 1) return "< 1 mo";
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function getGroupDuration(
  roles: Array<{ start_date: string; end_date: string | null }>,
) {
  const starts = roles
    .map((r) => r.start_date)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  const ends = roles.map((r) => r.end_date);
  const earliest = starts[0];
  if (!earliest) return "";
  const hasPresent = ends.some((e) => !e);
  const latestEnd = hasPresent
    ? null
    : (ends
        .filter((e): e is string => Boolean(e))
        .sort((a, b) => a.localeCompare(b))
        .at(-1) ?? null);
  return calcDuration(earliest, latestEnd);
}

function getGroupLocation(roles: Array<{ location: string | null }>) {
  const locations = [...new Set(roles.map((r) => r.location).filter(Boolean))];
  return locations[0] ?? null;
}

function SkillsTags({
  technologies,
  max = 3,
}: Readonly<{ technologies: readonly string[]; max?: number }>) {
  const shown = technologies.slice(0, max);
  const rest = technologies.length - max;
  return (
    <p className="mt-2 text-xs text-muted">
      <span className="text-[var(--primary)] mr-1">◇</span>
      {shown.join(", ")}
      {rest > 0 && ` and +${rest} skills`}
    </p>
  );
}

function MultiPositionGroup({ group }: Readonly<{ group: ExperienceGroup }>) {
  const totalDuration = getGroupDuration(group.roles);
  const groupLocation = getGroupLocation(group.roles);

  return (
    <div className="surface-card rounded-lg p-4 sm:p-5">
      {/* Company header */}
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 rounded-lg border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center bg-[rgba(10,15,26,0.6)]">
          {group.company_logo ? (
            <Image
              src={group.company_logo}
              alt={group.company}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <Building2 size={20} className="text-[var(--primary)]" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground">{group.company}</h3>
          <p className="text-xs text-muted">{totalDuration}</p>
          {groupLocation && (
            <p className="text-xs text-muted">{groupLocation}</p>
          )}
        </div>
      </div>

      {/* Timeline positions */}
      <div className="mt-4 ml-[23px]">
        {group.roles.map((role, idx) => {
          const isLast = idx === group.roles.length - 1;
          const duration = calcDuration(role.start_date, role.end_date);

          return (
            <div
              key={role.id}
              className={`relative pl-6 ${isLast ? "" : "pb-5"}`}
            >
              {!isLast && (
                <span className="absolute left-[5px] top-3 h-[calc(100%-4px)] w-px bg-[var(--border-subtle)]" />
              )}
              <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-muted bg-[var(--background)]" />

              <h4 className="font-semibold text-foreground text-sm">
                {role.position}
              </h4>
              {role.employment_type && (
                <p className="text-xs text-muted">{role.employment_type}</p>
              )}
              <p className="text-xs text-muted">
                {formatDate(role.start_date)} -{" "}
                {role.end_date ? formatDate(role.end_date) : "Present"} ·{" "}
                {duration}
              </p>
              {role.location && role.location !== groupLocation && (
                <p className="text-xs text-muted">{role.location}</p>
              )}

              {role.description && (
                <p className="mt-2 text-sm text-muted line-clamp-3">
                  {role.description}
                </p>
              )}

              {role.technologies.length > 0 && (
                <SkillsTags technologies={role.technologies} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SinglePositionCard({ group }: Readonly<{ group: ExperienceGroup }>) {
  const role = group.roles[0];
  const duration = calcDuration(role.start_date, role.end_date);

  return (
    <div className="surface-card rounded-lg p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 rounded-lg border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center bg-[rgba(10,15,26,0.6)]">
          {group.company_logo ? (
            <Image
              src={group.company_logo}
              alt={group.company}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <Building2 size={20} className="text-[var(--primary)]" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground">{role.position}</h3>
          <p className="text-xs text-muted">
            {group.company}
            {role.employment_type ? ` · ${role.employment_type}` : ""}
          </p>
          <p className="text-xs text-muted">
            {formatDate(role.start_date)} -{" "}
            {role.end_date ? formatDate(role.end_date) : "Present"} · {duration}
          </p>
          {role.location && (
            <p className="text-xs text-muted">{role.location}</p>
          )}
        </div>
      </div>

      {role.description && (
        <p className="mt-3 text-sm text-muted line-clamp-3 ml-[60px]">
          {role.description}
        </p>
      )}

      {role.technologies.length > 0 && (
        <div className="ml-[60px]">
          <SkillsTags technologies={role.technologies} />
        </div>
      )}
    </div>
  );
}

export default async function AboutPage() {
  const experiences = await getExperiences();
  const experienceGroups = groupExperiencesByCompany(experiences);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        About Me
      </h1>

      <div className="mt-6 space-y-5 text-sm sm:text-base text-muted leading-relaxed">
        <p>
          Hi! I&apos;m{" "}
          <strong className="text-foreground">Muhamad Iqbal</strong>, a web
          developer passionate about building modern web applications.
        </p>

        <p>
          I have experience with various technologies including React, Next.js,
          TypeScript, Node.js, and more. I love learning new things and sharing
          knowledge through posts on this blog.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Tech Stack
        </h2>
        <ul className="ml-6 list-disc space-y-1">
          <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
          <li>Backend: Node.js, PHP, Laravel</li>
          <li>Database: PostgreSQL, MySQL</li>
          <li>Tools: Git, Docker, VS Code</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Experience
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {experienceGroups.map((group) =>
          group.roles.length > 1 ? (
            <MultiPositionGroup
              key={`${group.company}-${group.roles[0]?.id ?? "group"}`}
              group={group}
            />
          ) : (
            <SinglePositionCard
              key={`${group.company}-${group.roles[0]?.id ?? "group"}`}
              group={group}
            />
          ),
        )}
      </div>
    </div>
  );
}
