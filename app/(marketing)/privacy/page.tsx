import { Section } from "@/components/marketing/section";

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Section className="pt-24">
      <div className="mx-auto max-w-narrow">
        <h1 className="font-heading text-4xl font-semibold">{title}</h1>
        <div className="prose-calie mt-8 space-y-4 text-base leading-relaxed text-muted">
          {children}
        </div>
      </div>
    </Section>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Your privacy matters. This policy describes how Calie collects, uses, and protects your data.</p>
      <p>Full policy coming soon.</p>
    </LegalPage>
  );
}
