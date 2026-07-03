"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QrDownloadButtonsProps {
  url: string;
  color?: string;
}

export function QrDownloadButtons({ url, color = "#111111" }: QrDownloadButtonsProps) {
  async function downloadPng() {
    const QRCode = (await import("qrcode")).default;
    const dataUrl = await QRCode.toDataURL(url, {
      color: { dark: color, light: "#FFFFFF" },
      width: 1024,
      margin: 2,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "calie-qr.png";
    link.click();
  }

  async function downloadSvg() {
    const QRCode = (await import("qrcode")).default;
    const svg = await QRCode.toString(url, {
      type: "svg",
      color: { dark: color, light: "#FFFFFF" },
      margin: 2,
    });

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "calie-qr.svg";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      <Button variant="outline" size="sm" onClick={downloadPng}>
        <Download className="h-4 w-4" />
        PNG
      </Button>
      <Button variant="outline" size="sm" onClick={downloadSvg}>
        <Download className="h-4 w-4" />
        SVG
      </Button>
    </div>
  );
}
