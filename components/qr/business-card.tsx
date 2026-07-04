"use client";

import { useState, useRef, useCallback } from "react";
import { Download, User, Briefcase, Building2, Mail, Phone } from "lucide-react";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { Button } from "@/components/ui/button";

interface BusinessCardProps {
  bookingUrl: string | null;
  brandColor: string;
  qrSvg: string | null;
}

const INITIAL_FORM = {
  name: "",
  job: "",
  email: "",
  phone: "",
  company: "",
};

export function BusinessCard({ bookingUrl, brandColor, qrSvg }: BusinessCardProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [downloading, setDownloading] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const hasRequired = form.name && form.email;

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const download = useCallback(
    async (format: "png" | "jpg" | "svg") => {
      if (!cardRef.current) return;
      setDownloading(format);

      try {
        const filename = `calie-card-${form.name.toLowerCase().replace(/\s+/g, "-") || "contact"}`;

        if (format === "svg") {
          const dataUrl = await toSvg(cardRef.current, { quality: 1, pixelRatio: 2 });
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${filename}.svg`;
          link.click();
        } else if (format === "png") {
          const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${filename}.png`;
          link.click();
        } else {
          const dataUrl = await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 2 });
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${filename}.jpg`;
          link.click();
        }
      } catch {
        // Silently fail download errors
      } finally {
        setDownloading(null);
      }
    },
    [form.name]
  );

  if (!bookingUrl || !qrSvg) {
    return (
      <div className="mt-10 text-center text-sm text-muted">
        Create a booking page first to use the business card generator.
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="font-heading text-lg font-semibold">Business card</h2>
      <p className="mt-1 text-sm text-muted">
        Fill in your details and download a card with your QR code.
      </p>

      {/* Form */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium" htmlFor="name">
            Name <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Alex Morgan"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium" htmlFor="job">
            Job title <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="job"
              value={form.job}
              onChange={(e) => update("job", e.target.value)}
              placeholder="Product Designer"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium" htmlFor="email">
            Email <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="alex@example.com"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium" htmlFor="phone">
            Phone <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium" htmlFor="company">
            Company <span className="text-muted">(optional)</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="company"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Acme Inc."
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
          Preview
        </p>

        <div
          ref={cardRef}
          className="relative mx-auto flex w-[420px] flex-row items-center gap-5 overflow-hidden rounded-xl border border-border bg-white p-6 shadow-card"
          style={{ height: 240 }}
        >
          {/* Accent bar */}
          <div
            className="absolute left-0 top-0 h-full w-1.5 rounded-l-xl"
            style={{ backgroundColor: brandColor }}
          />

          {/* Left: contact info */}
          <div className="flex-1 space-y-2 pl-2">
            <p className="font-heading text-lg font-semibold leading-tight text-neutral">
              {form.name || "Your Name"}
            </p>
            <p className="text-sm text-muted">
              {form.job || "Job Title"}
              {form.company ? ` at ${form.company}` : ""}
            </p>
            <div className="space-y-1 pt-2 text-xs text-muted">
              {form.email && (
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="h-3 w-3 shrink-0" />
                  {form.email}
                </p>
              )}
              {form.phone && (
                <p className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 shrink-0" />
                  {form.phone}
                </p>
              )}
            </div>
          </div>

          {/* Right: QR code */}
          <div
            className="flex shrink-0 items-center justify-center rounded-lg border border-border bg-white p-1.5"
            style={{ width: 88, height: 88 }}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />

          {/* Subtle branding */}
          <p className="absolute bottom-2.5 right-4 text-[10px] text-muted/60">
            Calie
          </p>
        </div>
      </div>

      {/* Download buttons */}
      {hasRequired && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => download("png")}
            disabled={downloading !== null}
          >
            <Download className="h-4 w-4" />
            {downloading === "png" ? "Saving…" : "PNG"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => download("jpg")}
            disabled={downloading !== null}
          >
            <Download className="h-4 w-4" />
            {downloading === "jpg" ? "Saving…" : "JPG"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => download("svg")}
            disabled={downloading !== null}
          >
            <Download className="h-4 w-4" />
            {downloading === "svg" ? "Saving…" : "SVG"}
          </Button>
        </div>
      )}
    </div>
  );
}
