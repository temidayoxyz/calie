import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/marketing/section";
import { FadeIn } from "@/components/marketing/fade-in";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to start sharing.",
    features: [
      "1 booking page",
      "Unlimited bookings",
      "QR download (PNG, SVG)",
      "Email reminders",
      "Calendar sync",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For professionals who book regularly.",
    features: [
      "Unlimited booking pages",
      "Custom branding",
      "PDF print-ready QR",
      "Priority support",
      "Advanced analytics",
      "Team scheduling",
    ],
    cta: "Start trial",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <Section className="pt-24">
      <FadeIn>
        <div className="mx-auto max-w-narrow text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple pricing
          </h1>
          <p className="mt-4 text-lg text-muted">
            No hidden fees. Cancel anytime.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {plans.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 0.1}>
            <div
              className={`flex flex-col rounded-xl border p-8 ${
                plan.highlighted
                  ? "border-accent bg-surface shadow-card"
                  : "border-border bg-background"
              }`}
            >
              <h2 className="font-heading text-xl font-semibold">{plan.name}</h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted">/{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-neutral/80">
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 w-full"
                variant={plan.highlighted ? "accent" : "outline"}
                asChild
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
