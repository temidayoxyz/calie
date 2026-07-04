import Link from "next/link";
import { Calendar, Download, Link2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { getCurrentUser, getUserBookingPage } from "@/lib/queries/user";
import { getUpcomingMeetings } from "@/lib/queries/meetings";
import { generateQrSvg } from "@/lib/qr";
import { siteConfig } from "@/lib/constants";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const bookingPage = user?.id ? await getUserBookingPage(user.id) : null;
  const bookingUrl = bookingPage
    ? `${siteConfig.url}/book/${bookingPage.slug}`
    : null;

  const allUpcoming = user?.id ? await getUpcomingMeetings(user.id) : [];

  // Filter out today's meetings that have already ended
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const upcomingMeetings = allUpcoming.filter(({ meeting }) => {
    if (meeting.date > today) return true;
    if (meeting.date === today) {
      const [eh, em] = meeting.endTime.split(":").map(Number);
      return eh * 60 + em > currentMinutes;
    }
    return false;
  });
  const qrSvg = bookingUrl
    ? await generateQrSvg({
        url: bookingUrl,
        color: bookingPage?.brandColor ?? "#235347",
        backgroundColor: "#FFFFFF",
        margin: 1,
        width: 200,
      })
    : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Welcome back{user?.name ? `, ${user.name}` : ""}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-muted" />
              Upcoming meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
                  <Calendar className="h-5 w-5 text-muted" />
                </div>
                <p className="mt-4 font-heading text-sm font-medium">
                  No meetings yet
                </p>
                <p className="mt-1 max-w-xs text-sm text-muted">
                  Share your booking page to start receiving bookings.
                </p>
                <Button className="mt-6" size="sm" asChild>
                  <Link href="/dashboard/qr">
                    <QrCode className="h-4 w-4" />
                    Share your booking page
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.slice(0, 5).map(({ meeting, booking_page }) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {meeting.inviteeName}
                      </p>
                      <p className="text-xs text-muted">
                        {new Date(
                          meeting.date + "T12:00:00"
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {formatTime(meeting.startTime)}
                      </p>
                    </div>
                  </div>
                ))}
                {upcomingMeetings.length > 5 && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/meetings">
                      View all ({upcomingMeetings.length})
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <QrCode className="h-4 w-4 text-muted" />
                Quick QR download
              </CardTitle>
            </CardHeader>
            <CardContent>
              {qrSvg ? (
                <div
                  className="mx-auto flex w-28 justify-center [&>svg]:h-28 [&>svg]:w-28"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div className="mx-auto grid w-24 grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-[1px] ${
                        i % 2 === 0 ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                className="mt-4 w-full"
                size="sm"
                asChild
              >
                <Link href="/dashboard/qr">
                  <Download className="h-4 w-4" />
                  Download
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Link2 className="h-4 w-4 text-muted" />
                Booking link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-muted">
                {bookingUrl ?? "No booking page yet"}
              </p>
              {bookingUrl && <CopyLinkButton url={bookingUrl} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}
