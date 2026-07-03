import { getAvailability } from "@/lib/queries/availability";
import { AvailabilityForm } from "@/components/availability/availability-form";
import { requireUser } from "@/lib/queries/user";

export default async function AvailabilityPage() {
  const user = await requireUser();
  const availability = await getAvailability(user.id);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-2xl font-semibold">Availability</h1>
        <p className="mt-1 text-sm text-muted">
          Set when you&apos;re available to be booked.
        </p>

        <div className="mt-8">
          <AvailabilityForm
            initial={availability.map((a) => ({
              dayOfWeek: a.dayOfWeek,
              startTime: a.startTime,
              endTime: a.endTime,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
