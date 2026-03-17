import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I have worked on.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        Projects
      </h1>
      <p className="mt-2 text-sm sm:text-base text-muted">
        Some projects I have worked on.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
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
                <h2 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-[var(--primary)] transition-colors">
                  {project.title}
                </h2>
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
    </div>
  );
}
