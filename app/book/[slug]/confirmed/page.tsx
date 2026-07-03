import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { requireBookingPage } from "@/lib/queries/booking";
import { AddToCalendar } from "@/components/booking/add-to-calendar";

export default async function ConfirmedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ name?: string; date?: string; time?: string; endTime?: string }>;
}) {
  const { slug } = await params;
  const page = await requireBookingPage(slug);
  const sp = await searchParams;

  const name = sp.name ?? "there";
  const date = sp.date;
  const startTime = sp.time;

  const endTime = sp.endTime ?? (startTime ? addMinutes(startTime, page.duration) : undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background paper-texture px-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-4 text-center shadow-card sm:p-6 lg:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mt-6 font-heading text-xl font-semibold">
          Booking confirmed!
        </h1>
        <p className="mt-2 text-sm text-muted">
          Thanks, {name}! Your meeting with {page.headline} has been booked.
        </p>

        {date && startTime && (
          <div className="mt-4 rounded-lg border border-border bg-background p-4">
            <p className="text-sm font-medium">
              {new Date(date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatTime(startTime)} — {endTime && formatTime(endTime)}
            </p>
          </div>
        )}

        {date && startTime && endTime && (
          <div className="mt-6">
            <AddToCalendar
              headline={page.headline}
              slug={page.slug}
              date={date}
              startTime={startTime}
              endTime={endTime}
            />
          </div>
        )}

        <div className="mt-6">
          <Link
            href={`/book/${slug}`}
            className="text-sm text-accent hover:underline"
          >
            Book another meeting
          </Link>
        </div>
      </div>
    </div>
  );
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${newH.toString().padStart(2, "0")}:${newM.toString().padStart(2, "0")}`;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}
