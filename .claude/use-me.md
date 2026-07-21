# DKC Dashboard — Developer Reference

## Database: Drizzle ORM + Neon PostgreSQL

---

## Schema Changes

**Schema file:** `src/server/db/schema.ts`

### Step 1 — Edit the schema

Open `src/server/db/schema.ts` and add/modify columns in the relevant table.

Example — adding a new column to `users`:

```ts
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name').notNull(),
  email: text('email').unique(),         // ← new column
  avatarUrl: text('avatar_url'),         // ← new column
  // ...rest of columns
});
```

### Step 2 — Push changes to the database

For development (no migration file needed):

```bash
pnpm db:push
```

For production (generate a migration file first, then apply):

```bash
pnpm db:generate   # creates a .sql file in src/server/db/migrations/
pnpm db:migrate    # applies the migration to the DB
```

---

## Available DB Commands

| Command | Purpose |
|---|---|
| `pnpm db:push` | Directly sync schema → DB (dev use, no migration file) |
| `pnpm db:generate` | Generate a `.sql` migration file from schema diff |
| `pnpm db:migrate` | Apply generated migration files to the DB |
| `pnpm db:studio` | Open Drizzle Studio (visual DB browser) |

---

## Drizzle Studio (Visual DB Browser)

### Start Studio

```bash
cd /Users/yuadhistra/Desktop/dkc-dashboard
pnpm db:studio
```

### Access Studio

Open in browser: **https://local.drizzle.studio**

### Notes

- Uses your `DATABASE_URL` from `.env` / `.env.local`
- Connects directly to your live Neon DB instance
- The `@neondatabase/serverless` websocket warning is normal and non-blocking
- Keep the terminal running while using Studio — closing it stops the connection

---

## Environment Setup

Your `.env.local` must have:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

> The `?sslmode=require` is required for Neon connections.

---

## Drizzle Config

Config file: `drizzle.config.ts`

```ts
defineConfig({
  schema: './src/server/db/schema.ts',
  out: './src/server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
});
```
