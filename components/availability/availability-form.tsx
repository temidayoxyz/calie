"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_LABELS } from "@/lib/slots";
import { saveAvailability, type AvailabilitySlot } from "@/lib/actions/availability";

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = i.toString().padStart(2, "0");
  return [`${h}:00`, `${h}:30`];
}).flat();

type Props = {
  initial: AvailabilitySlot[];
};

export function AvailabilityForm({ initial }: Props) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(() => {
    if (initial.length > 0) return initial;
    return [1, 2, 3, 4, 5].map((day) => ({
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "17:00",
    }));
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    const result = await saveAvailability(slots);
    if (result?.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  function toggleDay(day: number) {
    setSaved(false);
    setSlots((prev) => {
      const exists = prev.find((s) => s.dayOfWeek === day);
      if (exists) return prev.filter((s) => s.dayOfWeek !== day);
      return [...prev, { dayOfWeek: day, startTime: "09:00", endTime: "17:00" }];
    });
  }

  function updateSlot(day: number, field: "startTime" | "endTime", value: string) {
    setSaved(false);
    setSlots((prev) =>
      prev.map((s) => (s.dayOfWeek === day ? { ...s, [field]: value } : s))
    );
  }

  function isEnabled(day: number) {
    return slots.some((s) => s.dayOfWeek === day);
  }

  function getSlot(day: number) {
    return slots.find((s) => s.dayOfWeek === day);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-muted" />
          Weekly availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 0].map((day) => {
            const enabled = isEnabled(day);
            const slot = getSlot(day);
            return (
              <div
                key={day}
                className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center"
              >
                <label className="flex min-w-[100px] cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => toggleDay(day)}
                    className="h-4 w-4 rounded border-border accent-accent"
                  />
                  <span className="text-sm font-medium">
                    {DAY_LABELS[day]}
                  </span>
                </label>

                {enabled && slot ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={slot.startTime}
                      onChange={(e) => updateSlot(day, "startTime", e.target.value)}
                      className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                    >
                      {HOURS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-muted">to</span>
                    <select
                      value={slot.endTime}
                      onChange={(e) => updateSlot(day, "endTime", e.target.value)}
                      className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                    >
                      {HOURS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <span className="text-xs text-muted">Unavailable</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save availability"}
          </Button>
          {saved && (
            <span className="text-sm text-accent animate-in fade-in">
              Saved!
            </span>
          )}
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
