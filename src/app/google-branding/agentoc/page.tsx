import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Mail, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AgentOC Branding",
  description:
    "Branding, privacy, and support information for the AgentOC Google OAuth application.",
};

const appDetails = [
  { label: "Application name", value: "AgentOC" },
  { label: "Application type", value: "AI assistant / automation app" },
  { label: "Publisher", value: "Muhamad Iqbal Rivaldi" },
  { label: "Support email", value: "muhamadiqbalrivaldiwork@gmail.com" },
  { label: "Authorized domain", value: "muhamadiqbalriv.com" },
  { label: "Status", value: "Application-specific branding page" },
];

export default function AgentOCBrandingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="surface-card rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
          <Sparkles size={14} /> Google OAuth Branding · AgentOC
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AgentOC Application Branding
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          This page is specifically for AgentOC, one application owned and
          maintained by Muhamad Iqbal Rivaldi. It provides the app identity,
          support contact, and policy links required for Google OAuth consent
          screen review.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {appDetails.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--border-subtle)] bg-[rgba(10,15,26,0.55)] p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <section className="surface-card rounded-xl p-5">
          <Bot className="text-[var(--primary)]" size={22} />
          <h2 className="mt-4 font-semibold text-foreground">About AgentOC</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            AgentOC is planned as an AI assistant and automation application.
            This page identifies AgentOC separately from any other applications
            that may be created later.
          </p>
        </section>

        <section className="surface-card rounded-xl p-5">
          <Mail className="text-[var(--primary)]" size={22} />
          <h2 className="mt-4 font-semibold text-foreground">User Support</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            For AgentOC support, users can contact
            <a
              href="mailto:muhamadiqbalrivaldiwork@gmail.com"
              className="accent-link ml-1 break-all"
            >
              muhamadiqbalrivaldiwork@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="surface-card rounded-xl p-5">
          <ShieldCheck className="text-[var(--primary)]" size={22} />
          <h2 className="mt-4 font-semibold text-foreground">OAuth Use</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Google OAuth access for AgentOC is used only for the app features
            presented to users and is not sold or shared for advertising.
          </p>
        </section>
      </div>

      <section className="mt-6 surface-card rounded-xl p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Google Console URLs for AgentOC
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Use these links in the Google Cloud OAuth consent screen for the
          AgentOC application.
        </p>

        <div className="mt-5 space-y-3 text-sm">
          <div>
            <p className="font-medium text-foreground">Application home page</p>
            <Link
              href="/google-branding/agentoc"
              className="accent-link break-all"
            >
              https://muhamadiqbalriv.com/google-branding/agentoc
            </Link>
          </div>
          <div>
            <p className="font-medium text-foreground">Privacy policy link</p>
            <Link href="/privacy-policy" className="accent-link break-all">
              https://muhamadiqbalriv.com/privacy-policy
            </Link>
          </div>
          <div>
            <p className="font-medium text-foreground">Terms of service link</p>
            <Link href="/terms-of-service" className="accent-link break-all">
              https://muhamadiqbalriv.com/terms-of-service
            </Link>
          </div>
          <div>
            <p className="font-medium text-foreground">Authorized domain</p>
            <p className="text-muted">muhamadiqbalriv.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
