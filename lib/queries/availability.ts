import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { availabilities } from "@/lib/db/schema";

export async function getAvailability(userId: string) {
  return db
    .select()
    .from(availabilities)
    .where(eq(availabilities.userId, userId));
}
