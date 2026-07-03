"use client";

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateIcsEvent } from "@/lib/ics";

type Props = {
  headline: string;
  slug: string;
  date: string;
  startTime: string;
  endTime: string;
};

export function AddToCalendar({
  headline,
  slug,
  date,
  startTime,
  endTime,
}: Props) {
  function handleDownload() {
    const title = `Meeting with ${headline}`;
    const url = `${window.location.origin}/book/${slug}`;
    const description = `Meeting booked via Calie.\n\nBooking page: ${url}`;

    const ics = generateIcsEvent({
      title,
      startDate: date,
      startTime,
      endTime,
      description,
      url,
    });

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `meeting-${date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  return (
    <Button variant="outline" onClick={handleDownload} className="gap-2">
      <CalendarPlus className="h-4 w-4" />
      Add to Calendar (.ics)
    </Button>
  );
}
