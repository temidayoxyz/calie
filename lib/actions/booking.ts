"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { meetings, bookingPages, users } from "@/lib/db/schema";
import { sendBookingConfirmation, sendNewBookingNotification } from "@/lib/email";

export async function createMeeting(formData: FormData) {
  const bookingPageId = formData.get("bookingPageId") as string;
  const slug = formData.get("slug") as string;
  const inviteeName = formData.get("inviteeName") as string;
  const inviteeEmail = formData.get("inviteeEmail") as string;
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  if (!bookingPageId || !inviteeName || !inviteeEmail || !date || !startTime || !endTime) {
    return { error: "All fields are required." };
  }

  // Check for double booking
  const existing = await db
    .select({ id: meetings.id })
    .from(meetings)
    .where(
      and(
        eq(meetings.bookingPageId, bookingPageId),
        eq(meetings.date, date),
        eq(meetings.startTime, startTime),
        eq(meetings.status, "confirmed")
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return { error: "This slot has already been booked. Please choose another." };
  }

  // Query the booking page owner for email notifications
  const [page] = await db
    .select({
      headline: bookingPages.headline,
      duration: bookingPages.duration,
      hostName: users.name,
      hostEmail: users.email,
    })
    .from(bookingPages)
    .innerJoin(users, eq(bookingPages.userId, users.id))
    .where(eq(bookingPages.id, bookingPageId))
    .limit(1);

  const meetingId = crypto.randomUUID();
  await db.insert(meetings).values({
    id: meetingId,
    bookingPageId,
    inviteeName,
    inviteeEmail,
    date,
    startTime,
    endTime,
    status: "confirmed",
  });

  // Send emails before redirect — don't throw on failures
  if (page) {
    const emailParams = {
      inviteeName,
      inviteeEmail,
      hostName: page.hostName ?? page.headline,
      hostEmail: page.hostEmail,
      date,
      startTime,
      endTime,
      duration: page.duration,
      slug,
    };

    await Promise.allSettled([
      sendBookingConfirmation(emailParams),
      sendNewBookingNotification(emailParams),
    ]);
  }

  revalidatePath(`/book/${slug}`);
  redirect(`/book/${slug}/confirmed?name=${encodeURIComponent(inviteeName)}&date=${date}&time=${startTime}&endTime=${endTime}`);
}
