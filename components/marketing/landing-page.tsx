import { HeroSection } from "@/components/marketing/sections/hero";
import { WhyQrSection } from "@/components/marketing/sections/why-qr";
import { HowItWorksSection } from "@/components/marketing/sections/how-it-works";
import { SchedulingExperienceSection } from "@/components/marketing/sections/scheduling-experience";
import { BuiltForSection } from "@/components/marketing/sections/built-for";
import { EverythingIncludedSection } from "@/components/marketing/sections/everything-included";
import { TestimonialsSection } from "@/components/marketing/sections/testimonials";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <WhyQrSection />
      <HowItWorksSection />
      <SchedulingExperienceSection />
      <BuiltForSection />
      <EverythingIncludedSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
