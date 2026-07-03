"use client";

import { useState, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateBookingPage } from "@/lib/actions/booking-page";
import type { BookingPage } from "@/lib/db/schema";

export function EditBookingPageForm({ page }: { page: BookingPage }) {
  const [state, formAction] = useActionState(updateBookingPage, null);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit booking page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="headline" className="mb-1 block text-xs font-medium">
              Headline
            </label>
            <Input
              id="headline"
              name="headline"
              defaultValue={page.headline}
              required
              placeholder="Your name or title"
            />
          </div>

          <div>
            <label htmlFor="bio" className="mb-1 block text-xs font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={page.bio ?? ""}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
              placeholder="A short bio or description"
            />
          </div>

          <div>
            <label htmlFor="slug" className="mb-1 block text-xs font-medium">
              URL slug
            </label>
            <Input
              id="slug"
              name="slug"
              defaultValue={page.slug}
              required
              placeholder="your-slug"
            />
            <p className="mt-1 text-xs text-muted">
              calie.app/book/{page.slug}
            </p>
          </div>

          <div>
            <label htmlFor="duration" className="mb-1 block text-xs font-medium">
              Meeting duration (minutes)
            </label>
            <Input
              id="duration"
              name="duration"
              type="number"
              defaultValue={page.duration}
              required
              min={5}
              max={480}
              step={5}
              className="w-28"
            />
          </div>

          <div>
            <label htmlFor="brandColor" className="mb-1 block text-xs font-medium">
              Brand color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="brandColor"
                name="brandColor"
                defaultValue={page.brandColor}
                className="h-9 w-9 cursor-pointer rounded border border-border"
              />
              <Input
                id="brandColorText"
                name="brandColor"
                defaultValue={page.brandColor}
                className="w-28"
                onChange={(e) => {
                  const colorInput = document.getElementById(
                    "brandColor"
                  ) as HTMLInputElement;
                  if (colorInput) colorInput.value = e.target.value;
                }}
              />
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-accent">Saved successfully!</p>
          )}

          <Button type="submit">Save changes</Button>
        </CardContent>
      </Card>
    </form>
  );
}
