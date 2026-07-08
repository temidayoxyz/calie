import { Calendar, CalendarPlus, Video, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const integrations = [
  {
    name: "Add to Calendar (ICS)",
    description: "Invitees can download an .ics file after booking. Works with Google, Outlook, and Apple Calendar.",
    icon: CalendarPlus,
    status: "active" as const,
  },
  {
    name: "Email Notifications",
    description: "Booking confirmation sent to your invitee and a new-booking notification sent to you. Powered by Resend.",
    icon: Mail,
    status: "active" as const,
  },
  {
    name: "Google Calendar",
    description: "Automatically sync booked meetings to your Google Calendar.",
    icon: Calendar,
    status: "coming-soon" as const,
  },
  {
    name: "Outlook Calendar",
    description: "Automatically sync booked meetings to your Outlook Calendar.",
    icon: Calendar,
    status: "coming-soon" as const,
  },
  {
    name: "Video Conferencing",
    description: "Auto-generate Google Meet or Zoom links for every booking.",
    icon: Video,
    status: "coming-soon" as const,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-2xl font-semibold">Integrations</h1>
        <p className="mt-1 text-sm text-muted">
          Connect your calendar, video, and email tools.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {integrations.map((integration) => (
            <Card key={integration.name}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <integration.icon className="h-5 w-5 text-muted" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-heading text-sm font-medium">
                      {integration.name}
                    </p>
                    {integration.status === "active" ? (
                      <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                        Active
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-muted/20 px-2 py-0.5 text-[10px] font-medium text-muted">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {integration.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
