"use server";

import { eq, and, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { bookingPages } from "@/lib/db/schema";
import { getUserBookingPage } from "@/lib/queries/user";
import { requireUser } from "@/lib/queries/user";

type State = { error?: string; success?: boolean };

export async function updateBookingPage(
  _prevState: State | null,
  formData: FormData
): Promise<State> {
  const user = await requireUser();
  const page = await getUserBookingPage(user.id);

  if (!page) return { error: "No booking page found." };

  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const slug = formData.get("slug") as string;
  const brandColor = formData.get("brandColor") as string;
  const durationStr = formData.get("duration") as string;
  const duration = parseInt(durationStr, 10);

  if (!headline?.trim()) return { error: "Headline is required." };
  if (!slug?.trim()) return { error: "Slug is required." };
  if (isNaN(duration) || duration < 5 || duration > 480) {
    return { error: "Duration must be between 5 and 480 minutes." };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.trim())) {
    return { error: "Slug can only contain lowercase letters, numbers, and hyphens." };
  }

  // Check slug uniqueness
  const existing = await db
    .select({ id: bookingPages.id })
    .from(bookingPages)
    .where(and(eq(bookingPages.slug, slug.trim()), ne(bookingPages.id, page.id)))
    .limit(1);

  if (existing.length > 0) {
    return { error: "This slug is already taken." };
  }

  await db
    .update(bookingPages)
    .set({
      headline: headline.trim(),
      bio: bio?.trim() ?? null,
      slug: slug.trim(),
      brandColor: brandColor?.trim() || "#235347",
      duration,
    })
    .where(eq(bookingPages.id, page.id));

  revalidatePath("/dashboard/booking-pages");
  revalidatePath(`/book/${slug.trim()}`);
  return { success: true };
}
