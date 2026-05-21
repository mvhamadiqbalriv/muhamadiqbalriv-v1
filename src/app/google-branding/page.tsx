import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";

export const metadata: Metadata = {
  title: "Google App Branding",
  description: "Index of application-specific Google OAuth branding pages.",
};

const apps = [
  {
    name: "AgentOC",
    href: "/google-branding/agentoc",
    description:
      "Application-specific branding page for the AgentOC Google OAuth consent screen.",
  },
];

export default function GoogleBrandingIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="surface-card rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
          <Boxes size={14} /> Google App Branding
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Application Branding Pages
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          This page lists application-specific branding pages for Google OAuth
          consent screen verification. Each app has its own dedicated branding
          URL so future applications can be documented separately.
        </p>
      </section>

      <div className="mt-6 space-y-4">
        {apps.map((app) => (
          <Link
            key={app.href}
            href={app.href}
            className="card-hover surface-card block rounded-xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-foreground">{app.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {app.description}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="mt-1 shrink-0 text-[var(--primary)]"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
