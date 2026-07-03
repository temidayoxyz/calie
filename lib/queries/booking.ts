import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { bookingPages } from "@/lib/db/schema";

export async function getBookingPageBySlug(slug: string) {
  const [page] = await db
    .select()
    .from(bookingPages)
    .where(eq(bookingPages.slug, slug))
    .limit(1);

  return page ?? null;
}

export async function requireBookingPage(slug: string) {
  const page = await getBookingPageBySlug(slug);
  if (!page) notFound();
  return page;
}
