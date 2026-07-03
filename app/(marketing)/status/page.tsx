import { Section } from "@/components/marketing/section";

export default function StatusPage() {
  return (
    <Section className="pt-24">
      <div className="mx-auto max-w-narrow text-center">
        <h1 className="font-heading text-4xl font-semibold">Status</h1>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm font-medium text-success">All systems operational</span>
        </div>
      </div>
    </Section>
  );
}
