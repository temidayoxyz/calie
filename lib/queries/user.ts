import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookingPages } from "@/lib/db/schema";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session.user;
}

export async function getUserBookingPage(userId: string) {
  const [page] = await db
    .select()
    .from(bookingPages)
    .where(eq(bookingPages.userId, userId))
    .limit(1);

  return page ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  return user;
}
