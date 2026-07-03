import Link from "next/link";
import { Clock } from "lucide-react";
import { requireBookingPage } from "@/lib/queries/booking";
import { db } from "@/lib/db";
import { availabilities, meetings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { BookingFlow } from "@/components/booking/booking-flow";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await requireBookingPage(slug);

  const availability = await db
    .select()
    .from(availabilities)
    .where(eq(availabilities.userId, page.userId));

  const existingMeetings = await db
    .select()
    .from(meetings)
    .where(
      and(
        eq(meetings.bookingPageId, page.id),
        eq(meetings.status, "confirmed")
      )
    );

  // Sort availability by day of week
  const sortedAvailability = [...availability].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek
  );

  return (
    <div className="min-h-screen bg-background paper-texture">
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-6 sm:py-16">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card sm:p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full font-heading text-lg font-semibold"
              style={{
                backgroundColor: `${page.brandColor}1a`,
                color: page.brandColor,
              }}
            >
              {initials(page.headline)}
            </div>
            <div>
              <h1 className="font-heading text-xl font-semibold">
                {page.headline}
              </h1>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
                <Clock className="h-3.5 w-3.5" />
                {page.duration} min
              </p>
            </div>
          </div>

          {page.bio && (
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {page.bio}
            </p>
          )}

          <div className="mt-8">
            <BookingFlow
              bookingPageId={page.id}
              slug={page.slug}
              brandColor={page.brandColor}
              headline={page.headline}
              duration={page.duration}
              availability={sortedAvailability}
              existingMeetings={existingMeetings}
            />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Powered by{" "}
          <Link href="/" className="text-accent hover:underline">
            Calie
          </Link>
        </p>
      </div>
    </div>
  );
}
