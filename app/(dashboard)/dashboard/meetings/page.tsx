import { requireUser } from "@/lib/queries/user";
import { getAllMeetingsForUser } from "@/lib/queries/meetings";
import { MeetingsTabs } from "@/components/dashboard/meetings-tabs";
import type { Meeting } from "@/lib/db/schema";
import type { BookingPage } from "@/lib/db/schema";

type MeetingWithPage = {
  meeting: Meeting;
  booking_page: BookingPage;
};

function categorize(meetings: MeetingWithPage[]) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const ongoing: MeetingWithPage[] = [];
  const upcoming: MeetingWithPage[] = [];
  const past: MeetingWithPage[] = [];

  for (const m of meetings) {
    if (m.meeting.status !== "confirmed") {
      past.push(m);
      continue;
    }

    const [sh, sm] = m.meeting.startTime.split(":").map(Number);
    const [eh, em] = m.meeting.endTime.split(":").map(Number);
    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    if (m.meeting.date === today) {
      if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
        ongoing.push(m);
      } else if (currentMinutes >= endMinutes) {
        past.push(m);
      } else {
        upcoming.push(m);
      }
    } else if (m.meeting.date > today) {
      upcoming.push(m);
    } else {
      past.push(m);
    }
  }

  return { ongoing, upcoming, past };
}

export default async function MeetingsPage() {
  const user = await requireUser();
  const results = await getAllMeetingsForUser(user.id);

  const { ongoing, upcoming, past } = categorize(results);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-2xl font-semibold">Meetings</h1>
        <p className="mt-1 text-sm text-muted">
          View and manage your bookings.
        </p>

        <div className="mt-8">
          <MeetingsTabs
            ongoing={ongoing.map((r) => r.meeting)}
            upcoming={upcoming.map((r) => r.meeting)}
            past={past.map((r) => r.meeting)}
          />
        </div>
      </div>
    </div>
  );
}
