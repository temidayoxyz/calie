import { Section } from "@/components/marketing/section";

export default function SecurityPage() {
  return (
    <Section className="pt-24">
      <div className="mx-auto max-w-narrow">
        <h1 className="font-heading text-4xl font-semibold">Security</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
          <p>
            Calie is built with security at the foundation. Data is encrypted in transit
            and at rest. We follow industry best practices for authentication and access control.
          </p>
          <p>
            Report security issues to{" "}
            <a href="mailto:security@calie.app" className="text-accent hover:underline">
              security@calie.app
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
