import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionHeader } from "@/components/marketing/section";

const specifications = [
  { category: "Scheduling", items: ["Timezones", "Availability", "Meeting buffers", "Custom URLs"] },
  { category: "QR Download", items: ["PNG export", "SVG export", "PDF print-ready", "Transparent background"] },
  { category: "Notifications", items: ["Email reminders", "Calendar sync", "Booking confirmations"] },
  { category: "Experience", items: ["Mobile responsive", "Dark mode booking page", "No account required"] },
];

export function EverythingIncludedSection() {
  return (
    <Section id="included">
      <SectionHeader
        eyebrow="Everything included"
        title="A complete scheduling platform"
        description="No tiers gating the basics. Everything you need to share and book."
      />

      <FadeIn>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="border-b border-border bg-background px-6 py-4">
            <p className="font-mono text-xs text-muted">calie.spec</p>
          </div>

          <div className="divide-y divide-border">
            {specifications.map((spec) => (
              <div
                key={spec.category}
                className="grid gap-4 px-6 py-5 sm:grid-cols-[200px_1fr] sm:items-start sm:gap-8"
              >
                <p className="font-heading text-sm font-semibold">{spec.category}</p>
                <div className="flex flex-wrap gap-2">
                  {spec.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
