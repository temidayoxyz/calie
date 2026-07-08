import { Section } from "@/components/marketing/section";

export default function ContactPage() {
  return (
    <Section className="pt-24">
      <div className="mx-auto max-w-narrow text-center">
        <h1 className="font-heading text-4xl font-semibold">Contact</h1>
        <p className="mt-4 text-lg text-muted">
          Follow and reach me on X — I&apos;d love to hear from you.
        </p>
        <p className="mt-8">
          <a
            href="https://x.com/temidayoxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <XIcon className="h-5 w-5" />
            @temidayoxyz
          </a>
        </p>
      </div>
    </Section>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
