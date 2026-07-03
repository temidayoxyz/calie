import { Section, SectionHeader } from "@/components/marketing/section";
import { FadeIn } from "@/components/marketing/fade-in";

export default function AboutPage() {
  return (
    <Section className="pt-24">
      <SectionHeader
        title="Scheduling, reimagined around the QR code"
        description="Calie was built on a simple observation: sharing a booking link is friction. Sharing a QR code is instant."
      />

      <FadeIn>
        <div className="mx-auto max-w-narrow space-y-6 text-base leading-relaxed text-muted">
          <p>
            We believe scheduling software should be minimal, fast, and trustworthy.
            No bloated dashboards. No feature grids. Just a beautiful booking page
            and a QR code you can put anywhere.
          </p>
          <p>
            Calie is designed for freelancers, consultants, recruiters, healthcare
            practitioners, and anyone who meets with people and values their time.
          </p>
          <p className="font-heading text-foreground">Scan. Pick a time. Done.</p>
        </div>
      </FadeIn>
    </Section>
  );
}
