"use client";

import { Check, Smartphone } from "lucide-react";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section, SectionHeader } from "@/components/marketing/section";

const slots = ["9:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "3:30 PM", "4:00 PM"];

export function SchedulingExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="The experience"
        title="Booking that feels effortless"
        description="Visitors scan, pick a time, and receive confirmation — no account required."
      />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn direction="up">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-card lg:p-8">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 font-heading text-sm font-semibold text-accent">
                SC
              </div>
              <div>
                <p className="font-heading font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted">Product Strategy · 45 min</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted">
              Let&apos;s discuss your product roadmap and identify quick wins for Q3.
            </p>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Available times · Friday, July 11
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {slots.map((slot, i) => (
                  <button
                    key={slot}
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      i === 1
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-background hover:border-accent/30"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">
                Confirmed · Friday at 10:30 AM
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="mx-auto w-48 rounded-[2rem] border-2 border-foreground/10 bg-foreground/5 p-2 shadow-lift lg:mx-0">
                <div className="rounded-[1.5rem] bg-surface p-4">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted">
                    <Smartphone className="h-4 w-4" />
                    <span>Scanning QR...</span>
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-[1px] ${
                          [0, 1, 2, 4, 5, 6, 10, 12, 14, 17, 18, 19, 21, 22, 23].includes(i)
                            ? "bg-foreground"
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium shadow-card lg:left-auto lg:translate-x-0 lg:-right-8">
                Opens instantly
              </div>
            </div>

            <p className="mt-12 max-w-sm text-center text-sm leading-relaxed text-muted lg:text-left">
              Mobile-first booking pages load in under a second. Timezone detection,
              calendar invites, and email reminders included.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
