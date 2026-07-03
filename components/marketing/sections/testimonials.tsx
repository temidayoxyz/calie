"use client";

import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionHeader } from "@/components/marketing/section";

const testimonials = [
  {
    quote:
      "I printed QR codes on my business cards. Three new client calls in the first week — without a single scheduling email.",
    name: "Jordan Ellis",
    role: "Independent consultant",
  },
  {
    quote:
      "Our recruiting team puts QR codes on conference badges. Candidates book screening calls on the spot. It changed our pipeline.",
    name: "Maya Patel",
    role: "Talent lead, Series B startup",
  },
  {
    quote:
      "Patients scan the code at checkout and book follow-ups themselves. Our front desk finally has breathing room.",
    name: "Dr. Robert Kim",
    role: "Family practice",
  },
];

export function TestimonialsSection() {
  return (
    <Section variant="surface" id="testimonials">
      <SectionHeader eyebrow="Stories" title="Outcomes, not hype" />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.1}>
            <blockquote className="flex h-full flex-col rounded-xl border border-border bg-background p-6 lg:p-8">
              <p className="flex-1 text-base leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border pt-6">
                <cite className="not-italic">
                  <p className="font-heading text-sm font-semibold">{t.name}</p>
                  <p className="mt-1 text-sm text-muted">{t.role}</p>
                </cite>
              </footer>
            </blockquote>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
