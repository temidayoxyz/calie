"use client";

import {
  CreditCard,
  BadgeCheck,
  Stethoscope,
  Presentation,
  Mail,
  Package,
} from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionHeader } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

const situations = [
  {
    icon: CreditCard,
    label: "Business card",
    description: "Hand someone your card. They scan. They book.",
  },
  {
    icon: BadgeCheck,
    label: "Conference badge",
    description: "Meet at the booth. Badge QR opens your calendar.",
  },
  {
    icon: Stethoscope,
    label: "Clinic desk",
    description: "Patients scan to schedule follow-ups.",
  },
  {
    icon: Presentation,
    label: "Presentation slide",
    description: "End your talk with one scannable link.",
  },
  {
    icon: Mail,
    label: "Email signature",
    description: "Every email becomes a booking opportunity.",
  },
  {
    icon: Package,
    label: "Packaging insert",
    description: "Product unboxing leads to a consultation.",
  },
];

export function WhyQrSection() {
  return (
    <Section id="why-qr">
      <SectionHeader
        eyebrow="Why QR"
        title="One booking page. Everywhere people already are."
        description="No more copying links into messages. Your QR opens the same polished booking experience from any surface."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {situations.map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.05}>
            <div
              className={cn(
                "group rounded-xl border border-border bg-surface p-6 transition-all duration-default ease-out",
                "hover:-translate-y-0.5 hover:shadow-card-hover"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                <item.icon className="h-5 w-5 text-foreground/70 transition-colors group-hover:text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
