import { Section } from "@/components/marketing/section";

export default function ContactPage() {
  return (
    <Section className="pt-24">
      <div className="mx-auto max-w-narrow text-center">
        <h1 className="font-heading text-4xl font-semibold">Contact</h1>
        <p className="mt-4 text-lg text-muted">
          Questions, feedback, or partnership inquiries — we&apos;d love to hear from you.
        </p>
        <p className="mt-8">
          <a href="mailto:hello@calie.app" className="text-accent hover:underline">
            hello@calie.app
          </a>
        </p>
      </div>
    </Section>
  );
}
