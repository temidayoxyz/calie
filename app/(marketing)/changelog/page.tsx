import { Section } from "@/components/marketing/section";

const updates = [
  { date: "Jul 3, 2026", title: "Initial release", description: "Calie launches with QR-first scheduling." },
];

export default function ChangelogPage() {
  return (
    <Section className="pt-24">
      <div className="mx-auto max-w-narrow">
        <h1 className="font-heading text-4xl font-semibold">Changelog</h1>
        <div className="mt-12 space-y-8">
          {updates.map((update) => (
            <div key={update.date} className="border-b border-border pb-8">
              <p className="font-mono text-xs text-muted">{update.date}</p>
              <h2 className="mt-2 font-heading text-lg font-semibold">{update.title}</h2>
              <p className="mt-2 text-sm text-muted">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
