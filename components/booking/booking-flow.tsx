"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { generateTimeSlots, getDayOfWeek, formatDate, getNextDays } from "@/lib/slots";
import type { Availability } from "@/lib/db/schema";
import type { Meeting } from "@/lib/db/schema";

type Props = {
  bookingPageId: string;
  slug: string;
  brandColor: string;
  headline: string;
  duration: number;
  availability: Availability[];
  existingMeetings: Meeting[];
};

export function BookingFlow({
  bookingPageId,
  slug,
  brandColor,
  headline,
  duration,
  availability,
  existingMeetings,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [error, setError] = useState("");

  const days = getNextDays(7);

  const availableSlots = selectedDate
    ? (() => {
        const dow = getDayOfWeek(selectedDate);
        const dayAvailability = availability.filter((a) => a.dayOfWeek === dow);
        if (dayAvailability.length === 0) return [];

        const allSlots = dayAvailability.flatMap((a) =>
          generateTimeSlots(a.startTime, a.endTime, duration)
        );

        const bookedStartTimes = new Set(
          existingMeetings
            .filter((m) => m.date === selectedDate)
            .map((m) => m.startTime)
        );

        const isToday = selectedDate === new Date().toISOString().split("T")[0];
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        return allSlots.filter((slot) => {
          if (bookedStartTimes.has(slot.start)) return false;
          if (isToday) {
            const [h, m] = slot.start.split(":").map(Number);
            if (h * 60 + m <= currentMinutes) return false;
          }
          return true;
        });
      })()
    : [];

  const brandLight = brandColor + "1a"; // 10% opacity
  const brandHover = brandColor + "26"; // ~15% opacity for hover

  return (
    <div className="space-y-6">
      {/* Date selection */}
      <div>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          <Calendar className="h-3.5 w-3.5" />
          Select a date
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {days.map((date) => {
            const dow = getDayOfWeek(date);
            const hasAvailability = availability.some((a) => a.dayOfWeek === dow);
            const isSelected = date === selectedDate;

            return (
              <button
                key={date}
                type="button"
                disabled={!hasAvailability}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                style={
                  isSelected
                    ? {
                        borderColor: brandColor,
                        backgroundColor: brandLight,
                        color: brandColor,
                      }
                    : undefined
                }
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-fast ${
                  !hasAvailability
                    ? "cursor-not-allowed border-border/50 text-muted/40"
                    : isSelected
                      ? ""
                      : "border-border bg-background text-foreground hover:border-foreground/20 hover:shadow-card"
                }`}
              >
                {formatDate(date)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            <Clock className="h-3.5 w-3.5" />
            Available times
          </p>
          {availableSlots.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No available slots for this date.</p>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableSlots.map((slot) => {
                const isSelected =
                  selectedSlot?.start === slot.start &&
                  selectedSlot?.end === slot.end;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setError("");
                    }}
                    style={
                      isSelected
                        ? {
                            borderColor: brandColor,
                            backgroundColor: brandColor,
                            color: "#ffffff",
                          }
                        : undefined
                    }
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-fast ${
                      isSelected
                        ? ""
                        : "border-border bg-background text-foreground hover:border-foreground/20 hover:shadow-card"
                    }`}
                  >
                    {formatTime(slot.start)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Booking form */}
      {selectedSlot && (
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4 text-sm font-medium">
              Book for {selectedDate} at {formatTime(selectedSlot.start)}
            </p>
            <form
              action={async (fd) => {
                fd.set("bookingPageId", bookingPageId);
                fd.set("slug", slug);
                fd.set("date", selectedDate!);
                fd.set("startTime", selectedSlot.start);
                fd.set("endTime", selectedSlot.end);
                const { createMeeting } = await import("@/lib/actions/booking");
                const result = await createMeeting(fd);
                if (result?.error) setError(result.error);
              }}
              className="space-y-3"
            >
              <div>
                <label className="mb-1 block text-xs font-medium" htmlFor="inviteeName">
                  Your name
                </label>
                <input
                  id="inviteeName"
                  name="inviteeName"
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors focus:outline-none"
                  style={{ boxShadow: "none" }}
                  placeholder="John Doe"
                  onFocus={(e) => {
                    e.target.style.borderColor = brandColor;
                    e.target.style.boxShadow = `0 0 0 2px ${brandColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "";
                    e.target.style.boxShadow = "";
                  }}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium" htmlFor="inviteeEmail">
                  Your email
                </label>
                <input
                  id="inviteeEmail"
                  name="inviteeEmail"
                  type="email"
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors focus:outline-none"
                  placeholder="john@example.com"
                  onFocus={(e) => {
                    e.target.style.borderColor = brandColor;
                    e.target.style.boxShadow = `0 0 0 2px ${brandColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "";
                    e.target.style.boxShadow = "";
                  }}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <button
                type="submit"
                style={{ backgroundColor: brandColor }}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-fast hover:opacity-90 active:scale-[0.98]"
              >
                Confirm booking
              </button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}
