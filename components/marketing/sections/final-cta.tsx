import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/marketing/fade-in";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-section-sm lg:py-section">
      <div className="qr-grid-pattern absolute inset-0 opacity-40" aria-hidden="true" />

      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] lg:h-96 lg:w-96"
        aria-hidden="true"
      >
        <div className="grid h-full w-full grid-cols-11 grid-rows-11 gap-1">
          {Array.from({ length: 121 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-sm ${
                i % 3 === 0 || i % 7 === 0 ? "bg-foreground" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-content px-6 text-center lg:px-8">
        <FadeIn>
          <h2 className="mx-auto max-w-xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Your booking link deserves better than another URL.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10">
            <Button asChild>
              <Link href="/signup">Start free</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
