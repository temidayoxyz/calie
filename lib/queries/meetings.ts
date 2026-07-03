import { eq, and, desc, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { meetings, bookingPages } from "@/lib/db/schema";

export async function getUpcomingMeetings(userId: string) {
  const today = new Date().toISOString().split("T")[0];
  return db
    .select()
    .from(meetings)
    .innerJoin(bookingPages, eq(meetings.bookingPageId, bookingPages.id))
    .where(
      and(
        eq(bookingPages.userId, userId),
        gte(meetings.date, today)
      )
    )
    .orderBy(meetings.date, meetings.startTime);
}

export async function getAllMeetingsForUser(userId: string) {
  return db
    .select()
    .from(meetings)
    .innerJoin(bookingPages, eq(meetings.bookingPageId, bookingPages.id))
    .where(eq(bookingPages.userId, userId))
    .orderBy(desc(meetings.date), desc(meetings.startTime));
}

export async function getMeetingsForDate(bookingPageId: string, date: string) {
  return db
    .select()
    .from(meetings)
    .where(
      and(
        eq(meetings.bookingPageId, bookingPageId),
        eq(meetings.date, date),
        eq(meetings.status, "confirmed")
      )
    );
}
