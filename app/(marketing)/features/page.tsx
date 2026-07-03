import { Section, SectionHeader } from "@/components/marketing/section";
import { FadeIn } from "@/components/marketing/fade-in";

const features = [
  {
    title: "QR-first sharing",
    description:
      "Every booking page includes a beautiful, downloadable QR code. PNG, SVG, and print-ready PDF.",
  },
  {
    title: "Smart scheduling",
    description:
      "Weekly availability, timezone detection, meeting buffers, and vacation overrides.",
  },
  {
    title: "Calendar sync",
    description:
      "Connect Google Calendar or Outlook. Conflicts are blocked automatically.",
  },
  {
    title: "Branded booking pages",
    description:
      "Customize your headline, bio, meeting types, and accent color. Dark mode included.",
  },
  {
    title: "Email reminders",
    description:
      "Automatic confirmations and reminders for you and your guests.",
  },
  {
    title: "No account for guests",
    description:
      "Visitors scan, pick a time, and receive a calendar invite. No signup required.",
  },
];

export default function FeaturesPage() {
  return (
    <Section className="pt-24">
      <SectionHeader
        title="Built for clarity"
        description="Every feature exists to make scheduling faster — for you and the people booking with you."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature, i) => (
          <FadeIn key={feature.title} delay={i * 0.05}>
            <div className="rounded-xl border border-border bg-surface p-8">
              <h2 className="font-heading text-lg font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
