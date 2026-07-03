import QRCode from "qrcode";

export interface QrOptions {
  url: string;
  color?: string;
  backgroundColor?: string;
  margin?: number;
  width?: number;
}

export async function generateQrSvg({
  url,
  color = "#111111",
  backgroundColor = "#FFFFFF",
  margin = 2,
  width = 256,
}: QrOptions): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    color: { dark: color, light: backgroundColor },
    margin,
    width,
  });
}

export async function generateQrPngDataUrl(options: QrOptions): Promise<string> {
  return QRCode.toDataURL(options.url, {
    color: {
      dark: options.color ?? "#111111",
      light: options.backgroundColor ?? "#FFFFFF",
    },
    margin: options.margin ?? 2,
    width: options.width ?? 512,
  });
}
