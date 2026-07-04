"use client";

import { Download } from "lucide-react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";

interface QrDownloadButtonsProps {
  url: string;
  color?: string;
}

async function generatePngDataUrl(url: string, color: string): Promise<string> {
  return QRCode.toDataURL(url, {
    color: { dark: color, light: "#FFFFFF" },
    width: 1024,
    margin: 2,
  });
}

export function QrDownloadButtons({ url, color = "#111111" }: QrDownloadButtonsProps) {
  async function downloadPng() {
    const dataUrl = await generatePngDataUrl(url, color);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "calie-qr.png";
    link.click();
  }

  async function downloadSvg() {
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

  async function downloadJpg() {
    const dataUrl = await generatePngDataUrl(url, color);

    const img = new Image();
    img.src = dataUrl;
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.download = "calie-qr.jpg";
    link.click();
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      <Button variant="outline" size="sm" onClick={downloadPng}>
        <Download className="h-4 w-4" />
        PNG
      </Button>
      <Button variant="outline" size="sm" onClick={downloadJpg}>
        <Download className="h-4 w-4" />
        JPG
      </Button>
      <Button variant="outline" size="sm" onClick={downloadSvg}>
        <Download className="h-4 w-4" />
        SVG
      </Button>
    </div>
  );
}
