# Principles

> Your wisdom. When you need it most.

Principles is a personal wisdom app that helps you collect lessons from books, podcasts, and life experience — and reflects them back to you when you need them most.

Unlike generic AI advice, Principles responds to your situations using **your own beliefs and worldview**. The more you add, the more personal and powerful it becomes.

---

## The Problem

You read a great book. You feel inspired. Two weeks later — gone. Back to default behaviour.

Most people consume wisdom passively. They highlight, screenshot, and forget. There is no system that brings your own lessons back at the exact moment you need them.

Principles solves that.

---

## How It Works

**1. Build your library**
Add principles in your own words — from books, podcasts, or personal experience. Tag them by area: mindset, work, relationships, health.

**2. Log a situation**
When something happens — a setback, a decision, a conflict — write it down honestly.

**3. Hear your own wisdom**
The AI finds the 2–3 principles you already believe in that apply right now. Your own words, reflected back when it matters.

---

## Features

- ✅ Google OAuth authentication
- ✅ Personal principles library with tags and sources
- ✅ Curated starter principles from stoicism, atomic habits, mindset, and more
- ✅ AI-powered situation analysis using your own principles (Gemini)
- ✅ Situation log with full history
- ✅ Dashboard with stats and recent logs
- ✅ Responsive design — works on mobile and desktop
- 🔜 Stripe payments (Free / Pro tiers)
- 🔜 Weekly AI digest email
- 🔜 Pattern and gap detection
- 🔜 Daily principle nudge

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Auth | NextAuth.js + Google OAuth |
| Database | Supabase (PostgreSQL) |
| AI | Google Gemini (gemini-1.5-flash) |
| Deploy | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Google Cloud](https://console.cloud.google.com) project with OAuth credentials
- A [Google AI Studio](https://aistudio.google.com) API key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/principles.git
cd principles
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# NextAuth
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Set up the database

Run this SQL in your Supabase SQL editor:

```sql
-- Principles table
create table principles (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  content text not null,
  source text,
  tags text[],
  created_at timestamp default now()
);

-- Logs table
create table logs (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  title text,
  content text not null,
  ai_response text not null,
  created_at timestamp default now()
);

-- User plans table
create table user_plans (
  user_id text primary key,
  plan text default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  updated_at timestamp default now()
);

-- Enable Row Level Security
alter table principles enable row level security;
alter table logs enable row level security;
alter table user_plans enable row level security;
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
  app/
    (auth)/
      sign-in/            # Sign in page
    (dashboard)/
      dashboard/          # Dashboard home
      dashboard/log/      # Situation log + AI response
      dashboard/principles/ # Principles library
      dashboard/billing/  # Plan management
    api/
      auth/[...nextauth]/ # NextAuth handler
      analyze/            # AI analysis endpoint
      principles/         # Principles CRUD
      logs/               # Logs CRUD
    page.tsx              # Landing page
  components/
    ui/                   # Shadcn components
    principles/           # PrincipleCard, PrincipleList, AddPrincipleForm, CuratedPicker
    logs/                 # LogForm, LogHistory, LogCard
    dashboard/            # StatsBar
    layout/               # Navbar
  lib/
    supabase.ts           # Supabase client
    auth.ts               # NextAuth config
    openai.ts             # Gemini client
    curated-principles.ts # Curated starter principles
  types/
    index.ts              # Shared TypeScript types
```

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `NEXTAUTH_SECRET` | Random string for session encryption |
| `NEXTAUTH_URL` | Your app URL (`http://localhost:3000` in dev) |
| `GOOGLE_ID` | Google OAuth client ID |
| `GOOGLE_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `GEMINI_API_KEY` | Google AI Studio API key |

---

## Roadmap

- [ ] Stripe subscription payments (Free / Pro)
- [ ] Weekly AI digest email via Resend
- [ ] Pattern detection — where you keep struggling
- [ ] Gap detector — principles you wrote but never apply
- [ ] Semantic search using vector embeddings
- [ ] Daily principle nudge email
- [ ] Mobile app

---

## License

MIT