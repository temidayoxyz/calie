"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile, changePassword } from "@/lib/actions/settings";

export function SettingsForms({
  initialName,
  initialEmail,
}: {
  initialName: string;
  initialEmail: string;
}) {
  return (
    <div className="space-y-8">
      <ProfileForm initialName={initialName} initialEmail={initialEmail} />
      <PasswordForm />
    </div>
  );
}

function ProfileForm({
  initialName,
  initialEmail,
}: {
  initialName: string;
  initialEmail: string;
}) {
  const [state, formAction] = useActionState(updateProfile, null);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={initialName}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={initialEmail}
              placeholder="you@example.com"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-accent">Profile updated!</p>
          )}

          <Button type="submit">Save changes</Button>
        </CardContent>
      </Card>
    </form>
  );
}

function PasswordForm() {
  const [state, formAction] = useActionState(changePassword, null);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-xs font-medium"
            >
              Current password
            </label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="mb-1 block text-xs font-medium"
            >
              New password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-medium"
            >
              Confirm new password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-accent">Password changed!</p>
          )}

          <Button type="submit">Change password</Button>
        </CardContent>
      </Card>
    </form>
  );
}
