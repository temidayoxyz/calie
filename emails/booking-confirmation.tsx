import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface BookingConfirmationProps {
  inviteeName: string;
  hostName: string;
  date: string; // "2026-07-15"
  startTime: string; // "09:00"
  endTime: string; // "09:30"
  duration: number; // minutes
  bookingPageUrl: string;
}

const accent = "#235347";
const background = "#FAFAF8";
const surface = "#FFFFFF";
const border = "#E8E8E5";
const neutral = "#111111";
const muted = "#666666";

function formatDate(date: string): string {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function BookingConfirmation({
  inviteeName = "John",
  hostName = "Sarah Chen",
  date = "2026-07-15",
  startTime = "09:00",
  endTime = "09:30",
  duration = 30,
  bookingPageUrl = "https://calie.app/book/sarah",
}: BookingConfirmationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Booking confirmed — {hostName} on {formatDate(date)}
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerStyle}>
            <Text style={logoStyle}>Calie</Text>
          </Section>

          {/* Success badge */}
          <Section style={badgeSectionStyle}>
            <Text style={badgeStyle}>Booking confirmed</Text>
          </Section>

          <Heading style={greetingStyle}>
            Thanks, {inviteeName}!
          </Heading>
          <Text style={subtextStyle}>
            Your meeting has been booked. Here are the details:
          </Text>

          {/* Meeting card */}
          <Section style={cardStyle}>
            <Text style={hostNameStyle}>{hostName}</Text>

            <Hr style={dividerStyle} />

            <Section>
              <Text style={labelStyle}>
                <CalendarIcon /> Date
              </Text>
              <Text style={valueStyle}>{formatDate(date)}</Text>
            </Section>

            <Section style={rowStyle}>
              <Text style={labelStyle}>
                <ClockIcon /> Time
              </Text>
              <Text style={valueStyle}>
                {formatTime(startTime)} — {formatTime(endTime)}
              </Text>
            </Section>

            <Section style={rowStyle}>
              <Text style={labelStyle}>
                <DurationIcon /> Duration
              </Text>
              <Text style={valueStyle}>{duration} minutes</Text>
            </Section>
          </Section>

          {/* CTA */}
          <Section style={ctaSectionStyle}>
            <Link href={bookingPageUrl} style={buttonStyle}>
              View booking page
            </Link>
          </Section>

          <Text style={footnoteStyle}>
            Need to reschedule or cancel? Reply to this email or contact{" "}
            <Link href={bookingPageUrl} style={linkStyle}>
              {hostName}
            </Link>
            .
          </Text>

          {/* Footer */}
          <Hr style={footerDividerStyle} />
          <Text style={footerStyle}>
            Powered by{" "}
            <Link href="https://calie.app" style={linkStyle}>
              Calie
            </Link>{" "}
            — scan, pick a time, done.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Inline icon components rendered as SVG data URIs in text
function CalendarIcon() {
  return (
    <span style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle" }}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </span>
  );
}

function ClockIcon() {
  return (
    <span style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle" }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </span>
  );
}

function DurationIcon() {
  return (
    <span style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle" }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="16" y2="14" />
      </svg>
    </span>
  );
}

// === Styles ===

const bodyStyle: React.CSSProperties = {
  backgroundColor: background,
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: "40px 0",
  margin: 0,
};

const containerStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
  padding: "0 24px",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "32px 0 0",
};

const logoStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: accent,
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  letterSpacing: "-0.02em",
};

const badgeSectionStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "32px 0 0",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  color: accent,
  backgroundColor: "#E8F0EC",
  borderRadius: 20,
  padding: "4px 16px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  margin: 0,
};

const greetingStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: neutral,
  textAlign: "center",
  margin: "24px 0 0",
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  letterSpacing: "-0.02em",
};

const subtextStyle: React.CSSProperties = {
  fontSize: 15,
  color: muted,
  textAlign: "center",
  margin: "8px 0 0",
  lineHeight: 1.6,
};

const cardStyle: React.CSSProperties = {
  backgroundColor: surface,
  border: `1px solid ${border}`,
  borderRadius: 12,
  padding: "24px",
  margin: "28px 0 0",
};

const hostNameStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: neutral,
  margin: "0 0 0",
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  letterSpacing: "-0.01em",
};

const dividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: `1px solid ${border}`,
  margin: "16px 0 20px",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: muted,
  margin: 0,
  display: "flex",
  alignItems: "center",
};

const valueStyle: React.CSSProperties = {
  fontSize: 15,
  color: neutral,
  margin: "4px 0 0",
  fontWeight: 500,
};

const rowStyle: React.CSSProperties = {
  marginTop: 16,
};

const ctaSectionStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: 28,
};

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: accent,
  color: "#FFFFFF",
  borderRadius: 8,
  padding: "12px 28px",
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const footnoteStyle: React.CSSProperties = {
  fontSize: 13,
  color: muted,
  textAlign: "center",
  margin: "24px 0 0",
  lineHeight: 1.6,
};

const linkStyle: React.CSSProperties = {
  color: accent,
  textDecoration: "underline",
};

const footerDividerStyle: React.CSSProperties = {
  border: "none",
  borderTop: `1px solid ${border}`,
  margin: "32px 0 24px",
};

const footerStyle: React.CSSProperties = {
  fontSize: 12,
  color: muted,
  textAlign: "center",
  margin: 0,
};

BookingConfirmation.PreviewProps = {
  inviteeName: "Alex Johnson",
  hostName: "Sarah Chen",
  date: "2026-07-15",
  startTime: "09:00",
  endTime: "09:30",
  duration: 30,
  bookingPageUrl: "https://calie.app/book/sarah",
} satisfies BookingConfirmationProps;
