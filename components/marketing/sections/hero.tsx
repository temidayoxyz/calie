import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroAnimation } from "@/components/marketing/hero-animation";
import { FadeIn } from "@/components/marketing/fade-in";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-section-sm pt-16 lg:pb-section lg:pt-24">
      <div className="paper-texture absolute inset-0 pointer-events-none" />
      <div className="qr-grid-pattern absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-content px-6 lg:px-8">
        <div className="mx-auto max-w-narrow text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Stop sending scheduling messages.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted text-balance sm:text-xl">
              Share one booking page and one QR code that works everywhere.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button className="sm:min-w-[11.5rem]" asChild>
                <Link href="/signup">Create your booking page</Link>
              </Button>
              <Button variant="outline" className="sm:min-w-[11.5rem]" asChild>
                <Link href="/book/alex">See live example</Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="mt-16 lg:mt-20">
          <HeroAnimation />
        </FadeIn>
      </div>
    </section>
  );
}
