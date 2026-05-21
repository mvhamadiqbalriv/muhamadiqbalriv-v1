import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for applications and services by Muhamad Iqbal Rivaldi.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <article className="surface-card rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-[var(--primary)]">Effective: May 22, 2026</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            This Privacy Policy applies to applications and services operated by
            Muhamad Iqbal Rivaldi. It explains how information is handled when
            users interact with those applications, including when users
            authorize access through Google OAuth.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Information We Access
            </h2>
            <p className="mt-2">
              Applications may request access to basic account information and
              any additional OAuth scopes clearly displayed on the consent
              screen. Access is limited to the features users choose to use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              How Information Is Used
            </h2>
            <p className="mt-2">
              Information is used only to provide app or service functionality,
              authenticate users, improve reliability, and respond to support
              requests. It is not sold or shared for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Data Sharing
            </h2>
            <p className="mt-2">
              User data is not shared with third parties except when required to
              operate the service, comply with law, prevent abuse, or protect the
              applications, services, and users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Data Retention and Deletion
            </h2>
            <p className="mt-2">
              Users may request deletion of data associated with an application
              or service by contacting support at
              <a
                href="mailto:muhamadiqbalrivaldiwork@gmail.com"
                className="accent-link ml-1 break-all"
              >
                muhamadiqbalrivaldiwork@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              For privacy questions, contact
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
