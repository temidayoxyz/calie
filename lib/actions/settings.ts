"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

type State = { error?: string; success?: boolean };

export async function updateProfile(
  _prevState: State | null,
  formData: FormData
): Promise<State> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated." };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name?.trim()) return { error: "Name is required." };
  if (!email?.trim()) return { error: "Email is required." };

  // Check email uniqueness
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email.trim().toLowerCase()))
    .limit(1);

  if (existing.length > 0 && existing[0].id !== session.user.id) {
    return { error: "This email is already in use." };
  }

  await db
    .update(users)
    .set({ name: name.trim(), email: email.trim().toLowerCase() })
    .where(eq(users.id, session.user.id));

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function changePassword(
  _prevState: State | null,
  formData: FormData
): Promise<State> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated." };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All password fields are required." };
  }

  if (newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." };
  }

  // Verify current password
  const [user] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user?.passwordHash) {
    return { error: "No password set for this account." };
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db
    .update(users)
    .set({ passwordHash })
    .where(eq(users.id, session.user.id));

  return { success: true };
}
