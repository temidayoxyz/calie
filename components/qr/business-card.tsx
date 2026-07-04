"use client";

import { useState, useRef, useCallback } from "react";
import { Download, User, Briefcase, Building2, Mail, Phone } from "lucide-react";
import QRCode from "qrcode";
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

const CARD_WIDTH = 840;
const CARD_HEIGHT = 480;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function makeBusinessCardSvg({
  form,
  brandColor,
  bookingUrl,
}: {
  form: typeof INITIAL_FORM;
  brandColor: string;
  bookingUrl: string;
}) {
  const safeName = escapeXml(form.name || "Your Name");
  const safeJob = escapeXml(form.job || "Job Title");
  const safeCompany = form.company ? ` at ${escapeXml(form.company)}` : "";
  const safeEmail = escapeXml(form.email);
  const safePhone = escapeXml(form.phone);
  const generatedQrSvg = await QRCode.toString(bookingUrl, {
    type: "svg",
    color: { dark: brandColor, light: "#FFFFFF" },
    margin: 1,
  });
  const qrMarkup = generatedQrSvg.replace(/<svg\b([^>]*)>/, (_match, attrs: string) => {
    const cleanAttrs = attrs.replace(/\s(width|height)="[^"]*"/g, "");
    return `<svg x="612" y="156" width="132" height="132"${cleanAttrs}>`;
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="24" fill="#ffffff"/>
  <rect x="0" y="0" width="12" height="${CARD_HEIGHT}" rx="6" fill="${escapeXml(brandColor)}"/>
  <text x="64" y="162" fill="#111111" font-family="Arial, sans-serif" font-size="44" font-weight="700">${safeName}</text>
  <text x="64" y="220" fill="#666666" font-family="Arial, sans-serif" font-size="28">${safeJob}${safeCompany}</text>
  ${safeEmail ? `<text x="64" y="294" fill="#666666" font-family="Arial, sans-serif" font-size="24">${safeEmail}</text>` : ""}
  ${safePhone ? `<text x="64" y="338" fill="#666666" font-family="Arial, sans-serif" font-size="24">${safePhone}</text>` : ""}
  <rect x="588" y="132" width="180" height="180" rx="20" fill="#ffffff" stroke="#e8e8e5" stroke-width="2"/>
  ${qrMarkup}
  <text x="716" y="424" fill="#999999" font-family="Arial, sans-serif" font-size="18">Calie</text>
</svg>`.trim();
}

async function loadImage(src: string) {
  const image = new Image();
  image.decoding = "async";
  image.src = src;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not render QR code"));
  });

  return image;
}

async function makeBusinessCardRasterDataUrl(
  {
    form,
    brandColor,
    bookingUrl,
  }: {
    form: typeof INITIAL_FORM;
    brandColor: string;
    bookingUrl: string;
  },
  mimeType: "image/png" | "image/jpeg"
) {
  const qrDataUrl = await QRCode.toDataURL(bookingUrl, {
    color: { dark: brandColor, light: "#FFFFFF" },
    width: 264,
    margin: 1,
  });
  const qrImage = await loadImage(qrDataUrl);

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create export canvas");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  context.fillStyle = brandColor;
  context.fillRect(0, 0, 12, CARD_HEIGHT);

  context.fillStyle = "#111111";
  context.font = "700 44px Arial, sans-serif";
  context.fillText(form.name || "Your Name", 64, 162);

  context.fillStyle = "#666666";
  context.font = "28px Arial, sans-serif";
  context.fillText(`${form.job || "Job Title"}${form.company ? ` at ${form.company}` : ""}`, 64, 220);

  context.font = "24px Arial, sans-serif";
  if (form.email) context.fillText(form.email, 64, 294);
  if (form.phone) context.fillText(form.phone, 64, 338);

  context.strokeStyle = "#e8e8e5";
  context.lineWidth = 2;
  context.strokeRect(588, 132, 180, 180);
  context.drawImage(qrImage, 612, 156, 132, 132);

  context.fillStyle = "#999999";
  context.font = "18px Arial, sans-serif";
  context.fillText("Calie", 716, 424);

  return canvas.toDataURL(mimeType, mimeType === "image/jpeg" ? 0.95 : 1);
}

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

export function BusinessCard({ bookingUrl, brandColor, qrSvg }: BusinessCardProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [downloading, setDownloading] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const hasRequired = form.name && form.email;

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const download = useCallback(
    async (format: "png" | "jpg" | "svg") => {
      if (!cardRef.current || !bookingUrl || !qrSvg) return;
      setDownloading(format);

      try {
        const filename = `calie-card-${form.name.toLowerCase().replace(/\s+/g, "-") || "contact"}`;

        if (format === "svg") {
          const cardSvg = await makeBusinessCardSvg({ form, brandColor, bookingUrl });
          triggerDownload(svgToDataUrl(cardSvg), `${filename}.svg`);
        } else if (format === "png") {
          const dataUrl = await makeBusinessCardRasterDataUrl(
            { form, brandColor, bookingUrl },
            "image/png"
          );
          triggerDownload(dataUrl, `${filename}.png`);
        } else {
          const dataUrl = await makeBusinessCardRasterDataUrl(
            { form, brandColor, bookingUrl },
            "image/jpeg"
          );
          triggerDownload(dataUrl, `${filename}.jpg`);
        }
      } catch {
        // Silently fail download errors
      } finally {
        setDownloading(null);
      }
    },
    [bookingUrl, brandColor, form, qrSvg]
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
