# Kirat Astro

Vedic astrology platform for Bhutan, Nepal, India, and the Himalayan diaspora. Standalone project — its own git history, its own deploy, nothing shared with any other project in this workspace.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Framer Motion (`motion`) · Zustand · React Hook Form + Zod · TanStack Query · Prisma + Postgres (Supabase) · Supabase Auth · Stripe · Resend.

## Features

- **Astrological chart generation** — planetary and chart calculations powered by [`astronomy-engine`](https://github.com/cosinekitty/astronomy), with a typed input/output contract in `src/services/astrology` (see [Known gaps](#known-gaps-by-design-not-oversight) for the engine wiring status).
- **PDF / report export** — birth-chart reports rendered and exported client- and server-side via [`@react-pdf/renderer`](https://react-pdf.org), [`jspdf`](https://github.com/parallax/jsPDF), and [`html2canvas-pro`](https://github.com/yorickshan/html2canvas-pro).
- **Authentication** — email/session auth through [Supabase Auth](https://supabase.com/docs/guides/auth) (`@supabase/ssr`), with app-domain profile and billing data mirrored into the Prisma `User` model.
- **Payments & subscriptions** — [Stripe](https://stripe.com) checkout and webhooks, with subscription state persisted on the user record.
- **Transactional email** — delivery via [Resend](https://resend.com) for notifications and report delivery.
- **Modern, accessible UI** — [shadcn/ui](https://ui.shadcn.com) on Radix primitives, Tailwind CSS v4, Framer Motion animations, and light/dark theming via `next-themes`.
- **Type-safe forms & data** — React Hook Form + Zod validation, TanStack Query for server state, and Zustand for client state.

## Architecture

Feature-first. Business logic never lives in `app/`; pages compose from `features/*` and `components/ui/*`.

```
src/
  app/          route segments only — layout, page, route handlers, metadata
  components/   shared, feature-agnostic UI (shadcn primitives in components/ui)
  features/     one folder per domain feature (components + schema + store + types, colocated)
  hooks/        shared React hooks
  lib/          framework/client wiring (prisma, supabase, stripe, resend, cn)
  services/     business logic and external integrations, framework-agnostic
  providers/    app-wide context providers (query client, theme)
  types/        cross-cutting type declarations (e.g. env.d.ts)
  constants/    static config values
```

## Getting started

### Prerequisites

- **Node.js** 20+ (see `.nvmrc`)
- **pnpm** (this repo uses a pnpm lockfile)
- A **Postgres** database — a [Supabase](https://supabase.com) project provides both the database and Auth

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env.local
```

`.env.local` should define the following (names must match what the code references):

```bash
# Postgres (Supabase) — pooled connection for the app, direct connection for migrations
DATABASE_URL="postgresql://postgres:[password]@[host]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[anon-key]"
SUPABASE_SERVICE_ROLE_KEY="[service-role-key]"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="Kirat Astro <notifications@yourdomain.com>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

`DATABASE_URL` should point at Supabase's pooled connection (port 6543, `pgbouncer=true`); `DIRECT_URL` at the direct connection (port 5432) — Prisma needs the direct connection for migrations.

### 3. Set up the database

```bash
pnpm db:push        # sync the Prisma schema to your database (quick start)
# — or, for a tracked migration history —
pnpm db:migrate     # create + apply a migration (needs a real DATABASE_URL)
pnpm db:generate    # regenerate the Prisma client after schema.prisma changes
```

### 4. Run the development server

```bash
pnpm dev            # http://localhost:3000
```

## Testing

Tests run on [Vitest](https://vitest.dev):

```bash
pnpm test           # run the suite once
pnpm test:watch     # watch mode
```

## Scripts

| Command             | Description |
| ------------------- | ----------- |
| `pnpm dev`          | Start the development server |
| `pnpm build`        | Build for production |
| `pnpm start`        | Run the production build |
| `pnpm lint`         | Run ESLint |
| `pnpm test`         | Run the Vitest suite once |
| `pnpm test:watch`   | Run Vitest in watch mode |
| `pnpm db:generate`  | Regenerate the Prisma client (`prisma generate`) |
| `pnpm db:migrate`   | Create and apply a migration (`prisma migrate dev`) |
| `pnpm db:push`      | Push the Prisma schema to the database (`prisma db push`) |
| `pnpm db:studio`    | Open Prisma Studio to browse the database |

## Known gaps (by design, not oversight)

- **No real chart calculation engine.** `src/services/astrology/index.ts` defines the typed input/output contract but throws `AstrologyEngineNotConfiguredError`. Decide between a Swiss Ephemeris binding (self-hosted, most accurate, more ops overhead) and a hosted ephemeris API (faster to ship) before implementing it.
- **No Supabase project, Stripe account, or Resend domain provisioned yet.** `.env.example` documents every variable needed; nothing here works against real data until those are created and the values are filled in.
- **No auth middleware.** `lib/supabase/server.ts` and `client.ts` are ready to use, but there's no `middleware.ts` refreshing the session cookie yet — add one once a route needs to gate on being signed in.
- **No Vercel project linked yet.** `vercel link` / `vercel --prod` once you're ready to deploy.

## Contributing

Contributions are welcome — bug fixes, new features, accessibility improvements, or better astrological accuracy. Please read the **[Contributing Guide](./CONTRIBUTING.md)** for the workflow, commit conventions, and guidelines before opening a pull request.

## Security

Found a vulnerability? **Do not open a public issue.** Please follow the responsible-disclosure process in the **[Security Policy](./SECURITY.md)**.

## License

Proprietary — all rights reserved. See the **[LICENSE](./LICENSE)** file. Contact the repository owner for usage or licensing enquiries.
