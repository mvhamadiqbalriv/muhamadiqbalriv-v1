import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import {
  getExperiences,
  getFeaturedProjects,
  groupExperiencesByCompany,
} from "@/lib/data";
import { PostCard } from "@/components/post-card";
import { ArrowRight, Building2 } from "lucide-react";

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

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  const latestExperienceGroups = groupExperiencesByCompany(
    await getExperiences(),
  ).slice(0, 2);
  const featuredProjects = (await getFeaturedProjects()).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 space-y-14">
      {/* Hero */}
      <section>
        <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Hi, I&apos;m{" "}
              <span className="name-highlight">Muhamad Iqbal Rivaldi</span> 👋
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
              A developer who loves building things on the web. I write about
              web development, technology, and other interesting stuff.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[#1f1500] transition-colors hover:bg-[var(--primary-strong)]"
              >
                Read Blog
              </Link>
              <Link
                href="/projects"
                className="outline-button rounded-lg px-4 py-2 text-sm font-medium"
              >
                View Projects
              </Link>
            </div>
          </div>

          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-[0_0_28px_rgba(250,204,21,0.35)] sm:h-28 sm:w-28">
            <Image
              src="/kucing_tempur.jpg"
              alt="Profile photo of Muhamad Iqbal"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Latest Experience */}
      {latestExperienceGroups.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Experience
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-[var(--primary)]"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {latestExperienceGroups.map((group) => {
              const isMulti = group.roles.length > 1;
              const totalDuration = getGroupDuration(group.roles);

              if (isMulti) {
                return (
                  <div
                    key={`${group.company}-${group.roles[0]?.id ?? "group"}`}
                    className="card-hover surface-card rounded-lg p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-lg border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center bg-[rgba(10,15,26,0.6)]">
                        {group.company_logo ? (
                          <Image
                            src={group.company_logo}
                            alt={group.company}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        ) : (
                          <Building2
                            size={16}
                            className="text-[var(--primary)]"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {group.company}
                        </h3>
                        <p className="text-xs text-muted">{totalDuration}</p>
                      </div>
                    </div>

                    <div className="mt-3 ml-[19px]">
                      {group.roles.slice(0, 2).map((role, idx) => {
                        const isLast =
                          idx === Math.min(1, group.roles.length - 1);
                        const duration = calcDuration(
                          role.start_date,
                          role.end_date,
                        );
                        return (
                          <div
                            key={role.id}
                            className={`relative pl-5 ${isLast ? "" : "pb-3"}`}
                          >
                            {!isLast && (
                              <span className="absolute left-[4px] top-2.5 h-[calc(100%-2px)] w-px bg-[var(--border-subtle)]" />
                            )}
                            <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border-2 border-muted bg-[var(--background)]" />
                            <h4 className="font-medium text-foreground text-sm">
                              {role.position}
                            </h4>
                            <p className="text-xs text-muted">
                              {formatDate(role.start_date)} -{" "}
                              {role.end_date
                                ? formatDate(role.end_date)
                                : "Present"}{" "}
                              · {duration}
                            </p>
                          </div>
                        );
                      })}
                      {group.roles.length > 2 && (
                        <p className="mt-1 text-xs text-muted pl-5">
                          +{group.roles.length - 2} more positions
                        </p>
                      )}
                    </div>
                  </div>
                );
              }

              // Single position
              const role = group.roles[0];
              const duration = calcDuration(role.start_date, role.end_date);
              return (
                <div
                  key={`${group.company}-${role.id}`}
                  className="card-hover surface-card rounded-lg p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center bg-[rgba(10,15,26,0.6)]">
                      {group.company_logo ? (
                        <Image
                          src={group.company_logo}
                          alt={group.company}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <Building2
                          size={16}
                          className="text-[var(--primary)]"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">
                        {role.position}
                      </h3>
                      <p className="text-xs text-muted">
                        {group.company}
                        {role.employment_type
                          ? ` · ${role.employment_type}`
                          : ""}
                      </p>
                      <p className="text-xs text-muted">
                        {formatDate(role.start_date)} -{" "}
                        {role.end_date ? formatDate(role.end_date) : "Present"}{" "}
                        · {duration}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-[var(--primary)]"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="card-hover surface-card group rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  {project.image && (
                    <div className="relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-lg overflow-hidden surface-soft">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={80}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-[var(--primary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="pill-tag rounded-full px-2 py-0.5 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.url || project.github) && (
                  <div className="mt-2.5 flex gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium accent-link"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-muted hover:text-[var(--primary)] hover:underline"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-[var(--primary)]"
            >
              See All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
