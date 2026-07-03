"use client";

import { useState } from "react";
import { Calendar, Clock, User, Mail, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/lib/db/schema";

type Props = {
  ongoing: Meeting[];
  upcoming: Meeting[];
  past: Meeting[];
};

const TAB_ITEMS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "ongoing", label: "Ongoing" },
  { key: "past", label: "Past" },
] as const;

type Tab = (typeof TAB_ITEMS)[number]["key"];

export function MeetingsTabs({ ongoing, upcoming, past }: Props) {
  const [tab, setTab] = useState<Tab>("upcoming");

  const data = tab === "ongoing" ? ongoing : tab === "past" ? past : upcoming;

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1 w-fit">
        {TAB_ITEMS.map(({ key, label }) => {
          const count =
            key === "ongoing"
              ? ongoing.length
              : key === "past"
                ? past.length
                : upcoming.length;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-fast",
                tab === key
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              )}
            >
              {label}
              <span className="ml-1.5 text-xs text-muted">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-6">
        {tab === "ongoing" && ongoing.length > 0 && (
          <p className="mb-4 flex items-center gap-1.5 text-xs text-accent">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            {ongoing.length} meeting{ongoing.length > 1 ? "s" : ""} in progress
          </p>
        )}

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
              <Calendar className="h-5 w-5 text-muted" />
            </div>
            <p className="mt-4 font-heading text-sm font-medium">
              No {tab} meetings
            </p>
            <p className="mt-1 text-sm text-muted">
              {tab === "upcoming"
                ? "You don't have any upcoming bookings."
                : tab === "ongoing"
                  ? "No meetings are happening right now."
                  : "No past meetings to show."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                isPast={tab === "past"}
                isOngoing={tab === "ongoing"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MeetingCard({
  meeting,
  isPast,
  isOngoing,
}: {
  meeting: Meeting;
  isPast: boolean;
  isOngoing: boolean;
}) {
  return (
    <Card className={cn(isPast && "opacity-50")}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted" />
            <span className="text-sm font-medium">
              {new Date(meeting.date + "T12:00:00").toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }
              )}
            </span>
          </div>
          {isOngoing && (
            <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Live
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted" />
          <span className="text-sm text-muted">
            {formatTime(meeting.startTime)} — {formatTime(meeting.endTime)}
          </span>
        </div>
        <div className="mt-3 space-y-1 border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-muted" />
            <span className="text-sm">{meeting.inviteeName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-muted" />
            <span className="text-sm text-muted">{meeting.inviteeEmail}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}
