import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/marketing/logo";

const footerLinks = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/status", label: "Status" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Scan. Pick a time. Done. Premium scheduling with a QR code at the center.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-fast hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8 flex items-center justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Calie. All rights reserved.
          </p>
          <a
            href="https://github.com/temidayoxyz/calie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-fast hover:text-neutral"
            aria-label="View source on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
