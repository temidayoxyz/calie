# Calie

**Scan. Pick a time. Done.**

A QR-first scheduling platform built with Next.js 15, Tailwind CSS, and Turso. Create a booking page, set your availability, share a QR code — invitees pick a time without creating an account.

## Features

- **QR-first scheduling** — Every booking page gets a downloadable QR code (PNG, SVG, JPG)
- **Business card generator** — Create and download branded business cards with your QR code, name, title, company, email, and phone
- **Branded booking pages** — Custom headline, bio, brand color, and URL slug
- **Weekly availability** — Set available days and times, generate slots at your chosen duration
- **Booking management** — Upcoming, ongoing, and past meetings with invitee details
- **Add to Calendar** — Invitees download an .ics file after booking
- **Auth** — Email + password signup/login with Auth.js v5

## Getting Started

### Prerequisites

- Node.js 18+
- A [Turso](https://turso.tech) database (free tier works)

### 1. Clone and install

```bash
git clone <repo-url> calie
cd calie
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the values:

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Run `openssl rand -base64 32` to generate |
| `TURSO_DATABASE_URL` | Your Turso database URL (`libsql://...`) |
| `TURSO_AUTH_TOKEN` | Turso auth token from dashboard |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for local dev |

### 3. Push database schema

```bash
npm run db:push
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), sign up at `/signup`, and you'll land in the dashboard with a booking page ready to go.

## Usage

1. **Sign up** at `/signup` — a booking page is created automatically
2. **Set availability** at `/dashboard/availability` — choose days and time ranges
3. **Customize your page** at `/dashboard/booking-pages` — headline, bio, brand color, slug, meeting duration
4. **Share your link** — `calie.app/book/your-slug`
5. **Download QR & business card** at `/dashboard/qr` — QR as PNG/SVG/JPG, plus a branded business card with your details
6. **View meetings** at `/dashboard/meetings` — upcoming, ongoing, and past

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS |
| Auth | Auth.js v5 (credentials + JWT) |
| Database | Drizzle ORM + Turso (libSQL) |
| QR codes | `qrcode` |
| Icons | Lucide |
| Forms | react-hook-form + Zod |
| Animation | Framer Motion |

## Project Structure

```
app/
  (auth)/            Login, signup
  (dashboard)/       Dashboard shell and all app pages
  (marketing)/       Landing, pricing, features, about, etc.
  book/[slug]/       Public booking page + confirmation
  api/auth/          Auth.js API route
components/
  ui/                Button, Card, Input primitives
  auth/              Login and signup forms
  availability/      Weekly availability editor
  booking/           Booking flow + Add to Calendar
  dashboard/         Sidebar, shell, meetings tabs, settings forms
  marketing/         Header, footer, hero, landing sections
  qr/                QR download buttons
lib/
  db/                Schema, migrations, client
  actions/           Server actions (auth, availability, booking, settings)
  queries/           Database queries (user, booking, meetings, availability)
styles/              Global CSS, design tokens, textures
types/               Shared TypeScript types
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to Turso |
| `npm run db:generate` | Generate migration files |
| `npm run db:studio` | Open Drizzle Studio |

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FAFAF8` | Page backgrounds |
| Foreground | `#235347` | Headings, brand text |
| Neutral | `#111111` | Body text, icons |
| Surface | `#FFFFFF` | Cards, sidebar |
| Border | `#E8E8E5` | Dividers, card borders |
| Muted | `#666666` | Secondary text |
| Accent | `#235347` | CTAs, brand color default |
| Success | `#2E7D32` | Positive feedback |
| Danger | `#C0392B` | Error states, destructive actions |
| Headings | Geist | All headings |
| Body | Inter | Body text, UI |

## License

**Source available, not open source.** All rights reserved.

This repository is public for portfolio review and code assessment purposes. You may view and learn from the code, but you may not use, copy, modify, distribute, or deploy it in any form. See [LICENSE](./LICENSE) for full terms.
