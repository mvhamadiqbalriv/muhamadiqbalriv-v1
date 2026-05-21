import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for AgentOC.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <article className="surface-card rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-[var(--primary)]">Effective: May 22, 2026</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Terms of Service
        </h1>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            These Terms of Service govern use of AgentOC, an application
            operated by Muhamad Iqbal Rivaldi. By using the application, users
            agree to these terms.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Use of the Application
            </h2>
            <p className="mt-2">
              Users must use AgentOC lawfully and may not misuse, disrupt, or
              attempt unauthorized access to the application or connected
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Google OAuth Access
            </h2>
            <p className="mt-2">
              If users connect a Google account, AgentOC will request only the
              OAuth permissions needed for displayed features. Users can revoke
              access at any time from their Google account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Availability
            </h2>
            <p className="mt-2">
              The application is provided as available. Features may change,
              pause, or stop without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Limitation of Liability
            </h2>
            <p className="mt-2">
              AgentOC is provided without warranties. To the maximum extent
              permitted by law, the operator is not liable for indirect,
              incidental, or consequential damages from use of the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              For questions about these terms, contact
              <a
                href="mailto:muhamadiqbalrivaldiwork@gmail.com"
                className="accent-link ml-1 break-all"
              >
                muhamadiqbalrivaldiwork@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
