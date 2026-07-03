export const siteConfig = {
  name: "Calie",
  tagline: "Scan. Pick a time. Done.",
  description:
    "Share one booking page and one QR code that works everywhere. Premium scheduling for freelancers, consultants, and teams.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  links: {
    twitter: "https://twitter.com/calie",
    github: "https://github.com/calie",
  },
} as const;

export const motionTokens = {
  duration: {
    fast: 0.12,
    default: 0.22,
    slow: 0.35,
  },
  ease: [0.25, 1, 0.5, 1] as const,
  hover: {
    y: -2,
  },
  scroll: {
    y: 12,
  },
} as const;
