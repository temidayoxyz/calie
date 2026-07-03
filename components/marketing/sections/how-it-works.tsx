"use client";

import { FileText, Clock, QrCode } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionHeader } from "@/components/marketing/section";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Create page",
    description: "Set your name, meeting types, and availability in minutes.",
  },
  {
    icon: Clock,
    step: "02",
    title: "Customize availability",
    description: "Define your weekly schedule, buffers, and timezone preferences.",
  },
  {
    icon: QrCode,
    step: "03",
    title: "Download QR",
    description: "Get print-ready PNG, SVG, or PDF. Share anywhere.",
  },
];

export function HowItWorksSection() {
  return (
    <Section variant="surface" id="how-it-works">
      <SectionHeader
        eyebrow="How it works"
        title="Three steps. Under two minutes."
      />

      <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
        <div
          className="absolute top-16 hidden h-px bg-border lg:left-[16.67%] lg:right-[16.67%] lg:block"
          aria-hidden="true"
        />

        {steps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.1}>
            <div className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background shadow-card">
                <step.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              </div>
              <span className="mt-6 font-mono text-xs text-muted">{step.step}</span>
              <h3 className="mt-2 font-heading text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
