import { Resend } from "resend";
import { render } from "@react-email/components";
import BookingConfirmation from "@/emails/booking-confirmation";
import NewBookingNotification from "@/emails/new-booking-notification";
import { siteConfig } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "hello@calie.app";

type BookingEmailParams = {
  inviteeName: string;
  inviteeEmail: string;
  hostName: string;
  hostEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  slug: string;
};

export async function sendBookingConfirmation(params: BookingEmailParams) {
  const bookingPageUrl = `${siteConfig.url}/book/${params.slug}`;

  const html = await render(
    BookingConfirmation({
      inviteeName: params.inviteeName,
      hostName: params.hostName,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      duration: params.duration,
      bookingPageUrl,
    })
  );

  const { data, error } = await resend.emails.send({
    from: `Calie <${fromEmail}>`,
    to: [params.inviteeEmail],
    subject: `Booking confirmed — ${params.hostName} on ${formatDate(params.date)}`,
    html,
  });

  if (error) {
    console.error("Failed to send booking confirmation email:", error);
  }

  return { data, error };
}

export async function sendNewBookingNotification(params: BookingEmailParams) {
  const dashboardUrl = `${siteConfig.url}/dashboard`;
  const bookingPageUrl = `${siteConfig.url}/book/${params.slug}`;

  const html = await render(
    NewBookingNotification({
      hostName: params.hostName,
      inviteeName: params.inviteeName,
      inviteeEmail: params.inviteeEmail,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      duration: params.duration,
      dashboardUrl,
      bookingPageUrl,
    })
  );

  const { data, error } = await resend.emails.send({
    from: `Calie <${fromEmail}>`,
    to: [params.hostEmail],
    subject: `New booking — ${params.inviteeName} on ${formatDate(params.date)}`,
    html,
  });

  if (error) {
    console.error("Failed to send booking notification email:", error);
  }

  return { data, error };
}

function formatDate(date: string): string {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
