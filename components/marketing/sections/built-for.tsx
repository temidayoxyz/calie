"use client";

import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionHeader } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

const industries = [
  "Freelancers",
  "Education",
  "Consultants",
  "Creators",
  "Lawyers",
  "Agencies",
];

export function BuiltForSection() {
  return (
    <Section variant="surface" id="built-for">
      <SectionHeader
        eyebrow="Built for"
        title="Professionals who value their time"
        description="Whether you meet one client a week or fifty prospects a month."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {industries.map((industry, i) => (
          <FadeIn key={industry} delay={i * 0.04}>
            <div
              className={cn(
                "group flex items-center justify-center rounded-xl border border-border bg-background px-4 py-8 text-center transition-all duration-default ease-out",
                "hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-card"
              )}
            >
              <span className="font-heading text-sm font-medium transition-colors group-hover:text-accent sm:text-base">
                {industry}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
