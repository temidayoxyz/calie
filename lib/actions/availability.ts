"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { availabilities } from "@/lib/db/schema";
import { requireUser } from "@/lib/queries/user";

export type AvailabilitySlot = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export async function saveAvailability(slots: AvailabilitySlot[]) {
  const user = await requireUser();

  // Delete existing availability
  await db.delete(availabilities).where(eq(availabilities.userId, user.id));

  // Insert new slots
  if (slots.length > 0) {
    await db.insert(availabilities).values(
      slots.map((s) => ({
        userId: user.id,
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
      }))
    );
  }

  revalidatePath("/dashboard/availability");
  return { success: true };
}
