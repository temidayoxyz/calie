export type BookingPage = {
  id: string;
  slug: string;
  headline: string;
  bio: string;
  brandColor: string;
  userId: string;
};

export type MeetingType = {
  id: string;
  name: string;
  duration: number;
  description?: string;
};

export type TimeSlot = {
  start: Date;
  end: Date;
  available: boolean;
};
