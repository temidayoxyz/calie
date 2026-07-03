import { getCurrentUser, getUserBookingPage } from "@/lib/queries/user";
import { siteConfig } from "@/lib/constants";
import { generateQrSvg } from "@/lib/qr";
import { QrDownloadButtons } from "@/components/qr/download-buttons";

export default async function QrCenterPage() {
  const user = await getCurrentUser();
  const bookingPage = user?.id ? await getUserBookingPage(user.id) : null;
  const bookingUrl = bookingPage
    ? `${siteConfig.url}/book/${bookingPage.slug}`
    : null;

  const qrSvg = bookingUrl
    ? await generateQrSvg({ url: bookingUrl, color: bookingPage?.brandColor })
    : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold">QR Center</h1>
        <p className="mt-1 text-sm text-muted">
          Download and preview your booking QR code.
        </p>
      </div>

      {bookingUrl && qrSvg ? (
        <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-8">
          <div
            className="rounded-xl border border-border bg-white p-6"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <p className="mt-4 font-mono text-sm text-muted">{bookingUrl}</p>
          <QrDownloadButtons url={bookingUrl} color={bookingPage?.brandColor} />
        </div>
      ) : (
        <p className="text-sm text-muted">Create a booking page to generate your QR code.</p>
      )}
    </div>
  );
}
