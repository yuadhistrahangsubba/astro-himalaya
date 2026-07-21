# Contributing to Kirat Astro

Thank you for your interest in improving **Kirat Astro** — a Vedic astrology platform for
Bhutan, Nepal, India, and the Himalayan diaspora. Contributions are welcome, whether it's a bug
fix, a new feature, improved accessibility, or better astrological accuracy.

## Getting set up

See the [Getting started](./README.md#getting-started) section of the README for prerequisites,
environment variables, and how to run the project locally.

## Workflow

1. **Fork** the repository and create a feature branch off `main`:
   ```bash
   git checkout -b feat/your-feature
   ```
2. **Make your changes.** Keep TypeScript strict and consistent with the surrounding code, and
   respect the feature-first architecture — pages in `app/` compose from `features/*` and
   `components/ui/*`; business logic and external integrations belong in `services/*` (and
   `features/*`), never in `app/`.
3. **Update the database schema properly.** Any change to `prisma/schema.prisma` needs a
   migration — run `pnpm db:migrate` to create and apply it, then commit the generated migration
   files alongside your code.
4. **Verify before you push** — all three must pass:
   ```bash
   pnpm lint      # ESLint
   pnpm build     # must compile cleanly
   pnpm test      # Vitest suite
   ```
5. **Commit** using clear, descriptive messages. This repo follows a
   [Gitmoji](https://gitmoji.dev)-style convention, e.g.:
   ```
   :sparkles: add navamsa chart export to PDF report
   :bug: fix Stripe webhook signature verification
   :lipstick: tighten spacing on the birth-details form
   :white_check_mark: add tests for the ephemeris service contract
   ```
6. **Open a Pull Request** against `main`. Describe **what** changed and **why**, and include
   before/after screenshots for any UI changes.

## Guidelines

- **Never commit secrets.** `.env*` files are git-ignored; do not hard-code credentials, API
  keys, connection strings, or Stripe/Resend/Supabase tokens.
- **Respect the architecture.** No business logic in `app/` — keep it in `services/*` and
  `features/*` so it stays framework-agnostic and testable.
- **Astrological and cultural accuracy matter.** Content and calculations relating to Vedic
  astrology and Himalayan traditions should be accurate and respectful. When adding or editing
  such content, cite a source in your PR where possible.
- **Accessibility matters.** Preserve semantic markup, `aria-*` labels, keyboard support, and
  reduced-motion handling in the components.
- **Discuss big changes first.** For large features or anything breaking, open an issue to
  discuss the approach before writing code.

## Reporting bugs & requesting features

- **Bugs:** open an issue with steps to reproduce, expected vs. actual behaviour, and your
  environment (browser, device).
- **Features:** open an issue describing the problem you're trying to solve, not just the
  proposed solution.

For security issues, **do not open a public issue** — see [SECURITY.md](./SECURITY.md).
